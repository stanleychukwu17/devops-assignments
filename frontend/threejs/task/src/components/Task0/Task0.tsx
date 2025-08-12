import { useRef, useState } from 'react';
import * as THREE from 'three'
import { Canvas, useFrame } from "@react-three/fiber";
import {SoftShadows, MeshWobbleMaterial, OrbitControls} from '@react-three/drei'
import {a, useSpring} from '@react-spring/three'

type BoxProp = {
  color: string
  hoverColor: string
  args: [number, number, number]
  position: [number, number, number]
}
const BoxComp = ({position, args, color, hoverColor}: BoxProp) => {
  const boxRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState<boolean>(false)
  const [active, setActive] = useState<boolean>(false)
  const props = useSpring({
    scale: active ? 1.2 : 1
  })

  useFrame((_state, delta) => {
    boxRef.current.rotation.x = boxRef.current.rotation.y += delta
  })

  return(
    <a.mesh
      ref={boxRef}
      position={position}
      castShadow
      scale={props.scale}
      onClick={() => setActive(!active)}
      onPointerOver={()=>setHovered(true)}
      onPointerOut={()=>setHovered(false)}
    >
      <boxGeometry args={[...args,10,10,10]} />
      <MeshWobbleMaterial
        color={hovered ? hoverColor : color}
        factor={1.8} speed={1}
      />
    </a.mesh>
  )
}

export default function Task0() {
  const y = 1.5, x = .9, z = 1;

  return (
    <div className="three_Canvas">
      <Canvas
        shadows
        camera={{position:[-5,2,10], fov:70}}
      >
        <SoftShadows />

        <ambientLight intensity={Math.PI/2} />

        <directionalLight
          position={[3,10,2]}
          intensity={Math.PI/2}
          castShadow
        />
        <directionalLight
          position={[-5,0,5]}
          intensity={1.5}
        />


        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI/2, 0, 0]}
            position={[0,-3,0]}
          >
            <planeGeometry args={[100,100]} />
            <shadowMaterial attach={"material"} opacity={.8} />
          </mesh>
          <BoxComp position={[0,0,0]} args={[x,y,z]} color='#8cdc1b' hoverColor='white' />
          <BoxComp position={[3,0,0]} args={[x,y,z]} color='#c713e7' hoverColor='white' />
          <BoxComp position={[-3,0,0]} args={[x,y,z]} color='#b51f1c' hoverColor='white' />
        </group>

        <OrbitControls
          minPolarAngle={0}
          maxPolarAngle={Math.PI/2}
        />
      </Canvas>
    </div>
  )
}
