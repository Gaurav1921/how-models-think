import { interpolateRgb } from "d3";
import { Fragment, useState } from "react";
import { vizColors } from "../../../viz-core/colors";

interface AttentionMatrixProps {
  tokens: string[];
  weights: number[][];
  causal?: boolean;
}

const cellColor = interpolateRgb(vizColors.backgroundRaised, vizColors.attention);
const maskedCellStyle = {
  backgroundImage: `repeating-linear-gradient(45deg, ${vizColors.border} 0, ${vizColors.border} 3px, transparent 3px, transparent 6px)`,
};
const cellSize = 44;

/**
 * An interactive attention-weight grid: cell (i, j) shows how much token i
 * attends to token j. When `causal`, cells above the diagonal (j > i) are
 * structurally masked, not just low-weight, since a token predicting the
 * next word can never attend to a token that comes after it.
 */
export function AttentionMatrix({ tokens, weights, causal = false }: AttentionMatrixProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const n = tokens.length;

  return (
    <div className="flex flex-col gap-4">
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `auto repeat(${n}, ${cellSize}px)` }}
      >
        <div />
        {tokens.map((token, columnIndex) => (
          <div
            key={`col-${columnIndex}`}
            className="flex items-end justify-center pb-1 font-mono text-xs text-[var(--color-text-muted)]"
          >
            {token}
          </div>
        ))}

        {tokens.map((rowToken, rowIndex) => (
          <Fragment key={`row-${rowIndex}`}>
            <div className="flex items-center justify-end pr-2 font-mono text-xs text-[var(--color-text-muted)]">
              {rowToken}
            </div>
            {weights[rowIndex].map((weight, columnIndex) => {
              const isMasked = causal && columnIndex > rowIndex;
              return (
                <div
                  key={`cell-${rowIndex}-${columnIndex}`}
                  onMouseEnter={() => setHoveredRow(rowIndex)}
                  onMouseLeave={() => setHoveredRow(null)}
                  title={
                    isMasked
                      ? `${rowToken} cannot attend to ${tokens[columnIndex]}: it comes later`
                      : `${rowToken} -> ${tokens[columnIndex]}: ${weight.toFixed(2)}`
                  }
                  style={{
                    width: cellSize,
                    height: cellSize,
                    ...(isMasked ? maskedCellStyle : { backgroundColor: cellColor(weight) }),
                    opacity: hoveredRow === null || hoveredRow === rowIndex ? 1 : 0.25,
                  }}
                  className="flex items-center justify-center rounded-sm font-mono text-[10px] text-[var(--color-text)] transition-opacity"
                >
                  {!isMasked && weight >= 0.1 ? weight.toFixed(1) : ""}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
      <p className="text-xs text-[var(--color-text-muted)]">
        {causal
          ? "Each row sums to 1 over its unmasked cells: the probability distribution one token uses to gather information from itself and earlier tokens. The hatched upper triangle is structurally blocked, not just low-weight: a token can never attend to one that comes after it. Hover a row to isolate it."
          : "Each row sums to 1: it is the probability distribution one token uses to gather information from every other token. Hover a row to isolate it."}
      </p>
    </div>
  );
}
