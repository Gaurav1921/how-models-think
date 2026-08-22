import { interpolateRgb } from "d3";
import { vizColors } from "../../../viz-core/colors";

interface GradientDecayBarsProps {
  stepCount: number;
  decayFactor: number;
}

const cellColor = interpolateRgb(vizColors.backgroundRaised, vizColors.attention);

/** Bars shrinking geometrically, standing in for how a gradient shrinks the further back through time it's propagated. */
export function GradientDecayBars({ stepCount, decayFactor }: GradientDecayBarsProps) {
  const magnitudes = Array.from({ length: stepCount }, (_, index) => decayFactor ** index);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end gap-2">
        {magnitudes.map((magnitude, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <div
              className="w-8 rounded-t-sm"
              style={{ height: `${Math.max(magnitude * 120, 3)}px`, backgroundColor: cellColor(magnitude) }}
            />
            <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
              {index === 0 ? "last step" : `-${index}`}
            </span>
          </div>
        ))}
      </div>
      <p className="font-mono text-xs text-[var(--color-text-muted)]">
        gradient magnitude reaching each earlier step
      </p>
    </div>
  );
}
