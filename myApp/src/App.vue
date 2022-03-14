<template>
  <ion-app>
    <div class="login-form" v-if="computedState.username === '' || computedState.username == null " >
    <LoginToChat/>
    </div>
    <ion-router-outlet v-else/>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import state from './state/main.js'
import LoginToChat from "@/components/LoginToChat";

export default defineComponent({
  name: 'App',
  computed:{
    computedState : function () {
      return state
    }
  },
    components: {
    LoginToChat,
    IonApp,
    IonRouterOutlet
  }
});
</script>

<style>
.login-form{
  overflow-y: auto;
}
</style>
