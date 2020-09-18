<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="list">
      <div class="inner">
        <input type="text" v-for="item in items" :key="item.id" v-model="item.content">
      </div>
      <div class="input">
        <!-- <input type="text" placeholder="Type something..." v-model="newItem"  @blur="addNewItem"> -->
      </div>
    </div>
  </div>
</template>

<script>
// import firebase from 'firebase'
import db from '../firebase.js'
// console.log(firebase)

export default {
  name: 'Home',
  data () {
    return {
      items: '',
      newItem: ''
    }
  },
  created () {
    this.getListItems()
  },
  watch: {
    newItem: function () {
      this.getListItems()
    }
  },
  methods: {
    getListItems () {
      const v = this
      var data = []
      db.collection('lists').get().then(function (doc) {
        doc.forEach(function (docChild) {
          const eachDoc = docChild.data()
          data.push(eachDoc)
        })
        v.items = data
      }).then(function () {
        v.getListItems()
      })
    },
    addNewItem () {
      const v = this
      const ref = db.collection('lists').doc()
      ref.set({
        content: v.newItem,
        id: ref.id
      })
    },
    editItem (id, e) {
      // const v = this
      db.collection('lists').doc(id).set({
        content: e.target.value
      })
    }
  }
}
</script>

<style scoped lang="scss">
.list {
  & .inner {
    max-width: 400px;
    display: flex;
    flex-direction: column;
    & li {
      border-bottom: 1px solid black;
      width: 100%;
      padding: 5px;
      text-align: left;
    }
  }
}
</style>
