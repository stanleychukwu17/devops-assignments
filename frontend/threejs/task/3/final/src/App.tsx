import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { SoftShadows, OrbitControls, MeshWobbleMaterial} from '@react-three/drei'
import {a, useSpring} from '@react-spring/three'
import './App.css'
import { useRef, useState } from 'react'


type BoxProps = {
  position: [number, number, number]
  args: ConstructorParameters<typeof THREE.BoxGeometry>
  color: string
  hoverColor: string
}
const Box = ({position, args, color, hoverColor}: BoxProps) => {
  const boxRef = useRef<THREE.Mesh>(null!)
  const [active, setActive] = useState<boolean>(false)
  const [hovered, setHovered] = useState<boolean>(false)
  const props = useSpring({
    scale: active ? 1.5 : 1,
  })

  useFrame((_state, delta) => {
    boxRef.current.rotation.x = boxRef.current.rotation.y += delta
  })

  return (
    <a.mesh
      ref={boxRef}
      position={position}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={props.scale}
      castShadow
    >
      <boxGeometry args={args}></boxGeometry>
      <meshStandardMaterial color={color}></meshStandardMaterial>
      <MeshWobbleMaterial
        color={hovered? hoverColor : color}
        factor={0.6}
      />
    </a.mesh>
  )
}

function App () {
  return (
    <div className='App'>
      <div className="three_Canvas">
        <Canvas
          shadows
          camera={{ position: [-5, 2, 10], fov: 60 }}
        >
          {/* Enable soft shadows in the scene */}
          <SoftShadows />

          {/* this light makes things to look pretty */}
          <ambientLight intensity={0.3} />

          {/* our main source of light, also casting the shadows */}
          <directionalLight
            castShadow
            position={[0, 10, 0]} 
            intensity={Math.PI/3}
            // shadow-mapSize-width={1024}
            // shadow-mapSize-height={1024}
            // shadow-radius={10}
            // shadow-camera-far={50}
            // shadow-camera-left={-10}
            // shadow-camera-right={10}
            // shadow-camera-top={10}
            // shadow-camera-bottom={-10}
          />
          {/* both pointLights will help to illuminate the spinning boxes */}
          <pointLight position={[-10, 0, -20]} intensity={0.5} />
          <pointLight position={[0, -10, 0]} intensity={1.5} />

          <group>
            <mesh
              rotation={[-Math.PI/2, 0, 0]}
              position={[0, -3, 0]}
              receiveShadow
            >
              <planeGeometry args={[100, 100]} />
              <shadowMaterial attach="material" opacity={1.3} />
            </mesh>

            <Box position={[2,0,0]} args={[1,2,1.5]} color='hotpink' hoverColor='yellow' />
            <Box position={[-2,0,0]} args={[2,1.5,1]} color='purple' hoverColor='yellow' />
          </group>

          <OrbitControls />
        </Canvas>
      </div>
    </div>
  )
}

export default App