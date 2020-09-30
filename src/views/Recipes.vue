<template>
  <div class="lists">
    <Loading v-if="loading"/>
    <div class="your-cont">
      <h2>Your Recipes</h2>
      <ul v-if="initialItems">
        <li v-for="item in initialItems" :key="item.name" @click="goToRecipeView(item.name)">{{item.name}}</li>
        <li id="newItem"><input type="text" @blur="addListToDb" v-model="newListName"><span><i class="fas fa-edit"></i><i class="fas fa-trash-alt"></i></span></li>
      </ul>
    </div>
    <div>
      <h2>Shared Recipes</h2>
    </div>
    <!-- <div class="horizontal-nav">
      <ul>
        <li v-for="item in initialItems" :key="item.name" @click="goToRecipeView(item.name)">{{item.name}}</li>
      </ul>
    </div> -->
    <div class="settings-btn" @click="openRecipeSelector">
      <span class="new-item"></span>
    </div>

    <div class="recipe-selector">
      <div class="head">
        <h3 @click="addListToDb">Add Recipes</h3>
        <i class="fas fa-times"></i>
      </div>
      <div class="inner">
        <div v-for="item in recipesToAdd" :key="item.key" @click="recipePreview(item)">
          <div class="background" v-bind:style="{background: 'url(' + item.img + ') no-repeat center center'}"></div>
          <div class="text-cont">
            <h5>{{item.title}}</h5>
            <p>{{item.shortDesc}}...</p>
          </div>
        </div>
      </div>
      <div class="new-item-cont">
        <div class="inner" @click="createRecipe">
          <span class="new-item"></span>
          <h5>Add Your Own</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rdb from '../firebase.js'
import checkLogin from '../checkLogin.js'
import Loading from '@/components/Loading.vue'
var moment = require('moment')

