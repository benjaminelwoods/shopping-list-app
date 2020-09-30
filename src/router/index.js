import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Budgets from '../views/Budgets.vue'
import Lists from '../views/Lists.vue'
import Settings from '../views/Settings.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import ListView from '../views/ListView.vue'
import MealPlans from '../views/MealPlans.vue'
import Recipes from '../views/Recipes.vue'
import RecipePreview from '../views/RecipePreview.vue'
import CreateRecipe from '../views/CreateRecipe.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/budgets',
    name: 'Budgets',
    component: Budgets
  },
  {
    path: '/lists',
    name: 'Lists',
    component: Lists
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/list-view',
    name: 'ListView',
    component: ListView,
    props: true
  },
  {
    path: '/meal-plans',
    name: 'MealPlans',
    component: MealPlans,
    props: true
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: Recipes,
    props: true
  },
  {
    path: '/recipe-preview',
    name: 'RecipePreview',
    component: RecipePreview,
    props: true
  },
  {
    path: '/create-recipe',
    name: 'CreateRecipe',
    component: CreateRecipe,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
