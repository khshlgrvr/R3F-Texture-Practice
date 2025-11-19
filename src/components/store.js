import { proxy } from 'valtio'

const state = proxy({
  intro: true,
  colors: ['#a79393',  '#836c6c', '#695858'],
  decals: ['react', 'three2', 'pmndrs'],
  color: '#816b6b',
  decal: 'three2'
})

export { state }
