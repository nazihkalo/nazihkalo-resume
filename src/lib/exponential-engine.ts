import { MAX_TOTAL_OBSERVATIONS } from "./galton-config";
import { exponentialPdf, computeMeanFromArray, computeStdDevFromArray } from "./galton-stats";

export interface ExponentialParams {
  lambda: number;
}

export interface ExponentialEngine {
  start: () => void;
  stop: () => void;
  reset: () => void;
  resize: (w: number, h: number) => void;
  setParams: (p: ExponentialParams) => void;
  pushObservation: (val: number) => void;
}

export function createExponentialEngine(
  canvas: HTMLCanvasElement,
  params: ExponentialParams,
): ExponentialEngine {
  const ctx = canvas.getContext("2d")!;
  let width = 0;
  let height = 0;
  let lambda = params.lambda;

  let rafId: number | null = null;
  let stopped = false;
  let observations: number[] = [];

  // For standalone mode: generate synthetic exponential samples
  let genTimer: ReturnType<typeof setInterval> | null = null;

  function generateSample() {
    if (observations.length >= MAX_TOTAL_OBSERVATIONS) {
      if (genTimer) { clearInterval(genTimer); genTimer = null; }
      return;
    }
    const sample = -Math.log(Math.random()) / lambda;
    observations.push(sample);
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const cx = width / 2;
    const n = observations.length;

    // Stats
    const obsMean = n > 0 ? computeMeanFromArray(observations) : 0;
    const obsStd = n > 0 ? computeStdDevFromArray(observations, obsMean) : 0;
    const thMean = 1 / lambda;
    const thStd = 1 / lambda;

    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(107,114,128,0.4)";
    ctx.font = "10px Inter, system-ui, sans-serif";
    ctx.fillText(`theory: \u03BC=${thMean.toFixed(2)}  \u03C3=${thStd.toFixed(2)}`, cx, 13);
    ctx.fillStyle = "rgba(107,114,128,0.7)";
    ctx.font = "11px Inter, system-ui, sans-serif";
    ctx.fillText(`\u03BC=${n > 0 ? obsMean.toFixed(2) : "\u2014"}  \u03C3=${n > 0 ? obsStd.toFixed(2) : "\u2014"}`, cx, 28);
    ctx.fillStyle = "rgba(107,114,128,0.35)";
    ctx.font = "10px Inter, system-ui, sans-serif";
    ctx.fillText(`n=${n}`, cx, 41);

    // Histogram + PDF
    const histTop = 55;
    const histH = height - histTop - 25;
    if (n < 2 || histH < 30) return;

    const maxVal = Math.max(...observations);
    const numBuckets = Math.min(30, Math.ceil(Math.sqrt(n)));
    const bucketW = maxVal / numBuckets;
    const buckets = new Array(numBuckets).fill(0);
    for (const v of observations) {
      const idx = Math.min(Math.floor(v / bucketW), numBuckets - 1);
      buckets[idx]++;
    }
    const maxBucket = Math.max(1, ...buckets);
    const barW = Math.min(width / (numBuckets + 1), 16);
    const startX = (width - numBuckets * barW) / 2;

    // Bars
    for (let i = 0; i < numBuckets; i++) {
      if (!buckets[i]) continue;
      const bh = (buckets[i] / maxBucket) * histH * 0.85;
      ctx.fillStyle = "rgba(34,197,94,0.15)";
      ctx.fillRect(startX + i * barW + 1, histTop + histH - bh, barW - 2, bh);
    }

    // PDF overlay
    ctx.strokeStyle = "rgba(34,197,94,0.5)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    const pdfScale = (n * bucketW); // convert density to expected count
    for (let i = 0; i <= numBuckets; i++) {
      const xVal = i * bucketW;
      const density = exponentialPdf(xVal, lambda);
      const expected = density * pdfScale;
      const bh = (expected / maxBucket) * histH * 0.85;
      const px = startX + i * barW;
      const py = histTop + histH - bh;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Label
    ctx.fillStyle = "rgba(107,114,128,0.35)";
    ctx.font = "9px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText('"Most waits are short, long waits are rare"', cx, histTop + histH + 16);
  }

  function loop() {
    if (stopped) return;
    draw();
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    stopped = false;
    observations = [];
    genTimer = setInterval(generateSample, 50);
    loop();
  }

  function stop() {
    stopped = true;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    if (genTimer) { clearInterval(genTimer); genTimer = null; }
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

  function setParams(p: ExponentialParams) {
    lambda = p.lambda;
    stop(); start();
  }

  function pushObservation(val: number) {
    if (observations.length < MAX_TOTAL_OBSERVATIONS) observations.push(val);
  }

  return { start, stop, reset, resize, setParams, pushObservation };
}
