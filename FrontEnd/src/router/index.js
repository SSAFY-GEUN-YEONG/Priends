import { createRouter, createWebHistory } from "vue-router";
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("@/views/MainView.vue"),
    },
    {
      path: "/member",
      name: "member",
      component: () => import("@/views/TheMemberView.vue"),
      children: [
        {
          path: "login",
          name: "member-login",
          component: () => import("@/components/member/MemberLogin.vue"),
        },
        {
          path: "join",
          name: "member-signup",
          component: () => import("@/components/member/MemberSignUp.vue"),
        },
        {
          path: "mypage",
          name: "member-mypage",
          component: () => import("@/components/member/MemberMyPage.vue"),
          redirect: { name: "mypage-info" },
          children: [
            {
              path: "alarm",
              name: "mypage-alarm",
              component: () => import("@/components/member/mypage/MyPageAlarm.vue"),
            },
            {
              path: "myboard",
              name: "mypage-myboard",
              component: () => import("@/components/member/mypage/MyPageBoard.vue"),
            },
            {
              path: "mypath",
              name: "mypage-mypath",
              component: () => import("@/components/member/mypage/MyPagePath.vue"),
            },
            {
              path: "info",
              name: "mypage-info",
              component: () => import("@/components/member/mypage/MyPageInfo.vue"),
            },
          ],
        },
        // {
        //   path: "modify/:userid",
        //   name: "user-modify",
        //   component: () => import("@/components/users/UserModify.vue"),
        // },
      ],
    },
    {
      path: "/board",
      name: "board",
      component: () => import("../views/TheBoardView.vue"),
      redirect: { name: "article-list" },
      children: [
        {
          path: "list",
          name: "article-list",
          component: () => import("@/components/board/BoardList.vue"),
        },
        {
          path: "view/:id",
          name: "article-view",
          component: () => import("@/components/board/BoardDetail.vue"),
        },
        {
          path: "write",
          name: "article-write",
          component: () => import("@/components/board/BoardWrite.vue"),
        },
        {
          path: "modify/:id",
          name: "article-modify",
          component: () => import("@/components/board/BoardModify.vue"),
        },
      ],
    },
    {
      path: "/attraction",
      name: "attraction",
      component: () => import("../views/TheAttractionView.vue"),
      redirect: { name: "attraction-main" },
      children: [
        {
          path: "main",
          name: "attraction-main",
          component: () => import("@/components/attractions/AttractionMain.vue"),
        },
        {
          path: "area/:areaname/home",
          name: "attraction-area",
          component: () => import("@/components/attractions/AttractionCity.vue"),
        },
        {
          path: "area/:areaname/:category",
          name: "attraction-area-category",
          component: () => import("@/components/attractions/AttractionList.vue"),
        },
        {
          path: "area/detail/:attractionid",
          name: "attraction-area-detail",
          component: () => import("@/components/attractions/AttractionDetail.vue"),
        },
      ],
    },
    {
      path: "/path",
      name: "path",
      component: () => import("../views/ThePathView.vue"),
      redirect: { name: "path-list" },
      children: [
        {
          path: "list",
          name: "path-list",
          component: () => import("@/components/path/PathList.vue"),
        },
        {
          path: "make/step1",
          name: "make-step1",
          component: () => import("@/components/path/PathMakeStep1.vue"),
        },
        {
          path: "make/step2",
          name: "make-step2",
          component: () => import("@/components/path/PathMakeStep2.vue"),
        },
        {
          path: "detail/:pathId",
          name: "path-detail",
          component: () => import("@/components/path/PathDetail.vue"),
        },
      ],
    },
  ],
});

export default router;
