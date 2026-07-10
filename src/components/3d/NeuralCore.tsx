"use client";
import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Line, Instance, Instances } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import * as THREE from "three";

// ── Generate node positions on an icosphere-like distribution ──
function fibonacci_sphere(n: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    points.push(
      new THREE.Vector3(
        Math.cos(theta) * r * radius,
        y * radius,
        Math.sin(theta) * r * radius
      )
    );
  }
  return points;
}

// ── Node colors based on Y position ──
function nodeColor(y: number, radius: number): THREE.Color {
  const t = (y + radius) / (2 * radius); // 0 = bottom (violet), 1 = top (electric blue)
  const electric = new THREE.Color(0x38bdf8);
  const violet = new THREE.Color(0xa855f7);
  return new THREE.Color().lerpColors(violet, electric, t);
}

// ── Edge pairs (connect nearby nodes) ──
function buildEdges(
  nodes: THREE.Vector3[],
  maxDist: number
): [number, number][] {
  const edges: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].distanceTo(nodes[j]) < maxDist) {
        edges.push([i, j]);
        if (edges.length > 350) return edges; // cap edge count
      }
    }
  }
  return edges;
}

const NODE_COUNT = 220;
const RADIUS = 2.2;
const MAX_EDGE_DIST = 0.85;

function NeuralCoreScene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const pulseRef = useRef(0);

  const nodes = useMemo(() => fibonacci_sphere(NODE_COUNT, RADIUS), []);
  const edges = useMemo(() => buildEdges(nodes, MAX_EDGE_DIST), [nodes]);
  const colors = useMemo(() => nodes.map((n) => nodeColor(n.y, RADIUS)), [nodes]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    pulseRef.current += delta;
    // Idle rotation
    groupRef.current.rotation.y += delta * 0.08;
    // Mouse-reactive tilt — lerp toward normalized mouse
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseY * 0.35,
      0.05
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -mouseX * 0.15,
      0.05
    );
  });

  return (
    <group ref={groupRef}>
      {/* Instanced node spheres */}
      <Instances limit={NODE_COUNT}>
        <sphereGeometry args={[0.028, 8, 8]} />
        <meshStandardMaterial
          emissive={new THREE.Color(0x38bdf8)}
          emissiveIntensity={1.2}
          color={new THREE.Color(0x1e3a5f)}
          roughness={0.2}
          metalness={0.8}
        />
        {nodes.map((pos, i) => (
          <Instance
            key={i}
            position={pos}
            color={colors[i]}
          />
        ))}
      </Instances>

      {/* Edges */}
      {edges.map(([a, b], i) => {
        const pulse = Math.sin(pulseRef.current * 1.5 + i * 0.3);
        const intensity = 0.3 + Math.max(0, pulse) * 0.7;
        return (
          <Line
            key={i}
            points={[nodes[a], nodes[b]]}
            color={new THREE.Color(0x38bdf8)}
            lineWidth={0.4}
            transparent
            opacity={intensity * 0.35}
          />
        );
      })}

      {/* Ambient point lights */}
      <pointLight position={[3, 3, 3]} color={0x38bdf8} intensity={2} />
      <pointLight position={[-3, -2, -3]} color={0xa855f7} intensity={1.5} />
      <ambientLight intensity={0.1} />
    </group>
  );
}

export default function NeuralCore({ mouseX = 0, mouseY = 0 }: { mouseX?: number; mouseY?: number }) {
  return (
    <>
      <NeuralCoreScene mouseX={mouseX} mouseY={mouseY} />
      <EffectComposer>
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.1} darkness={0.7} />
        <Noise opacity={0.025} />
      </EffectComposer>
    </>
  );
}
