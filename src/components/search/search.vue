<template>
  <div class="search">
    <div class="search-container">
      <search-box  @tofocus="tofocus" ref="searchbox" @tosearch="tosearch" @clear="clear"></search-box>
      <span class="search-cancel" v-if="cancel" @click="searchCancel">取消</span>
    </div>
 <div class="search-main"  v-if="indexShow" ref="mainscroll">
     <scroll :data="todoList" class="todo-scroll" ref="todoscroll">
    <div class="search-index">
      <h3>热门搜索</h3>
      <div class="hotkey">
        <span class="sepcial" @click="tospecial">{{specialKey}}</span>
        <span v-for="(item,index) in hotKey" :key="index" v-if="index<10" @click="HotSearchKeyClick(item.k)">{{item.k}}</span>
      </div>
      <todo-list :todolist="todoList" @Todo="TodoSearch"></todo-list>
  </div>
  </scroll>
 </div>
  <div class="search-upper" v-if="resultShow" ref="nextscroll">
  <scroll :data="songs" class="scroll" ref="scroll">
    <div class="search-inner">
    <ul class="search-result">
    <li v-for="(item,index) in singerlist" :key="index" @click="toSingerDetail(item)">
      <div class="img-box" v-if="item.avatar">
        <img :src="item.avatar" alt="" width="50" height="50">
      </div>
      <div class="singer-detail">
        <div class="singer-name">
          {{item.name}}
        </div>
        <div class="count">
          <span class="album-count">专辑:{{item.albumnum}}</span>
          <span class="song-count">单曲:{{item.songnum}}</span>
        </div>
      </div>
    </li>
  </ul>
  <song-single :songs="songs" @select="select"></song-single>
  </div>
  </scroll>
  </div>
  <loading v-if="loading&&!indexShow">
  </loading>
  </div>
</template>
<script>
import Searchbox from "@/base/searchbox/searchbox";
import Todo from "@/base/todo/todo";
import { getHotKey, getSearchResult } from "@/api/search";
import SonglistOther from "@/base/songlistother/songlistother";
import { createSong } from "@/common/js/song";
import { mapMutations, mapActions } from "vuex";
import Scroll from "@/base/scroll/scroll";
import { miniplayerMixin } from "@/mixin/miniplayerMixin";
import Loading from "@/base/loading/loading";
export default {
  name: "search",
  mixins: [miniplayerMixin],
  components: {
    [Searchbox.name]: Searchbox,
    [Todo.name]: Todo,
    [SonglistOther.name]: SonglistOther,
    [Scroll.name]: Scroll,
    [Loading.name]: Loading
  },
  data() {
    return {
      cancel: false,
      hotKey: [],
      specialKey: "",
      specialUrl: "",
      indexShow: true,
      resultShow: false,
      todoList: [],
      singerlist: "",
      songs: "",
      loading: false
    };
  },
  watch: {
    todoList(newlist) {
      this.$refs.todoscroll.refresh();
    }
  },
  created() {
    getHotKey().then(res => {
      this.hotKey = res.data.hotkey;
      this.specialKey = res.data["special_key"];
      this.specialUrl = res.data["special_url"];
    });
  },
  methods: {
    ...mapMutations({
      setSinger: "SET_SINGER"
    }),
    TodoSearch(item){
      this.tofocus()
      this.tosearch(item)
    },
    HotSearchKeyClick(text) {
      this.tofocus();
      this.tosearch(text);
    },
    handlePlaylist(playlist) {
      let bottom = playlist.length > 0 ? "65px" : "0";
      if (this.$refs.mainscroll) {
        this.$refs.mainscroll.style.bottom = bottom;
        this.$refs.todoscroll.refresh();
      }
      if (this.$refs.nextscroll) {
        this.$refs.nextscroll.style.bottom = bottom;
        this.$refs.scroll.refresh();
      }
    },
    ...mapActions(["selectPlay"]),
    select(item, index) {
      this.selectPlay({
        list: this.songs,
        index: index
      });
    },
    toSingerDetail(item) {
      this.$router.push(`/singer/${item.singermid}`);
      this.setSinger(item);
      console.log(item);
    },
    tofocus() {
      this.cancel = true;
      this.$refs.searchbox.$el.style.transition = "all .3s";
      this.$refs.searchbox.$el.style.width = "90%";
      this.indexShow = false;
    },
    searchCancel() {
      this.$refs.searchbox.$data.text = "";
      this.cancel = false;
      this.$refs.searchbox.$el.style.width = "100%";
      this.indexShow = true;
      this.resultShow = false;
      setTimeout(() => {
        this.$refs.todoscroll.refresh();
      }, 20);
    },
    tospecial() {
      window.location.href = this.specialUrl;
    },
    clear() {
      this.resultShow = false;
    },
    tosearch(text) {
      this.loading = true;
      if (text) {
        this.resultShow = true;
      }
      let arr = [];
      if (localStorage.getItem("todo")) {
        arr = localStorage.getItem("todo").split(",");
      }
      if (arr.indexOf(text) < 0) {
        arr.push(text);
      }
      localStorage.setItem("todo", arr);
      this.songs = [];
      getSearchResult(text).then(res => {
        if (res.data.zhida.type === 2) {
          this.singerlist = this._normalizeSinger(res.data.zhida);
          console.log(this.singerlist);
        } else {
          this.singerlist = [];
        }
        res.data.song.list.forEach((item, index) => {
          let song = createSong(item);
          this.songs.push(song);
          this.loading = false;
        });
      });
    },
    _normalizeSinger(list) {
      let arr = [];
      let singer = {
        id: list.singermid,
        name: list.singername,
        avatar: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${
          list.singermid
        }.jpg?max_age=2592000`,
        songnum: list.songnum,
        albumnum: list.albumnum
      };
      arr.push(singer);
      return arr;
    }
  }
};
</script>

<style lang="stylus" scoped>
.search-container {
  position: relative;

  .search-cancel {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
  }
}

.search-index {
  padding: 10px;
  overflow: hidden;
  margin-top: 10px;

  h3 {
    text-align: left;
    color: #fff;
    font-weight: normal;
    margin-bottom: 10px;
  }

  .hotkey {
    overflow: hidden;

    span {
      float: left;
      display: inline-block;
      border: 2px solid orange;
      line-height: 26px;
      height: 26px;
      border-radius: 15px;
      padding: 0 10px;
      margin: 5px 0;
      margin-right: 5px;
      color: #ccc;

      &.sepcial {
        border: 2px solid red;
        color: red;
      }
    }
  }
}

.search-result {
  li {
    padding: 5px 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .img-box {
      width: 50px;
      height: 50px;
      overflow: hidden;
      border-radius: 50%;
      margin-right: 10px;
    }

    .singer-detail {
      .singer-name {
        font-size: 16px;
        color: orange;
        margin-bottom: 5px;
        text-align: left;
      }

      .count {
        span {
          font-size: 14px;
          color: #ccc;
        }
      }
    }
  }
}

.search-upper, .search-main {
  top: 140px;
  width: 100%;
  position: fixed;
  bottom: 0;
  overflow: hidden;
  .scroll, .todo-scroll {
    height: 100%;
    overflow: hidden;
  }
}
</style>
