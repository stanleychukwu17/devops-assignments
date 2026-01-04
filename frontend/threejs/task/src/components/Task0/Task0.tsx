import * as THREE from 'three'
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshWobbleMaterial, OrbitControls, SoftShadows, useCursor } from "@react-three/drei";
import { useRef, useState } from "react";
import { a, useSpring } from '@react-spring/three';

type BoxProps = {
  color: string;
  position: [number, number, number]
  args: [number, number, number]
}
const BoxComp = ({color, position, args}: BoxProps) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState<boolean>(false)
  const [active, setActive] = useState<boolean>(false)
  const animateProps = useSpring({
    scale: active ? 1.3 : 1
  })

  useFrame((_state, delta) => {
    meshRef.current.rotation.x = meshRef.current.rotation.y += delta
  })

  useCursor(hovered)

  return (
    <a.mesh
      ref={meshRef}
      position={position}
      castShadow
      onPointerOver={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={animateProps.scale}
    >
      <boxGeometry args={args} />
      <MeshWobbleMaterial
        color={hovered ? 'white' : color}
        speed={1}
        factor={0.8}
      />
    </a.mesh>
  )
}

export default function Task0() {
  return (
    <div className="three_Canvas">
      <Canvas
        camera={{position:[0,0,10], fov:60}}
        shadows
      >
        <SoftShadows />

        <ambientLight intensity={Math.PI} />
        <directionalLight
          position={[3,5,1]} intensity={Math.PI} castShadow
        />
        <directionalLight position={[-3,5,0]} intensity={Math.PI} />

        <mesh
          receiveShadow
          rotation={[-Math.PI/2, 0, 0]}
          position={[0, -3, 0]}
        >
          <planeGeometry args={[100,100]} />
          <shadowMaterial opacity={0.9} />
        </mesh>
        <group>
          <BoxComp color='lightblue' position={[0,0,0]} args={[1,1,1]} />
          <BoxComp color='indigo' position={[3,0,0]} args={[1,1,1]} />
          <BoxComp color='yellowgreen' position={[-3,0,0]} args={[1,1,1]} />
        </group>


        <OrbitControls
          minPolarAngle={0}
          maxPolarAngle={Math.PI/2}
        />
      </Canvas>
    </div>
  )
}