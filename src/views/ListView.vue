<template>
  <div v-if="isLoggedIn" class="home">
    <div class="list">
      <keep-alive>
        <div class="inner">
          <input type="text" v-for="item in initialItems.slice(0, -2)" :key="item.content" v-model="item.content" v-on:keyup.enter="editItem(item.id, $event)" v-on:keyup.delete="removeItem(item.id)" v-on:keyup.up="previousItem($event)" v-on:keyup.down="nextItem($event)">
          <input type="text" v-for="item in maintainedItems" :key="item.content" v-model="item.content" v-on:keyup.enter="editItem(item.id, $event)" v-on:keyup.delete="removeItem(item.id)" v-on:keyup.up="previousItem($event)" v-on:keyup.down="nextItem($event)">
          <input type="text" v-for="item in afterItems" :key="item.content" v-model="item.content" v-on:keyup.enter="editItem(item.id, $event)" v-on:keyup.delete="removeItem(item.id)" v-on:keyup.up="previousItem($event)" v-on:keyup.down="nextItem($event)">
          <input type="text" placeholder="Type something..." v-model="newItem" v-on:keyup.enter="addNewItem" v-on:keyup.up="previousItem($event)">
        </div>
      </keep-alive>
      <button @click="saveItems" id="saveBtn">Save</button>
      <div class="settings-btn"></div>
      <div class="settings-modal">
        <div class="inner">
          <div class="head">
            <i class="fas fa-arrow-left"></i>
            <h3>List Settings</h3>
          </div>
          <div class="options">
            <p>List Style</p>
            <div class="inner">
              <input type="checkbox">
            </div>
          </div>
        </div>
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
  name: 'ListView',
  data () {
    return {
      initialItems: '',
      afterItems: [],
      maintainedItems: [],
      newItem: '',
      isLoggedIn: false,
      userEmail: '',
      userId: '',
      interval: ''
    }
  },
  props: {
    listName: {
      type: String
    }
  },
  created () {
    this.checkLoggedIn()
    // this.interval = setInterval(() => this.saveItems(), 120000)
  },
  mounted () {
    // this.userEmail = this.$store.getters.getUserEmail
    this.userId = this.$store.getters.getUserId
    this.getListItems()
    if (this.listName === undefined) {
      this.$router.push('lists')
    }
    // console.log(this.initialItems)
    // console.log(this.afterItems)
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
      const ref = rdb.ref('lists/' + 'benelwoods' + '/' + v.listName)
      var i
      // eslint-disable-next-line no-undef
      for (i = 0; i < v.afterItems.length; i++) {
        // eslint-disable-next-line no-undef
        ref.push(v.afterItems[i])
      }
      // console.log('done')
      v.maintainedItems = v.afterItems
      v.afterItems = []
      saveBtn.innerHTML = 'Saved!'
      setTimeout(function () {
        saveBtn.innerHTML = 'Save'
      }, 2000)
      // this.interval = setInterval(() => this.saveItems(), 120000)
    },
    getListItems () {
      const v = this
      const ref = rdb.ref('lists/' + 'benelwoods' + '/' + v.listName)
      // console.log(ref)
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

        // console.log(v.afterItems)
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
.settings-btn {
  position: absolute;
  top: 18px;
  right: 20px;
  width: 20px;
  height: 20px;
  background: red;
  cursor: pointer;
}

.settings-modal {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 20;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  display: none;
  justify-content: center;
  align-items: center;
  & > .inner {
    width: 80%;
    background:#344a5f;
    & .head {
      background: #1d2935;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      padding: 0 5%;
      & h3 {
        flex: 1;
      }
    }
  }
}

.home {
  background-color: #344a5f;
  height: 93vh;
  & .list {
    & > .inner {
      width: 100%;
      display: flex;
      flex-direction: column;
      & > :nth-child(even) {
        background: #304457;
      }
      & > :nth-child(odd) {
        background: #2c3e50;
      }
      & input {
        outline: none;
        color: #fff;
        width: 100%;
        padding: 8px 20px;
        text-align: left;
      }
    }
  }
}
</style>
