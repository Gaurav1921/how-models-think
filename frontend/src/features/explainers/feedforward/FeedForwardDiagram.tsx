import { interpolateRgb } from "d3";
import { vizColors } from "../../../viz-core/colors";

interface FeedForwardDiagramProps {
  stage: "narrow" | "wide" | "narrow-again";
}

const NARROW_VALUES = [0.8, 0.3, 0.6, 0.9, 0.2, 0.5, 0.7, 0.4];
const WIDE_VALUES = [0.9, 0, 0.4, 0.7, 0, 0.6, 0.3, 0.8, 0, 0.5, 0.2, 0.9, 0, 0.6, 0.4, 0.1];

const cellColor = interpolateRgb(vizColors.backgroundRaised, vizColors.value);

function VectorBars({ values }: { values: number[] }) {
  return (
    <div className="flex gap-0.5">
      {values.map((value, index) => (
        <div key={index} style={{ backgroundColor: cellColor(value) }} className="h-6 w-2 rounded-sm" />
      ))}
    </div>
  );
}

/** Shows a token's vector narrow, then expanded to a wider hidden layer, then narrow again. */
export function FeedForwardDiagram({ stage }: FeedForwardDiagramProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-xs text-[var(--color-text-muted)]">
        {stage === "narrow" && "input: d_model = 512 (shown here as 8)"}
        {stage === "wide" && "hidden layer: d_ff = 2048 (shown here as 16), non-linearity applied"}
        {stage === "narrow-again" && "output: back to d_model = 512 (shown here as 8)"}
      </span>
      <VectorBars values={stage === "wide" ? WIDE_VALUES : NARROW_VALUES} />
    </div>
  );
}
