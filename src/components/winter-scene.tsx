"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * "Winter is coming. And we're bringing the fire."
 * Soft snow drifting down, lime/amber embers rising through it — kept light and airy.
 */
/** Small seeded PRNG so particle layouts are deterministic (and render stays pure). */
function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Particles({ count, color, size, rise, spread = 14, seed }: { count: number; color: string; size: number; rise: boolean; spread?: number; seed: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const rand = seeded(seed);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * spread;
      positions[i * 3 + 1] = (rand() - 0.5) * 9;
      positions[i * 3 + 2] = (rand() - 0.5) * 6;
      speeds[i] = 0.25 + rand() * 0.6;
    }
    return { positions, speeds };
  }, [count, spread, seed]);

  const sprite = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d")!;
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, "rgba(255,255,255,1)");
    grd.addColorStop(0.4, "rgba(255,255,255,0.8)");
    grd.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }, []);

  useFrame((state, dt) => {
    const p = ref.current!.geometry.attributes.position as THREE.BufferAttribute;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const dir = rise ? 1 : -1;
      let y = p.getY(i) + dir * speeds[i] * dt * (rise ? 0.9 : 0.6);
      if (y > 4.5) y = -4.5;
      if (y < -4.5) y = 4.5;
      p.setY(i, y);
      p.setX(i, p.getX(i) + Math.sin(t * 0.6 + i) * dt * 0.08);
    }
    p.needsUpdate = true;
    // gentle parallax towards the pointer
    ref.current!.rotation.y += (state.pointer.x * 0.12 - ref.current!.rotation.y) * 0.03;
    ref.current!.rotation.x += (-state.pointer.y * 0.06 - ref.current!.rotation.x) * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial map={sprite} color={color} size={size} transparent depthWrite={false} sizeAttenuation opacity={0.9} />
    </points>
  );
}

export default function WinterScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <Particles seed={1} count={420} color="#9fcfff" size={0.09} rise={false} />
      <Particles seed={2} count={140} color="#ffffff" size={0.16} rise={false} spread={12} />
      <Particles seed={3} count={70} color="#f59e4a" size={0.11} rise />
      <Particles seed={4} count={50} color="#9af000" size={0.1} rise />
    </Canvas>
  );
}
