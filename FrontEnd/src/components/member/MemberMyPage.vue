<script setup>
// import { onMounted } from 'vue';
// import { useMemberStore } from "@/stores/memberStore";
// import { storeToRefs } from 'pinia';
import MyPageSidebar from '../layout/MyPageSidebar.vue'
import MyPageHeader from '../layout/MyPageHeader.vue';

// const memberStore = useMemberStore();
// const { memberInfo } = storeToRefs(memberStore);

// onMounted(() => {
//   memberStore.memberGet();
// });
</script>

<template>
  <MyPageHeader></MyPageHeader>
  <div class="container mt-3">
    <div class="row">
      <!-- 사이드바 메뉴 -->
      <div class="col-md-3">
        <MyPageSidebar></MyPageSidebar>
      </div>
      <!-- 컨텐츠 영역 -->
      <div class="col-md-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
