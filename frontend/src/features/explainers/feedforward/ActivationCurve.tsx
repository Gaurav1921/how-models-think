import { line as d3Line, scaleLinear } from "d3";
import { vizColors } from "../../../viz-core/colors";
import { gelu, relu } from "../activation-functions/activationMath";

const WIDTH = 480;
const HEIGHT = 200;
const DOMAIN = 6;
const POINT_COUNT = 120;

const xs = Array.from({ length: POINT_COUNT }, (_, index) => -DOMAIN + (2 * DOMAIN * index) / (POINT_COUNT - 1));

interface ActivationCurveProps {
  highlight: "relu" | "gelu";
}

/** Plots ReLU and GELU side by side, showing why a non-linearity bends the line instead of leaving it straight. */
export function ActivationCurve({ highlight }: ActivationCurveProps) {
  const xScale = scaleLinear().domain([-DOMAIN, DOMAIN]).range([16, WIDTH - 16]);
  const yScale = scaleLinear().domain([-1, DOMAIN]).range([HEIGHT - 16, 16]);
  const lineGenerator = d3Line<number>((x) => xScale(x), (x) => yScale(highlight === "relu" ? relu(x) : gelu(x)));

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full">
      <line x1={16} x2={WIDTH - 16} y1={yScale(0)} y2={yScale(0)} stroke={vizColors.border} strokeWidth={1} />
      <line x1={xScale(0)} x2={xScale(0)} y1={16} y2={HEIGHT - 16} stroke={vizColors.border} strokeWidth={1} />
      <path
        d={lineGenerator(xs) ?? undefined}
        fill="none"
        stroke={highlight === "relu" ? vizColors.key : vizColors.value}
        strokeWidth={2.5}
      />
      <text x={20} y={28} className="fill-current text-[10px]" fill={vizColors.textMuted}>
        {highlight === "relu" ? "ReLU: max(0, x)" : "GELU: smoothed ReLU"}
      </text>
    </svg>
  );
}
