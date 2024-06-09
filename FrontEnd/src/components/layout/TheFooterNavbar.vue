<script setup></script>

<template>
  <footer class="navbar-fixed-bottom mt-5">
    <div class="d-flex flex-row justify-content-evenly footer-big pt-2">
      <div class="" style="width: 15%">
        <div class="footer-title my-1 pb-1">Priends</div>
        <p>여행지</p>
        <p>여행 계획</p>
        <p>커뮤니티</p>
        <p>동행</p>
      </div>
      <div class="" style="width: 15%">
        <div class="footer-title my-1 pb-1">회사이야기</div>
        <p>회사소개</p>
        <p>이용방법</p>
        <p>광고 및 제휴</p>
      </div>
      <div class="" style="width: 15%">
        <div class="footer-title my-1 pb-1">고객센터</div>
        <p>FAQ</p>
        <p>문의하기</p>
        <p>이용약관</p>
        <p>개인정보 처리방침</p>
      </div>
    </div>

    <div class="d-flex flex-row justify-content-around footer-bottom">
      <p class="m-1">Copyright ⓒ 2023 Priends.com, All Rights Reserved.</p>
      <p class="m-1">제휴문의: Priends@ssafy.com | 02-1111-2222</p>
    </div>
  </footer>
</template>

<style scoped>
/* 스타일 수정 */
.navbar-fixed-bottom {
  position: relative;
  bottom: 0;
  width: auto;
}
* {
  font-size: 10px;
}
.footer-big {
  color: #ffffff;
  background-color: #363c48;
}
.footer-title {
  font-weight: 700;
  border-bottom: 1px solid #424753;
  color: #999999; /* 원하는 색상으로 변경하세요 */
}

.footer-bottom {
  background-color: #2e333d;
  color: #c9c9c9;
}
</style>
