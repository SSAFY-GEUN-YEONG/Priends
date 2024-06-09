<script setup></script>

<template>
  <div class="col-md-10">
    <div class="list-group">
      <router-link
        :to="{ name: 'mypage-alarm' }"
        class="list-group-item list-group-item-action"
        >알람 설정</router-link
      >
      <router-link
        :to="{ name: 'mypage-myboard' }"
        class="list-group-item list-group-item-action"
        >내 게시판</router-link
      >
      <router-link
        :to="{ name: 'mypage-mypath' }"
        class="list-group-item list-group-item-action"
        >내 여행계획</router-link
      >
      <router-link
        :to="{ name: 'mypage-info' }"
        class="list-group-item list-group-item-action"
        >내 정보 및 수정</router-link
      >
    </div>
  </div>
</template>

<style scoped></style>
