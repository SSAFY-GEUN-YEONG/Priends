<script setup>
// 받을 props를 정의
const props = defineProps({
  title: String,
  image: String
});
</script>

<template>
  <div class="main-recommend-attraction-item">
    <div class="my recommend-attraction-cover d-flex align-items-end" :style="{ backgroundImage: `url(${props.image})` }">
      <div class="ps-3">
        <p class="text-white fw-bolder">{{ props.title }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recommend-attraction-cover {
  width: 250px;
  height: 250px;
  /* background-image: url("@/assets/img/field.jpg"); */
  background-size: cover;
  cursor: pointer; /* 마우스 오버 시 커서를 포인터로 변경 */

}

/* MainRecommendAttractionItem 컴포넌트에 대한 hover 스타일 */
.main-recommend-attraction-item:hover {
  cursor: pointer; /* 마우스 오버 시 커서를 포인터로 변경 */
  border: 1px solid #d0d0d0; /* 테두리 추가 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */
  transition: all 0.3s ease; /* 부드러운 전환 효과 */
}

</style>
