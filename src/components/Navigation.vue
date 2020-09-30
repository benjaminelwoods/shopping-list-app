<template>
  <nav class="cont">
      <div class="head">
        <button class="hamburger hamburger--slider" v-bind:class="{isActive: hamActive}" @click="hamburger" type="button">
            <span class="hamburger-box">
                <span class="hamburger-inner"></span>
            </span>
        </button>
        <h2 v-if="dashboard">Hello, <span class="name">{{userName}}</span>!</h2>
        <h2>{{altMsg}}</h2>
      </div>
      <div class="inner" v-bind:class="{isActive: hamActive}">
        <ul>
            <li v-if="isNotLoggedIn" class="menu-item" @click="hamburger"><router-link to="/signup"><i class="fas fa-stream"></i> Sign Up</router-link></li>
            <li v-if="isNotLoggedIn" class="menu-item" @click="hamburger"><router-link to="/login"><i class="fas fa-sign-in-alt"></i> Login</router-link></li>
            <li v-if="isLoggedIn" class="menu-item" @click="hamburger"><router-link to="/"><i class="fas fa-tachometer-alt"></i> Dashboard</router-link></li>
            <li v-if="isLoggedIn" class="menu-item" @click="hamburger"><router-link to="/lists"><i class="fas fa-list-ul"></i> Lists</router-link></li>
            <li v-if="isLoggedIn" class="menu-item" @click="hamburger"><router-link to="/meal-plans"><i class="fas fa-hamburger"></i> Meal Plans</router-link></li>
            <li v-if="isLoggedIn" class="menu-item" @click="hamburger"><router-link to="/recipes"><i class="fas fa-carrot"></i> Recipes</router-link></li>
            <li v-if="isLoggedIn" class="menu-item" @click="hamburger"><router-link to="/budgets"><i class="fas fa-tag"></i> Budgets</router-link></li>
            <li v-if="isLoggedIn" class="menu-item" @click="hamburger"><router-link to="/settings"><i class="fas fa-cogs"></i> Settings</router-link></li>
        </ul>
            <li v-if="isLoggedIn" class="menu-item" @click="preLogout"><a>Logout <i class="fas fa-sign-in-alt"></i></a></li>
      </div>
      <div class="overlay" v-bind:class="{isActive: hamActive}" @click="hamburger"></div>
      <div class="logout-modal" v-bind:class="{isActive: logoutModal}">
        <div class="inner">
          <h3>Are you sure you would like to logout?</h3>
          <a @click="logout(true)">Yes, I'm sure!</a>
          <a @click="logout(false)">Cancel</a>
        </div>
      </div>
  </nav>
</template>

<script>
import checkLogin from '../checkLogin.js'
// import anime from 'animejs/lib/anime.es.js'

