export default function ({ store, route, redirect }) {
  if(store.getters.user == null && route.name === 'Profile'){
    redirect('/')
  }
}
