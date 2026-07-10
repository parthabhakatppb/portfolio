"use client";
import dynamic from "next/dynamic";
import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";

// Lazy-load the heavy R3F scene — ssr: false is critical
const NeuralCore = dynamic(() => import("./NeuralCore"), { ssr: false });

function GradientFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="rounded-full"
        style={{
          width: "min(380px, 80vw)",
          height: "min(380px, 80vw)",
          background:
            "radial-gradient(circle at 40% 40%, oklch(75% 0.18 230 / 30%) 0%, oklch(65% 0.22 300 / 15%) 50%, transparent 70%)",
          filter: "blur(40px)",
          animation: "blob-drift-1 8s ease-in-out infinite alternate",
        }}
      />
    </div>
  );
}

interface SceneCanvasProps {
  className?: string;
}

export function SceneCanvas({ className = "" }: SceneCanvasProps) {
  const [use3D, setUse3D] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowEnd = navigator.hardwareConcurrency <= 4;
    if (!reducedMotion && !lowEnd) {
      setUse3D(true);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  return (
    <div
      ref={containerRef}
      className={`${className}`}
      onMouseMove={handleMouseMove}
      style={{ width: "100%", height: "100%" }}
    >
      {use3D ? (
        <Suspense fallback={<GradientFallback />}>
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 0, 5.5], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
          >
            <NeuralCore mouseX={mouse.x} mouseY={mouse.y} />
          </Canvas>
        </Suspense>
      ) : (
        <GradientFallback />
      )}
    </div>
  );
}
