<script setup>
import { watch } from "vue";
import { useRouter } from "vue-router";
import { useMenuStore } from "@/stores/menuStore";
import { storeToRefs } from "pinia";
import { useMemberStore } from "@/stores/memberStore";
import * as bootstrap from 'bootstrap';

const menuStore = useMenuStore();
const memberStore = useMemberStore();
const router = useRouter();
const { isLogin } = storeToRefs(memberStore);

const { memberLogout } = memberStore;
const { menuList } = storeToRefs(menuStore);
const { changeMenuState } = menuStore;

watch(isLogin, (newValue, oldValue) => {
  // 로그인 상태가 변경될 때 메뉴 상태를 업데이트
  if (newValue !== oldValue) {
    changeMenuState();
  }
});

const logout = async () => {
  await memberLogout(); // 로그아웃 처리
  router.push("/");
};


const requireLogin = () => {
  // 로그인이 필요하다는 모달을 표시합니다.
  const loginModal = new bootstrap.Modal(document.getElementById('loginRequiredModal'), {});
  loginModal.show();
  // 확인 버튼 이벤트 리스너
  document.getElementById('loginModalConfirmButton').addEventListener('click', () => {
    loginModal.hide();
    // 로그인 페이지로 이동합니다.
    router.push({ name: 'member-login' });
  });
}
</script>

<template>
  <nav
    class="navbar mb-5 sticky-top navbar-expand-lg"
    style="background-color: white">
    <div class="container-fluid">
      <router-link :to="{ name: 'main' }" class="navbar-brand">
        <img src="@/assets/img/2x.png" width="180" height="30" />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav me-auto">
          <!-- <a class="nav-link" href="#">여행지</a> -->
          <router-link :to="{ name: 'attraction' }" class="nav-link"
            >여행지</router-link
          >
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              여행계획
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link
                  :to="{ name: 'make-step1' }"
                  class="nav-link px-1 mx-0 text-start"
                  v-if="isLogin"
                  >여행계획 세우기</router-link
                >
                <a
                  href="#"
                  class="nav-link px-1 mx-0 text-start"
                  v-if="!isLogin"
                  @click.prevent="requireLogin"
                  >여행계획 세우기</a
                >
              </li>
              <li>
                <router-link
                  :to="{ name: 'path' }"
                  class="nav-link px-1 mx-0 text-start"
                  >Priends' 여행계획</router-link
                >
              </li>
            </ul>
          </li>
          <router-link 
            :to="{ name: 'board' }" 
            class="nav-link"
            v-if="isLogin"
            >커뮤니티</router-link
          >
          <a
            href="#"
            class="nav-link"
            v-if="!isLogin"
            @click.prevent="requireLogin"
            >커뮤니티</a
          >
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              동행
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">동행구하기</a></li>
              <li><a class="dropdown-item" href="#">실시간 동행 찾기</a></li>
            </ul>
          </li>
        </div>

        <div class="d-flex">
          <ul
            class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll"
            style="--bs-scroll-height: 100px">
            <template v-for="menu in menuList" :key="menu.routeName">
              <template v-if="menu.show">
                <template v-if="menu.routeName === 'member-logout'">
                  <li class="nav-item">
                    <router-link
                      to="/"
                      @click.prevent="logout"
                      class="nav-link"
                      >{{ menu.name }}</router-link
                    >
                  </li>
                </template>
                <template v-else>
                  <li class="nav-item">
                    <router-link
                      :to="{ name: menu.routeName }"
                      class="nav-link"
                      >{{ menu.name }}</router-link
                    >
                  </li>
                </template>
              </template>
            </template>
          </ul>
          <!-- <button class="btn btn-outline-success me-2">로그인</button>
          <button class="btn btn-outline-success me-2">회원가입</button> -->
        </div>
      </div>
    </div>
  </nav>

  <!-- 로그인 요구 모달 -->
  <div class="modal" tabindex="-1" id="loginRequiredModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">알림</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>로그인이 필요한 기능입니다.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="loginModalConfirmButton">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-link {
  margin-right: 20px; /* 오른쪽 여백 */
}

#loginModalConfirmButton {
  --bs-btn-bg: #dac3e8; /* 이 부분에 원하는 색상 코드를 입력하세요 */
  --bs-btn-border-color: #dac3e8;
  --bs-btn-hover-bg: #c19ee0;
  --bs-btn-hover-border-color: #c19ee0;
  --bs-btn-focus-shadow-rgb: #a06cd5;
  --bs-btn-active-bg: #a06cd5;
  --bs-btn-active-border-color: #a06cd5;
}
</style>
