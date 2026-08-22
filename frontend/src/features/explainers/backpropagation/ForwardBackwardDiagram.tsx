import { vizColors } from "../../../viz-core/colors";

interface ForwardBackwardDiagramProps {
  direction: "forward" | "backward";
}

const NODES = ["input", "hidden", "output", "loss"];

/** A tiny 4-node network with arrows drawn in either the forward or backward direction. */
export function ForwardBackwardDiagram({ direction }: ForwardBackwardDiagramProps) {
  const orderedNodes = direction === "forward" ? NODES : [...NODES].reverse();
  const color = direction === "forward" ? vizColors.query : vizColors.attention;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 overflow-x-auto">
        {orderedNodes.map((node, index) => (
          <div key={node} className="flex items-center gap-2">
            <div
              className="rounded-lg border px-3 py-2 font-mono text-xs"
              style={{ borderColor: color, color }}
            >
              {node}
            </div>
            {index < orderedNodes.length - 1 && (
              <span style={{ color }} className="text-lg">
                -&gt;
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="font-mono text-xs text-[var(--color-text-muted)]">
        {direction === "forward"
          ? "data flows input to loss: this is how a prediction gets made"
          : "the error signal flows loss back to input: this is how each weight's blame gets computed"}
      </p>
    </div>
  );
}
