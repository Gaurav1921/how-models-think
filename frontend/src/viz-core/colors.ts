/** Shared color tokens for visualizations, kept in sync with index.css theme colors. */

export const vizColors = {
  background: "#0b0e14",
  backgroundRaised: "#11151f",
  border: "#232838",
  text: "#e7e9ee",
  textMuted: "#9aa1b4",
  query: "#5ec8f8",
  key: "#f8b95e",
  value: "#7ef2b0",
  attention: "#ef5da8",
  position: "#b98cf0",
} as const;

export type VizColorName = keyof typeof vizColors;
