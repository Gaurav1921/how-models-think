import { motion } from "framer-motion";
import { interpolateRgb } from "d3";
import { hashTokenToVector } from "../embeddingHash";
import { vizColors } from "../../../viz-core/colors";

interface TokenFlowDiagramProps {
  tokens: string[];
  stage: "sentence" | "chips" | "vectors";
  vectorLength?: number;
}

const cellColor = interpolateRgb(vizColors.backgroundRaised, vizColors.query);

/** Shows a sentence splitting into token chips and, optionally, embedding vectors. */
export function TokenFlowDiagram({ tokens, stage, vectorLength = 8 }: TokenFlowDiagramProps) {
  if (stage === "sentence") {
    return (
      <p className="font-serif text-2xl">
        {tokens.join(" ")}
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 sm:gap-5">
      {tokens.map((token) => (
        <motion.div
          key={token}
          layout
          className="flex flex-col items-center gap-3 rounded-lg border border-[var(--color-border)] px-4 py-3"
        >
          <span className="font-mono text-sm">{token}</span>
          {stage === "vectors" && (
            <div className="flex gap-1">
              {hashTokenToVector(token, vectorLength).map((value, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: cellColor(value) }}
                  className="h-6 w-2 rounded-sm"
                />
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
