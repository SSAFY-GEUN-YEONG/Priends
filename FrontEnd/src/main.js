import { createApp } from "vue";
import { createPinia } from "pinia";
import { useMemberStore } from "@/stores/memberStore";

import VueCookies from "vue3-cookies";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";

// fontawesome import
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./assets/css/main.css";

library.add(fas, far, fab);

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia);

const memberStore = useMemberStore();
memberStore.memberCheckLoginStatus(); // 애플리케이션 시작 시 로그인 상태 확인

// 필요한 경우, 별도의 회원 정보 가져오기 함수 호출
if (memberStore.isLogin) {
  memberStore.memberGet();
}

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);

app.use(VueCookies);
app.mount("#app");
