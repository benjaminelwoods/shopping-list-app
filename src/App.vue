<template>
  <div id="app">
    <Navigation/>
    <router-view/>
  </div>
</template>

<script type="text/javascript">
import firebase from './firebase.js'
import Navigation from '@/components/Navigation.vue'

export default {
  data () {
    return {

    }
  },
  components: {
    Navigation
  },
  created () {
    console.log(firebase)
    console.log('working')
  }
}
</script>

<style lang="scss">
*, *::before, *::after {
  box-sizing: border-box;
  font-family: 'ABeeZee', sans-serif;
}

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-height: 100vh;
}

input {
  margin:0;
  border:0;
  padding:0;
  display:inline-block;
  vertical-align:middle;
  white-space:normal;
  line-height:1;
}

.btn {
  cursor: pointer;
  padding: 12px 25px;
  background-color: #42b983;
  box-shadow: 0px 0px 30px rgba(0,0,0,0.2);
  opacity: 1;
  transition: all 0.3s ease;
  &:hover {
    opacity: 0.6;
  }
}
</style>
