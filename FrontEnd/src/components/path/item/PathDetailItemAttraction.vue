<script setup>
import { defineProps, onMounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps(["pathDetailInfo"]);
const router = useRouter();

// console.log(props.pathDetailInfo);

const goToDetail = () => {
  //새 창으로 열기
  window.open(
    `/attraction/area/detail/${props.pathDetailInfo.contentId}`,
    "_blank"
  );
  // router.push({
  //   name: "attraction-area-detail",
  //   params: { attractionid: props.pathDetailInfo.contentId },
  // });
};
</script>

<template>
  <div class="path-distance">
    <font-awesome-icon
      :icon="['fasl', 'ellipsis-vertical']"
      class="icon distance"
    />11.11km
  </div>
  <div class="border d-flex flex-row justify-content-between">
    <div class="">
      <img
        v-if="pathDetailInfo.image1"
        :src="pathDetailInfo.image1"
        class="item-attraction-img m-1"
      />
      <img
        v-else
        src="@/assets/img/defaultImg.png"
        class="item-attraction-img"
      />
    </div>

    <div class="ms-2 d-flex flex-column justify-content-center">
      <p class="m-2">
        {{ pathDetailInfo.title }}
      </p>
      <p class="m-2">
        {{ pathDetailInfo.address }}
      </p>
    </div>
    <div class="d-flex ms-auto align-items-center">
      <font-awesome-icon
        :icon="['fas', 'circle-info']"
        class="icon icon-info me-2"
        @click="goToDetail"
      />
      <font-awesome-icon
        :icon="['fas', 'location-dot']"
        class="icon icon-info me-2"
      />
    </div>
  </div>
</template>

<style scoped>
.path-distance {
  font-size: 10px;
}

.item-attraction-img {
  width: 100px;
  height: 100px;
}

.icon-info {
  width: 25px;
  height: 25px;
  color: #492268;
}

/* 아이콘에 마우스를 올렸을 때 스타일 */
.icon-info:hover {
  cursor: pointer; /* 마우스 커서를 손가락 모양으로 변경 */
  color: #735c8e; /* 아이콘 색상 변경 */
  transform: scale(1.1); /* 아이콘을 약간 확대 */
  transition: transform 0.2s ease-in-out, color 0.2s ease-in-out; /* 부드러운 전환 효과 */
}


.distance {
  margin-left: 50px;
  width: 5px;
}
</style>
