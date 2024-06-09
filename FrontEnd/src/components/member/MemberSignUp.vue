<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/memberStore";
import * as bootstrap from 'bootstrap';


const memberStore = useMemberStore();
const { memberSignup, memberEmailCheck } = memberStore;  // 멤버관련 저장소에서 함수들 사용할 함수들
const router = useRouter();

const email = ref('');
const password = ref('');
const passwordCheck = ref('');
const nickname = ref('');
const alarm = ref(false);
const termsAgreement = ref({
  overFourteen: false,
  termsOfService: false,
  privacyPolicy: false,
  locationTerms: false
});
const allAgreed = ref(false);
const isAvailable = ref(false);

// 이메일 입력 비어있는지 확인
const isEmailEmpty = computed(() => 
  email.value.trim().length === 0
);

// 비빌번호가 비어있는지 확인
const isPasswordEmpty = computed(() => 
  password.value.trim().length === 0
);

// 비빌번호 확인이 비어있는지 확인
const isPasswordCheckEmpty = computed(() => 
  passwordCheck.value.trim().length === 0
);

// 비밀번호가 비어 있지 않고 일치하는지 확인
const isPasswordNotEmptyAndMatch = computed(() => 
  !isPasswordEmpty.value && !isPasswordCheckEmpty.value && passwordsMatch.value
);

// 닉네임이 비어있는지 확인
const isNicknameEmpty = computed(() =>
  nickname.value.trim().length === 0
);

// 이메일 유효성 검사
const isEmailValid  = computed(() => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email.value);
})

// 필수 약관 동의 했는지 검사
const allTermsAgreed = computed(() => {
  return Object.values(termsAgreement.value).every(v => v);
});

// 입력 폼 다 입력됐는지 여부 및 비밀번호, 비밀번호 확인도 일치했는지 확인
const isSignupFormValid = computed(() => {
  return email.value.trim() &&
    password.value.trim() &&
    nickname.value.trim() &&
    allTermsAgreed.value &&
    passwordsMatch.value;
})

// 비밀번호와 비밀번호 확인 일치 여부 검사
const passwordsMatch = computed(() => password.value === passwordCheck.value);

// 약관 전체 동의 버튼 체크 여부에 따른 전체값 바뀌기
watch(allAgreed, (newValue) => {
  termsAgreement.value = {
    overFourteen: newValue,
    termsOfService: newValue,
    privacyPolicy: newValue,
    locationTerms: newValue
  };
  alarm.value = newValue; // 동행 알람 서비스 수신 동의도 포함
});

const showAlertModal = (modalId, message) => {
  const modalElement = document.getElementById(modalId);
  const modalMessageElement = modalElement.querySelector('.modal-body p');
  modalMessageElement.textContent = message;
  const alertModal = new bootstrap.Modal(modalElement, {});
  alertModal.show();
};

// 이메일 중복체크 메서드 
const emailDuplicateCheck = async () => {
  if (isEmailEmpty.value) {
    showAlertModal("alertModal", "이메일을 입력해주세요.");
    return;
  }

  if (!isEmailValid.value) {
    showAlertModal("alertModal", "사용 가능한 이메일입니다.");
    return;
  }

  isAvailable.value = await memberEmailCheck(email.value);
  if (isAvailable.value) {
    showAlertModal("alertModal", "사용 가능한 이메일입니다.");
  }
  else {
    showAlertModal("alertModal", "이미 사용 중인 이메일입니다.");
  }
};

// 회원가입 메서드 
const signup = async () => {
  if (!allTermsAgreed.value) {
    showAlertModal("alertModal", "필수 약관에 동의해주세요.");
    return;
  }

  if (!passwordsMatch.value) {
    showAlertModal("alertModal", "비밀번호가 일치하지 않습니다.");
    return;
  }

  if (!isAvailable.value) {
    showAlertModal("alertModal", "이메일 중복체크를 확인해주세요.");
    return;
  }

  const signupData = {
    email: email.value,
    password: password.value,
    nickname: nickname.value,
    alarm: alarm.value
  }

  await memberSignup(signupData);
  router.push("/"); // 메인 페이지로 이동
}
</script>

