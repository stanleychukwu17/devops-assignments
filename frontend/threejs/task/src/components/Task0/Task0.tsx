import * as THREE from 'three'
import { Canvas, useFrame } from "@react-three/fiber"
import { SoftShadows, MeshWobbleMaterial, OrbitControls } from '@react-three/drei'
import { useRef, useState } from "react"
import { useSpring, a } from '@react-spring/three'


type BoxProps = {
  position: [number, number, number]
  args: [number, number, number]
  color: string
}
const Box = ({position, args, color}: BoxProps) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [active, setActive] = useState<boolean>(false)
  const [hovered, setHovered] = useState<boolean>(false)
  const animateProps = useSpring({
    scale: active ? 1.3 : 1
  })

  useFrame((_state, delta) => {
    meshRef.current.rotation.x = meshRef.current.rotation.y += delta
  })

  return (
    <a.mesh
      position={position}
      ref={meshRef}
      castShadow
      scale={animateProps.scale}
      onClick={() => setActive(!active) }
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={args} />
      <MeshWobbleMaterial
        color={hovered ? "#295e4f" : color }
        factor={0.8}
        speed={1.8}
      />
    </a.mesh>
  )
}


export default function Task0() {
  return (
    <div className="three_Canvas">
      <Canvas
        camera={{ position: [0,3,10], fov: 70 }}
        shadows
      >
        <SoftShadows />

        <ambientLight intensity={Math.PI/2} />
        <directionalLight position={[2,8,0]} intensity={Math.PI/2} castShadow />
        <directionalLight position={[-5,5,0]} intensity={Math.PI/1.3} />

        <mesh
          rotation={[-Math.PI/2, 0, 0]}
          position={[0,-2,0]}
          receiveShadow
        >
          <planeGeometry args={[100,100]} />
            <shadowMaterial attach="material" opacity={0.7} />
        </mesh>

        <group>
          <Box args={[1,1.6,1.1]} position={[0,0,0]} color="#d152af" />
          <Box args={[1,1.6,1.1]} position={[2.5,0,0]} color="indigo" />
          <Box args={[1,1.6,1.1]} position={[-2.5,0,0]} color="#ff9b35" />
        </group>

        <OrbitControls
          minPolarAngle={0}
          maxPolarAngle={Math.PI/2}
        />
      </Canvas>
    </div>
  )
}