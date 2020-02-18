import { auth } from '../services/fireinit'

export default context => {
  const { store } = context;

  auth.onAuthStateChanged(user => {
    if (user) {
      return store.dispatch('autoSignIn', user)
    }
  })
}
