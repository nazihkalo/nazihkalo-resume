"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createGaltonBoard, type GaltonBoard } from "@/lib/galton-physics";
import { GALTON_PARAM_LIMITS, type GaltonParams } from "@/lib/galton-config";
import { createPoissonEngine, type PoissonEngine, type PoissonParams } from "@/lib/poisson-engine";
import { createExponentialEngine, type ExponentialEngine, type ExponentialParams } from "@/lib/exponential-engine";

// ─── Slider ──────────────────────────────────────────────
function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-[10px] text-gray-500">
      <span className="w-16 shrink-0">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-1 w-full accent-indigo-400"
      />
      <span className="w-8 text-right font-mono tabular-nums">{value}</span>
    </label>
  );
}

// ─── Shared button styles ────────────────────────────────
const btnClass =
  "rounded-full bg-white/80 px-2.5 py-0.5 text-[10px] font-medium text-gray-500 ring-1 ring-gray-200/60 backdrop-blur transition-colors hover:bg-white hover:text-gray-900";

// ─── SimulationCard wrapper ──────────────────────────────
function SimCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white/60 p-3 shadow-sm ring-1 ring-gray-200/50 backdrop-blur">
      <div className="mb-2">
        <h3 className="text-xs font-semibold text-gray-700">{title}</h3>
        <p className="text-[10px] text-gray-400">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

// ─── 1. Galton Board Card ────────────────────────────────
function GaltonCard({ width: cardW }: { width: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<GaltonBoard | null>(null);
  const [params, setParams] = useState<GaltonParams>({
    pegRows: 10,
    gravity: 1.0,
    spawnInterval: 80,
  });

  const initBoard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (boardRef.current) boardRef.current.stop();
    const board = createGaltonBoard(canvas, params);
    boardRef.current = board;
    board.resize(cardW - 24, 420);
  }, [cardW, params]);

  useEffect(() => {
    initBoard();
    return () => { boardRef.current?.stop(); };
  }, [initBoard]);

  const updateParam = useCallback(
    (key: keyof GaltonParams, val: number) => {
      setParams((p) => ({ ...p, [key]: val }));
    },
    [],
  );

  return (
    <SimCard title="Galton Board" subtitle="Binomial → Normal (CLT)">
      <canvas
        ref={canvasRef}
        className="pointer-events-none w-full"
        style={{ height: 420 }}
      />
      <div className="mt-2 space-y-1">
        <Slider
          label="Peg rows"
          value={params.pegRows}
          {...GALTON_PARAM_LIMITS.pegRows}
          onChange={(v) => updateParam("pegRows", v)}
        />
        <Slider
          label="Gravity"
          value={params.gravity}
          {...GALTON_PARAM_LIMITS.gravity}
          onChange={(v) => updateParam("gravity", v)}
        />
        <Slider
          label="Speed"
          value={params.spawnInterval}
          {...GALTON_PARAM_LIMITS.spawnInterval}
          onChange={(v) => updateParam("spawnInterval", v)}
        />
      </div>
      <div className="mt-2 flex justify-center gap-1.5">
        <button className={btnClass} onClick={() => boardRef.current?.addBalls(20)}>
          + Add Balls
        </button>
        <button className={btnClass} onClick={() => boardRef.current?.reset()}>
          Reset
        </button>
      </div>
    </SimCard>
  );
}

// ─── 2. Poisson Traffic Card ─────────────────────────────
function PoissonCard({ width: cardW }: { width: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<PoissonEngine | null>(null);
  const [params, setParams] = useState<PoissonParams>({
    lambda: 4,
    windowMs: 2000,
  });

  const initEngine = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (engineRef.current) engineRef.current.stop();
    const eng = createPoissonEngine(canvas, params);
    engineRef.current = eng;
    eng.resize(cardW - 24, 280);
  }, [cardW, params]);

  useEffect(() => {
    initEngine();
    return () => { engineRef.current?.stop(); };
  }, [initEngine]);

  return (
    <SimCard title="Poisson Traffic" subtitle="Arrivals per interval">
      <canvas
        ref={canvasRef}
        className="pointer-events-none w-full"
        style={{ height: 280 }}
      />
      <div className="mt-2 space-y-1">
        <Slider
          label={"\u03BB"}
          value={params.lambda}
          min={0.5}
          max={12}
          step={0.5}
          onChange={(v) => setParams((p) => ({ ...p, lambda: v }))}
        />
        <Slider
          label="Window"
          value={params.windowMs / 1000}
          min={0.5}
          max={5}
          step={0.5}
          onChange={(v) => setParams((p) => ({ ...p, windowMs: v * 1000 }))}
        />
      </div>
      <div className="mt-2 flex justify-center">
        <button className={btnClass} onClick={() => engineRef.current?.reset()}>
          Reset
        </button>
      </div>
    </SimCard>
  );
}

// ─── 3. Exponential Waiting Card ─────────────────────────
function ExponentialCard({ width: cardW }: { width: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ExponentialEngine | null>(null);
  const [params, setParams] = useState<ExponentialParams>({ lambda: 2 });

  const initEngine = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (engineRef.current) engineRef.current.stop();
    const eng = createExponentialEngine(canvas, params);
    engineRef.current = eng;
    eng.resize(cardW - 24, 240);
  }, [cardW, params]);

  useEffect(() => {
    initEngine();
    return () => { engineRef.current?.stop(); };
  }, [initEngine]);

  return (
    <SimCard title="Exponential Waiting Times" subtitle="Time between arrivals">
      <canvas
        ref={canvasRef}
        className="pointer-events-none w-full"
        style={{ height: 240 }}
      />
      <div className="mt-2 space-y-1">
        <Slider
          label={"\u03BB"}
          value={params.lambda}
          min={0.5}
          max={8}
          step={0.5}
          onChange={(v) => setParams({ lambda: v })}
        />
      </div>
      <div className="mt-2 flex justify-center">
        <button className={btnClass} onClick={() => engineRef.current?.reset()}>
          Reset
        </button>
      </div>
    </SimCard>
  );
}

// ─── Main Panel ──────────────────────────────────────────
export function SimulationPanel() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelWidth, setPanelWidth] = useState(0);

  useEffect(() => {
    function measure() {
      if (panelRef.current) setPanelWidth(panelRef.current.offsetWidth);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return null;
  }

  return (
    <div
      ref={panelRef}
      className="fixed right-0 top-0 hidden h-screen w-[42vw] max-w-[560px] overflow-y-auto overscroll-contain p-4 pb-16 lg:block print:hidden"
      style={{ zIndex: 20 }}
    >
      <div className="space-y-4">
        {panelWidth > 0 && (
          <>
            <GaltonCard width={panelWidth} />
            <PoissonCard width={panelWidth} />
            <ExponentialCard width={panelWidth} />
          </>
        )}
      </div>
    </div>
  );
}
