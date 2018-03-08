<template>
  <transition name="slide">
  <div class="comment">
    <div class="comment-header">
      <i class="fa fa-angle-left" @click="tohistory"></i>
      <span class="title">歌曲评论{{commentlist.length}}</span>
      <i class="fa fa-ellipsis-h"></i>
    </div>
    <div class="scroll-wrapper">
          <scroll :data="commentlist" class="commentlistscroll">
      <div class="comment-body" >
      <div class="comment-body-title" v-if="commentlist">
        <h4>精彩评论
          <span>{{commentlist.length}}</span>
        </h4>
      </div>
      <ul>
        <li v-for="(comment,index) in commentlist" :key="index">
          <div class="user-avatar">
            <img v-lazy="comment.image" alt="" width="50" height="50">
          </div>
          <div class="user-detail">
            <div class="user-detail-info">
              <div class="user-name-and-num">
                <span class="user-name">{{comment.name}}</span>
                <span class="user-num">{{comment.parisenum}}
                  <i class="fa fa-thumbs-o-up"></i>
                </span>
              </div>
              <div class="user-time">
                {{comment.time}}
              </div>
            </div>
            <div class="user-detail-content">
            <article v-html="comment.content">
            </article>
            </div>
          </div>
        </li>
      </ul>
    </div>
    </scroll>
    </div>
  </div>
  </transition>
</template>
<script>
import { mapGetters } from "vuex";
import { getSongComment } from "@/api/comment";
import { HotComment } from "@/common/js/comment";
import Scroll from "@/base/scroll/scroll";
export default {
  name: "comment-page",
  computed: {
    ...mapGetters(["currentSong"])
  },
  components: {
    [Scroll.name]: Scroll
  },
  data() {
    return {
      commentlist: []
    };
  },
  methods: {
    tohistory() {
      this.$router.go(-1);
    }
  },
  created() {
    let arr = [];
    if (!this.currentSong.id) {
      this.$router.push("/singer");
    }
    getSongComment(this.currentSong.id).then(res => {
      console.log(res.comment.commentlist);
      if (!res["hot_comment"].commentlist) {
        return;
      }
      res["hot_comment"].commentlist.forEach((item, index) => {
        arr.push(HotComment(item));
      });
    });
    this.commentlist = arr;
  }
};
</script>
<style lang="stylus" scoped>
.comment {
  position: fixed;
  z-index: 1001;
  background: #222;
  width: 100%;
  top: 0;
  bottom: 0;

  .fa {
    font-size: 24px;
    color: orange;
  }

  .scroll-wrapper {
    position: fixed;
    top: 50px;
    width: 100%;
    bottom: 0;
  }

  .commentlistscroll {
    height: 100%;
    overflow: hidden;
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 50px;
    height: 50px;
    padding: 0 15px;

    .title {
      font-size: 16px;
      color: #fff;
    }
  }

  .comment-body {
    text-align: left;

    &-title {
      font-size: 18px;
      padding: 0 10px;

      h4 {
        font-weight: normal;
        color: #fff;
      }

      span {
        color: #ccc;
      }
    }

    ul {
      li {
        display: flex;
        align-item: top;
        justify-content: space-between;
        padding: 10px;

        .user-avatar {
          width: 50px;
          height: 50px;
          overflow: hidden;
          border-radius: 50%;
        }

        .user-detail {
          width: 83%;

          .user-detail-info {
            height: 50px;

            .user-name-and-num {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;

              span {
                color: #fff;
                opacity: 0.7;
              }

              .user-num {
                font-size: 13px;

                .fa-thumbs-o-up {
                  font-size: 16px;
                  color: #fff;
                }
              }
            }

            .user-time {
              font-size: 14px;
              color: #fff;
              opacity: 0.7;
            }
          }

          &-content {
            article {
              color: #fff;
              font-size: 14px;
              line-height: 1.5em;
              opacity: 0.9;
            }
          }
        }
      }
    }
  }
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>

