import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userFirstName: '',
    userLastName: '',
    userEmail: '',
    isLoggedIn: false
  },
  getters: {
    getUserFirstName: function (state) {
      return state.userFirstName
    },
    getUserLastName: function (state) {
      return state.userLastName
    },
    getUserEmail: function (state) {
      return state.userEmail
    },
    getLoggedIn: function (state) {
      return state.isLoggedIn
    }
  },
  mutations: {
    setUserFirstName (state, payload) {
      state.userFirstName = payload
    },
    setUserLastName (state, payload) {
      state.userLastName = payload
    },
    setUserEmail (state, payload) {
      state.userEmail = payload
    },
    setLoggedIn (state, payload) {
      state.isLoggedIn = payload
    }
  }
})
