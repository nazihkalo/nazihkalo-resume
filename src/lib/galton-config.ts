// Default values — these are overridable via the control panel
export const GALTON_DEFAULTS = {
  PEG_ROWS: 10,
  PEG_RADIUS: 4.5,
  PEG_X_SPACING: 14,
  PEG_Y_SPACING: 28,
  PEG_TOP_OFFSET: 0.08,

  BALL_RADIUS: 3,
  BALL_SPAWN_INTERVAL: 80,
  MAX_BALLS: 500,
  GRAVITY_Y: 1.0,
  BALL_RESTITUTION: 0.5,
  BALL_FRICTION: 0.0001,
  BALL_FRICTION_AIR: 0.03,
  BALL_DENSITY: 0.001,
  BALL_SLEEP_THRESHOLD: 60,

  BIN_WALL_HEIGHT: 60,
  BIN_WALL_WIDTH: 1,

  // Colors
  BALL_COLOR: "rgba(99, 102, 241, 0.5)",
  BALL_SLEEPING_COLOR: "rgba(99, 102, 241, 0.3)",
  PEG_COLOR: "rgba(156, 163, 175, 0.5)",
  BIN_WALL_COLOR: "rgba(209, 213, 219, 0.25)",
  BIN_FILL_COLOR: "rgba(99, 102, 241, 0.1)",
} as const;

export interface GaltonParams {
  pegRows: number;
  gravity: number;
  spawnInterval: number;
}

export const GALTON_PARAM_LIMITS = {
  pegRows: { min: 4, max: 16, step: 1 },
  gravity: { min: 0.3, max: 3.0, step: 0.1 },
  spawnInterval: { min: 30, max: 200, step: 10 },
} as const;

// Simulation n cap to prevent client-side perf issues
export const MAX_TOTAL_OBSERVATIONS = 5000;
