import { line as d3Line, scaleLinear } from "d3";
import { vizColors } from "../../../viz-core/colors";

const WIDTH = 480;
const HEIGHT = 200;
const MAX_POSITION = 50;
const MODEL_DIM = 64;
const CURVE_DIMENSION_PAIRS = [0, 4, 12, 28];
const CURVE_COLORS = [vizColors.position, vizColors.query, vizColors.key, vizColors.value];

function positionalEncodingCurve(dimensionPairIndex: number): number[] {
  const frequency = 1 / Math.pow(10000, (2 * dimensionPairIndex) / MODEL_DIM);
  return Array.from({ length: MAX_POSITION }, (_, position) => Math.sin(position * frequency));
}

/** Plots the sinusoidal positional encoding curves for a few embedding dimensions. */
export function PositionalWavePlot() {
  const xScale = scaleLinear().domain([0, MAX_POSITION - 1]).range([24, WIDTH - 12]);
  const yScale = scaleLinear().domain([-1, 1]).range([HEIGHT - 16, 16]);
  const lineGenerator = d3Line<number>((_, index) => xScale(index), (value) => yScale(value));

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full">
      <line
        x1={24}
        x2={WIDTH - 12}
        y1={yScale(0)}
        y2={yScale(0)}
        stroke={vizColors.border}
        strokeWidth={1}
      />
      {CURVE_DIMENSION_PAIRS.map((dimensionPairIndex, curveIndex) => (
        <path
          key={dimensionPairIndex}
          d={lineGenerator(positionalEncodingCurve(dimensionPairIndex)) ?? undefined}
          fill="none"
          stroke={CURVE_COLORS[curveIndex]}
          strokeWidth={2}
        />
      ))}
      <text x={24} y={HEIGHT - 2} className="fill-current text-[10px]" fill={vizColors.textMuted}>
        position 0
      </text>
      <text x={WIDTH - 70} y={HEIGHT - 2} className="fill-current text-[10px]" fill={vizColors.textMuted}>
        position {MAX_POSITION - 1}
      </text>
    </svg>
  );
}
