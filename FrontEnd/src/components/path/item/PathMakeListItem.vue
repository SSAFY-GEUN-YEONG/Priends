<script setup>
import { defineProps } from "vue";
const props = defineProps(["itemType", "attraction"]);
const emits = defineEmits(["addAttractionToPath", "removeAttractionToPath"]);
console.log("itemType", props.itemType);

const addToPath = () => {
  emits("addAttractionToPath", props.attraction);
};

const removeToPath = () => {
  emits("removeAttractionToPath", props.attraction);
};

const moveToDetail = () => {
  //새 창으로 열기
  window.open(
    `/attraction/area/detail/${props.attraction.content_id}`,
    "_blank"
  );
};
</script>

<template>
  <div class="item-attraction">
    <div class="">
      <img
        v-if="attraction.first_image"
        :src="attraction.first_image"
        class="item-attraction-img"
      />
      <img
        v-else
        src="@/assets/img/defaultImg.png"
        class="item-attraction-img"
      />
    </div>
    <!-- <div
      class="item-attraction-img"
      :style="{ backgroundImage: `url('${attraction.first_image}')` }"></div> -->
    <div>
      {{ attraction.title }}<br />
      <p class="text-break">
        {{ attraction.addr1 }}
      </p>

      <div
        v-if="props.itemType == `attraction`"
        class="d-flex flex-row align-items-center pt-2"
      >
        <!-- <div class="d-flex flex-row align-items-center me-2">
          <font-awesome-icon :icon="['far', 'heart']" style="height: 15px" />
          <p class="m-0 ms-2">234</p>
        </div> -->
        <div class="d-flex flex-row align-items-center me-4">
          <font-awesome-icon :icon="['far', 'eye']" style="height: 15px" />
          <p class="m-0 ms-2">{{ attraction.readcount }}</p>
        </div>
      </div>
    </div>

    <div
      class="d-flex flex-column justify-contnet-end align-items-center ms-auto me-1"
    >
      <!-- 경로에 추가 -->
      <div v-if="props.itemType === `attraction`">
        <button class="btn p-0 mb-3" @click="addToPath">
          <i class="bi bi-plus-circle justify-content-center fs-4"></i>
        </button>
      </div>
      <!-- 경로에서 삭제 -->
      <div v-if="props.itemType === `mypath`">
        <button class="btn p-0 mb-3" @click="removeToPath">
          <i class="bi bi-trash3 justify-content-center fs-4"></i>
        </button>
      </div>

      <div>
        <button class="btn">
          <font-awesome-icon
            :icon="['fas', 'circle-info']"
            class="icon icon-info"
            @click="moveToDetail"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-attraction {
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
}

.item-attraction-img {
  width: 100px;
  height: 100px;
  margin: 10px;
}

.icon-info {
  width: 25px;
  height: 25px;
  color: #492268;
}

.btn {
  --bs-btn-focus-shadow-rgb: var(--bs-white);
  --bs-btn-active-bg: var(--bs-white);
  --bs-btn-active-border-color: var(--bs-white);
}
</style>
