<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUser, faHeart, faEye } from "@fortawesome/free-regular-svg-icons";

const props = defineProps(["attraction"]);

// 여기서 click 이벤트를 발생시킬 수 있도록 정의합니다.
const emit = defineEmits(["click"]);

function emitClickEvent() {
  emit('click');
}
</script>

<template>
  <div class="path-list-item" @click="emitClickEvent">
    <img class="path-list-img" :src="attraction.first_image" />
    <div class="content">
      <h5>{{ attraction.title }}</h5>

      <div class="icon-text">
        <font-awesome-icon :icon="['far', 'eye']" style="height: 15px" />
        <div>{{ attraction.readcount }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.path-list-item {
  display: inline-block;
  flex-direction: column;
  width: 260px;
  border: 1px solid #696969;
  margin: 30px;
}

.path-list-item:hover {
  cursor: pointer; /* 마우스 오버 시 커서를 포인터로 변경 */
  border: 1px solid #d0d0d0; /* 테두리 추가 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */
  transition: all 0.3s ease; /* 부드러운 전환 효과 */
}

.path-list-img {
  width: 260px;
  height: 260px;
}

.content {
  padding: 5px;
}

.icon-text {
  flex-direction: row;
  display: flex;
  align-items: center;
}

.icon-text > *,
.heart-icon > * {
  margin-left: 5px;
}
.heart-icon {
  flex-direction: row;
  display: flex;
  align-items: center;
  margin-left: auto; /* 아이콘을 오른쪽 끝으로 이동시킵니다. */
}
</style>
