import { interpolateRgb } from "d3";

interface VectorArrowProps {
  fromVector: number[];
  toVector: number[];
  toColor: string;
  label: string;
}

const fromColor = interpolateRgb("#11151f", "#6b7280");

/** Shows a vector flowing through a labeled weight matrix into a new, differently-colored vector. */
export function VectorArrow({ fromVector, toVector, toColor, label }: VectorArrowProps) {
  const toColorScale = interpolateRgb("#11151f", toColor);

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-0.5">
        {fromVector.map((value, index) => (
          <div key={index} style={{ backgroundColor: fromColor(value) }} className="h-6 w-2 rounded-sm" />
        ))}
      </div>
      <div className="flex items-center gap-1 font-mono text-xs" style={{ color: toColor }}>
        <span>-&gt;</span>
        <span className="rounded border px-1.5 py-0.5" style={{ borderColor: toColor }}>
          {label}
        </span>
        <span>-&gt;</span>
      </div>
      <div className="flex gap-0.5">
        {toVector.map((value, index) => (
          <div key={index} style={{ backgroundColor: toColorScale(value) }} className="h-6 w-2 rounded-sm" />
        ))}
      </div>
    </div>
  );
}
