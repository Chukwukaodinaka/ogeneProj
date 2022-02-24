<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <div class="heading_m">
          <ion-icon :icon="personCircleOutline" style="margin: 5px" size="large"  />
          <ion-title>Welcome {{computedState.username}}!</ion-title>
          <div class="options">
            <ion-icon :icon="callOutline" class="chat_option"/>
            <ion-icon :icon="videocamOutline" class="chat_option"/>
            <ion-icon :icon="ellipsisVerticalOutline" class="chat_option"/>
          </div>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-content  :fullscreen="true">
      <ExploreContainer  id="chatContainer" @scroll-bottom="updateScroll" name="Tab 1 page" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { personCircleOutline,callOutline,videocamOutline,ellipsisVerticalOutline } from 'ionicons/icons'
import ExploreContainer from '@/components/ExploreContainer.vue';
import state from "@/state/main";

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
      videocamOutline,
      ellipsisVerticalOutline
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
