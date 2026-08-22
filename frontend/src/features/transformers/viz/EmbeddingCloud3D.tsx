import { Html } from "@react-three/drei";
import { Scene3D } from "../../../viz-core/Scene3D";
import { vizColors } from "../../../viz-core/colors";

interface EmbeddingPoint {
  label: string;
  position: [number, number, number];
  color: string;
  size: number;
}

const POINTS: EmbeddingPoint[] = [
  { label: "account", position: [1.6, 0.6, 0.1], color: vizColors.query, size: 0.08 },
  { label: "money", position: [1.9, 0.1, -0.2], color: vizColors.query, size: 0.08 },
  { label: "loan", position: [1.3, -0.3, 0.3], color: vizColors.query, size: 0.08 },
  { label: "river", position: [-1.7, -0.5, 0.2], color: vizColors.value, size: 0.08 },
  { label: "water", position: [-1.3, 0.2, -0.3], color: vizColors.value, size: 0.08 },
  { label: "shore", position: [-1.9, -0.1, 0.4], color: vizColors.value, size: 0.08 },
  { label: "bank", position: [0, 0, 0.2], color: vizColors.attention, size: 0.14 },
];

/** A rotating 3D point cloud showing "bank" sitting ambiguously between two clusters. */
export function EmbeddingCloud3D() {
  return (
    <Scene3D>
      {POINTS.map((point) => (
        <mesh key={point.label} position={point.position}>
          <sphereGeometry args={[point.size, 24, 24]} />
          <meshStandardMaterial color={point.color} />
          <Html distanceFactor={8}>
            <span className="whitespace-nowrap font-mono text-xs text-[var(--color-text)]">
              {point.label}
            </span>
          </Html>
        </mesh>
      ))}
    </Scene3D>
  );
}
