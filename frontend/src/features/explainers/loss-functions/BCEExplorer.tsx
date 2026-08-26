import { useState } from "react";
import { line as d3Line, scaleLinear } from "d3";
import { vizColors } from "../../../viz-core/colors";
import { bceForPositiveLabel } from "./lossMath";

const WIDTH = 480;
const HEIGHT = 240;
const P_DOMAIN: [number, number] = [0.02, 1];
const Y_DOMAIN: [number, number] = [0, 4];
const POINT_COUNT = 160;

const probabilities = Array.from(
  { length: POINT_COUNT },
  (_, index) => P_DOMAIN[0] + ((P_DOMAIN[1] - P_DOMAIN[0]) * index) / (POINT_COUNT - 1),
);

/** An interactive plot of binary cross-entropy loss as the predicted probability moves away from the true label of 1. */
export function BCEExplorer() {
  const [probability, setProbability] = useState(0.8);

  const xScale = scaleLinear().domain(P_DOMAIN).range([28, WIDTH - 12]);
  const yScale = scaleLinear().domain(Y_DOMAIN).range([HEIGHT - 20, 12]);
  const loss = bceForPositiveLabel(probability);

  return (
    <div className="flex flex-col gap-4">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full">
        <line x1={28} x2={WIDTH - 12} y1={yScale(0)} y2={yScale(0)} stroke={vizColors.border} strokeWidth={1} />
        <path
          d={
            d3Line<number>(
              (value) => xScale(value),
              (value) => yScale(Math.min(bceForPositiveLabel(value), Y_DOMAIN[1])),
            )(probabilities) ?? undefined
          }
          fill="none"
          stroke={vizColors.attention}
          strokeWidth={2}
        />
        <line
          x1={xScale(probability)}
          x2={xScale(probability)}
          y1={12}
          y2={HEIGHT - 20}
          stroke={vizColors.textMuted}
          strokeWidth={1}
          strokeDasharray="3 3"
        />
        <circle cx={xScale(probability)} cy={yScale(Math.min(loss, Y_DOMAIN[1]))} r={4} fill={vizColors.attention} />
      </svg>

      <input
        type="range"
        min={P_DOMAIN[0]}
        max={P_DOMAIN[1]}
        step={0.01}
        value={probability}
        onChange={(event) => setProbability(Number(event.target.value))}
        className="w-full accent-[var(--color-attention)]"
        aria-label="Predicted probability, true label is 1"
      />

      <p className="font-mono text-xs text-[var(--color-text-muted)]">
        predicted probability = {probability.toFixed(2)}, loss ={" "}
        <span style={{ color: "var(--color-attention)" }}>{loss.toFixed(2)}</span>
      </p>
    </div>
  );
}
