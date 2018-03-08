<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
   <keep-alive >
    <router-view v-if="$route.meta.keepAlive"></router-view>
   </keep-alive>
   <router-view v-if="!$route.meta.keepAlive"></router-view>
    <player>
    </player>
  </div>
</template>

<script>
import Header from "@/components/m-header/m-header";
import Player from "@/components/player/player";
import Tab from "@/components/tab/tab";
import getRecommend from "@/api/recommend";
import Vue from "vue";
export default {
  name: "App",
  components: {
    [Header.name]: Header,
    [Tab.name]: Tab,
    [Player.name]: Player
  }
};
</script>

<style>
/* z主动学习 勇于面对 勤于思考 */
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top:60px;
  position:fixed;
  top:0px;
  bottom:0px;
  width:100%;
  background:url('../static/timg1.jpg') no-repeat;
  background-size:cover;
  background-position:center center
}
*{
  touch-action:none
}
</style>
