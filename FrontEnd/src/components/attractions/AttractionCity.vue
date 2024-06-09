<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getAreaInfo } from "@/api/attractionApi.js";
import { getPathList, getPathDetailsWithAttraction } from "@/api/pathApi.js";
import AttractionCityItem from "./item/AttractionCityItem.vue";
import VKakaoMap from "@/components/common/VKakaoMap.vue";

import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel"; //스크롤

const route = useRoute();
const router = useRouter();

const areainfo = ref({
  img: "",
  natureAttractions: [],
  restaurantAttractions: [],
  cultureAttractions: [],
});

const selectedCategory = ref("nature");
const selectedAttractions = ref([]);

const fetchAreaInfo = async () => {
  const city = route.params.areaname;
  try {
    const response = await getAreaInfo({ city, category: "home" });
    // console.log(response);
    areainfo.value = response.data.dataBody;
    console.log(areainfo.value);
    updateSelectedAttractions();
  } catch (error) {
    console.error("지역 정보를 가져오는 데 실패했습니다.", error);
  }
};

// 선택된 카테고리에 따라 관광지 목록을 업데이트하는 함수
const updateSelectedAttractions = () => {
  let attractions;
  switch (selectedCategory.value) {
    case "nature":
      attractions = areainfo.value.natureAttractions;
      break;
    case "restaurant":
      attractions = areainfo.value.restaurantAttractions;
      break;
    case "culture":
      attractions = areainfo.value.cultureAttractions;
      break;
    default:
      attractions = areainfo.value.natureAttractions;
  }
  
  // 새로운 배열을 만들어 각 객체에 contentId를 추가합니다.
  selectedAttractions.value = attractions.map(attraction => ({
    ...attraction,
    contentId: attraction.content_id // 가정: 원본 데이터에 content_id가 존재한다고 가정
  }));

  // console.log(selectedAttractions.value);
};

function selectCategory(category) {
  selectedCategory.value = category;
  updateSelectedAttractions();
}

function goToAttracitionDetail(contentId) {
  router.push({
    name: "attraction-area-detail",
    params: { attractionid: contentId },
  });
}

const pathList = ref([]);
const pathDetailList = ref([]);
const param = ref({
  pathId: -1,
  city: route.params.areaname,
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
        await getPathDetailsWithAttraction(
          item.id,

          ({ data }) => {
            console.log("GETpATH + attraction", data.dataBody);
            pathDetailList.value.push(data.dataBody);
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

function moveToPathList() {
  router.push({
    name: "path-list",
  });
}

onBeforeMount(() => {
  fetchAreaInfo();
  getListPath();
});
</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <div class="mb-5" style="max-width: 1092px; width: 100%">
      <div class="mb-3">여행지 > {{ route.params.areaname }} > 홈</div>
      <h3>{{ route.params.areaname }}</h3>
      <div class="pt-1">
        <ul class="nav nav-tabs nav-fill">
          <li class="nav-item">
            <a class="nav-link text-dark active" aria-current="page" href="#"
              >홈</a
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-dark"
              :to="{
                name: 'attraction-area-category',
                params: { areaname: route.params.areaname, category: 'hotel' },
              }"
              >호텔</router-link
            >

            <!-- <a class="nav-link border border-secondary text-dark" href="#"
              >호텔</a
            > -->
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-dark"
              :to="{
                name: 'attraction-area-category',
                params: {
                  areaname: route.params.areaname,
                  category: 'culture',
                },
              }"
              >문화생활</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-dark"
              :to="{
                name: 'attraction-area-category',
                params: {
                  areaname: route.params.areaname,
                  category: 'restaurant',
                },
              }"
              >음식점</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-dark"
              :to="{
                name: 'attraction-area-category',
                params: { areaname: route.params.areaname, category: 'market' },
              }"
              >마켓</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-dark"
              :to="{
                name: 'attraction-area-category',
                params: {
                  areaname: route.params.areaname,
                  category: 'activity',
                },
              }"
              >액티비티</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-dark"
              :to="{
                name: 'attraction-area-category',
                params: { areaname: route.params.areaname, category: 'nature' },
              }"
              >자연</router-link
            >
          </li>
        </ul>
      </div>
      <div class="d-flex flex-row">
        <img :src="areainfo.img" style="max-height: 362px" />
        <VKakaoMap
          :attractions="selectedAttractions"
          style="height: 362px"></VKakaoMap>
      </div>
    </div>

    <div class="my-5" style="max-width: 1092px; width: 100%">
      <h4 class="text-center">{{ route.params.areaname }} 인기장소</h4>
      <div class="">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a
              class="nav-link text-dark"
              @click="selectCategory('nature')"
              href="#"
              >자연</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link text-dark"
              @click="selectCategory('restaurant')"
              href="#"
              >음식점</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link text-dark"
              @click="selectCategory('culture')"
              href="#"
              >문화생활</a
            >
            <!-- <p class="nav-link text-dark" href="#">문화생활</p> -->
          </li>
        </ul>
      </div>

      <div class="cityitem d-flex flex-row justify-content-center">
        <AttractionCityItem
          v-for="item in selectedAttractions"
          :key="item.content_id"
          :attraction="item"
          @click="goToAttracitionDetail(item.content_id)">
        </AttractionCityItem>
      </div>
    </div>

    <div
      class="my-5 d-flex flex-column align-items-center"
      style="max-width: 1092px; width: 100%">
      <h4 class="text-center mb-2">추천 여행 계획</h4>
      <div v-if="pathList.length > 0" class="d-flex my-2">
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
      <div v-else class="d-flex fs-3 my-5">
        {{ route.params.areaname }}의 여행 계획을 세워보세요!
      </div>
      <button
        type="button"
        class="btn btn-outline-secondary my-5 py-2"
        @click="moveToPathList">
        여행 계획 모두보기
      </button>
    </div>
  </div>
</template>

<style scoped>
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
