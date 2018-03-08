<template>
    <scroll :data="ranklist" class="scroll" ref="scroll">
    <ul class="ranklist-ul">
      <li v-for="(item,index) in ranklist"
      :key="index">
       <div class="topic-main">
         <img :src="item.picUrl" alt="" width="80" height="80" @click="selectItem(item)">
         <span class="listen-count">{{nCount(item.listenCount)}}</span>
       </div>
       <div class="topic-info">
         <div class="topic-cont">
           <h4 class="topic-tit">{{item.topTitle}}</h4>
           <p v-for="(text,number) in item.songList" :key="number">
             <span class="order-number">{{number}}</span>
             <span class='text_name'>{{text.songname}}</span>
             <span class="singer_name">-{{text.singername}}</span>
           </p>
         </div>
       </div>
      </li>
    </ul>
  </scroll>
</template>
<script>
import Scroll from "@/base/scroll/scroll";
import { getTopListDetail } from "@/api/rank";
import { mapMutations,mapState } from "vuex";
export default {
  name: "rank-list",
  components: {
    [Scroll.name]: Scroll
  },
  props: {
    ranklist: {
      type: [Array,String],
      default: []
    }
  },
  computed:{
    ...mapState(['playlist'])
  },
  methods: {
    ...mapMutations({
      setToplist: "SET_TOP_LIST"
    }),
    selectItem(item) {
      this.setToplist(item);
      this.$router.push(`/rank/${item.id}`);
    },
    nCount(item) {
      return item / 10000 + "万";
    }
  },
  watch:{
    playlist(newplaylist){
      this.$refs.scroll.refresh()
      console.log('newplaylist')
    }
  }
};
</script>
<style lang="stylus" scoped>
fj() {
  display: flex;
  justify-content: space-between;
}

fs() {
  display: flex;
  justify-content: flex-start;
}

.scroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.ranklist-ul {
  text-align: left;

  li {
    padding: 15px;
    fs();
    .topic-main {
      width: 80px;
      height: 80px;
      position: relative;

      .listen-count {
        position: absolute;
        bottom: 2px;
        width: 100%;
        text-align: center;
        color: #fff;
        font-size: 14px;
      }
    }

    .topic-info {
      width: 80%;

      .topic-cont {
        padding-left: 10px;

        .topic-tit {
          color: #fff;
          font-weight: normal;
          font-size: 16px;
          margin-bottom: 5px;
        }

        p {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 100%;
          color: #fff;

          span {
            color: #fff;
            opacity: 0.8;
            font-size: 15px;
            line-height: 1.4em;
          }
        }
      }
    }
  }
}
</style>
