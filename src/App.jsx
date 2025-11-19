import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, AccumulativeShadows, RandomizedLight, Decal, Environment, Center } from '@react-three/drei'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { state } from './components/store'
import { Door } from './components/Door'

export const App = ({ position = [0, 0, 2.5], fov = 25 }) => (
  <Canvas shadows camera={{ position: [0, 0, 2], fov }} gl={{ preserveDrawingBuffer: true }} eventSource={document.getElementById('root')} eventPrefix="client">
    <ambientLight intensity={0.5 * Math.PI} />
    <Environment files="./potsdamer_platz_1k.hdr" />
    <CameraRig>
      <Backdrop />
      <Center>
        <Shirt />
      </Center>
    </CameraRig>
  </Canvas>
)

function Backdrop() {
  const shadows = useRef()
  useFrame((state, delta) => easing.dampC(shadows.current.getMesh().material.color, state.color, 0.25, delta))
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={5}
      resolution={2048}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}>
      <RandomizedLight amount={4} radius={9} intensity={0.55 * Math.PI} ambient={0.25} position={[5, 5, -10]} />
      <RandomizedLight amount={4} radius={5} intensity={0.25 * Math.PI} ambient={0.55} position={[-5, 5, -9]} />
    </AccumulativeShadows>
  )
}

function CameraRig({ children }) {


  const group = useRef()
  const snap = useSnapshot(state)
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [snap.intro ? -state.viewport.width / 4 : 0, 0, 7], 0.25, delta)
    easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta)
  })
  return <group ref={group}>{children}</group>
}

function Shirt(props) {
  const snap = useSnapshot(state)
  const texture = useTexture(`/${snap.decal}.png`)
  const { nodes, materials } = useGLTF('/shirt_baked_collapsed.glb')
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta))
  return (
    // <Door size={[0.5, 0.5, 0.5]} material={materials.lambert1} rotation={[0, Math.PI / 2, 0]} />
    <mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} material-roughness={1} {...props} dispose={null}>
      <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={texture} />
    </mesh>
  )
}


function DoorModel(props) {
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF('./door/door.gltf')
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta))
  return (
    <group {...props} dispose={null} position={[0, 0, -10]}>
      <mesh castShadow geometry={nodes.mesh_0.geometry} material={materials['default material']} />
      <mesh castShadow geometry={nodes.mesh_0_1.geometry} material={materials['0133_Gray']} />
      <mesh castShadow geometry={nodes.mesh_0_2.geometry} material={materials['0017_IndianRed']} />
      <mesh castShadow geometry={nodes.mesh_0_3.geometry} material={materials['0133_Gray']} />
      <mesh castShadow geometry={nodes.mesh_0_4.geometry} material={materials['Archibd _ Black Brushed Matel _ 3.jpg']} />
      <mesh castShadow geometry={nodes.mesh_0_5.geometry} material={materials['Archibd _ Brushed Matel _ 2']} />
      <mesh castShadow geometry={nodes.mesh_0_6.geometry} material={materials['archibd _ Door Wood _1']} />
      <mesh castShadow geometry={nodes.mesh_0_7.geometry} material={materials['Archibd _ White Brushed Matel _ 4.jpg']} />
    </group>
  )
}

export default App;

useGLTF.preload('/shirt_baked_collapsed.glb')
  ;['/react.png', '/three2.png', '/pmndrs.png'].forEach(useTexture.preload)
