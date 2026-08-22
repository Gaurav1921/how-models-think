import { motion } from "framer-motion";
import { vizColors } from "../../../viz-core/colors";

interface AttentionRowBarsProps {
  tokens: string[];
  values: number[];
  label: string;
  maskedIndices?: boolean[];
}

/** A horizontal bar chart showing one attention row's values at a given stage. */
export function AttentionRowBars({ tokens, values, label, maskedIndices }: AttentionRowBarsProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-[var(--color-text-muted)]">{label}</span>
      {tokens.map((token, index) => {
        const isMasked = maskedIndices?.[index] ?? false;
        return (
          <div key={token} className="flex items-center gap-3">
            <span className="w-10 shrink-0 font-mono text-xs text-[var(--color-text-muted)]">
              {token}
            </span>
            <div className="h-4 flex-1 overflow-hidden rounded bg-[var(--color-bg)]">
              {isMasked ? (
                <div
                  className="h-full w-full rounded"
                  style={{
                    backgroundImage: `repeating-linear-gradient(45deg, ${vizColors.border} 0, ${vizColors.border} 4px, transparent 4px, transparent 8px)`,
                  }}
                />
              ) : (
                <motion.div
                  className="h-full rounded"
                  style={{ backgroundColor: vizColors.attention }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(0, values[index]) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              )}
            </div>
            <span className="w-14 shrink-0 text-right font-mono text-xs text-[var(--color-text-muted)]">
              {isMasked ? "masked" : values[index].toFixed(2)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
