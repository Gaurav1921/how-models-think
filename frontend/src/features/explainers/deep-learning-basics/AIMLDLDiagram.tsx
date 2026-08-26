import { vizColors } from "../../../viz-core/colors";

/** Nested boxes showing AI containing ML containing DL, with Data Science called out as cutting across all three instead of nesting. */
export function AIMLDLDiagram() {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border p-4" style={{ borderColor: vizColors.border }}>
        <span className="font-mono text-xs text-[var(--color-text-muted)]">Artificial Intelligence</span>
        <div className="mt-3 rounded-xl border p-4" style={{ borderColor: vizColors.query }}>
          <span className="font-mono text-xs" style={{ color: vizColors.query }}>
            Machine Learning
          </span>
          <div
            className="mt-3 rounded-lg border p-4"
            style={{ borderColor: vizColors.attention, backgroundColor: "rgba(239, 93, 168, 0.08)" }}
          >
            <span className="font-mono text-xs" style={{ color: vizColors.attention }}>
              Deep Learning
            </span>
          </div>
        </div>
      </div>
      <p className="font-mono text-xs text-[var(--color-text-muted)]">
        Data Science cuts across all three, it isn't nested inside them
      </p>
    </div>
  );
}