export default {
  name: 'Home',
  data () {
    return {
      hamActive: false,
      userName: '',
      logoutModal: false,
      dashboard: false,
      altMsg: '',
      isLoggedIn: false,
      isNotLoggedIn: true
    }
  },
  beforeMount () {
    this.checkLoggedIn()
    this.userName = this.$store.getters.getUserFirstName
    this.whichView(this.$route)
  },
  mounted () {
    // anime({
    //   targets: 'li.menu-item',
    //   translateX: '-200',
    //   direction: 'forwards',
    //   loop: false,
    //   delay: function (el, i, l) {
    //     return i * 100
    //   },
    //   endDelay: function (el, i, l) {
    //     return (l - i) * 100
    //   }
    // })
  },
  created () {
    this.checkLoggedIn()
  },
  watch: {
    $route (to, from) {
      this.whichView(to)
    }
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
    whichView (to) {
      if (to.name === 'Dashboard') {
        this.dashboard = true
        this.altMsg = ''
      } else if (to.name === 'ListView') {
        this.dashboard = false
        this.altMsg = this.$route.params.listName
      } else if (to.name === 'MealPlans') {
        this.dashboard = false
        this.altMsg = 'Meal Plans'
      } else if (to.name === 'RecipePreview') {
        this.dashboard = false
        const recipeName = this.$route.params.recipe.title
        if (recipeName.length > 28) {
          this.altMsg = recipeName.substring(0, 28) + '...'
        } else {
          this.altMsg = recipeName
        }
      } else {
        this.dashboard = false
        this.altMsg = to.name
      }
    },
    hamburger () {
      if (this.hamActive === false) {
        this.hamActive = true
        // anime({
        //   targets: 'li.menu-item',
        //   translateX: 0,
        //   direction: 'forwards',
        //   loop: false,
        //   delay: function (el, i, l) {
        //     return i * 100
        //   },
        //   endDelay: function (el, i, l) {
        //     return (l - i) * 100
        //   }
        // })
      } else {
        this.hamActive = false
        // anime({
        //   targets: 'li.menu-item',
        //   translateX: '-200',
        //   direction: 'forwards',
        //   loop: false,
        //   delay: function (el, i, l) {
        //     return i * 100
        //   },
        //   endDelay: function (el, i, l) {
        //     return (l - i) * 100
        //   }
        // })
      }
    },
    preLogout () {
      this.hamburger()
      this.logoutModal = true
    },
    logout (bool) {
      if (bool === true) {
        console.log('Log user out')
        localStorage.setItem('isLoggedIn', 'false')
        this.$store.commit('setLoggedIn', false)
        this.$router.push('login')
        this.logoutModal = false
      } else {
        this.logoutModal = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
nav.cont {
    overflow: hidden;
    box-shadow: 0px 0px 20px rgba(0,0,0,0.1);
    & > .head {
        height: 7vh;
        background-color: #1d2935;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 0;
        & > h2 {
          font-family: 'ABeeZee', sans-serif;
          font-size: 20px;
          font-weight: 200;
          color: #fff;
          & > .name {
            color: #42b983;
            font-weight: 500;
          }
        }
        // @charset "UTF-8";
        $hamburger-padding-x           : 15px !default;
        $hamburger-padding-y           : 15px !default;
        $hamburger-layer-width         : 30px !default;
        $hamburger-layer-height        : 2px !default;
        $hamburger-layer-spacing       : 6px !default;
        $hamburger-layer-color         : #fff !default;
        $hamburger-layer-border-radius : 4px !default;
        $hamburger-hover-opacity       : 1 !default;
        $hamburger-active-layer-color  : $hamburger-layer-color !default;
        $hamburger-active-hover-opacity: $hamburger-hover-opacity !default;

        // To use CSS filters as the hover effect instead of opacity,
        // set $hamburger-hover-use-filter as true and
        // change the value of $hamburger-hover-filter accordingly.
        $hamburger-hover-use-filter   : false !default;
        $hamburger-hover-filter       : opacity(100%) !default;
        $hamburger-active-hover-filter: $hamburger-hover-filter !default;

        $hamburger-types: (
          slider
        ) !default;

        .hamburger {
          outline: none;
          position: absolute;
          left: 0;
          z-index: 10;
          padding: $hamburger-padding-y $hamburger-padding-x;
          display: inline-block;
          cursor: pointer;

          transition-property: opacity, filter;
          transition-duration: 0.15s;
          transition-timing-function: linear;

          // Normalize (<button>)
          font: inherit;
          color: inherit;
          text-transform: none;
          background-color: transparent;
          border: 0;
          margin: 0;
          overflow: visible;

          &:hover {
            @if $hamburger-hover-use-filter == true {
              filter: $hamburger-hover-filter;
            }
            @else {
              opacity: $hamburger-hover-opacity;
            }
          }

          &.isActive {
            &:hover {
              @if $hamburger-hover-use-filter == true {
                filter: $hamburger-active-hover-filter;
              }
              @else {
                opacity: $hamburger-active-hover-opacity;
              }
            }

            .hamburger-inner,
            .hamburger-inner::before,
            .hamburger-inner::after {
              background-color: $hamburger-active-layer-color;
            }
          }
        }

        .hamburger-box {
          width: $hamburger-layer-width;
          height: $hamburger-layer-height * 3 + $hamburger-layer-spacing * 2;
          display: inline-block;
          position: relative;
        }

        .hamburger-inner {
          display: block;
          top: 50%;
          margin-top: $hamburger-layer-height / -2;

          &,
          &::before,
          &::after {
            width: $hamburger-layer-width;
            height: $hamburger-layer-height;
            background-color: $hamburger-layer-color;
            border-radius: $hamburger-layer-border-radius;
            position: absolute;
            transition-property: transform;
            transition-duration: 0.15s;
            transition-timing-function: ease;
          }

          & {
            width: $hamburger-layer-width - ($hamburger-layer-width / 4);
          }

          &::before,
          &::after {
            content: "";
            display: block;
          }

          &::before {
            top: ($hamburger-layer-spacing + $hamburger-layer-height) * -1;
          }

          &::after {
            bottom: ($hamburger-layer-spacing + $hamburger-layer-height) * -1;
          }
        }

        @if index($hamburger-types, slider) {
          /*
          * Slider
          */
          .hamburger--slider {
            .hamburger-inner {
              top: $hamburger-layer-height / 2;

              &::before {
                top: $hamburger-layer-height + $hamburger-layer-spacing;
                transition-property: transform, opacity;
                transition-timing-function: ease;
                transition-duration: 0.15s;
              }

              &::after {
                top: ($hamburger-layer-height * 2) + ($hamburger-layer-spacing * 2);
              }
            }

            &.isActive {
              .hamburger-inner {
                $y-offset: $hamburger-layer-spacing + $hamburger-layer-height;

                transform: translate3d(0, $y-offset, 0) rotate(45deg);
                & {
                  width: $hamburger-layer-width;
                }

                &::before {
                  transform: rotate(-45deg) translate3d($hamburger-layer-width / -7, $hamburger-layer-spacing * -1, 0);
                  opacity: 0;
                }

                &::after {
                  transform: translate3d(0, $y-offset * -2, 0) rotate(-90deg);
                }
              }
            }
          }
        }
    }
    & > .inner {
        transform: translateX(-100%);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 8;
        height: 100vh;
        background-color: #1d2935;
        padding: 18% 10% 5% 5%;
        transition: all 0.3s ease;
        box-shadow: 0px 0px 60px rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        &.isActive {
            transform: translateX(0);
        }
        & > ul {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            margin: 0;
            padding: 0;
            & > :not(:last-child) {
                margin-bottom: 20px;
            }
        }
        & li {
          // transform: translateX(-100px);
          list-style-type: none;
          & a {
              font-size: 20px;
              color: #fff;
              text-decoration: none;
              &.router-link-exact-active {
                  color: #42b983;
              }
          }
      }
      & > :last-child a {
        cursor: pointer;
        color: #9bb2c8;
      }
    }
    & > .overlay {
      position: absolute;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      opacity: 0;
      z-index: 5;
      transition: all 0.3s ease;
      background-color: #000;
      pointer-events: none;
      &.isActive {
        opacity: 0.5;
        pointer-events: all;
      }
    }
    & > .logout-modal {
      opacity: 0;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 11;
      height: 100vh;
      width: 100vw;
      background-color: rgba(0,0,0,0.5);
      transition: all 0.3s ease;
      & > .inner {
        padding: 12% 3%;
        background-color: #1d2935;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-wrap: wrap;
        box-shadow: 0px 0px 60px rgba(0,0,0,0.3);
        max-height: 0px;
        transition: max-height 0.3s ease;
        & > h3 {
          margin: 0 0 40px 0;
          color: #fff;
          flex-basis: 100%;
        }
        & > a {
          padding: 12px 25px;
          cursor: pointer;
          box-shadow: 0px 0px 30px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
          opacity: 1;
          &:hover {
            opacity: 0.6;
          }
        }
        & :nth-child(2) {
          background-color: #42b983;
        }
        & :nth-child(3) {
          background-color: #2c3e50;
          color: #fff;
        }
      }
      &.isActive {
        opacity: 1;
        pointer-events: all;
        & >.inner {
          transition: max-height 0.3s ease;
          height: auto;
          max-height: 600px;
        }
      }
    }
}
</style>
