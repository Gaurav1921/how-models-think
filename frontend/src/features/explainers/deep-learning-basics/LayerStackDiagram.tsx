import { vizColors } from "../../../viz-core/colors";

interface LayerStackDiagramProps {
  highlight: "flow" | "weights" | "loop";
}

const LAYERS = ["Input", "Layer 1", "Layer 2", "Output"];

/** A generic chain of layers, used to illustrate data flow, weights, and the training loop at a glance. */
export function LayerStackDiagram({ highlight }: LayerStackDiagramProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {LAYERS.map((label, index) => {
          const isWeighted = highlight === "weights" && index > 0;
          return (
            <div key={label} className="flex items-center gap-2">
              <div
                className="rounded-lg border px-3 py-2 font-mono text-xs"
                style={{
                  borderColor: isWeighted ? vizColors.value : vizColors.border,
                  color: isWeighted ? vizColors.value : vizColors.text,
                }}
              >
                {label}
              </div>
              {index < LAYERS.length - 1 && <span className="text-[var(--color-text-muted)]">-&gt;</span>}
            </div>
          );
        })}
      </div>
      {highlight === "loop" && (
        <p className="font-mono text-xs" style={{ color: vizColors.attention }}>
          &lt;- measure the error, adjust every weight a little, run it again -&gt;
        </p>
      )}
      {highlight === "weights" && (
        <p className="font-mono text-xs text-[var(--color-text-muted)]">
          every arrow between layers carries its own adjustable weight
        </p>
      )}
    </div>
  );
}
