import Vuex from 'vuex'
import firebase, {
  auth,
  StoreDB,
  GoogleProvider,
  FacebookProvider }
  from '../services/fireinit';


export const state = () => ({
  user: null,
  loading: false,
  error: null,
  feeds:[]
});

export const mutations = {
  SET_USER(state, payload){
    state.user = payload
  },
  SET_LOADING(state, payload){
    state.loading = payload
  },
  SET_ERROR(state, payload){
    state.error = payload
  },
  CLEAR_ERROR(state){
    state.error = null
  },
  SET_FEEDS(state, payload){
    state.feeds = payload
  }
};

export const actions = {
  async signUserUp ({ commit }, payload){
    try{
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');

      const newUser = await auth.createUserWithEmailAndPassword(payload.email, payload.password);
      const { user } = newUser;
      const userData = {
        id: user.uid,
        name: payload.name,
        email: user.email,
        phoneNumber: payload.phone,
        dob: payload.dob,
        createdAt: new Date()
      };

      const ref = await StoreDB.collection('users');
      ref.doc(user.uid).set(userData);

      commit('SET_USER', userData);
      commit('SET_LOADING', false);

    }catch (error) {
      commit('SET_LOADING', false);
      commit('SET_ERROR', error);
    }
  },
  async signUserIn({ commit }, payload){
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');

    try{
      const user = await auth.signInWithEmailAndPassword(payload.email, payload.password);
      const id = user.user.uid;

      const ref = await StoreDB.collection('users').doc(id);
      const getDoc = await ref.get();

      if (!getDoc.exists) {
        console.log('No such document!');
      } else {
        commit('SET_USER', getDoc.data());
        commit('SET_LOADING', false)
      }

    }catch (error) {
      commit('SET_LOADING', false);
      commit('SET_ERROR', error);
    }

  },
  async autoSignIn({ commit }, payload ){
    const ref = await StoreDB.collection('users').doc(payload.uid);
    const getDoc = await ref.get();

    if (!getDoc.exists) {
      console.log('No such document!');
    } else {
      commit('SET_USER', getDoc.data());
      commit('SET_LOADING', false)
    }

  },
  async signUserOut({ commit }){
    const user = await auth.signOut();
    commit('SET_USER', null)
  },
  async signUserInGoogle({ commit }){
    commit('SET_LOADING', true)
    commit('CLEAR_ERROR');
    try{
      const user = await auth.signInWithPopup(GoogleProvider);
      const userData = {
        id: user.user.uid,
        fname: user.user.displayName,
        //lname: lname,
        email: user.user.email,
        imgUrl: user.user.photoURL
      };
      commit('SET_USER', userData)
    }catch(err){
      commit('SET_LOADING', false);
      commit('SET_ERROR', err);
    }

  },
  async signUserInFacebook ({ commit }) {
    commit('setLoading', true)
    commit('clearError')
    try{
      const user = await auth.signInWithPopup(FacebookProvider);
      const userData = {
        id: user.user.uid,
        fname: user.user.displayName,
        //lname: lname,
        email: user.user.email,
        imgUrl: user.user.photoURL
      };
      commit('SET_USER', userData)
    }catch (error) {
      commit('SET_LOADING', false);
      commit('SET_ERROR', err);
    }
  },

  async loadFeeds({ commit }){
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    try{
      const arr = [];
      const feeds = await StoreDB.collection('feedbacks').limit(3).get();
      feeds.forEach(snap =>{
        arr.push(snap.data());
      });
      commit('SET_FEEDS', arr);
      commit('SET_LOADING', false);
    }catch (error) {
      commit('SET_LOADING', false);
      commit('SET_ERROR', error);
    }
  },
  async addFeedback({ commit }, payload){
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    try{
      const ref = await StoreDB.collection('feedbacks').add(payload);
      commit('SET_LOADING', false);
    }catch (error) {
      commit('SET_ERROR', error);
    }
  },

  async submitOrder({ commit }, payload){
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    console.log(payload);
  }
};

export const getters = {
  user(state){
    return state.user
  },
  error(state){
    return state.error
  },
  loading(state){
    return state.loading
  }
};
