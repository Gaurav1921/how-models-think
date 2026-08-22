import { vizColors } from "../../../viz-core/colors";

interface RNNChainDiagramProps {
  tokens: string[];
  activeIndex: number;
}

/** An unrolled RNN: each token's box feeds a hidden-state arrow into the next step. */
export function RNNChainDiagram({ tokens, activeIndex }: RNNChainDiagramProps) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto py-2">
      {tokens.map((token, index) => {
        const isActive = index === activeIndex;
        const isPast = index < activeIndex;
        return (
          <div key={token} className="flex items-center gap-1">
            {index > 0 && (
              <div className="flex flex-col items-center px-1">
                <span
                  className="font-mono text-[10px]"
                  style={{ color: isPast || isActive ? vizColors.position : vizColors.textMuted }}
                >
                  h{index}
                </span>
                <span style={{ color: isPast || isActive ? vizColors.position : vizColors.border }}>-&gt;</span>
              </div>
            )}
            <div
              className="flex flex-col items-center gap-1 rounded-lg border px-3 py-2 transition-colors"
              style={{
                borderColor: isActive ? vizColors.position : vizColors.border,
                backgroundColor: isActive ? "rgba(185, 140, 240, 0.12)" : "transparent",
              }}
            >
              <span className="font-mono text-sm">{token}</span>
              <span className="font-mono text-[10px] text-[var(--color-text-muted)]">step {index + 1}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
