import { proxy } from 'valtio'

const state = proxy({
  intro: true,
  colors: ['#d4a82d', '#ffffff', '#80C670', '#726DE8', '#EF674E', '#353934'],
  decals: ['react', 'three2', 'pmndrs'],
  color: '#ffffff',
  decal: 'three2'
})

export { state }
