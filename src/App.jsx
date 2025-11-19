import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, AccumulativeShadows, RandomizedLight, Decal, Environment, Center } from '@react-three/drei'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { state } from './components/store'

export const App = ({ position = [0, 0, 2.5], fov = 25 }) => (
  <Canvas shadows camera={{ position: [0, 0, 2], fov }} gl={{ preserveDrawingBuffer: true }} eventSource={document.getElementById('root')} eventPrefix="client">
    <ambientLight intensity={0.5 * Math.PI} />
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
    easing.damp3(state.camera.position, [snap.intro ? -state.viewport.width / 4 : 0, 0, 3], 0.25, delta)
    easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta)
  })
  return <group ref={group}>{children}</group>
}

// function Shirt(props) {
//   const snap = useSnapshot(state)
//   const texture = useTexture(`/${snap.decal}.png`)
//   const { nodes, materials } = useGLTF('/shirt_baked_collapsed.glb')
//   useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta))
//   return (
//     // <Door size={[0.5, 0.5, 0.5]} material={materials.lambert1} rotation={[0, Math.PI / 2, 0]} />
//     <mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} material-roughness={1} {...props} dispose={null}>
//       <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={texture} />
//     </mesh>
//   )
// }


function DoorModel(props) {
  const { nodes, materials } = useGLTF('./door/DOOR2.gltf')

  const snap = useSnapshot(state)
    if (materials.brown) {
    materials.brown.metalness = 0.7
    materials.brown.roughness = 0.5
  }

  useFrame((state, delta) => easing.dampC(materials.brown.color, snap.color, 0.25, delta))
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.root.geometry} material={materials.brown} >
        <mesh castShadow geometry={nodes.Mesh_0.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_79.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.archibd___Door_lock___P___1001.geometry} material={materials.Blackhandle} />
        <mesh castShadow geometry={nodes.archibd___Door_lock___P___3001.geometry} material={materials.Blackhandle} />
        <mesh castShadow geometry={nodes.archibd___Door_lock___P___4001.geometry} material={materials.Blackhandle} />
        <mesh castShadow geometry={nodes.Mesh_89.geometry} material={materials.Blackhandle} />
        <mesh castShadow geometry={nodes.Mesh_89_1.geometry} material={materials.numberkey} />
        <mesh castShadow geometry={nodes.archibd___Door_lock___P___1.geometry} material={materials.Blackhandle} />
        <mesh castShadow geometry={nodes.archibd___Door_lock___P___3.geometry} material={materials.Blackhandle} />
        <mesh castShadow geometry={nodes.archibd___Door_lock___P___4.geometry} material={materials.Blackhandle} />
        <mesh castShadow geometry={nodes.archibd___Door_lock___P___5.geometry} material={materials.Blackhandle} />
        <mesh castShadow geometry={nodes.archibd___Door_lock___P___6.geometry} material={materials['Archibd _ Brushed Matel _ 2']} />
        <mesh castShadow geometry={nodes.Mesh_36.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_37.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_38.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_39.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_40.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_41.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_42.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_43.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_44.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_45.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_46.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_47.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_48.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_49.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_50.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_51.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_52.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_53.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_54.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_55.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_56.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_57.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_58.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_59.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_60.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_61.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_62.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_63.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_64.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_65.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_66.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_67.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_68.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_69.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_70.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_71.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_72.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_73.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_74.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_75.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_76.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_77.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_78.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_10.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_11.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_12.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_13.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_14.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_15.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_16.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_17.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_18.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_19.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_2.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_20.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_21.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_22.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_23.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_24.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_25.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_26.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_27.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_28.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_29.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_3.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_30.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_31.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_32.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_33.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_34.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_35.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_4.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_5.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_6.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_7.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_8.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_9.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_1_1.geometry} material={materials.grey} />
        <mesh castShadow geometry={nodes.Mesh_1_2.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_80.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_81.geometry} material={materials.brown}  />
        <mesh castShadow geometry={nodes.Mesh_82.geometry} material={materials.brown}  />
      </mesh>
    </group>
  )
}

export default App;

useGLTF.preload('./door/DOOR2.gltf')
;['/react.png', '/three2.png', '/pmndrs.png'].forEach(useTexture.preload)
