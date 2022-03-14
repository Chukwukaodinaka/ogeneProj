<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <div class="heading_m">
          <ion-icon :icon="personCircleOutline" style="margin: 5px" size="large"  />
          <ion-title>{{ computedState.chatToId.username }}</ion-title>
          <div class="options">
            <ion-icon :icon="callOutline" class="chat_option"/>
            <ion-icon :icon="thumbsUpOutline" @click="addFriend" class="chat_option"/>
            <ion-icon :icon="ellipsisVerticalOutline" class="chat_option" />
          </div>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content  :fullscreen="true">
      <ExploreContainer  id="chatContainer" @scroll-bottom="updateScroll" name="Tab 1 page" />
    </ion-content>
  </ion-page>
</template>

<script >
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { personCircleOutline,callOutline,videocamOutline,ellipsisVerticalOutline,thumbsUpOutline } from 'ionicons/icons'
import ExploreContainer from '@/components/ExploreContainer.vue';
import state from "@/state/main";
import {getDatabase, push, ref, child,update,get} from "firebase/database";

export default  defineComponent({
  name: 'Tab1Page',
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  data : function () {
    return{
      prevScrollY:0
    }
  },
  computed:{
    computedState: function () {
      return state
    }
  },
  setup(){
    return{
      personCircleOutline,
      callOutline,
      ellipsisVerticalOutline,
      thumbsUpOutline
    }
  },
  // inject : [
  //     'messages'
  // ],
  methods:{
    updateScroll(){

      let element = document.getElementById("chatContainer");
      if(element != null)
      {
        let top = window.scrollY || element.scrollTop
        element.scrollTo({
          top:top + ((element.scrollHeight - element.clientHeight) - this.prevScrollY) ,
          behavior: 'smooth'
        })
        this.prevScrollY = element.scrollHeight - element.clientHeight
      }
    },
    async addFriend() {
      const db = getDatabase()
      let userId = this.computedState.userId
      let friends = []
      const messagesRef = ref(db, 'users/' + userId)
      const dbRef = ref(getDatabase());
      //gets all friends so we can then add to list and then send them back
      await get(child(dbRef, `users/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          if(snapshot.val().friends != null)
          {
            console.log(snapshot.val().friends)
            friends.push(...snapshot.val().friends)
          }

        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
      //makes sure we don't add the same friend twice!
      if(friends.some(friend => friend.id != state.chatToId.id)){
        friends.push(state.chatToId)
      }

      update(messagesRef, {friends: friends})

    }
  }
});
</script>

<style>

html{
  scroll-behavior: smooth;
}

.heading_m{
  display: flex;
}

.options{
  float: right;
  font-size: 25px;
}

.chat_option{
  margin: 5px;
}

ion-content{
  --offset-bottom: 10px !important;
}

#chatContainer{
  position: relative;
  height: 100%;
  overflow-y:scroll;
  padding-top: 5px;
  margin-top: 0px !important;
  background-color: #d8e5eb
}



</style>
