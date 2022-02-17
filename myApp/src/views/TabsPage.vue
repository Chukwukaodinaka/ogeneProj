<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <VuemojiPicker v-if="showEmoji==true" id="emojiPicker" @emojiClick="handleEmojiClick" />
      <ion-tab-bar slot="bottom">
        <ion-icon :icon="addOutline" style="margin: 5px; cursor: pointer; font-size: 23px; color: cornflowerblue" />
        <div class="message_box">
          <ion-input :value="inputMessage" @keyup.enter="sendMessage()"  @ionInput="inputMessage = $event.target.value;"></ion-input>
<!--          onInput$.next($event.target.value)-->
          <ion-icon id="smileyEmoji" @click="showEmoji=!showEmoji" :icon="happyOutline" style="margin: 5px; cursor: pointer; font-size: 23px; color: cornflowerblue"/>
          <ion-icon @click="this.sendMessage()" :icon="sendOutline" style="margin: 5px; cursor: pointer; font-size: 23px; color: cornflowerblue" />
        </div>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonTabBar,  IonTabs, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle, sendOutline,happyOutline,addOutline } from 'ionicons/icons';
import { VuemojiPicker, EmojiClickEventDetail } from 'vuemoji-picker'


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
      messages: ["Hey","Hey","Where are you from :)","I'm from Zimbabwe","I'm from Thailand","I have a penis","same!","a","b","c"]
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

  },
  methods:{
    sendMessage(){
      if(this.inputMessage!=='')
      {
        this.messages.push(this.inputMessage)
        this.inputMessage = ''
      }
    },
    handleEmojiClick(detail) {
      this.inputMessage += detail.unicode
    }
  },
  provide() {
    return {
      messages: this.messages
    }
  }
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
