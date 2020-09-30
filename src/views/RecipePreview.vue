<template>
  <div v-if="isLoggedIn" class="preview">
    <div class="background" v-bind:style="{background: 'url(' + recipe.img + ') no-repeat center center'}">
      <div class="inner">
        <h5>{{recipe.dateCreated}}</h5>
        <h5>{{recipe.author}}</h5>
      </div>
    </div>
    <div class="nutrition">
      <div class="item">
        <h5>Calories</h5>
        <p>{{recipe.nutrition.calories}}</p>
      </div>
      <div class="item">
        <h5>Carbs</h5>
        <p>{{recipe.nutrition.carbs}}g</p>
      </div>
      <div class="item">
        <h5>Fat</h5>
        <p>{{recipe.nutrition.fat}}g</p>
      </div>
      <div class="item">
        <h5>Fibre</h5>
        <p>{{recipe.nutrition.fibre}}g</p>
      </div>
      <div class="item">
        <h5>Protein</h5>
        <p>{{recipe.nutrition.protein}}g</p>
      </div>
      <div class="item">
        <h5>Sugar</h5>
        <p>{{recipe.nutrition.sugar}}g</p>
      </div>
    </div>
    <div class="meta">
      <div class="inner">
        <h5>Difficulty</h5>
        <p>{{recipe.difficulty}}</p>
      </div>
      <div class="inner">
        <h5>Prep Time</h5>
        <!-- <p>{{recipe.prepTime}}</p> -->
        <p>20 mins</p>
      </div>
      <div class="inner">
        <h5>Cooking Time</h5>
        <p>{{recipe.cookingTime}} mins</p>
      </div>
    </div>
    <div class="text-cont">
      <h2>{{recipe.title}}</h2>
      <hr>
      <p>{{recipe.desc}}</p>
    </div>
    <div class="ingredients">
      <h2>Ingredients</h2>
      <div class="inner" v-for="(item, index) in recipe.ingredients" :key="`item-${(index + 1)}`">
        <p>{{item}}</p>
      </div>
    </div>
    <div class="instructions">
      <h2>Instructions</h2>
      <div class="inner" v-for="(item, index) in recipe.instructions" :key="`item-${(index + 1)}`">
        <h5>{{(index + 1) + '.'}}</h5>
        <p>{{item}}</p>
      </div>
      <div class="inner notes">
        <h5>Notes</h5>
        <p>{{recipe.notes}}</p>
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
  name: 'RecipePreview',
  data () {
    return {
      initialItems: '',
      afterItems: [],
      maintainedItems: [],
      newItem: '',
      isLoggedIn: false,
      userEmail: '',
      userId: '',
      interval: '',
      settingsIsActive: false
    }
  },
  props: {
    recipe: {
      type: Object
    }
  },
  created () {
    this.checkLoggedIn()
    if (this.recipe === undefined) {
      this.$router.push('recipes')
    }
  },
  mounted () {
    // console.log(this.recipeKey + ' ' + this.recipeTitle + ' ' + this.recipeDesc + ' ' + this.recipeDate + ' ' + this.recipeBg)
    console.log(this.recipe)
    // this.userEmail = this.$store.getters.getUserEmail
    // this.userId = this.$store.getters.getUserId
    this.getListItems()
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
    settingsToggle () {
      // console.log('mean')
      // if (this.settingsIsActive === true) {
      //   this.settingsIsActive = false
      // } else {
      //   this.settingsIsActive = true
      // }
    },
    saveItems () {
      // const saveBtn = document.getElementById('saveBtn')
      // saveBtn.innerHTML = 'Saving...'
      // const v = this
      // const ref = rdb.ref('lists/' + 'benelwoods' + '/' + v.listName)
      // var i
      // // eslint-disable-next-line no-undef
      // for (i = 0; i < v.afterItems.length; i++) {
      //   // eslint-disable-next-line no-undef
      //   ref.push(v.afterItems[i])
      // }
      // // console.log('done')
      // v.maintainedItems = v.afterItems
      // v.afterItems = []
      // saveBtn.innerHTML = 'Saved!'
      // setTimeout(function () {
      //   saveBtn.innerHTML = 'Save'
      // }, 2000)
      // this.interval = setInterval(() => this.saveItems(), 120000)
    },
    getListItems () {
      const v = this
      const ref = rdb.ref('recipes/' + 'benelwoods' + '/' + v.recipeKey)
      // console.log(ref)
      var data = []
      ref.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          data.push(childSnapshot.val())
        })
      })
      v.initialItems = data
      console.log(v.initialItems)
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
.preview {
  background-color: #fff;
  height: 93vh;
  overflow-y: scroll;
  overflow-x: hidden;
  & > .background {
    width: 100%;
    height: 50vh;
    background-size: cover !important;
    display: flex;
    align-items: flex-end;
    & > .inner {
      width: 100%;
      margin: 2% 0 0 0;
      display: flex;
      justify-content: space-between;
      background: rgb(0,0,0);
      background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
      padding: 15% 5% 0 5%;
      & h5 {
        color: #fff;
      }
    }
  }
  & .nutrition {
    width: 100%;
    display: flex;
    justify-content: center;
    & > :nth-child(even) {
      background: #f9f9f9;
    }
    & > :nth-child(odd) {
      background: #f2f2f2;
    }
    & > .item {
      flex: 1;
      padding: 2% 0;
      // border: 1px solid #000;
      border-right: 0;
      & h5, p {
        margin: 0;
      }
      & h5 {
        color: #999;
        font-family: 'Muli', sans-serif;
        font-weight: 400;
      }
    }
    & > :first-child {
      border-left: 0;
    }
  }
  & .meta {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    & > .inner {
      margin: 7.5% 0 2.5% 0;
      & h5 {
        font-family: 'Muli', sans-serif;
        color: #999;
        font-weight: 400;
        margin: 0 0 5px 0;
        font-size: 14px;
      }
      & p {
        margin: 0;
        font-size: 16px;
      }
    }
  }
  & .text-cont {
    padding: 0 5% 5%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    margin-bottom: 5%;
    & h5, h2, p, hr {
      margin: 5% 0 0 0;
    }
    & h2 {
      font-family: 'Montserrat', sans-serif;
      font-size: 40px;
      line-height: 1em;
      color: #383838;
    }
    & hr {
      width: 30%;
    }
    & p {
      line-height: 1.5em;
      font-size: 17px;
      color: #777;
    }
  }
  & .ingredients {
    box-shadow: 10px 10px 40px rgba(0,0,0,0.3);
    padding: 5% 5% 2% 5%;
    margin: 0 5% 10% 5%;
    text-align: left;
    & h2 {
        margin: 0 0 15px 0;
        font-family: 'Montserrat', sans-serif;
        font-size: 30px;
        line-height: 1em;
        color: #383838;
        background-color: transparent !important;
      }
    & > .inner {
    }
  }
  & .instructions {
    text-align: left;
    & h2 {
      margin: 0 5% 2.5% 5%;
      font-family: 'Montserrat', sans-serif;
      font-size: 30px;
      line-height: 1em;
      color: #383838;
      background-color: transparent !important;
    }
    & > .inner {
        width: 100%;
        padding: 5%;
        display: flex;
      & > h5, p {
        margin: 0;
        line-height: 1.5em;
      }
      & h5 {
        margin-right: 10px;
        font-size: 18px;
      }
      &.notes {
        flex-direction: column;
        background: #f9f9f9;
        padding-bottom: 20%;
      }
    }
  }
}
</style>
