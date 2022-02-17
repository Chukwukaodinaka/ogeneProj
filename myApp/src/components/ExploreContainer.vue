<template>
<!--    <strong>{{ name }}</strong>-->
<!--    <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>-->

  <div id="chatMessages" slot="fixed" style="margin-top: 10px">
    <li v-for="(key,value) in messages" :key="key">{{messages[value]}}</li>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ExploreContainer',
  props:['messages','name'],
  data :function (){
    return{
      count:5
    }
  },
  watch:{
    messages : {
      deep: true,
      handler (val, oldVal) {
        setTimeout(()=>this.$emit('scrollBottom'),10)
      }

    }
  },
  methods:{

  }
  // mounted() {
  //   $refs.input.focus()
  // }
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

/*.chat-thread{*/
/*  margin: 24px auto 0 auto;*/
/*  padding: 0 20px 0 0;*/
/*  list-style: none;*/
/*  overflow-y: scroll;*/
/*  overflow-x: hidden;*/
/*}*/

 li {
  position: relative;
  clear: both;
  display: inline-block;
  padding: 16px 40px 16px 20px;
  margin: 0 0 20px 0;
  font: 16px/20px 'Noto Sans', sans-serif;
  border-radius: 10px;
  background-color: cornflowerblue;
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
  border-top: 15px solid cornflowerblue;
}

li:nth-child(odd) {
  animation: show-chat-odd 0.15s 1 ease-in;
  -moz-animation: show-chat-odd 0.15s 1 ease-in;
  -webkit-animation: show-chat-odd 0.15s 1 ease-in;
  float: right;
  margin-right: 80px;
  color: #0AD5C1;
}

li:nth-child(odd):before {
  right: 80px;
}

li:nth-child(odd):after {
  border-right: 15px solid transparent;
  right: -14px;
  top: 10px;
}

li:nth-child(even) {
  animation: show-chat-even 0.15s 1 ease-in;
  -moz-animation: show-chat-even 0.15s 1 ease-in;
  -webkit-animation: show-chat-even 0.15s 1 ease-in;
  float: left;
  margin-left: 80px;
  color: #0EC879;
}

li:nth-child(even):before {
  left: -80px;
}

li:nth-child(even):after {
  border-left: 15px solid transparent;
  left: -14px;
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
