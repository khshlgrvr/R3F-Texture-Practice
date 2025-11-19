import { proxy } from 'valtio'

const state = proxy({
  intro: true,
  colors: ['#ccc', '#4b4b4b', '#80C670', '#726DE8', '#EF674E', '#353934'],
  decals: ['react', 'three2', 'pmndrs'],
  color: '#EFBD4E',
  decal: 'three2'
})

export { state }
