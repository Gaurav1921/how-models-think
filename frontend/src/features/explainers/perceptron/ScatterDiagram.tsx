import { vizColors } from "../../../viz-core/colors";

interface Point {
  x: number;
  y: number;
  classIndex: 0 | 1;
}

interface ScatterDiagramProps {
  points: Point[];
  showLine?: boolean;
  impossible?: boolean;
}

const WIDTH = 260;
const HEIGHT = 200;

/** A small scatter plot, with an optional separating line, illustrating what a perceptron can and can't classify. */
export function ScatterDiagram({ points, showLine, impossible }: ScatterDiagramProps) {
  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full">
      {showLine && (
        <line
          x1={20}
          y1={HEIGHT - 20}
          x2={WIDTH - 20}
          y2={20}
          stroke={vizColors.position}
          strokeWidth={2}
        />
      )}
      {points.map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={7}
          fill={point.classIndex === 0 ? vizColors.query : vizColors.attention}
        />
      ))}
      {impossible && (
        <text
          x={WIDTH / 2}
          y={HEIGHT - 10}
          textAnchor="middle"
          fontSize={11}
          fill={vizColors.textMuted}
          fontFamily="var(--font-mono)"
        >
          no straight line separates these
        </text>
      )}
    </svg>
  );
}
