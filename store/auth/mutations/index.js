import { Mutation } from "../types";

export default {

  [Mutation.SET_USER](state, payload) {
    state.user = payload
  },
  [Mutation.SET_LOADING](state, payload) {
    state.loading = payload
  },
  [Mutation.SET_ERROR](state, payload) {
    state.error = payload
  },
  [Mutation.SET_ERROR](state) {
    state.error = null
  },

}
