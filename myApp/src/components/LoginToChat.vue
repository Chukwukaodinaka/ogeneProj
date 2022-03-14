<template>
  <v-form @submit.prevent="login" v-if="shouldRegister==false">
    <v-card elevation="2" shaped class="mx-12 my-12 pa-3" max-width="600">
      <v-row>
        <v-card-text>
          Click here to <a @click="changeRegister">register</a>
        </v-card-text>
      </v-row>
      <v-row>
        <v-card-title>Log In</v-card-title>
      </v-row>
      <v-row>
        <v-col
            cols="12"
            md="6"
        >
          <v-text-field
              v-model="inputEmail"
              :rules="nameRules"
              :counter="10"
              label="Username"
              required
          ></v-text-field>
        </v-col>

        <v-col
            cols="12"
            md="6"
        >
          <v-text-field
              v-model="inputPassword"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
              required
          ></v-text-field>
        </v-col>
        <v-col cols="12"
               md="12">
          <v-btn
              class="flex-column-reverse"
              type="submit"
          >
            Login
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-form>


  <v-form @submit.prevent="register" v-else>
    <v-card elevation="2" shaped class="mx-12 my-12 pa-3" max-width="600">
      <v-row>
        <v-card-text>
          <div>Already have an account? Click here to <a @click="changeRegister">login</a></div>
        </v-card-text>
      </v-row>
      <v-row>
          <v-card-title>
            Sign Up
          </v-card-title>
      </v-row>
      <v-row>
        <v-col
            cols="12"
            md="6"
        >
          <v-text-field
              v-model="inputUsername"
              :rules="nameRules"
              :counter="10"
              label="Username"
              required
          ></v-text-field>
        </v-col>

        <v-col
            cols="12"
            md="6"
        >
          <v-text-field
              v-model="inputEmail"
              :rules="nameRules"
              :counter="10"
              label="E-mail"
              required
          ></v-text-field>
        </v-col>
        <v-col
            cols="12"
            md="6"
        >
          <v-text-field
              v-model="inputPassword"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>

        <v-col
            cols="12"
            md="6"
        >
          <v-text-field
              v-model="inputRepeatPassword"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
              label="Repeat password"
              required
          ></v-text-field>
        </v-col>
        <v-col
            cols="12"
            md="12"
        >
          <v-textarea
              v-model="inputBio"
              name="input-7-1"
              label="Bio"
              hint="Hint text"
          ></v-textarea>
        </v-col>
        <v-col cols="12"
               md="12">
          <v-btn
              class="flex-column-reverse"
              type="submit"
          >
            Register
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-form>
</template>

<script>
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {getDatabase, onValue, push, ref, set} from "firebase/database";
import state from "@/state/main";


export default {
  name: "LoginToChat",
  data: function () {
    return{
      isLoggedIn : false,
      inputUsername:"",
      inputPassword:'',
      inputEmail:'',
      inputBio:'',
      shouldRegister:false,
      show1: false
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
                state.userId = users.filter(user => user.email === this.inputEmail)[0].id
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
      this.inputEmail=''
      this.inputBio=''
      this.show1= false
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
              available: true,
            })
            state.username = this.inputUsername
            state.userId = this.userId
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
    }

  },
}
</script>

<style scoped>

</style>