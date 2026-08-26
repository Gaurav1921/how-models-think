import { useState } from "react";
import { line as d3Line, scaleLinear } from "d3";
import { vizColors } from "../../../viz-core/colors";

const WIDTH = 480;
const HEIGHT = 260;
const W_DOMAIN: [number, number] = [-2, 8];
const L_DOMAIN: [number, number] = [0, 13];
const W_STAR = 3;
const LEARNING_RATE = 0.3;
const POINT_COUNT = 120;

/** The actual MSE-shaped loss curve, L(w) = 0.5(w - w*)^2, with a marker you can drag or step down toward the minimum. */
function loss(w: number): number {
  return 0.5 * (w - W_STAR) ** 2;
}

function gradient(w: number): number {
  return w - W_STAR;
}

const ws = Array.from(
  { length: POINT_COUNT },
  (_, index) => W_DOMAIN[0] + ((W_DOMAIN[1] - W_DOMAIN[0]) * index) / (POINT_COUNT - 1),
);

export function GradientDescentBowl() {
  const [w, setW] = useState(7);

  const xScale = scaleLinear().domain(W_DOMAIN).range([28, WIDTH - 12]);
  const yScale = scaleLinear().domain(L_DOMAIN).range([HEIGHT - 20, 12]);

  const grad = gradient(w);
  const tangentSpan = 1.6;
  const tx1 = w - tangentSpan;
  const tx2 = w + tangentSpan;
  const ty1 = loss(w) + grad * (tx1 - w);
  const ty2 = loss(w) + grad * (tx2 - w);

  function takeStep() {
    setW((current) => current - LEARNING_RATE * gradient(current));
  }

  return (
    <div className="flex flex-col gap-4">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full">
        <line x1={xScale(W_STAR)} x2={xScale(W_STAR)} y1={12} y2={HEIGHT - 20} stroke={vizColors.border} strokeWidth={1} strokeDasharray="3 3" />
        <path
          d={d3Line<number>((value) => xScale(value), (value) => yScale(loss(value)))(ws) ?? undefined}
          fill="none"
          stroke={vizColors.query}
          strokeWidth={2}
        />
        <line
          x1={xScale(tx1)}
          y1={yScale(ty1)}
          x2={xScale(tx2)}
          y2={yScale(ty2)}
          stroke={vizColors.attention}
          strokeWidth={2}
        />
        <circle cx={xScale(w)} cy={yScale(loss(w))} r={5} fill={vizColors.attention} />
        <text x={xScale(W_STAR)} y={HEIGHT - 4} textAnchor="middle" fontSize={10} fill={vizColors.textMuted}>
          global minimum
        </text>
      </svg>

      <label className="flex flex-col gap-1 font-mono text-xs text-[var(--color-text-muted)]">
        weight w = {w.toFixed(2)}
        <input
          type="range"
          min={W_DOMAIN[0]}
          max={W_DOMAIN[1]}
          step={0.05}
          value={w}
          onChange={(event) => setW(Number(event.target.value))}
          className="w-full accent-[var(--color-attention)]"
        />
      </label>

      <div className="flex items-center justify-between font-mono text-xs">
        <span className="text-[var(--color-text-muted)]">
          L(w) = {loss(w).toFixed(2)}, dL/dw = {grad.toFixed(2)}
        </span>
        <button
          type="button"
          onClick={takeStep}
          className="rounded-full border border-[var(--color-border)] px-3 py-1 text-[var(--color-text)] transition-colors hover:border-[var(--color-text)]"
        >
          Take a gradient step &gt;
        </button>
      </div>
    </div>
  );
}
