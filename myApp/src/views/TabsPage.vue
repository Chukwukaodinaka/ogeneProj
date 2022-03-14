<template>
  <ion-page>
    <ion-tabs v-if="shouldChat">
      <ion-router-outlet></ion-router-outlet>
      <VuemojiPicker v-if="showEmoji==true" id="emojiPicker" @emojiClick="handleEmojiClick" />
      <ion-tab-bar slot="bottom">
        <ion-icon :icon="addOutline" style="margin: 5px; cursor: pointer; font-size: 23px; color: cornflowerblue" />
        <div class="message_box">
          <ion-input v-model:value="inputMessage" @keyup.enter="sendMessage()"  @ionInput="inputMessage = $event.target.value;"></ion-input>
<!--          onInput$.next($event.target.value)-->
          <ion-icon id="smileyEmoji" @click="showEmoji=!showEmoji" :icon="happyOutline" style="margin: 5px; cursor: pointer; font-size: 23px; color: cornflowerblue"/>
          <ion-icon @click="this.sendMessage()" :icon="sendOutline" style="margin: 5px; cursor: pointer; font-size: 23px; color: cornflowerblue" />
        </div>
      </ion-tab-bar>
    </ion-tabs>
    <div v-else>
      <v-btn type="submit" @click="findRandomChat">Find random Chat</v-btn>
      <h2>Friends</h2>
      <div v-for="(friend,key) in friends" :key="key" >{{friend.username}} <a @click="chatWithFriend(friend)">chat</a></div>
    </div>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonTabBar,  IonTabs, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle, sendOutline,happyOutline,addOutline } from 'ionicons/icons';
import { VuemojiPicker, EmojiClickEventDetail } from 'vuemoji-picker'
import db from "@/db/main";
import state from "@/state/main";
import {getDatabase, ref, push, set, onValue, get, child} from "firebase/database"

export default defineComponent({
  name: 'TabsPage',
  components: {  IonTabs, IonTabBar, IonPage, IonRouterOutlet,VuemojiPicker },

  setup() {
    return {
      ellipse, 
      square, 
      triangle,
      sendOutline,
      happyOutline,
      addOutline
    }
  },
  data : function () {
    return{
      inputMessage:"",
      showEmoji: false,
      messages: [],
      shouldChat: false,
      friends:[]
    }
  },
  mounted() {
    // eslint-disable-next-line
    let VueInstance = this
    window.addEventListener('click', function(e){
      if(VueInstance.showEmoji==true)
        if (document.getElementById('emojiPicker').contains(e.target)){
          console.log("nano")
          void(0)
        } else{
          if(document.getElementById('smileyEmoji').contains(e.target)){
            void(0)
          }
          else{
            console.log("bonjour")
            VueInstance.showEmoji = false
          }
        }
    });
    let userId = state.userId
    const dbRef = ref(getDatabase());

    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        if(snapshot.val().friends != null)
        {
          console.log(snapshot.val().friends)
          this.friends.push(...snapshot.val().friends)
        }

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

  },
  methods:{
    sendMessage(){
      const database = getDatabase()
      let a = [state.chatToId.id,state.userId]
      a.sort()
      let path = a.toString()

      const messagesRef = ref(database,`messages/${path}`)

      console.log(this.inputMessage)
      console.log(this.inputMessage!=="")

      if(this.inputMessage!=="" && this.inputMessage !== null)
      {
        console.log("I love fish")
        const newMessageRef = push(messagesRef);
        set(newMessageRef,{
          username: state.username,
          content: this.inputMessage
        })
        this.inputMessage = ''
      }
    },
    handleEmojiClick(detail) {
      this.inputMessage += detail.unicode
    },
    async findRandomChat() {
      // get all available users
      const database = getDatabase()
      const messagesRef = ref(database, 'users')
      let users = []

      await onValue(messagesRef, (snapshot) => {
        const data = snapshot.val()
        Object.keys(data).forEach(key => {
          users.push({
            id: key,
            username: data[key].username,
            email: data[key].email,
            bio: data[key].bio,
            loggedIn: data[key].loggedIn
          })
        })
      })

      //get one random user
      users = users.filter(user => user.id !== state.userId)
      console.log(users)
      let randUser = users[Math.floor(Math.random() * users.length)];
      //create chat with user
      state.chatToId = {id:randUser.id,username:randUser.username}
      this.shouldChat = true
    },

    chatWithFriend(friend){
      state.chatToId = friend
      this.shouldChat = true
    }

  },
});
</script>

<style scoped>
.message_box{
  border: 1px solid lightgray;
  width: 100%;
  border-radius: 20px;
  display: flex;
  text-align: start;
  padding-left: 10px;
}

#emojiPicker{
  position: fixed;
  bottom: 60px;
  right: 30px;
}

</style>