<template>
  <div
    class="container p-4 border border-secondary-subtle d-flex flex-column align-items-center"
  >
    <h3 class="my-4">회원가입</h3>
    <p class="ms-2 me-auto mb-0">이메일 *</p>
    <!-- 이메일 입력 필드 -->
    <div class="form-floating mb-3" style="width: 400px">
      <input
        v-model="email"
        type="email"
        class="form-control"
        id="floatingInput"
        placeholder="name@example.com"
      />
      <label for="floatingInput">Email address</label>
      <p v-if="isEmailEmpty" class="text-danger">이메일을 입력해주세요.</p>
      <p v-else-if="!isEmailValid" class="text-danger">이메일 형식이 아닙니다.</p>
      <button data-v-a2ab3df0="" type="button" class="btn btn-login my-1" @click="emailDuplicateCheck"> 
        이메일 중복 체크 
      </button>
    </div>
    

    <p class="ms-2 me-auto mb-0">비밀번호 *</p>
    <!-- 비밀번호 입력 필드 -->
    <div class="form-floating mb-3">
      <input
        v-model="password"
        style="width: 400px"
        type="password"
        class="form-control"
        id="floatingPassword"
        placeholder="Password"
      />
      <p v-if="isPasswordEmpty" class="text-danger">비밀번호를 입력해주세요.</p>
      <label for="floatingPassword mb-3">비밀번호 </label>
    </div>
    <p class="ms-2 me-auto mb-0">비밀번호 확인 *</p>
    <!-- 비밀번호 확인 입력 필드 -->
    <div class="form-floating mb-3">
      <input
        v-model="passwordCheck"
        style="width: 400px"
        type="password"
        class="form-control"
        id="floatingPasswordCheck"
        placeholder="Password"
      />
    <p v-if="isPasswordCheckEmpty" class="text-danger">비밀번호 확인을 입력해주세요.</p>
  
    <p v-if="isPasswordNotEmptyAndMatch" class="text-success">비밀번호가 일치합니다.</p>
    <p v-else-if="!passwordsMatch && !isPasswordCheckEmpty" class="text-danger">비밀번호가 맞지 않습니다.</p>
    
  </div>
    <p class="ms-2 me-auto mb-0">닉네임 *</p>
    <!-- 닉네임 입력 필드 -->
    <div class="form-floating">
      <input
        v-model="nickname"
        style="width: 400px"
        type="text"
        class="form-control"
        id="floatingPassword"
        placeholder="Password"
      />
      <p v-if="isNicknameEmpty" class="text-danger">닉네임을 입력해주세요.</p>
      <label for="floatingPassword">닉네임</label>
    </div>

    <!-- 약관 동의 부분 -->
    <div class="py-4" style="width: 400px">
      <div class="form-check d-flex align-items-start">
        <input
          v-model="allAgreed"
          class="form-check-input"
          type="checkbox"
          value=""
          id="allAgreedCheck"
        />
        <label
          style="font-size: 12px"
          class="text-start form-check-label text-body-secondary ps-2"
          for="allAgreedCheck"
        >
          <strong>전체 약관 동의</strong>
          <p
            class="text-body-secondary px-0 text-start"
            style="font-size: 12px; width: 380px"
          >
            선택 정보에 대한 동의를 포함합니다. 전체 동의하기 선택 후 선택
            정보에 대한 동의를 변경하실 수 있습니다.
          </p>
        </label>
      </div>
      <div
        class="border p-2 my-2 text-body-secondary"
        style="font-size: 12px; width: 400px"
      >
        <div
          class="form-check my-1 d-flex justify-content-start align-items-center"
        >
          <div>
            <input
              v-model="termsAgreement.overFourteen"
              class="form-check-input"
              type="checkbox"
              value=""
              id="overFourteenCheck"
            />
            <label class="form-check-label" for="overFourteenCheck">
              [필수] 만 14세 이상입니다.
            </label>
          </div>
        </div>

        <div
          class="form-check my-1 d-flex justify-content-between align-items-center"
        >
          <div>
            <input
              v-model="termsAgreement.termsOfService"
              class="form-check-input"
              type="checkbox"
              value=""
              id="termsOfServiceCheck"
            />
            <label class="form-check-label" for="termsOfServiceCheck">
              [필수] 회원가입 및 운영약관 동의
            </label>
          </div>
          <button type="button" class="btn btn-sm p-0 m-0">
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>

        <div
          class="form-check my-1 d-flex justify-content-between align-items-center"
        >
          <div>
            <input
              v-model="termsAgreement.privacyPolicy"
              class="form-check-input"
              type="checkbox"
              value=""
              id="privacyPolicyCheck"
            />
            <label class="form-check-label" for="privacyPolicyCheck">
              [필수] 개인정보 수집 및 이용 동의
            </label>
          </div>
          <button type="button" class="btn btn-sm p-0 m-0">
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>

        <div
          class="form-check my-1 d-flex justify-content-between align-items-center"
        >
          <div>
            <input
              v-model="termsAgreement.locationTerms"
              class="form-check-input"
              type="checkbox"
              value=""
              id="locationTermsCheck"
            />
            <label class="form-check-label" for="locationTermsCheck">
              [필수] 위치 정보 이용약관 동의
            </label>
          </div>
          <button type="button" class="btn btn-sm p-0 m-0">
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>

        <div
          class="form-check my-1 d-flex justify-content-between align-items-center"
        >
          <div>
            <input
              v-model="alarm"
              class="form-check-input"
              type="checkbox"
              value=""
              id="alarmCheck"
            />
            <label class="form-check-label" for="alarmCheck">
              [선택] 동행 알림 서비스 수신 동의
            </label>
          </div>
          <button type="button" class="btn btn-sm p-0 m-0">
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
    <button type="button" class="btn btn-signup my-1" @click="signup" :disabled="!isSignupFormValid">회원가입</button>
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

.btn-signup {
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

#alertModal .btn-primary {
    --bs-btn-bg: #dac3e8; /* 원하는 색상 코드 */
    --bs-btn-border-color: #dac3e8;
    --bs-btn-hover-bg: #c19ee0;
    --bs-btn-hover-border-color: #c19ee0;
    --bs-btn-focus-shadow-rgb: #a06cd5;
    --bs-btn-active-bg: #a06cd5;
    --bs-btn-active-border-color: #a06cd5;
  }
</style>
