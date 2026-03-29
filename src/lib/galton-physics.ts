import Matter from "matter-js";
import { GALTON_DEFAULTS as D, MAX_TOTAL_OBSERVATIONS, type GaltonParams } from "./galton-config";
import { formatStats, theoreticalGalton } from "./galton-stats";

export interface GaltonBoard {
  start: () => void;
  stop: () => void;
  resize: (w: number, h: number) => void;
  reset: () => void;
  addBalls: (count: number) => void;
  getBinCounts: () => number[];
  setParams: (p: GaltonParams) => void;
}

export function createGaltonBoard(
  canvas: HTMLCanvasElement,
  params: GaltonParams,
): GaltonBoard {
  const ctx = canvas.getContext("2d")!;
  let width = 0;
  let height = 0;
  let pegRows = params.pegRows;
  let gravity = params.gravity;
  let spawnInterval = params.spawnInterval;

  const engine = Matter.Engine.create({ enableSleeping: true });
  engine.gravity.y = gravity;

  let spawnTimer: ReturnType<typeof setInterval> | null = null;
  let rafId: number | null = null;
  let binCounts: number[] = [];
  let pegs: Matter.Body[] = [];
  let walls: Matter.Body[] = [];
  let binWalls: Matter.Body[] = [];
  let balls: Matter.Body[] = [];
  let stopped = false;
  let binTopY = 0;
  let totalObservations = 0;
  const assignedBalls = new WeakSet<Matter.Body>();

  const STATS_HEADER = 48;

  function numBins() {
    return pegRows + 3;
  }

  function buildWorld() {
    Matter.World.clear(engine.world, false);
    engine.gravity.y = gravity;
    pegs = [];
    walls = [];
    binWalls = [];
    balls = [];
    totalObservations = 0;
    binCounts = new Array(numBins()).fill(0);

    const pegStartY = STATS_HEADER + height * D.PEG_TOP_OFFSET;
    const cx = width / 2;

    for (let row = 0; row < pegRows; row++) {
      const n = row + 3;
      const rowW = (n - 1) * D.PEG_X_SPACING;
      const sx = cx - rowW / 2;
      const y = pegStartY + row * D.PEG_Y_SPACING;
      for (let col = 0; col < n; col++) {
        const peg = Matter.Bodies.circle(sx + col * D.PEG_X_SPACING, y, D.PEG_RADIUS, {
          isStatic: true, restitution: D.BALL_RESTITUTION, friction: 0,
        });
        pegs.push(peg);
      }
    }

    const lastRowY = pegStartY + (pegRows - 1) * D.PEG_Y_SPACING;
    binTopY = lastRowY + D.PEG_Y_SPACING;
    const bottomPegs = pegRows + 2;
    const binW = (bottomPegs - 1) * D.PEG_X_SPACING;
    const binSX = cx - binW / 2;

    for (let i = 0; i <= bottomPegs; i++) {
      const x = binSX - D.PEG_X_SPACING / 2 + i * D.PEG_X_SPACING;
      binWalls.push(
        Matter.Bodies.rectangle(x, binTopY + D.BIN_WALL_HEIGHT / 2, D.BIN_WALL_WIDTH, D.BIN_WALL_HEIGHT, { isStatic: true }),
      );
    }

    walls = [
      Matter.Bodies.rectangle(cx, binTopY + D.BIN_WALL_HEIGHT + 5, width + 100, 10, { isStatic: true }),
      Matter.Bodies.rectangle(-5, height / 2, 10, height * 2, { isStatic: true }),
      Matter.Bodies.rectangle(width + 5, height / 2, 10, height * 2, { isStatic: true }),
    ];

    Matter.World.add(engine.world, [...pegs, ...binWalls, ...walls]);
  }

  function assignToBin(ball: Matter.Body) {
    if (assignedBalls.has(ball)) return;
    assignedBalls.add(ball);
    const bottomPegs = pegRows + 2;
    const binW = (bottomPegs - 1) * D.PEG_X_SPACING;
    const binSX = width / 2 - binW / 2 - D.PEG_X_SPACING / 2;
    const idx = Math.floor((ball.position.x - binSX) / D.PEG_X_SPACING);
    binCounts[Math.max(0, Math.min(binCounts.length - 1, idx))]++;
    totalObservations++;
    Matter.Body.setStatic(ball, true);
  }

  function checkSleepingBalls() {
    for (const ball of balls) {
      if (ball.label !== "ball" || assignedBalls.has(ball)) continue;
      if (ball.position.y < binTopY) continue;
      if (ball.isSleeping || ball.speed < 0.2) assignToBin(ball);
    }
  }

  function spawnBall() {
    if (totalObservations >= MAX_TOTAL_OBSERVATIONS) {
      if (spawnTimer) { clearInterval(spawnTimer); spawnTimer = null; }
      return;
    }
    // Recycle oldest static ball if at capacity
    if (balls.length >= D.MAX_BALLS) {
      const oldest = balls.find((b) => b.isStatic && b.label === "ball");
      if (oldest) {
        Matter.World.remove(engine.world, oldest);
        balls = balls.filter((b) => b !== oldest);
      } else return;
    }

    const r = Math.random() + Math.random() + Math.random();
    const offset = (r / 3 - 0.5) * D.PEG_X_SPACING * 0.8;
    const ball = Matter.Bodies.circle(width / 2 + offset, STATS_HEADER - D.BALL_RADIUS, D.BALL_RADIUS, {
      restitution: D.BALL_RESTITUTION, friction: D.BALL_FRICTION,
      frictionAir: D.BALL_FRICTION_AIR, density: D.BALL_DENSITY,
      sleepThreshold: D.BALL_SLEEP_THRESHOLD, label: "ball",
    });
    balls.push(ball);
    Matter.World.add(engine.world, ball);
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const cx = width / 2;
    const stats = formatStats(binCounts);
    const theory = theoreticalGalton(pegRows);
    const hasData = stats.totalBalls > 0;

    // Stats header
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(107,114,128,0.4)";
    ctx.font = "10px Inter, system-ui, sans-serif";
    ctx.fillText(`theory: \u03BC=${theory.mean.toFixed(2)}  \u03C3=${theory.stdDev.toFixed(2)}`, cx, 13);
    ctx.fillStyle = "rgba(107,114,128,0.7)";
    ctx.font = "11px Inter, system-ui, sans-serif";
    ctx.fillText(`\u03BC=${hasData ? stats.mean : "\u2014"}  \u03C3=${hasData ? stats.stdDev : "\u2014"}`, cx, 28);
    ctx.fillStyle = "rgba(107,114,128,0.35)";
    ctx.font = "10px Inter, system-ui, sans-serif";
    const capNote = totalObservations >= MAX_TOTAL_OBSERVATIONS ? " (cap)" : "";
    ctx.fillText(`n=${stats.totalBalls}${capNote}`, cx, 41);

    // Pegs
    ctx.fillStyle = D.PEG_COLOR;
    for (const p of pegs) { ctx.beginPath(); ctx.arc(p.position.x, p.position.y, D.PEG_RADIUS, 0, Math.PI * 2); ctx.fill(); }

    // Bin walls
    ctx.fillStyle = D.BIN_WALL_COLOR;
    for (const w of binWalls) { ctx.fillRect(w.position.x - D.BIN_WALL_WIDTH / 2, w.position.y - D.BIN_WALL_HEIGHT / 2, D.BIN_WALL_WIDTH, D.BIN_WALL_HEIGHT); }

    // Bin fills
    const maxC = Math.max(1, ...binCounts);
    const bottomPegs = pegRows + 2;
    const binAreaW = (bottomPegs - 1) * D.PEG_X_SPACING;
    const binSX = cx - binAreaW / 2 - D.PEG_X_SPACING / 2;
    ctx.fillStyle = D.BIN_FILL_COLOR;
    for (let i = 0; i < binCounts.length; i++) {
      if (!binCounts[i]) continue;
      const fh = (binCounts[i] / maxC) * D.BIN_WALL_HEIGHT;
      ctx.fillRect(binSX + i * D.PEG_X_SPACING, binTopY + D.BIN_WALL_HEIGHT - fh, D.PEG_X_SPACING, fh);
    }

    // Balls
    for (const b of balls) {
      if (b.label !== "ball") continue;
      ctx.fillStyle = b.isSleeping || b.isStatic ? D.BALL_SLEEPING_COLOR : D.BALL_COLOR;
      ctx.beginPath(); ctx.arc(b.position.x, b.position.y, D.BALL_RADIUS, 0, Math.PI * 2); ctx.fill();
    }
  }

  function loop() {
    if (stopped) return;
    Matter.Engine.update(engine, 1000 / 60);
    checkSleepingBalls();
    draw();
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    stopped = false;
    buildWorld();
    spawnTimer = setInterval(spawnBall, spawnInterval);
    loop();
  }

  function stop() {
    stopped = true;
    if (spawnTimer) { clearInterval(spawnTimer); spawnTimer = null; }
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  }

  function reset() { stop(); start(); }

  function addBalls(count: number) {
    const toAdd = Math.min(count, MAX_TOTAL_OBSERVATIONS - totalObservations);
    for (let i = 0; i < toAdd; i++) setTimeout(() => spawnBall(), i * 25);
  }

  function resize(w: number, h: number) {
    const dpr = window.devicePixelRatio || 1;
    width = w; height = h;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stop(); start();
  }

  function setParams(p: GaltonParams) {
    pegRows = p.pegRows;
    gravity = p.gravity;
    spawnInterval = p.spawnInterval;
    stop(); start();
  }

  return { start, stop, resize, reset, addBalls, getBinCounts: () => binCounts, setParams };
}
