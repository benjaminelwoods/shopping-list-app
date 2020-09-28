<template>
  <div class="login">
      <Loading v-if="loading"/>
      <h1>Sorted.</h1>
      <div class="inputs">
        <p class="error" v-if="errorMessage">{{errorMessage}}</p>
        <input type="email" name="Email" placeholder="Email" v-model="userEmail">
        <input type="password" name="Password" placeholder="Password" v-model="userPw">
        <a class="btn btn-main" @click="login">Confirm <i class="fas fa-sign-in-alt"></i></a>
      </div>
      <router-link to="/signup">Don't have an account? Sign up now!</router-link>
      <router-link to="/signup">Forgot your password?</router-link>
  </div>
</template>

<script>
import firebase from 'firebase'
import rdb from '../firebase.js'
import Loading from '@/components/Loading.vue'

export default {
  name: 'Login',
  data () {
    return {
      userEmail: '',
      userPw: '',
      errorMessage: false,
      loading: false
    }
  },
  components: {
    Loading
  },
  created () {
    console.log(firebase)
  },
  methods: {
    login () {
      this.loading = true
      const v = this
      if ((this.userPw !== '') || (this.userEmail !== '')) {
        firebase.auth().signInWithEmailAndPassword(v.userEmail, v.userPw).then(function () {
        // db.collection('users').doc(v.userEmail).get().then(function (doc) {
        //   localStorage.setItem('userFirstName', doc.data().firstName)
        //   localStorage.setItem('userLastName', doc.data().lastName)
        // }).then(function () {
        //   localStorage.setItem('userEmail', v.userEmail)
        //   localStorage.setItem('isLoggedIn', 'true')
        //   v.$router.push('/')
        // }).catch(function (error) {
        //   v.errorMessage = error.message
        // })
          const ref = rdb.ref('users/' + 'benelwoods')
          ref.once('value', function (snapshot) {
            const src = snapshot.val()
            localStorage.setItem('userFirstName', src.firstName)
            localStorage.setItem('userLastName', src.lastName)
            localStorage.setItem('userEmail', src.email)
            localStorage.setItem('isLoggedIn', 'true')
            v.$router.push('/')
          }).catch(function (error) {
            console.log(error.message)
          })
        }).catch(function (error) {
          v.errorMessage = error.message
        })
      } else {
        this.errorMessage = 'Please input all fields.'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login {
    background-color: #344a5f;
    height: 93vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & h1 {
        margin: 0 0 50px 0;
        font-family: 'Montserrat', sans-serif;
        color: #1d2935;
    }
    & .inputs {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 0 8%;
        width: 100%;
        & .error {
          color: #fff;
        }
        & > :not(:last-child) {
            margin-bottom: 20px;
        }
        & input {
            flex: 1 1 100%;
            width: 100%;
            border: none;
            padding: 12px 20px;
            background-color: #2c3e50;
            color: #fff;
            font-size: 16px;
        }
        // & > .inner {
        //     display: flex;
        //     justify-content: center;
        //     align-items: center;
        //     & > :first-child {
        //         margin-right: 20px;
        //     }
        // }
        & .btn.btn-main {
            width: 100%;
        }
    }
    & > a {
      margin-top: 5%;
      color: #f2f2f2;
      text-decoration: none;
    }
}
</style>
