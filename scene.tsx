import { createElement, ScriptableScene, Vector3Component } from "decentraland-api"


interface IState {

}

const Tile = (props: { position: Vector3Component }) => {
  const colores = ["#1dccc7", "#ffce00", "#9076ff", "#fe3e3e", "#3efe94", "#3d30ec", "#6699cc"]
  const index0 = Math.floor(Math.random() * colores.length)

  return (<box
    id="caja"
    position={props.position}
    scale={{ x: 2, y: 0.2, z: 2 }}
    color={colores[index0]}
  />)

}

export default class RollerCoaster extends ScriptableScene<any, IState> {
  state = {};

  sceneDidMount() {
    setInterval(() => {
      this.forceUpdate()
    }, 500)
  }


  async render() {
    const tiles: any[] = [];

    [0, 1, 2, 3, 4].forEach(x => {
      [0, 1, 2, 3, 4].forEach(z => {
        tiles.push(<Tile position={{ x: x * 2, y: 0, z: z * 2 }} />)
      })
    })
    
    const Gltf = (x: JSX.GltfEntity & { sound: any }) => <gltf-model {...x} />

    return (
      <scene position={{ x: 1, y: 0, z: 1 }} scale={0.999} >
        {tiles}

        <Gltf
          sound={{ src: 'models/Vexento.ogg', playing: true }}
          src="models/Trevor.glb"
          scale={{ x: 1.5, y: 1.5, z: 1.5 }}
          rotation={{ x: 0, y: -90, z: 0 }}
          position={{ x: 5, y: 0.1, z: 5 }}

          skeletalAnimation={[
            { clip: "Armature_Idle", playing: true, loop: true, weight: 1 },
          ]}
        />
      </scene>
    )
  }
}
