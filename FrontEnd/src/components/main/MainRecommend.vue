<script setup>
import { onMounted, ref } from "vue";
import MainRecommendAttractionItem from "./item/MainRecommendAttractionItem.vue";
import {
  topGetAttractionListApi,
  recommendGetAttractionListApi,
} from "@/api/attractionApi";
import { useRouter } from "vue-router";

const router = useRouter();
const popularAttracions = ref([]); // 인기 관광지 목록을 담을 반응형 변수
const recommendAttracions = ref([]); // 랜덤한 관광지 목록을 담을 반응형 변수

// API로부터 인기 관광지 목록을 가져오는 함수
const fetchTopAttractions = () => {
  topGetAttractionListApi(
    ({ data }) => {
      popularAttracions.value = data.dataBody;
    },
    (error) => {
      console.error(error);
    }
  );
};

// API로부터 랜덤한 관광지 목록을 가져오는 함수
const fetchRecommendAttractions = () => {
  recommendGetAttractionListApi(
    ({ data }) => {
      recommendAttracions.value = data.dataBody;
    },
    (error) => {
      console.error(error);
    }
  );
};

const navigateToAttractionDetail = (contentId) => {
  router.push({
    name: "attraction-area-detail",
    params: { attractionid: contentId },
  });
};

// 컴포넌트가 마운트될 때 인기 관광지 목록과 랜덤한 관광지 목록을 가져옴
onMounted(() => {
  fetchTopAttractions();
  fetchRecommendAttractions();
});
</script>

<template>
  <div class="container d-flex flex-column align-items-center my-5">
    <div class="my-5">
      <p class="px-3 mb-5 fs-3 fw-bold">다음 휴가를 위한 인기 여행지</p>
      <div
        class="recommend-attraction px-3 d-flex flex-row justify-content-between"
      >
        <!-- API로부터 가져온 인기 관광지 목록을 반복하여 표시 -->
        <MainRecommendAttractionItem
          v-for="attraction in popularAttracions"
          :key="attraction.content_id"
          :title="attraction.title"
          :image="attraction.first_image"
          @click="navigateToAttractionDetail(attraction.content_id)"
        />
      </div>
    </div>

    <div class="my-5">
      <p class="px-3 my-5 fs-3 fw-bold">이번 주말을 위한 무작위 여행지</p>
      <div
        class="recommend-attraction px-3 d-flex flex-row justify-content-between mb-5"
      >
        <!-- API로부터 가져온 랜덤한(추천하는) 관광지 목록을 반복하여 표시 -->
        <MainRecommendAttractionItem
          v-for="attraction in recommendAttracions"
          :key="attraction.content_id"
          :title="attraction.title"
          :image="attraction.first_image"
          @click="navigateToAttractionDetail(attraction.content_id)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.recommend-attraction {
  width: 1092px;
}
</style>
