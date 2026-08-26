import { useState } from "react";
import { interpolateRgb } from "d3";
import { vizColors } from "../../../viz-core/colors";

const cellColor = interpolateRgb(vizColors.backgroundRaised, vizColors.attention);

type Activation = "sigmoid" | "relu";

const DECAY_PER_LAYER: Record<Activation, number> = {
  sigmoid: 0.25,
  relu: 1,
};

/** Lets the reader pick a network depth and an activation function, and see how much gradient actually reaches the first layer. */
export function VanishingGradientExplorer() {
  const [depth, setDepth] = useState(6);
  const [activation, setActivation] = useState<Activation>("sigmoid");

  const decay = DECAY_PER_LAYER[activation];
  const magnitudes = Array.from({ length: depth }, (_, index) => decay ** index);
  const finalMagnitude = magnitudes[magnitudes.length - 1];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end gap-1.5 overflow-x-auto pb-1">
        {magnitudes.map((magnitude, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <div
              className="w-5 rounded-t-sm transition-all"
              style={{ height: `${Math.max(magnitude * 120, 3)}px`, backgroundColor: cellColor(magnitude) }}
            />
            <span className="font-mono text-[9px] text-[var(--color-text-muted)]">
              {index === 0 ? "out" : `-${index}`}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {(["sigmoid", "relu"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setActivation(option)}
            className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
              activation === option
                ? "border-[var(--color-text)] text-[var(--color-text)]"
                : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            {option === "sigmoid" ? "Sigmoid (max derivative 0.25)" : "ReLU (derivative 1)"}
          </button>
        ))}
      </div>

      <label className="flex flex-col gap-1 font-mono text-xs text-[var(--color-text-muted)]">
        network depth: {depth} layers
        <input
          type="range"
          min={1}
          max={20}
          step={1}
          value={depth}
          onChange={(event) => setDepth(Number(event.target.value))}
          className="w-full accent-[var(--color-attention)]"
        />
      </label>

      <p className="font-mono text-xs text-[var(--color-text-muted)]">
        gradient reaching the first layer: at most{" "}
        <span style={{ color: "var(--color-attention)" }}>{finalMagnitude.toExponential(2)}</span> of the
        original signal
      </p>
    </div>
  );
}
