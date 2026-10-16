"use client";

import { ContactShadows, Float, PresentationControls, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { useReducedMotionPreference } from "@/hooks/use-hydrated";
import { withBasePath } from "@/lib/site";

type Product3DConfig = {
  name: string;
  kind: "bottle" | "tub";
  labelTexture: string;
  fallbackImage: string;
  capColor: string;
  ridgeColor: string;
  accentColor: string;
};

const product3DConfigs: Record<string, Product3DConfig> = {
  "magnesium-bisglycinate-60-gelules": {
    name: "Magnésium Bisglycinate",
    kind: "bottle",
    labelTexture: withBasePath("/images/magnesium-label-wrap-v2.svg"),
    fallbackImage: withBasePath("/images/magnesium-packshot-v2.png"),
    capColor: "#173e36",
    ridgeColor: "#2a5147",
    accentColor: "#c2a16a",
  },
  "vitamine-d3-60-capsules": {
    name: "Vitamine D3",
    kind: "bottle",
    labelTexture: withBasePath("/images/vitamin-d3-label-wrap-v2.svg"),
    fallbackImage: withBasePath("/images/vitamin-d3-packshot-v2.png"),
    capColor: "#66513b",
    ridgeColor: "#7b674f",
    accentColor: "#173e36",
  },
  "omega-3-marin-60-capsules": {
    name: "Oméga-3 Marin",
    kind: "bottle",
    labelTexture: withBasePath("/images/omega-3-label-wrap-v2.svg"),
    fallbackImage: withBasePath("/images/omega-3-packshot-v2.png"),
    capColor: "#1f5d63",
    ridgeColor: "#31737a",
    accentColor: "#c2a16a",
  },
  "complexe-beaute-30-gelules": {
    name: "Complexe Beauté",
    kind: "bottle",
    labelTexture: withBasePath("/images/beauty-label-wrap-v2.svg"),
    fallbackImage: withBasePath("/images/beauty-packshot-v2.png"),
    capColor: "#593b41",
    ridgeColor: "#785058",
    accentColor: "#c2a16a",
  },
  "multivitamines-60-gelules": {
    name: "Multivitamines",
    kind: "bottle",
    labelTexture: withBasePath("/images/multivitamins-label-wrap-v2.svg"),
    fallbackImage: withBasePath("/images/multivitamins-packshot-v2.png"),
    capColor: "#35412d",
    ridgeColor: "#536048",
    accentColor: "#c2a16a",
  },
  "proteines-vegetales-vanille": {
    name: "Protéines Végétales",
    kind: "tub",
    labelTexture: withBasePath("/images/protein-label-wrap-v2.svg"),
    fallbackImage: withBasePath("/images/protein-packshot-v2.png"),
    capColor: "#173e36",
    ridgeColor: "#31594e",
    accentColor: "#c2a16a",
  },
};

const defaultProduct3D = product3DConfigs["magnesium-bisglycinate-60-gelules"];

function ProductModel({ config, reducedMotion }: { config: Product3DConfig; reducedMotion: boolean }) {
  const bottle = useRef<THREE.Group>(null);
  const labelTexture = useTexture(config.labelTexture);
  const isTub = config.kind === "tub";
  const profile = useMemo(() => isTub ? [
    new THREE.Vector2(0, -1.34),
    new THREE.Vector2(0.84, -1.34),
    new THREE.Vector2(0.95, -1.29),
    new THREE.Vector2(1, -1.16),
    new THREE.Vector2(1.01, 0.96),
    new THREE.Vector2(0.98, 1.07),
    new THREE.Vector2(0.91, 1.15),
    new THREE.Vector2(0, 1.15),
  ] : [
    new THREE.Vector2(0, -1.54),
    new THREE.Vector2(0.59, -1.54),
    new THREE.Vector2(0.7, -1.48),
    new THREE.Vector2(0.77, -1.35),
    new THREE.Vector2(0.79, -1.17),
    new THREE.Vector2(0.79, 0.78),
    new THREE.Vector2(0.77, 0.96),
    new THREE.Vector2(0.69, 1.12),
    new THREE.Vector2(0.56, 1.27),
    new THREE.Vector2(0.52, 1.35),
    new THREE.Vector2(0.52, 1.43),
    new THREE.Vector2(0, 1.43),
  ], [isTub]);

  const labelRadius = isTub ? 1.015 : 0.795;
  const labelHeight = isTub ? 1.74 : 1.63;
  const labelY = isTub ? -0.18 : -0.18;
  const neckRadius = isTub ? 0.91 : 0.56;
  const neckY = isTub ? 1.1 : 1.33;
  const capRadius = isTub ? 1.035 : 0.62;
  const capY = isTub ? 1.34 : 1.59;
  const capHeight = isTub ? 0.45 : 0.5;
  const ridgeCount = isTub ? 52 : 36;
  const ridgeHeight = isTub ? 0.35 : 0.39;
  const ringRadius = isTub ? 0.94 : 0.57;
  const ringY = isTub ? 1.12 : 1.36;

  useFrame((state) => {
    if (!bottle.current || reducedMotion) return;
    bottle.current.rotation.y = -0.12 + Math.sin(state.clock.elapsedTime * 0.35) * 0.055;
    bottle.current.position.y = Math.sin(state.clock.elapsedTime * 0.65) * 0.035;
  });

  return (
    <group ref={bottle} rotation={[0.025, -0.12, -0.018]} scale={isTub ? 0.98 : 0.93}>
      <mesh castShadow receiveShadow>
        <latheGeometry args={[profile, 96]} />
        <meshPhysicalMaterial color="#f8f7f2" roughness={0.3} metalness={0.01} clearcoat={0.48} clearcoatRoughness={0.3} />
      </mesh>

      <mesh position={[0, labelY, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[labelRadius, labelRadius, labelHeight, 96, 1, true]} />
        <meshPhysicalMaterial map={labelTexture} roughness={0.5} clearcoat={0.08} clearcoatRoughness={0.58} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[0, neckY, 0]} castShadow>
        <cylinderGeometry args={[neckRadius, neckRadius, 0.19, 64]} />
        <meshPhysicalMaterial color="#f5f3ed" roughness={0.32} clearcoat={0.36} />
      </mesh>

      <mesh position={[0, capY, 0]} castShadow>
        <cylinderGeometry args={[capRadius, capRadius, capHeight, 96]} />
        <meshPhysicalMaterial color={config.capColor} roughness={0.34} metalness={0.02} clearcoat={0.24} clearcoatRoughness={0.44} />
      </mesh>

      {Array.from({ length: ridgeCount }).map((_, index) => {
        const angle = (index / ridgeCount) * Math.PI * 2;
        return <mesh key={index} position={[Math.sin(angle) * (capRadius + 0.005), capY, Math.cos(angle) * (capRadius + 0.005)]} rotation={[0, angle, 0]} castShadow>
          <boxGeometry args={[0.025, ridgeHeight, 0.026]} />
          <meshStandardMaterial color={config.ridgeColor} roughness={0.45} />
        </mesh>
      })}

      <mesh position={[0, ringY, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[ringRadius, 0.035, 16, 96]} />
        <meshStandardMaterial color={config.accentColor} metalness={0.62} roughness={0.32} />
      </mesh>
    </group>
  );
}

export function Product3DViewer({ className, interactive = true, productSlug, productName, fallbackImage }: { className?: string; interactive?: boolean; productSlug?: string; productName?: string; fallbackImage?: string }) {
  const holder = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const reducedMotion = useReducedMotionPreference();
  const [webgl, setWebgl] = useState(true);
  const config = product3DConfigs[productSlug || ""] || defaultProduct3D;
  const accessibleName = productName || config.name;

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const canvas = document.createElement("canvas");
        setWebgl(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")));
      } catch {
        setWebgl(false);
      }
    });
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { rootMargin: "150px" });
    if (holder.current) observer.observe(holder.current);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={holder} className={cn("relative overflow-hidden", className)} aria-label={`Visualiseur 3D interactif de ${accessibleName}`}>
      {!webgl ? <Image src={fallbackImage || config.fallbackImage} alt={`Produit NŪRIA ${accessibleName}`} fill className="object-contain" /> : <>
        <Canvas shadows="basic" camera={{ position: [0, 0.34, 6.45], fov: 34 }} dpr={[1, 1.65]} frameloop={active ? "always" : "never"} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
          <ambientLight intensity={1.25} />
          <hemisphereLight args={["#fffaf0", "#9fb2a4", 1.6]} />
          <directionalLight position={[4, 6, 5]} intensity={3.1} castShadow shadow-mapSize={[1024, 1024]} />
          <directionalLight position={[-3, 1, 3]} intensity={1.15} color="#dde7d8" />
          <spotLight position={[0, 5, -3]} intensity={1.4} color="#c2a16a" angle={0.48} penumbra={0.8} />
          <PresentationControls enabled={interactive} global={false} cursor zoom={0.94} rotation={[0, 0, 0]} polar={[-0.14, 0.14]} azimuth={[-0.75, 0.75]}>
            <Float speed={reducedMotion ? 0 : 0.8} rotationIntensity={reducedMotion ? 0 : 0.025} floatIntensity={reducedMotion ? 0 : 0.08}>
              <Suspense fallback={null}><ProductModel key={config.labelTexture} config={config} reducedMotion={reducedMotion} /></Suspense>
            </Float>
          </PresentationControls>
          <ContactShadows position={[0, config.kind === "tub" ? -1.35 : -1.5, 0]} opacity={0.32} scale={4.5} blur={2.4} far={4} frames={reducedMotion ? 1 : Infinity} color="#173e36" />
        </Canvas>
      </>}
      {interactive && <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-[#173e36]/12 bg-white/70 px-3 py-1.5 text-[0.65rem] font-bold tracking-wider text-[#173e36] uppercase backdrop-blur">Glissez pour explorer</span>}
    </div>
  );
}
