import * as THREE from 'three'
import { Canvas, useFrame } from "@react-three/fiber"
import { SoftShadows, MeshWobbleMaterial, OrbitControls, useHelper } from '@react-three/drei'
import { useRef, useState } from "react"
import { useSpring, a } from '@react-spring/three'
import { useControls } from 'leva'


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

  useHelper(meshRef, THREE.BoxHelper, "red")

  const {boxColor, xSize, ySize, zSize} = useControls(`box-${color}`, {
    boxColor: color,
    xSize: {value: args[0], min: 0.5, max: 5, step: 0.25},
    ySize: {value: args[1], min: 0.5, max: 5, step: 0.25},
    zSize: {value: args[2], min: 0.5, max: 5, step: 0.25},
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
      <boxGeometry args={[xSize, ySize, zSize]} />
      <MeshWobbleMaterial
        color={hovered ? "#295e4f" : boxColor }
        factor={0.8}
        speed={1.8}
      />
    </a.mesh>
  )
}

type DirectLightProps = {
  position: [number, number, number]
  intensity: number
  shadow: boolean
  color: string
}
const DirectLight = ({position, intensity, shadow, color}: DirectLightProps) => {
  const lightRef = useRef<THREE.Mesh>(null!)

  const {lightIntensity, lightColor} = useControls(`${color}-light`, {
    lightIntensity: {
      value: intensity,
      min: 1,
      max: 15,
      step: 0.5
    },
    lightColor: {
      value: color
    }
  })
  useHelper(lightRef, THREE.DirectionalLightHelper, 1)

  return (
    <directionalLight
      color={lightColor}
      ref={lightRef} position={position} intensity={lightIntensity} castShadow={shadow}
    />
  )
}


export default function Task0() {
  return (
    <div className="three_Canvas">
      <Canvas
        camera={{ position: [0,3,10], fov: 70 }}
        shadows
      >
        <axesHelper args={[5]} />
        <gridHelper position={[0, -0.5, 0]} args={[15, 15, 'orange', 'orange']} />

        <SoftShadows />

        <ambientLight intensity={Math.PI/2} />
        <DirectLight color='#ff9b35' position={[2,8,0]} intensity={Math.PI/2} shadow/>
        <DirectLight color='#d152af' position={[-5,5,0]} intensity={Math.PI/1.3} shadow={false}  />

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