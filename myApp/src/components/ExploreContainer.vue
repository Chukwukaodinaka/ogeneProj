<template>

  <div id="chatMessages" slot="fixed" style="margin-top: 10px">


    <li v-for="message in computedState.messages" :key="message.id" :class="(message.username == computedState.username ? 'current-user':'not-current-user' )">
      <span class="username">{{message.username}}</span>
      <p>{{message.content}}</p>
<!--      <span>{{new Date().toLocaleTimeString()}}</span>-->
    </li>
  </div>
</template>

<script >
import { defineComponent } from 'vue';
import state from "@/state/main";
import {getDatabase, ref, onValue, set, get, child} from "firebase/database"


export default defineComponent({
  name: 'ExploreContainer',
  props:['name'],
  data :function (){
    return{
      count:5
    }
  },
  computed:{
    computedState(){
      return state
    }
  },
  mounted() {
    const database = getDatabase()
    let a = [state.chatToId.id,state.userId]
    a.sort()
    let path = a.toString()
    console.log(path)

    const dbRef = ref(getDatabase());

    function getMessagesOfSnapshot(path) {
      const messagesRef = ref(database, `messages/${path}`)
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val()
        let messages = []
        Object.keys(data).forEach(key => {
          messages.push({
            id: key,
            username: data[key].username,
            content: data[key].content
          })
        })

        messages.pop()
        state.messages = messages
        console.log(JSON.stringify(state) + "kskdk")
      });
    }

    //gets all friends so we can then add to list and then send them back
     get(child(dbRef, `messages/${path}`)).then((snapshot) => {
      if (snapshot.exists()) {
        getMessagesOfSnapshot(path)
      } else {
        set(ref(database, `messages/${path}`),{
         created:true
        }).then(getMessagesOfSnapshot(path))
      }
    }).catch((error) => {
      console.error(error);
    });
  },
  watch:{
    computedState : {
      deep: true,
      handler (val, oldVal) {
        setTimeout(()=>this.$emit('scrollBottom'),10)
      }
    }
  },
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}

 li {
  position: relative;
  clear: both;
  display: inline-block;
  padding: 16px 40px 7px 20px;
  margin: 0 0 20px 0;
  font: 16px/20px 'Noto Sans', sans-serif;
  border-radius: 10px;
}

/* Chat - Avatar */
li:before {
  position: absolute;
  top: 0;
  width: 80px;
  height: 100px;
  border-radius: 20px;
  content: '';
}

/* Chat - Speech Bubble Arrow */
li:after {
  position: absolute;
  top: 15px;
  content: '';
  width: 0;
  height: 0;
}

/**/
.not-current-user{
  animation: show-chat-even 0.15s 1 ease-in;
  -moz-animation: show-chat-even 0.15s 1 ease-in;
  -webkit-animation: show-chat-even 0.15s 1 ease-in;
  background-color: white;
  float: left;
  margin-left: 80px;
  color: #0EC879;
}

.not-current-user:before {
  left: -80px;
}

.not-current-user:after {
  border-top: 15px solid white;
  border-left: 15px solid transparent;
  left: -14px;
  top: 10px;
}

.current-user {
  animation: show-chat-odd 0.15s 1 ease-in;
  -moz-animation: show-chat-odd 0.15s 1 ease-in;
  -webkit-animation: show-chat-odd 0.15s 1 ease-in;
  float: right;
  margin-right: 80px;
  color: #0e0e0e;
  background-color:cornflowerblue;

}

.current-user:before {
  right: 80px;
}

.current-user:after {
  border-top: 15px solid cornflowerblue;
  border-right: 15px solid transparent;
  right: -14px;
  top: 10px;
}

::-webkit-scrollbar {
  width: 10px;               /* width of the entire scrollbar */
}
::-webkit-scrollbar-track {
  background: transparent;        /* color of the tracking area */
}
::-webkit-scrollbar-thumb {
  border: 2px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  background-color: grey;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  /*border: 3px solid orange;  !* creates padding around scroll thumb *!*/
}

.username{
  font-size: 12px;
  font-family: emoji;
}

/*.chat-window {*/
/*  position: fixed;*/
/*  bottom: 18px;*/
/*}*/

/*.chat-window-message {*/
/*  width: 100%;*/
/*  height: 48px;*/
/*  font: 32px/48px 'Noto Sans', sans-serif;*/
/*  background: none;*/
/*  color: #0AD5C1;*/
/*  border: 0;*/
/*  border-bottom: 1px solid cornflowerblue;*/
/*  outline: none;*/
/*}*/

/* Small screens */
/*  .chat-thread {*/
/*    width: 90%;*/
/*    height: 260px;*/
/*  }*/

/*  .chat-window {*/
/*    left: 5%;*/
/*    width: 90%;*/
/*  }*/
</style>
