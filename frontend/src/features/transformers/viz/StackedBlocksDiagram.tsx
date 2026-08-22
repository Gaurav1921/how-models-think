import { vizColors } from "../../../viz-core/colors";

type Stage = "attention" | "addnorm" | "ffn";

interface StackedBlocksDiagramProps {
  blockCount: number;
  highlightStage: Stage | null;
}

const STAGE_LABELS: { stage: Stage; label: string }[] = [
  { stage: "attention", label: "Multi-head attention" },
  { stage: "addnorm", label: "Add & Norm" },
  { stage: "ffn", label: "Feedforward" },
  { stage: "addnorm", label: "Add & Norm" },
];

/** A vertical stack of transformer blocks, with one stage type highlightable across all blocks. */
export function StackedBlocksDiagram({ blockCount, highlightStage }: StackedBlocksDiagramProps) {
  return (
    <div className="flex flex-col-reverse gap-3">
      {Array.from({ length: blockCount }, (_, blockIndex) => (
        <div key={blockIndex} className="rounded-lg border border-[var(--color-border)] p-2">
          <div className="mb-1 text-xs text-[var(--color-text-muted)]">block {blockIndex + 1}</div>
          <div className="flex flex-col gap-1">
            {STAGE_LABELS.map((entry, rowIndex) => (
              <div
                key={rowIndex}
                className="rounded px-2 py-1 text-center font-mono text-xs transition-colors"
                style={{
                  backgroundColor:
                    highlightStage === entry.stage ? vizColors.attention : "transparent",
                  color: highlightStage === entry.stage ? "#0b0e14" : vizColors.textMuted,
                  border: `1px solid ${vizColors.border}`,
                }}
              >
                {entry.label}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
