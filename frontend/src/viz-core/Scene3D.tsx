import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { ReactNode } from "react";

interface Scene3DProps {
  children: ReactNode;
  height?: number;
}

/** Shared wrapper for a Three.js scene: default camera, lighting, and orbit controls. */
export function Scene3D({ children, height = 360 }: Scene3DProps) {
  return (
    <div style={{ height }} className="overflow-hidden rounded-lg">
      <Canvas camera={{ position: [3.5, 2.5, 4], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={40} />
        {children}
        <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
    </div>
  );
}
