import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FloatingShape({ position, color, size, speed, distort }: {
  position: [number, number, number]
  color: string
  size: number
  speed: number
  distort: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = clock.getElapsedTime() * speed * 0.3
    meshRef.current.rotation.y = clock.getElapsedTime() * speed * 0.5
  })

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[size, 1]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.3}
          metalness={0.8}
          distort={distort}
          speed={2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const count = 200
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10
    }
    return pos
  }, [])

  const ref = useRef<THREE.Points>(null!)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02
    }
  })

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [positions])

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#7c3aed"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

function CenterRing() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1
      ref.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={ref} position={[0, 0, -3]}>
      <torusGeometry args={[2.5, 0.03, 16, 80]} />
      <meshBasicMaterial color="#7c3aed" transparent opacity={0.3} />
    </mesh>
  )
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#7c3aed" />

        <ParticleField />
        <CenterRing />

        <FloatingShape
          position={[-4, 2, -2]}
          color="#7c3aed"
          size={0.6}
          speed={0.5}
          distort={0.3}
        />
        <FloatingShape
          position={[4, -1.5, -1]}
          color="#a78bfa"
          size={0.4}
          speed={0.8}
          distort={0.5}
        />
        <FloatingShape
          position={[-3, -2.5, -4]}
          color="#6d28d9"
          size={0.5}
          speed={0.6}
          distort={0.2}
        />
        <FloatingShape
          position={[3.5, 3, -3]}
          color="#8b5cf6"
          size={0.35}
          speed={0.7}
          distort={0.4}
        />
      </Canvas>
    </div>
  )
}
