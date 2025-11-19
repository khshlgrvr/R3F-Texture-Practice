import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, AccumulativeShadows, RandomizedLight, Decal, Environment, Center } from '@react-three/drei'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { state } from './components/store'

export const App = ({ position = [0, 0, 2.5], fov = 25 }) => (
  <Canvas shadows camera={{ position: [0, 0, 10], fov }} gl={{ preserveDrawingBuffer: true }} eventSource={document.getElementById('root')} eventPrefix="client">
    <ambientLight intensity={3} />
    <pointLight position={[2, 2, 10]} intensity={0.5} />
    {/* <pointLight position={[20, 10, -10]} intensity={3} /> */}
    <Environment files="./potsdamer_platz_1k.hdr" />
    <CameraRig>
      <Backdrop />
      <Center>
        <DoorModel rotation={[0, Math.PI / 2, 0]}/>
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
      <RandomizedLight amount={4} radius={9} intensity={1 * Math.PI} ambient={0.25} position={[5, 5, -10]} />
      <RandomizedLight amount={4} radius={5} intensity={0.25 * Math.PI} ambient={0.55} position={[-5, 5, -9]} />
    </AccumulativeShadows>
  )
}

function CameraRig({ children }) {


  const group = useRef()
  const snap = useSnapshot(state)
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [snap.intro ? -state.viewport.width / 4 : 0, 0, 7], 0.25, delta)
    easing.dampE(group.current.rotation, [-state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta)
  })
  return <group ref={group}>{children}</group>
}


function DoorModel(props) {
  const { nodes, materials } = useGLTF('./door/DOOR_V4.gltf')
  const snap = useSnapshot(state)


    if (materials.Baked_B_2) {
    materials.Baked_B_2.metalness = 0.5
    materials.Baked_B_2.roughness = 0.55
  }

  useFrame((state, delta) => easing.dampC(materials.Baked_B_2.color, snap.color, 0.25, delta))

      return (
        <group {...props} dispose={null}>
          <group position={[0, 0, 0.819]}>
            <mesh geometry={nodes.Mesh_80001.geometry} material={materials.Baked_B_2} />
            <mesh geometry={nodes.Mesh_80001_1.geometry} material={materials.grey} />
          </group>
          <group position={[0, 0, 0.819]}>
            <mesh geometry={nodes.Mesh_88001.geometry} material={materials.Blackhandle} />
            <mesh geometry={nodes.Mesh_88001_1.geometry} material={materials.numberkey} />
          </group>
          {/* <mesh geometry={nodes.tttttt001.geometry} material={materials.Baked_B_4} position={[0.165, 0, 0.179]} />
          <mesh geometry={nodes.ttttttt001.geometry} material={materials.Baked_B_3} position={[-2.231, 0, 0.179]} />
          <mesh geometry={nodes.tttt001.geometry} material={materials.Baked_B_6} position={[5.333, 0, 0.179]} />
          <mesh geometry={nodes.ttt001.geometry} material={materials.Baked_B_5} position={[2.667, 0, 0.179]} />
          <mesh geometry={nodes.ttttttt002.geometry} material={materials.Baked_B_2} position={[-4.468, 0, 0]} /> */}
        </group>
      )
}

export default App;

useGLTF.preload('./door/DOOR_V4.gltf')
;['/react.png', '/three2.png', '/pmndrs.png'].forEach(useTexture.preload)
