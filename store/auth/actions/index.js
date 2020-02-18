import firebase from 'firebase/app';
import 'firebase/auth';
import { Action, Mutation } from '../types'
import {auth, StoreDB} from "../../../services/fireinit";

export default {
  [Action.SIGNIN]({commit}, authData) {
    return new Promise((resolve, reject) => {

        firebase.auth().signInWithEmailAndPassword(authData.email, authData.password)
          .then(() => {
            firebase.auth().onAuthStateChanged(authUser => {
              commit(`${[Mutation.SET_USER]}`, authUser);
              resolve()
            });
          })
          .catch(err => reject(err.message))
      }
    )
  },
  [Action.SIGNUP]({commit}, user) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(() => {
          firebase.auth().onAuthStateChanged(authUser => {
            commit(`${[Mutation.LOGIN]}`, authUser);
            resolve()
          });
        })
        .catch(err => {
          reject(err.message)
        });
    })
  },
  [Action.SIGNOUT]({commit}) {
    firebase.auth().signOut().then(() => {
        firebase.auth().onAuthStateChanged(authUser => {
          commit(`${[Mutation.SET_USER]}`, null);
        });
      }
    );
  },
}
