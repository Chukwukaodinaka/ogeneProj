<template>
  <ion-app>
    <div class="login-form" v-if="computedState.username === '' || computedState.username == null " >
      <form @submit.prevent="login" v-if="shouldRegister==false">
        <h1>Login to Chat</h1>
        <label for="eMail">Input your email: </label>
        <input type="text" id="eMail"  v-model="inputEmail" placeholder="Please enter email..." />
        <label for="password">Input your Password: </label>
        <input type="password" id="password"  v-model="inputPassword" placeholder="Please enter password..." />
        <input type="submit" value="Login"/>
        <div>Need an account? Click here to <a @click="changeRegister">register</a></div>
      </form>

      <form @submit.prevent="register" v-else>
        <h1>Sign Up</h1>
        <label for="registerUsername">Input your Username: </label>
        <input type="text" id="registerUsername"  v-model="inputUsername" placeholder="Please enter email..." />
        <label for="registerEmail">Input your email: </label>
        <input type="text" id="registerEmail"  v-model="inputEmail" placeholder="Please enter email..." />
        <label for="registerPassword">Input your Password: </label>
        <input type="password" id="registerPassword"  v-model="inputPassword" placeholder="Please enter password..." />
        <label for="registerBio">Input your Bio: </label>
        <input type="text" id="registerBio" v-model="inputBio"  placeholder="Please enter Bio..." />
        <input type="submit"  value="Register"/>
        <div>Already have an account? Click here to <a @click="changeRegister">login</a></div>
      </form>
    </div>
    <ion-router-outlet v-else/>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth"
import {getDatabase, ref, push, set, onValue} from "firebase/database"
import db from './db/main.js'
import {reactive} from "vue";
import state from './state/main.js'

export default defineComponent({
  name: 'App',
  data: function () {
    return{
      isLoggedIn : false,
      inputUsername:"",
      inputPassword:'',
      inputEmail:'',
      inputBio:'',
      shouldRegister:false
    }
  },
  computed:{
    computedState : function () {
      return state
    }
  },
  methods:{
    login(){
      if(this.inputEmail !== '' || this.inputEmail !== null){
        // state.username = this.inputUsername
        // this.inputUsername = ''
        // console.log(state.username + "##############")

        console.log(this.inputEmail + this.inputPassword + "########")
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.inputEmail, this.inputPassword)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              // state.username = user.email
              // this.inputUsername = ''

              const database = getDatabase()
              const messagesRef = ref(database, 'users')

              onValue(messagesRef, (snapshot) => {
                const data = snapshot.val()
                let users = []
                Object.keys(data).forEach(key => {
                  users.push({
                    id: key,
                    username: data[key].username,
                    email: data[key].email,
                    bio: data[key].bio,
                    loggedIn: data[key].loggedIn
                  })
                })
                 state.username = users.filter(user => user.email === this.inputEmail)[0].username
              })
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
            });

      }
    },
    changeRegister(){
      this.shouldRegister = !this.shouldRegister
      this.inputUsername = ''
      this.inputPassword = ''
    },
    register(){
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.inputEmail, this.inputPassword)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(JSON.stringify(user) + "########")
            // state.username = user.email
            // this.inputUsername = ''

            const database = getDatabase()
            const messagesRef = ref(database,'users')


            const newMessageRef = push(messagesRef);
            set(newMessageRef,{
              email:this.inputEmail,
              username: this.inputUsername,
              bio: this.inputBio,
              loggedIn: true
            })
            state.username = this.inputUsername
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
    }

  },
  components: {
    IonApp,
    IonRouterOutlet
  }
});
</script>
