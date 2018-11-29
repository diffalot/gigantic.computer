import { initialState } from './initialState'
window.initialState = initialState

export default function store (state, emitter) {
  state.links = initialState.links
  console.log({ state, emitter })
}
