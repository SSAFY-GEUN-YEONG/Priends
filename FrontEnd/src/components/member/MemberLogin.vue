<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { useMenuStore } from "@/stores/menuStore";
import { useMemberStore } from "@/stores/memberStore";
import { storeToRefs } from 'pinia';
import * as bootstrap from 'bootstrap';

const router = useRouter();
const memberStore = useMemberStore();

const { isLogin } = storeToRefs(memberStore);
const { memberLogin, memberTempPassword } = memberStore;  // 멤버관련 저장소에서 함수들 사용할 함수들
const { changeMenuState } = useMenuStore();

const loginMember = ref({
  email: "",
  password: "",
});

const tempEmail = ref('');
const tempPasswordModal = ref(null);

const showAlertModal = (modalId, message) => {
  const modalElement = document.getElementById(modalId);
  const modalMessageElement = modalElement.querySelector('.modal-body p');
  modalMessageElement.textContent = message;
  const alertModal = new bootstrap.Modal(modalElement, {});
  alertModal.show();
};

const login = async () => {
  await memberLogin(loginMember.value);
  if (isLogin.value) {
    changeMenuState();  // 메뉴 상태 바꾸기
    router.push("/");   // 메인 페이지로 가기
  }
  else {
    showAlertModal('alertModal', "아이디 또는 비밀번호를 잘못 입력했습니다. 다시 확인해주세요.");
  }
}


const issueTempPassword = async () => {
  if (!tempEmail.value) {
    showAlertModal('alertModal', '이메일을 입력해주세요.');
    return;
  }
  try {
    const result = await memberTempPassword(tempEmail.value);
    showAlertModal('alertModal', result.message);
    if (result.success && tempPasswordModal.value) {
      const modal = bootstrap.Modal.getInstance(tempPasswordModal.value);
      modal.hide();
    }
  } catch (error) {
    console.log(error);
    showAlertModal('alertModal', '임시 비밀번호 발급에 실패했습니다. 해당 서비스에 문의해주세요.');
  }
};

</script>

<template>
  <div
    class="container p-4 border border-secondary-subtle d-flex flex-column align-items-center"
  >
    <h3 class="my-4">로그인</h3>

    <div class="d-flex flex-column">
      <p class="me-auto mb-0">이메일</p>
      <div class="form-floating mb-3" style="width: 400px">
        <input
          v-model="loginMember.email"
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label for="floatingInput">Email address</label>
      </div>
    </div>

    <div class="d-flex flex-column">
      <p class="me-auto mb-0">비밀번호</p>
      <div class="form-floating mb-3">
        <input
          v-model="loginMember.password"
          style="width: 400px"
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
        <label for="floatingPassword">Password</label>
      </div>
    </div>

    <button type="button" class="btn btn-find-pw btn-light mt-4 mb-2" data-bs-toggle="modal" data-bs-target="#tempPasswordModal">
      임시 비밀번호 발급
    </button>
    <button type="button" class="btn btn-login my-1" @click="login">
      이메일로 로그인
    </button>
    <!--회원가입 연결 버튼-->
    <div class="my-4 d-flex flex-column align-items-center">
      <p class="mt-5">아직 회원이 아니신가요?</p>
      <div class="d-grid gap-2 mt-2 d-md-flex justify-content-md-end">
        <img
          src="@/assets/img/building.jpg"
          class="rounded-circle d-block mt-1"
          style="width: 30px; height: 30px"
        />
        <button class="btn py-1 px-0 me-1 btn-sign-up" type="button">
          네이버 회원가입
        </button>
        <img
          src="@/assets/img/building.jpg"
          class="rounded-circle d-block mt-1"
          style="width: 30px; height: 30px"
        />
        <button class="btn py-1 px-0 me-1 btn-sign-up" type="button">
          카카오톡 회원가입
        </button>
        <img
          src="@/assets/img/building.jpg"
          class="rounded-circle d-block mt-1"
          style="width: 30px; height: 30px"
        />
        <router-link :to="{ name: 'member-signup' }">
          <button class="btn py-1 px-0 me-1 btn-sign-up" type="button">
            이메일 회원가입
          </button>
        </router-link>
      </div>
    </div>


    
  </div>

  <!-- 임시 비밀번호 발급 모달 -->
    <div class="modal fade" id="tempPasswordModal" tabindex="-1" ref="tempPasswordModal" aria-labelledby="tempPasswordModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="tempPasswordModalLabel">임시 비밀번호 발급</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label for="tempPasswordEmail" class="form-label">이메일</label>
                  <input type="email" class="form-control" id="tempPasswordEmail" v-model="tempEmail">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                <button type="button" class="btn btn-primary" @click="issueTempPassword">발급</button>
              </div>
            </div>
          </div>
      </div>

  <!-- Alert 모달 -->
  <div class="modal" tabindex="-1" id="alertModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">알림</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>메시지 내용</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: fit-content;
}
.btn-find-pw {
  width: 400px;
}

.btn-login {
  width: 400px;
  --bs-btn-color: var(--bs-white);
  --bs-btn-bg: #dac3e8;
  --bs-btn-border-color: #dac3e8;

  --bs-btn-hover-color: var(--bs-white);
  --bs-btn-hover-bg: #c19ee0;
  --bs-btn-hover-border-color: #c19ee0;

  --bs-btn-focus-shadow-rgb: #a06cd5;
  --bs-btn-active-color: var(--bs-white);
  --bs-btn-active-bg: #a06cd5;
  --bs-btn-active-border-color: #a06cd5;
}

.btn-sign-up {
  --bs-btn-active-border-color: var(--bs-white);
}

.btn-primary {
    --bs-btn-bg: #dac3e8; /* 원하는 색상 코드 */
    --bs-btn-border-color: #dac3e8;
    --bs-btn-hover-bg: #c19ee0;
    --bs-btn-hover-border-color: #c19ee0;
    --bs-btn-focus-shadow-rgb: #a06cd5;
    --bs-btn-active-bg: #a06cd5;
    --bs-btn-active-border-color: #a06cd5;
  }

#alertModal .btn-primary {
  --bs-btn-bg: #dac3e8; /* 이 부분에 원하는 색상 코드를 입력하세요 */
  --bs-btn-border-color: #dac3e8;
  --bs-btn-hover-bg: #c19ee0;
  --bs-btn-hover-border-color: #c19ee0;
  --bs-btn-focus-shadow-rgb: #a06cd5;
  --bs-btn-active-bg: #a06cd5;
  --bs-btn-active-border-color: #a06cd5;
}
</style>