<script setup>
defineProps({ title: String });
</script>

<template>
  <div class=" ">
    <div class="search-area d-flex align-items-center justify-content-center">
      <div class="fs-3 fw-bold text-white text-center m-auto">{{ title }}</div>
    </div>
  </div>
</template>

<style scoped>
.search-area {
  display: block;
  position: relative;
  width: 100%;
  height: 250px;
  background: url(@/assets/img/board.jpg) center/cover;
}
</style>
