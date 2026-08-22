import { line as d3Line, scaleLinear } from "d3";
import { vizColors } from "../../../viz-core/colors";

const WIDTH = 480;
const HEIGHT = 200;
const STEPS_ON_CURVE = 60;

const LOSS_CURVE = Array.from({ length: STEPS_ON_CURVE }, (_, step) => {
  const t = step / (STEPS_ON_CURVE - 1);
  return 0.15 + 0.85 * Math.exp(-4 * t);
});

interface LossDescentPlotProps {
  progress: number;
}

/** A stylized loss-over-training curve with a marker showing current progress. */
export function LossDescentPlot({ progress }: LossDescentPlotProps) {
  const xScale = scaleLinear().domain([0, STEPS_ON_CURVE - 1]).range([24, WIDTH - 12]);
  const yScale = scaleLinear().domain([0, 1]).range([HEIGHT - 16, 16]);
  const lineGenerator = d3Line<number>((_, index) => xScale(index), (value) => yScale(value));

  const markerIndex = Math.round(progress * (STEPS_ON_CURVE - 1));
  const markerX = xScale(markerIndex);
  const markerY = yScale(LOSS_CURVE[markerIndex]);

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full">
      <path d={lineGenerator(LOSS_CURVE) ?? undefined} fill="none" stroke={vizColors.border} strokeWidth={2} />
      <path
        d={lineGenerator(LOSS_CURVE.slice(0, markerIndex + 1)) ?? undefined}
        fill="none"
        stroke={vizColors.attention}
        strokeWidth={2.5}
      />
      <circle cx={markerX} cy={markerY} r={5} fill={vizColors.attention} />
      <text x={24} y={HEIGHT - 2} className="fill-current text-[10px]" fill={vizColors.textMuted}>
        training step 0
      </text>
      <text x={WIDTH - 90} y={HEIGHT - 2} className="fill-current text-[10px]" fill={vizColors.textMuted}>
        training step N
      </text>
      <text x={4} y={20} className="fill-current text-[10px]" fill={vizColors.textMuted}>
        loss
      </text>
    </svg>
  );
}
