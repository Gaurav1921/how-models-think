import { vizColors } from "../../../viz-core/colors";

const HEAD_COUNT = 8;
const HEAD_DIM = 64;
const MODEL_DIM = HEAD_COUNT * HEAD_DIM;

const HEAD_COLORS = [
  vizColors.query,
  vizColors.key,
  vizColors.value,
  vizColors.attention,
  vizColors.position,
  "#facc15",
  "#2dd4bf",
  "#fb7185",
];

/** Shows the real 512-dimensional model vector split into 8 heads of 64 dimensions each, to scale. */
export function DimensionSplitDiagram() {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <span className="font-mono text-xs text-[var(--color-text-muted)]">
          one token's vector, d_model = {MODEL_DIM}
        </span>
        <div className="mt-1 h-6 w-full rounded-sm" style={{ backgroundColor: vizColors.border }} />
      </div>
      <div>
        <span className="font-mono text-xs text-[var(--color-text-muted)]">
          split across {HEAD_COUNT} heads, d_k = {HEAD_DIM} each
        </span>
        <div className="mt-1 flex h-8 w-full gap-0.5">
          {HEAD_COLORS.map((color, index) => (
            <div
              key={index}
              className="flex flex-1 items-center justify-center rounded-sm font-mono text-[10px] font-medium text-black/70"
              style={{ backgroundColor: color }}
              title={`head ${index + 1}`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
