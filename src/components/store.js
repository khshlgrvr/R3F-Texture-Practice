import { proxy } from 'valtio'

const state = proxy({
  intro: true,
  colors: ['#e2e2e2', '#c7c7c7', '#fcf2dd', '#e0cf6d', '#929292'],
  decals: ['react', 'three2', 'pmndrs'],
  color: '#e2e2e2',
  decal: 'three2'
})

export { state }
