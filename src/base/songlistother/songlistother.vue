<template>
    <ul class="song-list">
      <li class="list-item"
        v-for="(item,index) in songs"
        :key="index"
        @click="selectItem(item,index)"
      >
      <h3 class="ranknumber" v-if="rank">{{index+1}}</h3>
      <div>
        <h4 class="song-name" v-html="item.name"></h4>
      <p>
        <span class="singer-name" v-html="item.singer"></span>
        <span class="seperator">/</span>
        <span class="album-name" v-html="item.album"></span>
      </p>
      </div>
      </li>
    </ul>
</template>
<script>
export default {
  name: "song-single",
  props: {
    songs: {
      type: [Array,String],
      default: function(){
        return []
      }
    },
    rank:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    selectItem(item,index){
      this.$emit('select',item,index)
    }
  }
};
</script>
<style lang="stylus" scoped>
.song-list {
  list-style: none;
  .ranknumber{
    color:orange
    margin-right:20px
    font-size:24px
    font-weight:normal
    }
  .list-item {
    padding: 15px;
    text-align: left;
    display flex
    align-items:center
    h4 {
      font-weight: normal;
      font-size: 16px;
      color:#fff
    }

    p {
      font-size: 14px;
      margin-top: 4px;
      span{
        color:#fff
      }
    }
  }
}
</style>

