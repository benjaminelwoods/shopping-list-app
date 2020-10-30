<template>
  <div v-if="isLoggedIn" class="create-recipe">
      <div class="image">
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
        <div class=""></div>
        <div class="inner">
          <p>Calories</p>
          <input type="text" placeholder="Calories" v-model="nutrition.calories">
        </div>
        <div class="inner">
          <p>Carbs</p>
          <input type="text" placeholder="Carbs" v-model="nutrition.carbs">
        </div>
        <div class="inner">
          <p>Fat</p>
          <input type="text" placeholder="Fat" v-model="nutrition.fat">
        </div>
        <div class="inner">
          <p>Fibre</p>
          <input type="text" placeholder="Fibre" v-model="nutrition.fibre">
        </div>
        <div class="inner">
          <p>Protein</p>
          <input type="text" placeholder="Protein" v-model="nutrition.protein">
        </div>
        <div class="inner">
          <p>Sugar</p>
          <input type="text" placeholder="Sugar" v-model="nutrition.sugar">
        </div>
      </div>

      <div class="ingredients">
          <p v-for="(item, index) in ingredients" :key="`item-${(index + 1)}`">{{item}} <span @click="removeIngredient"><i class="fas fa-trash-alt"></i></span></p>
          <input type="text" placeholder="e.g. 1/2 Eggplant" @blur="addIngredient($event)" @keyup.enter="addIngredient($event)">
      </div>
      <div class="instructions">
          <div v-for="(item, index) in instructions" :key="`item-${(index + 1)}`">
            <h5>{{(index + 1)}}</h5>
            <p>{{item}}</p>
            <span @click="removeInstruction"><i class="fas fa-trash-alt"></i></span>
          </div>
          <textarea placeholder="e.g. Chop the eggplant into quarters" @blur="addInstruction($event)" @keyup.enter="addInstruction($event)"></textarea>
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
        calories: '',
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
      const key = Math.round(Math.random() * (9999999999 - 20000) + 20000)
      const ref = rdb.ref('recipes/' + 'all' + '/' + key)
      ref.set({
        author: v.author,
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
  & .image {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & .img {
      background: red;
      background-size: cover;
      width: 100px;
      height: 100px;
      border-radius: 100px;
    }
  }
  & input {
      // background: #f2f2f2;
      width: 100%;
      border-bottom: 1px solid #000;
      padding: 12px 15px;
      font-size: 16px;
  }
}
</style>
