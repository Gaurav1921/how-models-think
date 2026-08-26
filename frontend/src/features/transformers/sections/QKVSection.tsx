import { hashTokenToVector, projectKey, projectQuery, projectValue } from "../embeddingHash";
import { VectorArrow } from "../viz/VectorArrow";
import { ScrollSection } from "../../../viz-core/ScrollSection";
import { vizColors } from "../../../viz-core/colors";

const EXAMPLE_TOKENS = ["cat", "sat"];

const STEPS = [
  "Every token's embedding produces three new vectors: a Query (what this token is looking for), a Key (what this token contains), and a Value (what it offers if attended to).",
  "Each is produced by multiplying the embedding by its own learned weight matrix, the same three matrices reused for every token in the sequence.",
  "The Query and Key vectors are what get compared to decide attention weights. The Value vector is what actually gets passed forward once those weights are set.",
];

const LEGEND: Array<{ label: string; color: string }> = [
  { label: "Query", color: vizColors.query },
  { label: "Key", color: vizColors.key },
  { label: "Value", color: vizColors.value },
];

function Legend() {
  return (
    <div className="flex flex-wrap gap-4">
      {LEGEND.map(({ label, color }) => (
        <div key={label} className="flex items-center gap-1.5 font-mono text-xs" style={{ color }}>
          <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: color }} />
          {label}
        </div>
      ))}
    </div>
  );
}

/** Section 4: the Query, Key, Value projections. */
export function QKVSection() {
  return (
    <ScrollSection
      index={4}
      title="Query, Key, Value"
      math="Q = XW_Q, \quad K = XW_K, \quad V = XW_V"
      caption="Each small bar is one dimension of the vector on that side. Bar color fades toward black as that dimension's value drops toward 0, so a vector with several low values can look like it has fewer bars than one with high values everywhere. It doesn't, every vector here has the same 8 dimensions; a dark bar is still a bar, just a small number."
      steps={STEPS}
      renderGraphic={() => (
        <div className="flex flex-col gap-4">
          <Legend />
          {EXAMPLE_TOKENS.map((token) => {
            const embedding = hashTokenToVector(token, 8);
            return (
              <div key={token} className="flex flex-col gap-1">
                <span className="font-mono text-xs text-[var(--color-text-muted)]">{token}</span>
                <VectorArrow fromVector={embedding} toVector={projectQuery(embedding)} toColor={vizColors.query} label="W_Q" />
                <VectorArrow fromVector={embedding} toVector={projectKey(embedding)} toColor={vizColors.key} label="W_K" />
                <VectorArrow fromVector={embedding} toVector={projectValue(embedding)} toColor={vizColors.value} label="W_V" />
              </div>
            );
          })}
        </div>
      )}
    />
  );
}
