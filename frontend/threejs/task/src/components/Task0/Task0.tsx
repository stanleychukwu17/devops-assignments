import * as THREE from 'three'
import { Canvas, useFrame } from "@react-three/fiber"
import { SoftShadows, MeshWobbleMaterial, OrbitControls } from "@react-three/drei"
import { useRef, useState } from "react"
import { a, useSpring } from '@react-spring/three'


type BoxProps = {
  color: string,
  hovColor: string,
  position: [number, number, number],
  args: [number, number, number]
}
const BoxComp = ({color, hovColor, position, args}: BoxProps) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [active, setActive] = useState<boolean>(false)
  const [hovered, setHovered] = useState<boolean>(false)
  const animate = useSpring({
    scale: active ? 1.5 : 1
  })

  useFrame((_state, delta) => {
    return meshRef.current.rotation.x = meshRef.current.rotation.y += delta
  })

  return (
    <a.mesh
      ref={meshRef}
      position={position}
      castShadow
      scale={animate.scale}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={args} />
      <MeshWobbleMaterial
        color={hovered ? hovColor : color}
        factor={0.8}
        speed={1.2}
      />
    </a.mesh>
  )
}

export default function Task0() {
  return (
    <div className="three_Canvas">
      <Canvas
        shadows
        camera={{ position:[-3,0,10], fov: 60 }}
      >
        <SoftShadows />

        <ambientLight intensity={0.5} />

        <directionalLight
          position={[2, 5, 2]}
          intensity={Math.PI}
          castShadow
        />

        <mesh
          rotation={[-Math.PI/2,0,0]}
          position={[0,-4,0]}
          receiveShadow
        >
          <planeGeometry args={[100,100]} />
          {/* <meshStandardMaterial color={"white"} /> */}
          <shadowMaterial attach={"material"} opacity={0.7} />
        </mesh>

        <group>
          <BoxComp
            position={[-3, 0, 0]}
            color="purple"
            hovColor="lightgreen"
            args={[2,2.5,1.5]}
          />
          <BoxComp
            position={[3, 0, 0]}
            color="hotpink"
            hovColor="yellowgreen"
            args={[2,2.5,1.5]}
          />
        </group>

        <OrbitControls />
      </Canvas>
    </div>
  )
}