export default {
  name: 'Recipes',
  data () {
    return {
      isLoggedIn: false,
      initialItems: false,
      newListName: '',
      loading: false,
      username: '',
      recipeSelector: false,
      recipesToAdd: ''
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
      const ref = rdb.ref('recipes/' + 'benelwoods')
      var data = []
      ref.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          // var descOrig = childSnapshot.val().desc
          // var length = 50
          // var trimmed = descOrig.substring(0, length)
          // childSnapshot.val().desc = trimmed
          // console.log(childSnapshot.val().desc)
          data.push(childSnapshot.val())
        })
      })
      v.recipesToAdd = data
      console.log(v.recipesToAdd)
      this.loading = false
    },
    openRecipeSelector () {
      if (this.recipeSelector === true) {
        this.recipeSelector = false
      } else {
        this.recipeSelector = true
      }
    },
    recipePreview (item) {
      // console.log(item)
      this.$router.push({
        name: 'RecipePreview',
        params: {
          recipe: item
        }
      })
    },
    createRecipe () {
      this.$router.push('create-recipe')
    },
    addListToDb () {
      // const input = document.getElementById('newItem')
      // const v = this
      // const ref = rdb.ref('recipes/' + v.username + '/' + v.newListName)
      // if (v.newListName !== '') {
      //   ref.set({
      //     name: v.newListName,
      //     key: Math.round(Math.random() * (9999999999 - 20000) + 20000),
      //     dateCreated: new Date()
      //   })
      // } else {
      //   input.style.display = 'none'
      // }
      // const v = this
      const description = 'Celebrate the humble sprout with this insanely delicious recipe. Crisp cubes of apple provide beautiful sweetness, while sausage – and Worcestershire sauce (my secret ingredient) – gives a contrasting savoury kick. Serve straight from the pan or make ahead and crisp it all up in the oven on the big day – both ways work!'
      const key = Math.round(Math.random() * (9999999999 - 20000) + 20000)
      const ref = rdb.ref('recipes/' + 'benelwoods' + '/' + key)
      ref.set({
        title: 'Best-ever Brussels sprouts',
        desc: description,
        shortDesc: description.substring(0, 50),
        img: 'https://cafedelites.com/wp-content/uploads/2018/05/Honey-Garlic-Pork-Chops-IMAGE-54.jpg',
        servings: 6,
        prepTime: '',
        cookingTime: 30,
        difficulty: 'Not too tricky',
        tags: 'Vegetable|Christmas|Sunday Lunch| Mains',
        nutrition: {
          calories: 158,
          fat: 8.7,
          sugar: 8.9,
          protein: 8.5,
          carbs: 12,
          fibre: 1
        },
        ingredients: [
          '800 g Brussels sprouts',
          '2 higher-welfare Cumberland sausages',
          '½ a bunch of fresh sage , (15g)',
          '20 g unsalted butter',
          '1 onion',
          '1 sweet eating apple',
          '1 tablespoon Worcestershire sauce'
        ],
        instructions: [
          'Trim the Brussels and peel away any tatty outer leaves, halving any larger ones and keeping the smaller ones whole. Cook in a large pan of boiling salted water for 5 minutes, then drain and leave to steam dry. ',
          'Melt the butter in a large frying pan on a medium-low heat. Pick and add half the sage leaves, cook for 3 minutes, or until crispy, then tip into a small bowl.',
          'Place the pan back on the heat and squeeze the sausage meat from the skins directly into the pan, breaking it up with the back of a spoon. Cook for 3 to 5 minutes, until golden and crispy, while you peel and finely slice the onion, and pick and finely chop the remaining sage.',
          'Add the onion and chopped sage to the pan and cook for 5 minutes on a medium-high heat, or until the onions have softened, stirring occasionally.',
          'Peel and core the apple, then finely dice. Tip into the pan, and add the sprouts too, then add the Worcestershire sauce and toss until hot through.',
          'Transfer to a serving platter, scatter over the crispy sage leaves, and dig in!'
        ],
        notes: 'For a veggie-friendly version, swap the sausages for chopped chestnuts, and use anchovy-free Worcestershire sauce.',
        key: key,
        dateCreated: moment().format('MMMM Do YYYY')
      })
      console.log('done')
    }
    // goToListView (listname) {
    //   this.$router.push({ name: 'ListView', params: { listName: listname } })
    // }
  }
}
</script>

<style scoped lang="scss">
.recipe-selector {
  // display: none;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 20;
  & > .head {
    position: fixed;
    width: 100%;
    height: 7vh;
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5%;
    color: #fff;
    & h3 {
      margin: 0;
      flex: 1;
    }
    & svg {
      font-size: 24px;
    }
  }
  & > .inner {
    overflow-y: scroll;
    overflow-x: hidden;
    margin-top: 7vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2.5% 0;
    & > div {
      width: 95%;
      margin-bottom: 20px;
      box-shadow: 10px 10px 30px rgba(0,0,0,0.1);
      display: flex;
      justify-content: flex-start;
      padding: 0;
      & .background {
        background-size: cover !important;
        min-height: 100px;
        min-width: 35%;
      }
      & > .text-cont {
        padding: 2% 5%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        text-align: left;
        & > h5 {
          font-family: 'Montserrat', sans-serif;
          font-size: 30px;
          line-height: 1.1em;
          margin: 0 0 5px 0;
        }
        & > p {
          margin: 0;
          font-size: 16px;
        }
      }
    }
  }
      & .new-item-cont {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      bottom: 5%;
      left: 0;
      right: 0;
      margin: 0 auto;
      & > .inner {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 25px;
        border: 1px solid #2c3e50;
        cursor: pointer;
        transition: all 0.3s ease;
        background: #2c3e50;
        box-shadow: 10px 10px 30px rgba(0,0,0,0.3);
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

.settings-btn {
  position: absolute;
  top: 0px;
  right: 20px;
  width: 40px;
  height: 7vh;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
  }
}
</style>
