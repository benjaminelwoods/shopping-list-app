<template>
  <div class="signup">
      <h1>Sorted.</h1>
      <div class="inputs">
        <p class="error" v-if="errorMessage">{{errorMessage}}</p>
        <input type="text" name="Username" placeholder="Username" v-model="userId">
        <input type="text" name="First Name" placeholder="First Name" v-model="userFirstName">
        <input type="text" name="Last Name" placeholder="Last Name" v-model="userLastName">
        <input type="email" name="Email" placeholder="Email" v-model="userEmail">
        <input type="password" name="Password" placeholder="Password" v-model="userPw">
        <input type="password" name="Confirm Password" placeholder="Confirm Password" v-model="userPwConfirm">
        <a class="btn btn-main" @click="signup">Confirm <i class="fas fa-sign-in-alt"></i></a>
      </div>
      <router-link to="/signup">Already have an account? Login now!</router-link>
  </div>
</template>

<script>
import firebase from 'firebase'
// import db from '../firebase.js'
const rdb = firebase.database()

export default {
  name: 'Signup',
  data () {
    return {
      userFirstName: '',
      userLastName: '',
      userEmail: '',
      userPw: '',
      userPwConfirm: '',
      errorMessage: false,
      userId: ''
    }
  },
  created () {
  },
  methods: {
    signup () {
      const v = this
      if (this.userPw === this.userPwConfirm) {
        // const a = v.userId
        firebase.auth().createUserWithEmailAndPassword(v.userEmail, v.userPw).then(function () {
          rdb.ref('users/' + v.userId).set({
            username: v.userId,
            firstName: v.userFirstName,
            lastName: v.userLastName,
            email: v.userEmail
          }).then(function () {
            rdb.ref('lists/' + v.userId).set({
              content: 'Example Item, try adding another!'
            })
          }).catch(function (error) {
            v.errorMessage = error.message
          })
          // db.collection('users').doc(v.userEmail).set({
          //   email: v.userEmail,
          //   firstName: v.userFirstName,
          //   lastName: v.userLastName
          // }).then(function () {
          //   const ref = db.collection('users').doc(v.userEmail).collection('Example List').doc()
          //   ref.set({
          //     content: 'Example Item, try adding another!',
          //     id: ref.id
          //   }).then(function () {
          //     v.$router.push('login')
          //   })
          // })
        }).catch(function (error) {
          v.errorMessage = error.message
        })
      } else {
        this.errorMessage = 'Passwords do not match.'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.signup {
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
