<template>
  <div class="rank-page" ref="rank">
    <router-view></router-view>
    <rank-list :ranklist="rankList" ref="ranklist"></rank-list>
    <loading v-if="!rankList">
    </loading>
  </div>
</template>
<script>
import { getTopList, getTopListDetail } from "@/api/rank";
import Ranklist from "./components/ranklist";
import { miniplayerMixin } from "@/mixin/miniplayerMixin";
import { mapState } from "vuex";
import Loading from '@/base/loading/loading'
export default {
  name: "rank-page",
  mixins: [miniplayerMixin],
  components: {
    [Ranklist.name]: Ranklist,
    [Loading.name]:Loading
  },
  data() {
    return {
      rankList:''
    };
  },
  computed: {
    ...mapState(["toplist"])
  },
  mounted() {
    getTopList().then(res => {
      this.rankList = res.data.topList;
    });
  },
  created() {
    if (!this.toplist) {
      this.$router.push("/rank");
    }
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? "50px" : "";
      console.log("134");
      this.$refs.rank.style.bottom = bottom;
    }
  }
};
</script>

<style lang="stylus" scoped>
.rank-page {
  position: fixed;
  top: 100px;
  bottom: 0;
  width: 100%;
}
</style>



