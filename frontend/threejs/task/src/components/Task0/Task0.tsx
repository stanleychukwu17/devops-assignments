import * as THREE from 'three'
import { Canvas, useFrame } from "@react-three/fiber"
import { SoftShadows, MeshWobbleMaterial, OrbitControls } from "@react-three/drei"
import { useRef } from "react"

type BoxProps = {
  color: string,
  position: [number, number, number],
  args: [number, number, number]
}
const BoxComp = ({color, position, args}: BoxProps) => {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((_state, delta) => {
    return meshRef.current.rotation.x = meshRef.current.rotation.y += delta
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      castShadow
    >
      <boxGeometry args={args} />
      <MeshWobbleMaterial
        color={color}
        factor={0.8}
        speed={1.2}
      />
    </mesh>
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
            args={[2,2.5,1.5]}
          />
          <BoxComp
            position={[3, 0, 0]}
            color="hotpink"
            args={[2,2.5,1.5]}
          />
        </group>

        <OrbitControls />
      </Canvas>
    </div>
  )
}