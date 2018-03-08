<template>

  <div class="searchbox">
    <div class="searchbox-inner">
      <input ref="input" type="text" class="searchinput" v-model="text" :placeholder="placeholder" @focus="focus" @keypress.enter="tosearch">
      <span class="clear" @click="clear" v-if="text">&times;</span>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "search-box",
  props: {
    placeholder: {
      type: String,
      default: "搜索歌曲、歌手"
    }
  },
  data() {
    return {
      text: ""
    };
  },
  methods: {
    clear() {
      if (this.text !== "") {
        this.text = "";
        this.$emit('clear')
      }
    },
    focus() {
      this.$emit("tofocus");
    },
    tosearch() {
      this.$refs.input.blur();
      this.$emit("tosearch", this.text);
    }
  },
  created() {
    this.$watch("text", newtext => {
      this.$emit("text", newtext);
    });
  }
};
</script>
<style lang="stylus" scoped>
.searchbox {
  width: 100%;

  .searchbox-inner {
    margin: 0 25px;
    padding: 0;
    border-radius: 4px;
    background: #444;
    position: relative;
    font-size: 0px;
    text-align: left;

    .searchinput {
      width: 80%;
      line-height: 30px;
      border: none;
      background: #444;
      border-radius: 4px;
      margin-left: 10px;
      color: #777;
      line-height: 35px;
      font-size: 14px;
      outline: none;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .clear {
      position: absolute;
      color: #ccc;
      text-align: center;
      font-size: 24px;
      line-height: 20px;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 50%;
      background: #222;
      width: 20px;
      height: 20px;
      z-index: 2;
    }
  }
}
</style>


