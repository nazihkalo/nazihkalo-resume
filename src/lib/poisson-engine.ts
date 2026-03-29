import { MAX_TOTAL_OBSERVATIONS } from "./galton-config";
import { poissonPmf, computeMeanFromArray, computeStdDevFromArray } from "./galton-stats";

export interface PoissonParams {
  lambda: number;
  windowMs: number;
}

export interface PoissonEngine {
  start: () => void;
  stop: () => void;
  reset: () => void;
  resize: (w: number, h: number) => void;
  setParams: (p: PoissonParams) => void;
  getInterArrivals: () => number[];
}

export function createPoissonEngine(
  canvas: HTMLCanvasElement,
  params: PoissonParams,
): PoissonEngine {
  const ctx = canvas.getContext("2d")!;
  let width = 0;
  let height = 0;
  let lambda = params.lambda;
  let windowMs = params.windowMs;

  let rafId: number | null = null;
  let stopped = false;

  // State
  let cars: { x: number; y: number; speed: number; color: string }[] = [];
  let windowCounts: number[] = [];    // arrivals per window
  let interArrivals: number[] = [];   // time gaps between arrivals
  let currentWindowCount = 0;
  let lastSpawnTime = 0;
  let lastArrivalTime = 0;
  let windowStartTime = 0;
  let totalWindows = 0;

  const ROAD_Y_TOP = 60;
  const ROAD_HEIGHT = 40;
  const ROAD_Y = ROAD_Y_TOP + ROAD_HEIGHT / 2;
  const CAR_W = 18;
  const CAR_H = 10;

  const COLORS = [
    "rgba(239,68,68,0.7)", "rgba(59,130,246,0.7)", "rgba(34,197,94,0.7)",
    "rgba(168,85,247,0.7)", "rgba(251,146,60,0.7)",
  ];

  function nextArrival(): number {
    // Exponential inter-arrival: -ln(U) / lambda_per_ms
    const lambdaPerMs = lambda / windowMs;
    return -Math.log(Math.random()) / lambdaPerMs;
  }

  function spawnCar(now: number) {
    if (totalWindows + windowCounts.length >= MAX_TOTAL_OBSERVATIONS) return;
    const gap = now - lastArrivalTime;
    if (lastArrivalTime > 0 && interArrivals.length < MAX_TOTAL_OBSERVATIONS) {
      interArrivals.push(gap);
    }
    lastArrivalTime = now;
    currentWindowCount++;
    cars.push({
      x: -CAR_W,
      y: ROAD_Y + (Math.random() - 0.5) * (ROAD_HEIGHT * 0.4),
      speed: 1.2 + Math.random() * 0.8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });
  }

  function draw(now: number) {
    ctx.clearRect(0, 0, width, height);

    // Stats
    const n = windowCounts.length;
    const obsMean = n > 0 ? computeMeanFromArray(windowCounts) : 0;
    const obsStd = n > 0 ? computeStdDevFromArray(windowCounts, obsMean) : 0;
    const thMean = lambda;
    const thStd = Math.sqrt(lambda);

    ctx.textAlign = "center";
    const cx = width / 2;
    ctx.fillStyle = "rgba(107,114,128,0.4)";
    ctx.font = "10px Inter, system-ui, sans-serif";
    ctx.fillText(`theory: \u03BB=${thMean.toFixed(1)}  \u03C3=${thStd.toFixed(2)}`, cx, 13);
    ctx.fillStyle = "rgba(107,114,128,0.7)";
    ctx.font = "11px Inter, system-ui, sans-serif";
    ctx.fillText(`\u03BB\u0302=${n > 0 ? obsMean.toFixed(2) : "\u2014"}  \u03C3=${n > 0 ? obsStd.toFixed(2) : "\u2014"}`, cx, 28);
    ctx.fillStyle = "rgba(107,114,128,0.35)";
    ctx.font = "10px Inter, system-ui, sans-serif";
    ctx.fillText(`windows=${n}`, cx, 41);

    // Road
    ctx.fillStyle = "rgba(229,231,235,0.3)";
    ctx.fillRect(0, ROAD_Y_TOP, width, ROAD_HEIGHT);
    // Lane lines
    ctx.setLineDash([8, 6]);
    ctx.strokeStyle = "rgba(209,213,219,0.4)";
    ctx.beginPath();
    ctx.moveTo(0, ROAD_Y);
    ctx.lineTo(width, ROAD_Y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Cars
    for (const car of cars) {
      ctx.fillStyle = car.color;
      const r = 3;
      ctx.beginPath();
      ctx.roundRect(car.x - CAR_W / 2, car.y - CAR_H / 2, CAR_W, CAR_H, r);
      ctx.fill();
    }

    // Histogram below road
    const histTop = ROAD_Y_TOP + ROAD_HEIGHT + 25;
    const histH = height - histTop - 20;
    if (n > 1 && histH > 30) {
      // Bin the window counts
      const maxK = Math.max(Math.ceil(lambda * 2.5), 8, ...windowCounts);
      const bins = new Array(maxK + 1).fill(0);
      for (const c of windowCounts) {
        if (c <= maxK) bins[c]++;
      }
      const maxBin = Math.max(1, ...bins);
      const barW = Math.min(width / (maxK + 2), 20);
      const startX = (width - (maxK + 1) * barW) / 2;

      // Observed bars
      for (let k = 0; k <= maxK; k++) {
        if (!bins[k]) continue;
        const bh = (bins[k] / maxBin) * histH * 0.85;
        ctx.fillStyle = "rgba(99,102,241,0.15)";
        ctx.fillRect(startX + k * barW + 1, histTop + histH - bh, barW - 2, bh);
      }

      // Theoretical PMF overlay
      ctx.fillStyle = "rgba(99,102,241,0.6)";
      for (let k = 0; k <= maxK; k++) {
        const thFreq = poissonPmf(k, lambda) * n;
        const th = (thFreq / maxBin) * histH * 0.85;
        const dotX = startX + k * barW + barW / 2;
        const dotY = histTop + histH - th;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      // Connect PMF dots
      ctx.strokeStyle = "rgba(99,102,241,0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let k = 0; k <= maxK; k++) {
        const thFreq = poissonPmf(k, lambda) * n;
        const th = (thFreq / maxBin) * histH * 0.85;
        const dotX = startX + k * barW + barW / 2;
        const dotY = histTop + histH - th;
        if (k === 0) ctx.moveTo(dotX, dotY);
        else ctx.lineTo(dotX, dotY);
      }
      ctx.stroke();

      // X-axis labels
      ctx.fillStyle = "rgba(107,114,128,0.4)";
      ctx.font = "9px Inter, system-ui, sans-serif";
      ctx.textAlign = "center";
      for (let k = 0; k <= maxK; k += Math.ceil((maxK + 1) / 8)) {
        ctx.fillText(`${k}`, startX + k * barW + barW / 2, histTop + histH + 12);
      }
    }
  }

  let lastFrame = 0;
  let nextSpawnAt = 0;

  function loop(timestamp: number) {
    if (stopped) return;
    if (!lastFrame) { lastFrame = timestamp; windowStartTime = timestamp; nextSpawnAt = timestamp + nextArrival(); }
    const dt = timestamp - lastFrame;
    lastFrame = timestamp;

    // Window check
    if (timestamp - windowStartTime >= windowMs) {
      windowCounts.push(currentWindowCount);
      totalWindows++;
      currentWindowCount = 0;
      windowStartTime = timestamp;
    }

    // Spawn cars
    while (timestamp >= nextSpawnAt) {
      spawnCar(nextSpawnAt);
      nextSpawnAt += nextArrival();
    }

    // Move cars
    for (const car of cars) car.x += car.speed * (dt / 16);
    cars = cars.filter((c) => c.x < width + CAR_W);

    draw(timestamp);
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    stopped = false;
    cars = [];
    windowCounts = [];
    interArrivals = [];
    currentWindowCount = 0;
    lastArrivalTime = 0;
    totalWindows = 0;
    lastFrame = 0;
    nextSpawnAt = 0;
    rafId = requestAnimationFrame(loop);
  }

  function stop() {
    stopped = true;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  }

  function reset() { stop(); start(); }

  function resize(w: number, h: number) {
    const dpr = window.devicePixelRatio || 1;
    width = w; height = h;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stop(); start();
  }

  function setParams(p: PoissonParams) {
    lambda = p.lambda;
    windowMs = p.windowMs;
    stop(); start();
  }

  return { start, stop, reset, resize, setParams, getInterArrivals: () => interArrivals };
}
