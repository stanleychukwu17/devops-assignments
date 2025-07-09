import * as THREE from 'three'
import { Canvas, useFrame, } from "@react-three/fiber"
import { MeshWobbleMaterial, SoftShadows, useCursor, OrbitControls } from '@react-three/drei'
import { useRef, useState } from "react"
import { useSpring, a } from '@react-spring/three'


type CubeProps = {
  position: [number, number, number]
  args: [number, number, number]
  color: string
}
const Cube = ({position, color, args}: CubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState<boolean>(false)
  const [active, setActive] = useState<boolean>(false)
  const animate = useSpring({
    scale: active ? 1.3 : 1
  })

  useCursor(true)

  useFrame((_state, delta) => {
    meshRef.current.rotation.x = meshRef.current.rotation.y += delta * 0.8
  })

  return (
    <a.mesh
      ref={meshRef}
      position={position}
      castShadow
      onClick={() => setActive(!active)}
      onPointerOver={()=> setHovered(true)}
      onPointerOut={()=> setHovered(false)}
      scale={animate.scale}
    >
      <boxGeometry args={args} />
      <MeshWobbleMaterial
        color={hovered ? "indigo" : color}
        factor={0.6}
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
        camera={{position:[0, 1, 5], fov:70}}
      >

        {/* for the soft shadow in the scene */}
        <SoftShadows />

        {/* add some ambient light */}
        <ambientLight intensity={0.5} />

        {/* add some directional Light */}
        <directionalLight intensity={Math.PI} position={[2,5,2]} castShadow />
        <directionalLight intensity={Math.PI} position={[-2,5,2]} castShadow />

        <mesh
          receiveShadow
          position={[0,-3,0]}
          rotation={[-Math.PI/2, 0, 0]}
        >
          <planeGeometry args={[100,100]} />
          {/* <meshStandardMaterial color={"indigo"} /> */}
          <shadowMaterial attach={"material"} opacity={0.8} />
        </mesh>

        <group>
          <Cube color='#443cf8' position={[2.5,0,0]} args={[1.2,1.8,.8]} />
          <Cube color='#dc10a9' position={[0,0,0]} args={[1.2,1.8,.8]} />
          <Cube color='#188cc1' position={[-2.5,0,0]} args={[1.2,1.8,.8]} />
        </group>

        <OrbitControls
          minPolarAngle={0}
          maxPolarAngle={Math.PI/2}
        />
      </Canvas>
    </div>
  )
}
