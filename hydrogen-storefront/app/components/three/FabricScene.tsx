import {useRef, useMemo, Suspense} from 'react';
import {Canvas, useFrame, useThree} from '@react-three/fiber';
import {Float, MeshDistortMaterial, Environment, PerspectiveCamera} from '@react-three/drei';
import * as THREE from 'three';

// Animated flowing fabric mesh
function FlowingFabric() {
  const meshRef = useRef<THREE.Mesh>(null);
  const {viewport} = useThree();

  // Create custom geometry for fabric-like appearance
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(4, 4, 64, 64);
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();

      // Gentle rotation
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.05 - 0.2;
      meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.05;

      // Update vertex positions for wave effect
      const positions = meshRef.current.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const waveX = Math.sin(x * 2 + time) * 0.1;
        const waveY = Math.sin(y * 2 + time * 0.8) * 0.1;
        positions.setZ(i, waveX + waveY);
      }
      positions.needsUpdate = true;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.3}
    >
      <mesh
        ref={meshRef}
        geometry={geometry}
        scale={viewport.width / 4}
        position={[0, 0, 0]}
      >
        <MeshDistortMaterial
          color="#f5ede0"
          roughness={0.8}
          metalness={0.1}
          distort={0.2}
          speed={1.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

// Floating thread particles
function ThreadParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 100;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#b5976d"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Secondary decorative fabric
function DecorativeFabric({position}: {position: [number, number, number]}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
      meshRef.current.rotation.z = Math.cos(time * 0.3) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[1.5, 1.5, 32, 32]} />
      <MeshDistortMaterial
        color="#d8c9ae"
        roughness={0.9}
        metalness={0}
        distort={0.3}
        speed={2}
        transparent
        opacity={0.7}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Main scene component
function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#fff5e6" />
      <directionalLight position={[-5, -5, 5]} intensity={0.3} color="#b5976d" />
      <spotLight
        position={[0, 5, 3]}
        angle={0.5}
        penumbra={1}
        intensity={0.5}
        color="#ffffff"
      />

      {/* Environment for reflections */}
      <Environment preset="studio" />

      {/* Main fabric */}
      <FlowingFabric />

      {/* Decorative elements */}
      <DecorativeFabric position={[-2.5, 1.5, -1]} />
      <DecorativeFabric position={[2.5, -1, -1.5]} />

      {/* Particles */}
      <ThreadParticles />
    </>
  );
}

// Loading placeholder
function LoadingPlaceholder() {
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial color="#f5ede0" transparent opacity={0.5} />
    </mesh>
  );
}

// Exported canvas component
export function FabricScene({className}: {className?: string}) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{background: 'transparent'}}
      >
        <Suspense fallback={<LoadingPlaceholder />}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Smaller fabric preview for product cards
export function FabricPreview({
  color = '#f5ede0',
  className,
}: {
  color?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{antialias: true, alpha: true}}
        style={{background: 'transparent'}}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={0.8} />
        <Float speed={3} floatIntensity={0.5}>
          <mesh>
            <planeGeometry args={[2, 2, 16, 16]} />
            <MeshDistortMaterial
              color={color}
              roughness={0.8}
              distort={0.2}
              speed={2}
              side={THREE.DoubleSide}
            />
          </mesh>
        </Float>
      </Canvas>
    </div>
  );
}
