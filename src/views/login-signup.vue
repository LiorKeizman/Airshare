<template>
  <main class="login-container">
    <div class="overlay-login"></div>
    <section v-if="!this.newUser" class="flex column align-center">
      <form class="login-form" @submit.prevent="doLogin">
        <div class="login-form-body flex column">
          <h1>Welcome back</h1>
          <input autocomplete="username" type="text" class="login-input" name="username" placeholder="Username"
          v-model="loginCred.username" />
          <input autocomplete="password" type="password" class="login-input" name="password" placeholder="Password"
          v-model="loginCred.password" />
          <p>{{ msg }}</p>
          
          
          <!-- <button type="submit" class="login-btn">Submit</button> -->
          <div @click="doLogin" class="btn-container">
            <div v-for="i in 100" class="cell"></div>
            <div class="content">
              <button type="submit" class="action-btn">
                <span>Submit</span> 
              </button>
            </div>
          </div>
          <!-- <GoogleLogin
          :client-id="googleClientId"
          :callback="handleGoogleLogin"
          :error="handleGoogleError"
          />  -->
          <div class="login-actions-btns flex ">
            <button type="button" class="actions-btn" @click="toggleForm()">New user?</button>
          </div>
        </div>
      </form>
    </section>


    <section v-else class="flex column align-center">
      <form class="login-form" @submit.prevent="doSignup">
        <div class="login-form-body flex column">
          <h1>Sign up</h1>
          <input type="text" class="login-input" name="fullname" placeholder="Full name"
            v-model="signupCred.fullname" />
          <input autocomplete="password" name="password" class="login-input" type="password" placeholder="Password"
            v-model="signupCred.password" />
          <input autocomplete="username" type="text" class="login-input" name="username" placeholder="Username"
            v-model="signupCred.username" />
          <p>{{ msg }}</p>
          <div @click="doSignup" class="btn-container">
                <div v-for="i in 100" class="cell"></div>
                <div class="content">
                  <button type="submit" class="action-btn">
                   <span>Sign up</span> 
                  </button>
                </div>
              </div>
              <!-- <button class="login-btn" type="submit">Sign up</button> -->
              <div class="login-actions-btns flex">
                <button type="button" class=" actions-btn" @click="toggleForm()">I already have an account</button>
              </div>
            </div>
        

        
      </form>
    </section>
  </main>
</template>



<script>
import { GoogleLogin } from 'vue3-google-login'
const GOOGLE_CLIENT_ID = ''
import  google  from '../cmps/google-login.vue'


import imgUploader from '../cmps/img-uploader.vue'
export default {
  name: 'login-signup',
  components: {
    imgUploader,
    GoogleLogin,
    google
  },
  data() {
    return {
      newUser: false,
      msg: '',
      loginCred: { username: '', password: '' },
      signupCred: {
        username: '',
        password: '',
        fullname: '',
        imgUrl: 'https://res.cloudinary.com/sprint4-triman/image/upload/v1669793675/elon_mask_ltbtp6.jpg',
        wishList: []
      },
    }
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
    googleClientId() {
      return GOOGLE_CLIENT_ID
    }
  },
  created() {
    this.loadUsers()
  },
  methods: {
    toggleForm() {
      this.newUser = !this.newUser;
      this.msg = "";
    },

    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = 'Please enter username/password'
        return
      }
      try {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred })
        this.$router.push('/')
      } catch (err) {
        console.log(err)
        this.msg = 'Failed to login'
      }
    },
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
    },
    async doSignup() {
      if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username) {
        this.msg = 'Please fill up the form'
        return
      }
      console.log('this.signupCred:', this.signupCred)
      await this.$store.dispatch({ type: 'signup', userCred: this.signupCred })
      this.$router.push('/')

    },
    loadUsers() {
      this.$store.dispatch({ type: "loadUsers" })
    },
    async removeUser(userId) {
      try {
        await this.$store.dispatch({ type: "removeUser", userId })
        this.msg = 'User removed'
      } catch (err) {
        this.msg = 'Failed to remove user'
      }
    }
  }
}
</script>
















<!-- <template>
  <div class="container about">
    <p>{{ msg }}</p>

    <div v-if="loggedinUser">
      <h3>
        Loggedin User:
        {{ loggedinUser.fullname }}
        <button @click="doLogout">Logout</button>
      </h3>
    </div>
    <div v-else>
      <h2>Login</h2>
      <form @submit.prevent="doLogin">
        <select v-model="loginCred.username">
          <option value="">Select User</option>
          <option v-for="user in users" :key="user._id" :value="user.username">{{ user.fullname }}</option>
        </select>
        <input type="text" v-model="loginCred.username" placeholder="User name" />
        <input
          type="text"
          v-model="loginCred.password"
          placeholder="Password"
        /> 
        <button>Login</button>
      </form>
      <p class="mute">user1 or admin, pass:123 </p>
      <form @submit.prevent="doSignup">
        <h2>Signup</h2>
        <input type="text" v-model="signupCred.fullname" placeholder="Your full name" />
        <input type="text" v-model="signupCred.password" placeholder="Password" />
        <input type="text" v-model="signupCred.username" placeholder="Username" />
        <img-uploader @uploaded="onUploaded"></img-uploader>
        <button>Signup</button>
      </form>
    </div>
    <hr />
    <details>
      <summary>
        Admin Section
      </summary>
      <ul>
        <li v-for="user in users" :key="user._id">
          <pre>{{ user }}</pre>
          <button @click="removeUser(user._id)">x</button>
        </li>
      </ul>
    </details>
  </div>
</template>

<script>

import imgUploader from '../cmps/img-uploader.vue'

export default {
  name: 'login-signup',
  data() {
    return {
      msg: '',
      loginCred: { username: 'user1', password: '123' },
      signupCred: { username: '', password: '', fullname: '', imgUrl : '' },
    }
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },
  created() {
    this.loadUsers()
  },
  methods: {
    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = 'Please enter username/password'
        return
      }
      try {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred })
        this.$router.push('/')
      } catch (err) {
        console.log(err)
        this.msg = 'Failed to login'
      }
    },
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
    },
    async doSignup() {
      if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username) {
        this.msg = 'Please fill up the form'
        return
      }
      await this.$store.dispatch({ type: 'signup', userCred: this.signupCred })
      this.$router.push('/')

    },
    loadUsers() {
      this.$store.dispatch({ type: "loadUsers" })
    },
    async removeUser(userId) {
      try {
        await this.$store.dispatch({ type: "removeUser", userId })
        this.msg = 'User removed'
      } catch (err) {
        this.msg = 'Failed to remove user'
      }
    },
    onUploaded(imgUrl) {
      this.signupCred.imgUrl = imgUrl
    }

  },
  components: {
    imgUploader
  }
}
</script> -->


