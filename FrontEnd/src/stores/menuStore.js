import { ref } from "vue";
import { defineStore } from "pinia";

export const useMenuStore = defineStore("menuStore", () => {
  const menuList = ref([
    { name: "회원가입", show: true, routeName: "member-signup" },
    { name: "로그인", show: true, routeName: "member-login" },
    { name: "내정보", show: false, routeName: "member-mypage" },
    { name: "로그아웃", show: false, routeName: "member-logout" },
  ]);

  const changeMenuState = () => {
    menuList.value = menuList.value.map((item) => ({
      ...item,
      show: !item.show,
    }));
  };

  const initializeMenuState = (isAuthenticated) => {
    menuList.value.forEach((item) => {
      if (item.routeName === "member-login" || item.routeName === "member-signup") {
        item.show = !isAuthenticated;
      } else if (item.routeName === "member-mypage" || item.routeName === "member-logout") {
        item.show = isAuthenticated;
      }
    });
  };

  return {
    menuList,
    changeMenuState,
    initializeMenuState,
  };
});
