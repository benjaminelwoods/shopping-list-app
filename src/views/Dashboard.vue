<template>
  <div v-if="isLoggedIn" class="home">
    <div class="list">
      <keep-alive>
        <div class="inner">
          <input type="text" v-for="item in initialItems" :key="item.id" v-model="item.content" v-on:keyup.enter="editItem(item.id, $event)" v-on:keyup.delete="removeItem(item.id)" v-on:keyup.up="previousItem($event)" v-on:keyup.down="nextItem($event)">
          <input type="text" v-for="item in afterItems" :key="item.id" v-model="item.content" v-on:keyup.enter="editItem(item.id, $event)" v-on:keyup.delete="removeItem(item.id)" v-on:keyup.up="previousItem($event)" v-on:keyup.down="nextItem($event)">
          <input type="text" placeholder="Type something..." v-model="newItem" v-on:keyup.enter="addNewItem" v-on:keyup.up="previousItem($event)">
        </div>
      </keep-alive>
      <button @click="saveItems" id="saveBtn">Save</button>
      <div class="input">
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
// import db from '../firebase.js'
import checkLogin from '../checkLogin.js'

const rdb = firebase.database()

export default {
  name: 'Dashboard',
  data () {
    return {
      initialItems: '',
      afterItems: [],
      newItem: '',
      isLoggedIn: false,
      userEmail: '',
      // userId: '',
      interval: ''
    }
  },
  created () {
    this.checkLoggedIn()
    // this.interval = setInterval(() => this.saveItems(), 120000)
  },
  mounted () {
    // this.userEmail = this.$store.getters.getUserEmail
    // this.userId = this.$store.getters.getUserName
    this.getListItems()
  },
  methods: {
    checkLoggedIn () {
      const a = checkLogin.checkLocalStorage()
      if (a === true) {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
        this.$router.push('login')
      }
    },
    saveItems () {
      const saveBtn = document.getElementById('saveBtn')
      saveBtn.innerHTML = 'Saving...'
      const v = this
      const ref = rdb.ref('lists/' + 'benelwoods' + '/listItems')
      var i
      // eslint-disable-next-line no-undef
      for (i = 0; i < v.afterItems.length; i++) {
        // eslint-disable-next-line no-undef
        ref.push(v.afterItems[i])
      }
      console.log('done')
      saveBtn.innerHTML = 'Saved!'
      setTimeout(function () {
        saveBtn.innerHTML = 'Save'
      }, 2000)
      // this.interval = setInterval(() => this.saveItems(), 120000)
    },
    getListItems () {
      const v = this
      const ref = rdb.ref('lists/' + 'benelwoods' + '/listItems')
      console.log(ref)
      var data = []
      ref.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          data.push(childSnapshot.val())
        })
      })
      v.initialItems = data
    },
    addNewItem () {
      const v = this
      if ((v.newItem !== '') || (v.newItem !== undefined) || (v.newItem !== null)) {
        // const randInt = function () {
        //   return
        // }
        const item = {
          content: v.newItem,
          key: Math.round(Math.random() * (9999999999 - 20000) + 20000)
        }
        v.afterItems.push(item)
        v.newItem = ''

        console.log(v.afterItems)
      }
    },
    editItem (id, e) {
      // const v = this
      // db.collection('users').doc(v.userEmail).collection('lists').doc(id).update({
      //   content: e.target.value
      // }).then(function () {
      //   // v.getListItems()
      // })
    },
    removeItem (id) {
      // const v = this
      // db.collection('users').doc(v.userEmail).collection('lists').doc(id).delete().then(function () {
      //   console.log('Document removed!')
      //   v.getListItems()
      // })
    },
    nextItem (e) {
      if (e.target.nextSibling !== null) {
        e.target.nextSibling.focus()
      }
    },
    previousItem (e) {
      if (e.target.previousSibling !== null) {
        e.target.previousSibling.focus()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  background-color: #344a5f;
  height: 93vh;
  & .list {
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
}
</style>
