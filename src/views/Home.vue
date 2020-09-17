<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="">
      <div class="inner">
        <li v-for="item in items" :key="item.id">{{item.content}}</li>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import firebase from 'firebase'
console.log(firebase)
import db from '../firebase.js'

export default {
  name: 'Home',
  // components: {
  //   // HelloWorld
  // }
  data () {
    return {

    }
  },
  created () {
    db.collection('lists').doc('test').get().then(function (doc) {
      console.log(doc.data())
    })
  }
}
</script>
