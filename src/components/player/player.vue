<template>
  <div class="player" v-if="playlist.length>0">
    <transition name="normal"
    @enter = 'enter'
    @after-enter = 'afterenter'
    @leave  = 'leave'
    @after-leave = 'afterleave'
    >
    <div class="normal-player" v-if="fullScreen">
    <div class="bg-box" :style="bgImage">
    </div>
      <div class="play-header">
        <i class="fa fa-angle-left" @click="back"></i>
         <div class="text">
           <h3 class="currentSong-name">{{currentSong.name}}</h3>
           <p class="singer-name">{{currentSong.singer}}</p>
         </div>
        <span></span>
      </div>

    <div class="middle"
        @touchstart.prevent="lyricStart"
        @touchmove.prevent="lyricMove"
        @touchend.prevent="lyricEnd"
      >
      <div class="middle-left" ref="middleLeft">
        <div :class="isrotate" ref="album" class="currentsong-album">
          <img :src="currentSong.image" alt="歌曲唱片未能正确显示">
        </div>
          <div class="lyric-wrapper">
            <div class="playing-lyric">{{playingLyric}}</div>
          </div>
      </div>
        <div class="lyric-list"
          ref="lyriclist"
          >
          <lyric :lyric="realLyricLine" :lineNum="currentLineNum">
          </lyric>
      </div>
    </div>
    <div class="control-banner">
      <span :class="{'active':currentShow==='album'}"></span>
      <span :class="{'active':currentShow === 'lyric'}"></span>
    </div>
      <div class="play-footer">
        <div class="progress-bar">
          <span class="time-now" v-html="normalizecurrentTime"></span>
          <div class="progress-bar-line">
            <progress-bar :precent='precent' @changecurrentTime="changeTime"></progress-bar>
          </div>
          <span class="time-duration">{{nromalizeduration}}</span>
        </div>
        <ul>
          <li><i class="fa fa-random"></i></li>
          <li><i class="fa fa-backward" @click.stop="prev"></i></li>
          <li class="toggleplay-container"><i :class="playbtn" @click="toogleplay"></i></li>
          <li><i class="fa fa-forward" @click.stop="next"></i></li>
          <li><i :class="collectStyle" @click.stop="collectSong(currentSong)"></i></li>
        </ul>
      </div>
      <div class="commentbtn">
      <i class="fa fa-commenting" @click="tocomment"></i>
    </div>
    </div>
    </transition>
    <transition name="mini">
    <div class="mini-player" @click="full" v-if="!fullScreen" ref="mini">
      <div class="mini-player-left">
        <div :class="isrotate" ref="mini"><img :src="currentSong.image" alt="" width="50" height="50"></div>
        <div class="mini-player-left-text">
          <span class="song-name">{{currentSong.name}}</span>
          <span class="singer-name">{{currentSong.singer}}</span>
        </div>
      </div>
      <div class="mini-player-right">
        <i :class="playbtn" @click.prevent.stop="toogleplay"></i>
        <i class="fa fa-music" @click.stop.prevent="openplaylist"></i>
      </div>
    </div>
    </transition>
    <audio :src="currentSong.url" ref="audio" 
    @playing="ready" 
    @error="error" 
    @timeupdate="timeupdate"
    @durationchange="durationchange"></audio>
    <play-list v-if="toggleplaylistshow" @close="closeplaylist" :style="{bottom:playlistbottom}" ref="playlist">
    </play-list>  
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import keyanimation from "create-keyframe-animation"; //js动画库
import ProgressBar from "@/base/progressbar/progressbar";
import Lyric from "lyric-parser"; //歌词解释插件
import LyricComponent from "@/base/lyric/lyric";
import Playlist from "@/components/playlist/playlist";
import { collectMixin } from "@/mixin/collectMixin";
export default {
  name: "player",
  mixins: [collectMixin],
  data() {
    return {
      songready: false,
      duration: "00:00",
      currentTime: "00:00",
      realLyricLine: [],
      currentLineNum: 0,
      touch: {},
      currentShow: "album",
      playingLyric: "", //当前的歌词
      toggleplaylistshow: false
    };
  },
  components: {
    [ProgressBar.name]: ProgressBar,
    [LyricComponent.name]: LyricComponent,
    [Playlist.name]: Playlist
  },
  computed: {
    ...mapState([
      "fullScreen",
      "playlist",
      "playing",
      "currentIndex",
      "favouritelist",
      "playhistory"
    ]),
    ...mapGetters(["currentSong", "getPlayHistory"]),
    //背景图片
    bgImage() {
      return `background-image:url(${this.currentSong.image})`;
    },
    //playlist-bottom
    playlistbottom() {
      return this.fullScreen ? "0px" : "0px";
    },
    //播放按钮切换
    playbtn() {
      return this.playing ? "fa fa-pause" : "fa fa-play";
    },
    //播放的时候唱片旋转
    isrotate() {
      return this.playing
        ? "album album-rotate"
        : "album album-rotate album-pause";
    },
    //格式化当前歌曲的播放时间点
    normalizecurrentTime() {
      return this.currentTime
        ? this.normalizesecond(this.currentTime)
        : "00:00";
    },
    //格式化歌曲持续时间
    nromalizeduration() {
      return this.normalizesecond(this.duration);
    },
    //歌曲进度的百分比
    precent() {
      return this.currentTime / this.duration;
    }
    //收藏按钮样式
  },
  methods: {
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN", //是否全屏
      setPlayingState: "SET_PLAYING_STATE", //设置播放状态
      setCurrentIndex: "SET_CURRENT_INDEX" //当前歌曲的索引
    }),
    ...mapActions(["savePlayHistoryList"]),
    created() {
      // window.addEventListener("click",throttle(this.next,500,800))
    },
    tocomment() {
      this.$router.push("/comment");
    },
    //打开播放列表
    openplaylist() {
      this.playliststyle(true, "100%");
    },
    //关闭播放列表
    closeplaylist() {
      this.playliststyle(false, "0");
    },
    playliststyle(bool, str) {
      this.toggleplaylistshow = bool;
      this.$refs.mini.style.transition = "all .3s";
      this.$refs.mini.style.transform = "translate3d(0," + str + ",0)";
    },
    //点击进度条的时候改变当前歌曲的currentTime
    changeTime(precent) {
      this.$refs.audio.currentTime = this.duration * precent;
      const currentTime = this.currentSong.duration * precent;
      if (this.realLyric) {
        this.realLyric.seek(currentTime * 1000);
      }
    },
    //audio 的 timeupdate 事件
    timeupdate(e) {
      this.currentTime = e.target.currentTime;
      if (e.target.currentTime === e.target.duration) {
        if (this.currentIndex + 1 < this.playlist.length) {
          let index = this.currentIndex + 1;
          this.setCurrentIndex(index);
        } else {
          this.setCurrentIndex(0);
        }
      }
    },
    // audio 的 durationchange 事件
    durationchange(e) {
      this.duration = e.target.duration;
    },
    ready() {
      this.songready = true;
    },
    error() {},
    //下一首歌
    next() {
      if (this.songready === false) {
        return;
      }
      if (this.playlist.length === 1) {
        this.$refs.audio.currentTime = 0;
        this.setPlayingState(true);
      } else {
        let index = this.currentIndex + 1;
        if (index === this.playlist.length) {
          index = 0;
        }
        this.setCurrentIndex(index);
      }
    },
    //上一首歌
    prev() {
      if (this.songready === false) {
        return;
      }
      if (this.playlist.length === 1) {
        this.$refs.audio.currentTime = 0;
        this.setPlayingState(true);
      } else {
        let index = this.currentIndex - 1;
        if (index < 0) {
          index = this.playlist.length;
        }
        this.setCurrentIndex(index);
      }
    },
    back() {
      this.setFullScreen(false);
    },
    full() {
      if (this.$refs.mini.style.transition) {
        this.$refs.mini.style.transition = "";
      }
      this.setFullScreen(true);
    },
    //入场的动画 js钩子函数
    //kerframe 动画库
    enter(el, done) {
      const { x, y, scale } = this.getInfo();
      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      };
      keyanimation.registerAnimation({
        name: "move",
        animation,
        presets: {
          duration: 400,
          easing: "linear"
        }
      });
      keyanimation.runAnimation(this.$refs.album, "move", done);
    },
    afterenter(el, done) {
      keyanimation.unregisterAnimation("move");
      this.$refs.album.style.animation = "";
    },
    leave(el, done) {
      const { x, y, scale } = this.getInfo();
      let animation = {
        0: {
          transform: `translate3d(0,0,0) scale(1)`
        },
        60: {
          transform: `translate3d(${x}px,${y}px,0) scale(0.4)`
        },
        100: {
          transfrom: `translate(${x}px,${y}px,0) scale(0.2)`
        }
      };
      keyanimation.registerAnimation({
        name: "small",
        animation,
        presets: {
          duration: 400,
          easing: "linear"
        }
      });
      keyanimation.runAnimation(this.$refs.album, "small", done);
    },
    afterleave(el, done) {
      keyanimation.unregisterAnimation("small");
    },
    //获取两个圆点的各种信息
    getInfo() {
      const targetWidth = 50;
      const marginLeft = 10;
      const marginBottom = 5;
      const marginTop = 100;
      const width = 250;
      const scale = 50 / 250;
      const x = -(window.innerWidth / 2 - marginLeft - targetWidth / 2);
      const y =
        window.innerHeight -
        marginTop -
        width / 2 -
        marginBottom -
        targetWidth / 2;
      return {
        x,
        y,
        scale
      };
    },
    toogleplay() {
      this.setPlayingState(!this.playing);
      if (this.realLyric) {
        this.realLyric.togglePlay();
      }
    },
    //格式化事件函数
    normalizesecond(seconds) {
      let s = Math.floor(seconds % 60);
      let min = Math.floor((seconds / 60) % 60);
      return this.addZero(min) + ":" + this.addZero(s);
    },
    //加零函数
    addZero(num) {
      return num < 10 ? "0" + num : num;
    },
    handleLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum;
      this.playingLyric = txt;
    },
    lyricStart(e) {
      const touch = e.touches[0];
      this.touch.startX = touch.pageX;
      this.touch.startY = touch.pageY;

      this.touch.initiated = true;
      this.touch.moved = false;
    },
    lyricMove(e) {
      if (!this.touch.initiated) {
        return;
      }
      if (!this.touch.moved) {
        this.touch.moved = true;
      }
      const touch = e.touches[0];
      const deltaX = touch.pageX - this.touch.startX;
      const deltaY = touch.pageY - this.touch.startY;
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return;
      }
      const left = this.currentShow === "album" ? 0 : -window.innerWidth;
      const width = Math.min(0, Math.max(-window.innerWidth, left + deltaX));
      this.touch.precent = Math.abs(width / window.innerWidth);
      this.$refs.lyriclist.style.transform = `translate3d(${width}px,0,0)`;
      this.$refs.middleLeft.style.opacity = 1 - this.touch.precent;
    },
    lyricEnd() {
      if (!this.touch.moved) {
        return;
      }
      let width;
      let opacity;
      let currentShow;
      if (this.currentShow === "album") {
        if (this.touch.precent > 0.2) {
          width = -window.innerWidth;
          currentShow = "lyric";
          opacity = 0;
        } else {
          width = 0;
          opacity = 1;
          currentShow = "album";
        }
      } else {
        if (this.touch.precent < 0.8) {
          width = 0;
          currentShow = "album";
          opacity = 1;
        } else {
          width = -window.innerWidth;
          opacity = 0;
          currentShow = "lyric";
        }
      }
      if (this.$refs.lyriclist.style && this.$refs.middleLeft) {
        this.$refs.lyriclist.style.transform = `translate3d(${width}px,0,0)`;
        this.$refs.middleLeft.style.opacity = opacity;
      }
      this.currentShow = currentShow;
      this.touch.initiated = false;
    },
    _changeSong(newSong) {
      this.$nextTick(() => {
        if (this.realLyric) {
          this.realLyric.stop(); //清楚上一首歌的realLyric否则歌词会来回跳动
        }

        if (!this.playing) {
          this.setPlayingState(true);
        }
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.$refs.audio.play();
          this.savePlayHistoryList(newSong);
          this.currentSong
            .getLyric()
            .then(res => {
              if (this.currentSong.lyric !== res) {
                return;
              }
              this.realLyric = new Lyric(res, this.handleLyric);
              if (this.playing) {
                this.realLyric.play();
              }
              this.realLyricLine = this.realLyric.lines;
            })
            .catch(() => {
              this.realLyric = null;
              this.playingLyric = "";
              this.lineNum = 0;
            });
        }, 500);
      });
    }
  },
  watch: {
    //监听当前歌曲是否发生变化
    currentSong(newSong, oldSong) {
      if (!newSong.id || newSong.id === oldSong.id) {
        return;
      }
      this._changeSong(newSong);
    },
    //监听playing的变化
    playing(newplaying) {
      if (this.songready === true) {
        if (this.$refs.audio) {
          const audio = this.$refs.audio;
          this.$nextTick(() => {
            newplaying ? audio.play() : audio.pause();
          });
        }
      }
    },
    fullScreen(newfullScreen) {
      if (newfullScreen) {
        this.toggleplaylistshow = false;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
@import './player.styl';

</style>
