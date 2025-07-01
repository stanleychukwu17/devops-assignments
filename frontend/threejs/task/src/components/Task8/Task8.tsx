import * as THREE from "three"
import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { MeshWobbleMaterial, SoftShadows, OrbitControls } from "@react-three/drei"
import { Leva, useControls } from "leva"

type CubeProps = {
  color: string,
  position: [number, number, number]
  args: [number, number, number]
}
const Cube = ({color, position, args}: CubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null!)

  // rotate the cube every frame on the x and y axis
  useFrame((state) => {
    meshRef.current.rotation.x = meshRef.current.rotation.y = state.clock.getElapsedTime()
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      castShadow
    >
      <boxGeometry args={args} />
      <MeshWobbleMaterial color={color} factor={0.8} speed={1.5} />
    </mesh>
  )
}

export default function Task8() {
  const directionalLightRef = useRef<THREE.Mesh>(null!) // reference to the directional light

  // useLeva to control the light color and intensity
  const {lightColor, lightIntensity} = useControls({
    lightColor: "#ffffff",
    lightIntensity: {value: Math.PI, min: 0, max: 10}
  })

  return (
    <div className="three_Canvas">

      {/* rendering the Leva GUI */}
      <Leva />

      {/* the 3D canvas */}
      <Canvas
        shadows
        camera={{position:[0,0,10], fov: 40}}
      >

        {/* enable soft shadows */}
        <SoftShadows />

        {/* enable ambient light, creates a soft glow */}
        <ambientLight intensity={0.5} />

        {/* directional light for the shadows */}
        <directionalLight
          ref={directionalLightRef}
          color={lightColor}
          intensity={lightIntensity}
          position={[2, 10, 10]}
          castShadow
        />

        {/* plane to receive the shadows */}
        <mesh
          receiveShadow
          rotation={[-Math.PI/2, 0, 0]}
          position={[0, -4, 0]}
        >
          <planeGeometry args={[100, 100]} />
          <shadowMaterial attach={"material"} opacity={0.7} />
        </mesh>

        {/* group to hold the cubes */}
        <group>
          <Cube position={[2,0,0]} color={"hotpink"} args={[1.5,2,1.5]} />
          <Cube position={[-2,0,0]} color={"purple"} args={[1.5,2,1.5]} />
        </group>

        {/* enable orbit controls */}
        <OrbitControls />

      </Canvas>
    </div>
  )
}
