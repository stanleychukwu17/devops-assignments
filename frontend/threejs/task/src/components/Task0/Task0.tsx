import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { SoftShadows, MeshWobbleMaterial, OrbitControls } from '@react-three/drei'
import { useRef, useState } from 'react'
import {a, useSpring} from '@react-spring/three'

type BoxProps = {
  position: [number, number, number]
  args: [number, number, number]
  color: string
}
const Box = ({color, position, args}: BoxProps) => {
  const boxRef = useRef<THREE.Mesh>(null!)
  const [active, setActive] = useState(false)
  const [hovered, setHovered] = useState(false)
  const props = useSpring({
    scale: active ? 1.2 : 1
  })

  useFrame((_state, delta) => {
    boxRef.current.rotation.x = boxRef.current.rotation.y += delta
  })

  return (
    <a.mesh
      ref={boxRef}
      position={position}
      castShadow
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      scale={props.scale}
    >
      <boxGeometry args={[...args, 10, 10, 10]} />
      <MeshWobbleMaterial
        color={ hovered ? 'indigo' : color} speed={1} factor={0.6}

      />
    </a.mesh>
  )
}

export default function Task0() {
  return (
    <div className="three_Canvas">
      <Canvas
        shadows
        camera={{ position: [0, 0, 9], fov: 80 }}
      >
        <ambientLight intensity={Math.PI/2} />
        <directionalLight intensity={Math.PI/2} position={[2,5,1]} castShadow />
        <directionalLight intensity={Math.PI/2} position={[-3,5,-2]} />

        <SoftShadows />

        <mesh
          position={[0,-3,0]}
          receiveShadow
          rotation={[-Math.PI/2,0,0]}
        >
          <planeGeometry args={[100,100]} />
          {/* <meshStandardMaterial color={"lightgreen"} /> */}
          <shadowMaterial attach="material" opacity={0.6} />
        </mesh>

        <group>
          <Box color='#d505cf' position={[-3,0,0]} args={[1.2,1.7,1.2]}/>
          <Box color='#26e3d6' position={[0,0,0]} args={[1.2,1.7,1.2]}/>
          <Box color='#6f58f6' position={[3,0,0]} args={[1.2,1.7,1.2]}/>
        </group>

        <OrbitControls
          minPolarAngle={0}
          maxPolarAngle={Math.PI/2}
        />
      </Canvas>
    </div>
  )
}