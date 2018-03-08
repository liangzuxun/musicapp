import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Recommend = (resolve) => {
  import('@/components/recommend/recommend').then((recommend) => {
    resolve(recommend)
  })
}
const Disc = (resolve) => {
  import('@/components/recommend/children/disc').then((r) => {
    resolve(r)
  })
}
const Rank = (resolve) => {
  import('@/components/rank/rank').then((rank) => {
    resolve(rank)
  })
}
const Search = (resolve) => {
  import('@/components/search/search').then((search) => {
    resolve(search)
  })
}
const SearchResult = (resolve) => {
  import('@/components/search/children/search-result').then((r) => {
    resolve(r)
  })
}
const Singer = (resolve) => {
  import('@/components/singer/singer').then((singer) => {
    resolve(singer)
  })
}
const RankDetail = (resolve) => {
  import('@/components/rank/children/rankdetail').then((RankDetail) => {
    resolve(RankDetail)
  })
}
const SingerDetail = (resolve) => {
  import('@/components/singer/children/singerdetail').then((r) => {
    resolve(r)
  })
}
const User = (resolve) => {
  import("@/components/user/user").then((r) => {
    resolve(r)
  })
}
const PLayHistory = (resolve) => {
  import('@/components/user/children/playhistory').then((r) => {
    resolve(r)
  })
}
const CollectSongs = (resolve) => {
  import("@/components/user/children/collectsongs").then((r) => {
    resolve(r)
  })
}
const CommentPage = (resolve) => {
  import("@/components/comment/comment").then((r) => {
    resolve(r)
  })
}
const scrollBehavior = (to, from, savedPosition) => {
  // ...
  if (savedPosition) {
    console.log(savedPosition,'svave')
    setTimeout(()=>{
      window.scrollTo(savedPosition.x,savedPosition.y)
    },200)
  } else {
    return { x: 0, y: 0 }
  }
}
export default new Router({
  scrollBehavior,
  mode:'history',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: "/comment",
      component: CommentPage,
      name: 'comment-page'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc,
          name: 'disc',
        }
      ]
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: RankDetail,
          name: "rankdetail",
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      meta: {
        keepAlive: true
      },
      children: [
        {
          path: ':id',
          component: SingerDetail,
        }
      ]
    },
    {
      path: '/user-content',
      component: User,
      name: "user",
      redirect: '/playhistory',
      meta: {
        keepAlive: true
      },
      children: [
        {
          path: '/playhistory',
          component: PLayHistory,
          name: 'playhistory'
        },
        {
          path: '/collectsongs',
          component: CollectSongs,
          name: 'collectsongs'
        }
      ]
    }
  ]
})
