import { useState } from "react";
import { vizColors } from "../../../viz-core/colors";

interface Point {
  x: number;
  y: number;
  classIndex: 0 | 1;
}

const WIDTH = 260;
const HEIGHT = 200;
const CENTER = { x: WIDTH / 2, y: HEIGHT / 2 };

const POINTS: Point[] = [
  { x: 60, y: 150, classIndex: 0 },
  { x: 90, y: 170, classIndex: 0 },
  { x: 50, y: 110, classIndex: 0 },
  { x: 110, y: 140, classIndex: 0 },
  { x: 170, y: 60, classIndex: 1 },
  { x: 200, y: 90, classIndex: 1 },
  { x: 150, y: 40, classIndex: 1 },
  { x: 210, y: 50, classIndex: 1 },
];

/** Lets the reader adjust a perceptron's weights (as an angle) and bias (as an offset) to find a line that separates the two classes themselves. */
export function PerceptronPlayground() {
  const [angleDeg, setAngleDeg] = useState(20);
  const [offset, setOffset] = useState(0);

  const theta = (angleDeg * Math.PI) / 180;
  const normal = { x: Math.cos(theta), y: Math.sin(theta) };

  function side(point: Point): number {
    return normal.x * (point.x - CENTER.x) + normal.y * (point.y - CENTER.y) - offset;
  }

  const w1 = normal.x;
  const w2 = normal.y;
  const bias = -offset - (normal.x * -CENTER.x + normal.y * -CENTER.y);

  const correctCount = POINTS.filter((point) => (side(point) >= 0 ? 1 : 0) === point.classIndex).length;

  const lineLength = 400;
  const dir = { x: -normal.y, y: normal.x };
  const linePoint = { x: CENTER.x + normal.x * offset, y: CENTER.y + normal.y * offset };
  const x1 = linePoint.x - dir.x * lineLength;
  const y1 = linePoint.y - dir.y * lineLength;
  const x2 = linePoint.x + dir.x * lineLength;
  const y2 = linePoint.y + dir.y * lineLength;

  return (
    <div className="flex flex-col gap-4">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full overflow-hidden rounded-lg border border-[var(--color-border)]">
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={vizColors.position} strokeWidth={2} />
        {POINTS.map((point, index) => {
          const predicted = side(point) >= 0 ? 1 : 0;
          const isCorrect = predicted === point.classIndex;
          return (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={7}
              fill={point.classIndex === 0 ? vizColors.query : vizColors.attention}
              stroke={isCorrect ? "none" : "#ffffff"}
              strokeWidth={isCorrect ? 0 : 2}
            />
          );
        })}
      </svg>

      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 font-mono text-xs text-[var(--color-text-muted)]">
          weight angle
          <input
            type="range"
            min={0}
            max={180}
            step={1}
            value={angleDeg}
            onChange={(event) => setAngleDeg(Number(event.target.value))}
            className="w-full accent-[var(--color-position)]"
          />
        </label>
        <label className="flex flex-col gap-1 font-mono text-xs text-[var(--color-text-muted)]">
          bias (line offset)
          <input
            type="range"
            min={-60}
            max={60}
            step={1}
            value={offset}
            onChange={(event) => setOffset(Number(event.target.value))}
            className="w-full accent-[var(--color-position)]"
          />
        </label>
      </div>

      <div className="flex items-center justify-between font-mono text-xs">
        <span className="text-[var(--color-text-muted)]">
          w1={w1.toFixed(2)}, w2={w2.toFixed(2)}, b={bias.toFixed(1)}
        </span>
        <span style={{ color: correctCount === POINTS.length ? "var(--color-value)" : "var(--color-text-muted)" }}>
          {correctCount}/{POINTS.length} correctly classified
        </span>
      </div>
    </div>
  );
}
