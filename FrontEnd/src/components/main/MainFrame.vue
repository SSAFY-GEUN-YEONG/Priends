<script setup>
import { ref, watch, onBeforeMount, onUpdated } from "vue";
import { useRouter } from "vue-router";
import { getPathList, getPathDetailsWithAttraction } from "@/api/pathApi.js";

import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel"; //스크롤

const router = useRouter();

onBeforeMount(() => {
  getListPath();

  console.log("pathDetailList : ", pathDetailList.value);
});

onUpdated(() => {
  console.log("update pathDetailList : ", pathDetailList.value);
});

// '여행 계획 세우기' 페이지로 이동하는 함수
const goToPlanTrip = () => {
  // 여행 계획 세우기 페이지의 라우트 이름이 'make-step1'이라고 가정
  router.push({ name: "make-step1" });
};

const pathList = ref([]);
const pathDetailList = ref([]);
const param = ref({
  pathId: -1,
  city: "",
  order: 2, //1:최신순 2:인기순
  limitCount: 3,
});

const getListPath = async () => {
  console.log("path 목록 가져오기!");
  await getPathList(
    param.value,
    ({ data }) => {
      pathList.value = data.dataBody;
      console.log("pathList : ", pathList.value);

      pathList.value.forEach(async (item) => {
        console.log("item id ", item.id);
        await getPathDetailsWithAttraction(
          item.id,

          ({ data }) => {
            console.log("GETpATH + attraction", data.dataBody);
            pathDetailList.value.push(data.dataBody);
            console.log(pathDetailList.value);
          },
          (error) => {
            console.log(error);
          }
        );
      });
    },
    (error) => {
      console.log(error);
    }
  );
};

const calcPeriod = (val) => {
  // 문자열을 Date 객체로 변환
  const date1 = new Date(val.startDate);
  const date2 = new Date(val.endDate);

  // 두 날짜 간의 차이를 밀리초로 얻고 일로 변환
  const dayDifference = Math.abs(date2 - date1) / (1000 * 60 * 60 * 24) + 1;
  // console.log("day :::", dayDifference);
  return dayDifference;
};

const moveToPathDetail = (id) => {
  console.log("idid move path ", id);
  router.push({
    name: "path-detail",
    params: { pathId: id },
  });
};
</script>

<template>
  <div class="container d-flex flex-column align-items-center">
    <div class="my-5 main-cover d-flex align-items-end">
      <div class="p-5">
        <p class="fs-3 fw-bold text-white">
          소중한 사람들과 함께 여행을 떠나요!
        </p>
        <p class="fw-bold text-white">Priend가 여러분과 함께합니다</p>
        <button type="button" class="btn btn-login my-1" @click="goToPlanTrip">
          여행 계획 세우기
        </button>
      </div>
    </div>
    <div class="my-5">
      <p class="px-3 fs-3 fw-bold">Priends' 여행 계획</p>
      <div class="recommend-path d-flex flex-row justify-content-between">
        <div
          v-for="(item, index) in pathList"
          :key="item.id"
          class="main-recommand-path-item m-4"
          @click="moveToPathDetail(item.id)">
          <div class="image-container">
            <carousel
              class="p-0"
              :items-to-show="1"
              :snapAlign="'center'"
              :wrapAround="true"
              :transition="3000"
              :autoplay="3">
              <slide
                v-for="attraction in pathDetailList[index]"
                :key="attraction.id">
                <img
                  class="recommand-path-map object-fit-fill"
                  v-if="attraction.image1"
                  :src="attraction.image1" />
              </slide>
            </carousel>

            <h5 class="image-title text-white fw-bolder ps-3 pb-1 fs-4">
              {{ item.title }}
            </h5>
          </div>
          <div class="px-3 py-2 border">
            <div class="recommand-path-info-text mt-1">
              <p class="m-0">{{ item.startDate }} 출발</p>
              <p class="m-0">{{ calcPeriod(item) }}일간</p>
            </div>
            <div class="d-flex flex-row justify-content-between">
              <div class="d-flex align-items-center">
                <img
                  class="border rounded-circle"
                  :src="item.memberImage"
                  style="width: 40px; height: 40px" />
                <!-- <font-awesome-icon
                  :icon="['far', 'heart']"
                  style="height: 15px" /> -->
                <div class="ps-1 pt-1">{{ item.memberNickname }}</div>
              </div>
              <div class="d-flex align-items-center">
                <font-awesome-icon
                  :icon="['far', 'eye']"
                  style="height: 15px" />
                <div class="ps-1 pt-1">{{ item.hit }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-cover {
  width: 1092px;
  height: 500px;
  background-image: url("@/assets/img/field.jpg");
  background-size: cover;
}

.btn-login {
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

.recommend-path {
  width: 1092px;
}

.main-recommand-path-item {
  width: 260px;
  height: 350px;
}
.recommand-path-map {
  width: 100%;
  height: 260px;
  top: 0;
}

.recommand-path-info-text {
  display: flex;
  justify-content: space-between;
}
.image-container {
  position: relative;
}

.image-title {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
}
</style>
