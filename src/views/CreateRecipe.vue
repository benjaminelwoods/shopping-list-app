<template>
  <div v-if="isLoggedIn" class="create-recipe">
      <div class="">
        <div class="img"></div>
        <p>Image</p>
        <input type="file">
      </div>

      <p>Title</p>
      <input type="text" placeholder="Title" v-model="title">
      <p>Author</p>
      <input type="text" placeholder="Author" v-model="author">
      <p>Cooking Time</p>
      <input type="number" placeholder="Cooking Time" v-model="cookingTime">
      <p>Prep Time</p>
      <input type="number" placeholder="Prep Time" v-model="prepTime">
      <p>Description</p>
      <textarea cols="30" rows="10" placeholder="Description" v-model="description"></textarea>
      <p>Difficulty</p>
      <input type="text" placeholder="Difficulty" v-model="difficulty">
      <p>Servings</p>
      <input type="number" placeholder="Servings" v-model="servings">
      <p>Tags (Separate with "|")</p>
      <input type="text" placeholder="Tags" v-model="tags">

      <div class="nutrition">
        <h3>Nutrition</h3>
        <p>Calories</p>
        <input type="text" placeholder="Calories" v-model="nutrition.calores">
        <p>Carborhydrates</p>
        <input type="text" placeholder="Carborhydrates" v-model="nutrition.carbs">
        <p>Fat</p>
        <input type="text" placeholder="Fat" v-model="nutrition.fat">
        <p>Fibre</p>
        <input type="text" placeholder="Fibre" v-model="nutrition.fibre">
        <p>Protein</p>
        <input type="text" placeholder="Protein" v-model="nutrition.protein">
        <p>Sugar</p>
        <input type="text" placeholder="Sugar" v-model="nutrition.sugar">
      </div>

      <div class="ingredients">
          <!-- <input type="text" placeholder="e.g. 1/2 Eggplant" v-for="(item, index) in ingredients" :key="`item-${(index + 1)}`"> -->
          <p v-for="(item, index) in ingredients" :key="`item-${(index + 1)}`">{{item}} <span @click="removeIngredient"><i class="fas fa-trash-alt"></i></span></p>
          <input type="text" placeholder="e.g. 1/2 Eggplant" @blur="addIngredient($event)">
          <!-- <a>Add an Ingredient</a> -->
      </div>
      <div class="instructions">
          <!-- <input type="text" placeholder="e.g. 1/2 Eggplant" v-for="(item, index) in ingredients" :key="`item-${(index + 1)}`"> -->
          <div v-for="(item, index) in instructions" :key="`item-${(index + 1)}`">
            <h5>{{(index + 1)}}</h5>
            <p>{{item}}</p>
            <span @click="removeInstruction"><i class="fas fa-trash-alt"></i></span>
          </div>
          <textarea placeholder="e.g. Chop the eggplant into quarters" @blur="addInstruction($event)"></textarea>
          <!-- <a>Add an Ingredient</a> -->
      </div>

      <button @click="addRecipe">Save!</button>

  </div>
</template>

<script>
import firebase from 'firebase'
// import db from '../firebase.js'
import checkLogin from '../checkLogin.js'
var moment = require('moment')

const rdb = firebase.database()

export default {
  name: 'CreateRecipe',
  data () {
    return {
      isLoggedIn: false,
      userEmail: '',
      userId: '',
      ingredients: [],
      instructions: [],
      author: '',
      cookingTime: '',
      description: '',
      difficulty: '',
      img: '',
      notes: '',
      nutrition: {
        calores: '',
        carbs: '',
        fat: '',
        fibre: '',
        protein: '',
        sugar: ''
      },
      prepTime: '',
      servings: '',
      tags: '',
      title: ''
    }
  },
  created () {
    this.checkLoggedIn()
  },
  mounted () {
    // this.userEmail = this.$store.getters.getUserEmail
    // this.userId = this.$store.getters.getUserId
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
    addIngredient (e) {
      this.ingredients.push(e.target.value)
      e.target.value = ''
    },
    addInstruction (e) {
      this.instructions.push(e.target.value)
      e.target.value = ''
    },
    removeIngredient (e) {
      const value = e.target.parentElement.parentElement.parentElement.textContent
      this.ingredients.splice(this.ingredients.indexOf(value), 1)
    },
    removeInstruction (e) {
      const value = e.target.parentElement.parentElement.parentElement.textContent
      this.instructions.splice(this.instructions.indexOf(value), 1)
    },
    addRecipe () {
      const v = this
      // const description = 'Celebrate the humble sprout with this insanely delicious recipe. Crisp cubes of apple provide beautiful sweetness, while sausage – and Worcestershire sauce (my secret ingredient) – gives a contrasting savoury kick. Serve straight from the pan or make ahead and crisp it all up in the oven on the big day – both ways work!'
      const key = Math.round(Math.random() * (9999999999 - 20000) + 20000)
      const ref = rdb.ref('recipes/' + 'benelwoods' + '/' + key)
      ref.set({
        title: v.title,
        desc: v.description,
        shortDesc: v.description.substring(0, 50),
        img: v.img,
        servings: v.servings,
        prepTime: v.prepTime,
        cookingTime: v.cookingTime,
        difficulty: v.difficulty,
        tags: v.tags,
        nutrition: v.nutrition,
        ingredients: v.ingredients,
        instructions: v.instructions,
        notes: v.notes,
        key: key,
        dateCreated: moment().format('MMMM Do YYYY')
      })
      console.log('done')
    },
    getListItems () {
    //   const v = this
    //   const ref = rdb.ref('recipes/' + 'benelwoods' + '/' + v.recipeKey)
    //   // console.log(ref)
    //   var data = []
    //   ref.once('value', function (snapshot) {
    //     snapshot.forEach(function (childSnapshot) {
    //       data.push(childSnapshot.val())
    //     })
    //   })
    //   v.initialItems = data
    //   console.log(v.initialItems)
    },
    addNewItem () {
    //   const v = this
    //   if ((v.newItem !== '') || (v.newItem !== undefined) || (v.newItem !== null)) {
    //     // const randInt = function () {
    //     //   return
    //     // }
    //     const item = {
    //       content: v.newItem,
    //       key: Math.round(Math.random() * (9999999999 - 20000) + 20000)
    //     }
    //     v.afterItems.push(item)
    //     v.newItem = ''

    //     // console.log(v.afterItems)
    //   }
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
    }
  }
}
</script>

<style scoped lang="scss">
.create-recipe {
  background-color: #fff;
  height: 93vh;
  overflow-y: scroll;
  overflow-x: hidden;
  & input {
      background: #f2f2f2;
  }
}
</style>
