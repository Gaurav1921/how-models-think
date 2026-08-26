import { useState } from "react";
import { line as d3Line, scaleLinear } from "d3";
import { vizColors } from "../../../viz-core/colors";
import { huber, mae, mse } from "./lossMath";

const WIDTH = 480;
const HEIGHT = 240;
const E_DOMAIN: [number, number] = [-4, 4];
const Y_DOMAIN: [number, number] = [0, 6];
const POINT_COUNT = 160;

const CURVES = [
  { slug: "mse", label: "MSE", color: vizColors.attention, fn: mse },
  { slug: "mae", label: "MAE", color: vizColors.query, fn: mae },
  { slug: "huber", label: "Huber", color: vizColors.value, fn: (e: number) => huber(e) },
];

const errors = Array.from(
  { length: POINT_COUNT },
  (_, index) => E_DOMAIN[0] + ((E_DOMAIN[1] - E_DOMAIN[0]) * index) / (POINT_COUNT - 1),
);

/** An interactive plot comparing MSE, MAE, and Huber loss as the prediction error changes. */
export function RegressionLossExplorer() {
  const [error, setError] = useState(2);

  const xScale = scaleLinear().domain(E_DOMAIN).range([28, WIDTH - 12]);
  const yScale = scaleLinear().domain(Y_DOMAIN).range([HEIGHT - 20, 12]);

  return (
    <div className="flex flex-col gap-4">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full">
        <line x1={28} x2={WIDTH - 12} y1={yScale(0)} y2={yScale(0)} stroke={vizColors.border} strokeWidth={1} />
        <line x1={xScale(0)} x2={xScale(0)} y1={12} y2={HEIGHT - 20} stroke={vizColors.border} strokeWidth={1} />
        {CURVES.map((curve) => (
          <path
            key={curve.slug}
            d={
              d3Line<number>(
                (value) => xScale(value),
                (value) => yScale(curve.fn(value)),
              )(errors) ?? undefined
            }
            fill="none"
            stroke={curve.color}
            strokeWidth={2}
          />
        ))}
        <line
          x1={xScale(error)}
          x2={xScale(error)}
          y1={12}
          y2={HEIGHT - 20}
          stroke={vizColors.textMuted}
          strokeWidth={1}
          strokeDasharray="3 3"
        />
        {CURVES.map((curve) => (
          <circle key={curve.slug} cx={xScale(error)} cy={yScale(curve.fn(error))} r={4} fill={curve.color} />
        ))}
      </svg>

      <input
        type="range"
        min={E_DOMAIN[0]}
        max={E_DOMAIN[1]}
        step={0.1}
        value={error}
        onChange={(event) => setError(Number(event.target.value))}
        className="w-full accent-[var(--color-attention)]"
        aria-label="Prediction error (y_hat - y)"
      />

      <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs">
        <span className="text-[var(--color-text-muted)]">error = {error.toFixed(1)}</span>
        {CURVES.map((curve) => (
          <span key={curve.slug} style={{ color: curve.color }}>
            {curve.label}: {curve.fn(error).toFixed(2)}
          </span>
        ))}
      </div>
    </div>
  );
}
