import { interpolateRgb } from "d3";
import { vizColors } from "../../../viz-core/colors";

const RAW_VALUES = [8.2, -3.1, 0.4, 5.9, -6.7, 2.1, -1.4, 9.6];

function mean(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function normalize(values: number[]): number[] {
  const m = mean(values);
  const variance = mean(values.map((value) => (value - m) ** 2));
  const std = Math.sqrt(variance + 1e-5);
  return values.map((value) => (value - m) / std);
}

const NORMALIZED_VALUES = normalize(RAW_VALUES);

const rawColor = interpolateRgb(vizColors.backgroundRaised, vizColors.key);
const normColor = interpolateRgb(vizColors.backgroundRaised, vizColors.value);

function Row({ label, values, colorScale, domain }: { label: string; values: number[]; colorScale: (t: number) => string; domain: [number, number] }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-xs text-[var(--color-text-muted)]">{label}</span>
      <div className="flex gap-1">
        {values.map((value, index) => {
          const t = (value - domain[0]) / (domain[1] - domain[0]);
          return (
            <div key={index} className="flex flex-col items-center gap-1">
              <div className="h-8 w-5 rounded-sm" style={{ backgroundColor: colorScale(t) }} />
              <span className="font-mono text-[9px] text-[var(--color-text-muted)]">{value.toFixed(1)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Shows one token's vector before and after LayerNorm: same shape, rescaled to mean 0 and unit variance. */
export function LayerNormDemo() {
  const rawMean = mean(RAW_VALUES);
  const normMean = mean(NORMALIZED_VALUES);

  return (
    <div className="flex flex-col gap-4">
      <Row label="before LayerNorm" values={RAW_VALUES} colorScale={rawColor} domain={[-8, 10]} />
      <Row label="after LayerNorm" values={NORMALIZED_VALUES} colorScale={normColor} domain={[-2, 2]} />
      <p className="font-mono text-xs text-[var(--color-text-muted)]">
        mean {rawMean.toFixed(2)}, wide spread -&gt; mean {normMean.toFixed(2)}, unit variance
      </p>
    </div>
  );
}
