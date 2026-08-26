import { useState } from "react";
import { line as d3Line, scaleLinear } from "d3";
import { vizColors } from "../../../viz-core/colors";
import { elu, leakyRelu, relu, sigmoid, swish, tanh, type ActivationFn } from "./activationMath";

const WIDTH = 480;
const HEIGHT = 260;
const X_DOMAIN: [number, number] = [-6, 6];
const Y_DOMAIN: [number, number] = [-2, 6];
const POINT_COUNT = 160;

const FUNCTIONS: ActivationFn[] = [
  { slug: "sigmoid", label: "Sigmoid", color: vizColors.query, fn: sigmoid },
  { slug: "tanh", label: "Tanh", color: vizColors.position, fn: tanh },
  { slug: "relu", label: "ReLU", color: vizColors.key, fn: relu },
  { slug: "leaky-relu", label: "Leaky ReLU", color: vizColors.attention, fn: (x) => leakyRelu(x) },
  { slug: "elu", label: "ELU", color: vizColors.value, fn: (x) => elu(x) },
  { slug: "swish", label: "Swish", color: "#facc15", fn: swish },
];

const xs = Array.from(
  { length: POINT_COUNT },
  (_, index) => X_DOMAIN[0] + ((X_DOMAIN[1] - X_DOMAIN[0]) * index) / (POINT_COUNT - 1),
);

interface ActivationExplorerProps {
  visible?: string[];
}

/** An interactive plot of every activation function, with a draggable x value showing each function's live output. */
export function ActivationExplorer({ visible }: ActivationExplorerProps) {
  const [x, setX] = useState(0);
  const shown = visible ? FUNCTIONS.filter((entry) => visible.includes(entry.slug)) : FUNCTIONS;

  const xScale = scaleLinear().domain(X_DOMAIN).range([28, WIDTH - 12]);
  const yScale = scaleLinear().domain(Y_DOMAIN).range([HEIGHT - 20, 12]);

  return (
    <div className="flex flex-col gap-4">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full">
        <line x1={28} x2={WIDTH - 12} y1={yScale(0)} y2={yScale(0)} stroke={vizColors.border} strokeWidth={1} />
        <line x1={xScale(0)} x2={xScale(0)} y1={12} y2={HEIGHT - 20} stroke={vizColors.border} strokeWidth={1} />
        {shown.map((entry) => (
          <path
            key={entry.slug}
            d={
              d3Line<number>(
                (value) => xScale(value),
                (value) => yScale(entry.fn(value)),
              )(xs) ?? undefined
            }
            fill="none"
            stroke={entry.color}
            strokeWidth={2}
          />
        ))}
        <line
          x1={xScale(x)}
          x2={xScale(x)}
          y1={12}
          y2={HEIGHT - 20}
          stroke={vizColors.textMuted}
          strokeWidth={1}
          strokeDasharray="3 3"
        />
        {shown.map((entry) => (
          <circle key={entry.slug} cx={xScale(x)} cy={yScale(entry.fn(x))} r={4} fill={entry.color} />
        ))}
      </svg>

      <input
        type="range"
        min={X_DOMAIN[0]}
        max={X_DOMAIN[1]}
        step={0.1}
        value={x}
        onChange={(event) => setX(Number(event.target.value))}
        className="w-full accent-[var(--color-attention)]"
        aria-label="Input value x"
      />

      <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs">
        <span className="text-[var(--color-text-muted)]">x = {x.toFixed(1)}</span>
        {shown.map((entry) => (
          <span key={entry.slug} style={{ color: entry.color }}>
            {entry.label}: {entry.fn(x).toFixed(3)}
          </span>
        ))}
      </div>
    </div>
  );
}
