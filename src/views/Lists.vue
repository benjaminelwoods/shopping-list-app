<template>
  <div class="lists">
    <Loading v-if="loading"/>
    <div class="your-cont">
      <h2>Your Lists</h2>
      <ul v-if="initialItems">
        <li v-for="item in initialItems" :key="item.name" @click="goToListView(item.name)">{{item.name}} <span><i class="fas fa-edit"></i><i class="fas fa-trash-alt"></i></span></li>
        <li id="newItem"><input type="text" @blur="addListToDb" v-model="newListName"><span><i class="fas fa-edit"></i><i class="fas fa-trash-alt"></i></span></li>
      </ul>
      <!-- <p>Loaded</p> -->
      <!-- <ul v-else>
        <li>
          Loading...
        </li>
      </ul> -->
      <div class="new-item-cont" @click="newList">
        <div class="inner">
          <span class="new-item"></span>
          <h5>Add New</h5>
        </div>
      </div>
    </div>
    <div>
      <h2>Shared Lists</h2>
    </div>
    <div class="horizontal-nav">
      <ul>
        <li v-for="item in initialItems" :key="item.name" @click="goToListView(item.name)">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
// import firebase from 'firebase'
import rdb from '../firebase.js'
import checkLogin from '../checkLogin.js'
import Loading from '@/components/Loading.vue'

export default {
  name: 'Lists',
  data () {
    return {
      isLoggedIn: false,
      initialItems: false,
      newListName: '',
      loading: false
    }
  },
  components: {
    Loading
  },
  created () {
    this.checkLoggedIn()
    this.loading = true
  },
  mounted () {
    this.getLists()
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
    getLists () {
      const v = this
      const ref = rdb.ref('lists/' + 'benelwoods')
      var data = []
      ref.once('value', function (snapshot) {
        console.log(snapshot.val())
        snapshot.forEach(function (childSnapshot) {
          data.push(childSnapshot.val())
        })
      })
      console.log(data)
      v.initialItems = data
      this.loading = false
    },
    newList () {
      const input = document.getElementById('newItem')
      if (input.style.display === 'flex') {
        input.childNodes[0].focus()
      } else if (input.style.display === 'none') {
        input.style.display = 'flex'
        input.childNodes[0].focus()
      } else {
        input.style.display = 'flex'
        input.childNodes[0].focus()
      }
    },
    addListToDb () {
      const input = document.getElementById('newItem')
      const v = this
      const ref = rdb.ref('lists/' + 'benelwoods' + '/' + v.newListName)
      if (v.newListName !== '') {
        ref.set({
          name: v.newListName,
          key: Math.round(Math.random() * (9999999999 - 20000) + 20000),
          dateCreated: new Date()
        })
      } else {
        input.style.display = 'none'
      }
    },
    goToListView (listname) {
      this.$router.push({ name: 'ListView', params: { listName: listname } })
    }
  }
}
</script>

<style scoped lang="scss">
.horizontal-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background: #1d2935;
  & > ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow-x: scroll;
    overflow-y: hidden;
    & > li {
      cursor: pointer;
      height: 100%;
      min-width: 100px;
      padding: 15px 20px;
      list-style-type: none;
      background-color: red;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #172029;
        white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & > :not(:last-child) {
      border-right: none;
    }
  }
}

.lists {
  height: 93vh;
  background: #344a5f;
  overflow-x: hidden;
  overflow-y: scroll;
  & h2 {
    margin: 0;
    color: #fff;
    font-weight: 200;
    margin-top: 5%;
  }
  & .your-cont {
    & p {
      color: #fff;
    }
    & ul {
      margin: 5% 0;
      padding: 0;
      & > :nth-child(odd) {
        background: #304457;
      }
       & > :nth-child(even) {
        background: #2c3e50;
      }
      & li {
        display: flex;
        justify-content: space-between;
        list-style-type: none;
        width: 100%;
        padding: 8px 30px;
        color: #fff;
        font-size: 18px;
        & span {
          display: flex;
          & > :first-child {
            margin-right: 10px;
          }
        }
        &#newItem {
          display: none;
            & > input {
            height: 100%;
            font-size: inherit;
            color: inherit;
            margin: 0;
            padding: 0;
            background: transparent;
            outline: none;
            border: none;
            box-shadow: none;
          }
        }
      }
    }
    & .new-item-cont {
      display: flex;
      justify-content: center;
      align-items: center;
      & > .inner {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 25px;
        border: 1px solid #2c3e50;
        cursor: pointer;
        transition: all 0.3s ease;
        background: #2c3e50;
        & > span.new-item::before, & > span.new-item::after {
          background: #2c3e50;
        }
        &:hover {
          background: #42b983;
          border: 1px solid #42b983;
          & > h5 {
            color: #2c3e50;
          }
          & > span.new-item::before, & > span.new-item::after {
            background: #2c3e50;
          }
        }
        & h5 {
          font-size: 16px;
          margin: 0 0 0 -10px;
          color: #fff;
          transition: all 0.3s ease;
        }
        & span.new-item {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          &::before, &::after {
            content: "";
            position: relative;
            display: block;
            background: #fff;
            width: 20px;
            height: 2px;
            border-radius: 2px;
            transition: all 0.3s ease;
          }
          &::after {
            left: -20px;
            transform: rotate(90deg);
          }
        }
      }
    }
  }
}
</style>
