<script setup>
import { watch, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import VKakaoMap from "@/components/common/VKakaoMap.vue";
import { getAttractionDetailApi, getAreaName, nearGetAttractionListApi } from "@/api/attractionApi";
import AttractionCityItem from "./item/AttractionCityItem.vue";

const route = useRoute();
const router = useRouter();
const attractionDetail = ref(null);
const selectedStations = ref([]); // attractions을 배열로 변경
const nearAttractions = ref([]); // 가까운 관광지 목록을 담을 배열

const category = ref(0);
const categoryMapping = {
  호텔: 32,
  문화생활: [14, 15],
  음식점: 39,
  마켓: 38,
  액티비티: 28,
  자연: [12, 25],
};
const area = ref("");

const fetchAttractionDetail = async () => {
  const attractionId = route.params.attractionid;
  try {
    const response = await getAttractionDetailApi(attractionId);
    attractionDetail.value = response.data.dataBody;
    category.value = findMatchingKey(attractionDetail.value.content_type_id);

    console.log(attractionDetail.value);
    // console.log(category.value);
    selectedStations.value = [
      {
        // 배열 안에 객체를 담아서 설정
        latitude: attractionDetail.value.latitude,
        longitude: attractionDetail.value.longitude,
        title: attractionDetail.value.title,
        addr1: attractionDetail.value.addr1,
        first_image: attractionDetail.value.first_image,
      },
    ];
  } catch (error) {
    console.error("여행지 관광정보 상세 받아오기 실패: ", error);
  }

  getAreaName(
    {
      sido: attractionDetail.value.sido_code,
      gugun: attractionDetail.value.gugun_code,
    },
    ({ data }) => {
      console.log(data.dataBody);
      area.value = data.dataBody;

      console.log(area.value);
      // console.log("pathDetails : ", pathDetails.value);
    },
    (error) => {
      console.log(error);
    }
  );
};

function findMatchingKey(contentTypeId) {
  for (const key in categoryMapping) {
    const value = categoryMapping[key];

    if (Array.isArray(value)) {
      if (value.includes(contentTypeId)) {
        return key;
      }
    } else {
      if (value === contentTypeId) {
        return key;
      }
    }
  }

  return null; // 매칭되는 키가 없는 경우
}

const fetchNearAttractions = async () => {
  const attractionId = route.params.attractionid;
  try {
    const response = await nearGetAttractionListApi(attractionId);
    nearAttractions.value = response.data.dataBody;
  }
  catch (error) {
    console.error("가까운 관광지 정보 받아오기 실패: ", error);
  }
}

function goToAttracitionDetail(contentId) {
  router.push({
    name: "attraction-area-detail",
    params: { attractionid: contentId }
  });
}

// 라우트 파라미터가 변경될 때마다 호출될 함수
const fetchAttractionData = async () => {
  await fetchAttractionDetail();
  await fetchNearAttractions();
};

onMounted(() => {
  fetchAttractionData();
});

watch(
  () => route.params.attractionid,
  (newAttractionId, oldAttractionId) => {
    if (newAttractionId !== oldAttractionId) {
      fetchAttractionData(); // 라우트 파라미터가 변경될 때마다 데이터 새로 가져오기
      // 페이지 상단으로 스크롤
      window.scrollTo(0, 0);
    }
  }
);
</script>

<template>
  <div class="screen">
    <!-- attractionDetail이 있는 경우에 렌더링 -->
    <div class="detail-info" v-if="attractionDetail">
      <div class="detail-category">여행지 > {{ area }} > {{ category }}</div>
      <div class="detail-info-title ">
        <h3 class="pt-3">{{ attractionDetail.title }}</h3>
        <div class="icon-text">
          <div>
            <font-awesome-icon :icon="['fas', 'location-dot']" />
            <div>{{ attractionDetail.addr1 }}</div>
          </div>
          <div>
            <font-awesome-icon :icon="['far', 'eye']" style="height: 15px" />
            <div>
              {{ attractionDetail.readcount }}
            </div>
          </div>
        </div>
      </div>
      <div class="detail-content flex-column align-items-center">
        <div class="">
          <img
            v-if="attractionDetail.first_image"
            :src="attractionDetail.first_image"
            class="px-4"
            alt="..."
            style="width: 500px"
          />
          <img
            v-else
            src="@/assets/img/defaultImg.png"
            class="px-4"
            alt="..."
            style="width: 500px"
          />
          <!-- <img
            src="@/assets/img/building.jpg"
            class="px-4"
            alt="..."
            style="width: 500px"
          /> -->
        </div>
        <div class="mt-5 px-4">{{ attractionDetail.overview }}</div>
      </div>
      <div class="d-flex flex-column mt-5 mb-5">
        <div class="fs-4 fw-border ms-4">인근 여행지</div>
        <div class="cityitem d-flex flex-row justify-content-center  ">
          <AttractionCityItem
          v-for="item in nearAttractions"
          :key="item.content_id"
          :attraction="item"
          @click="goToAttracitionDetail(item.content_id)"
          >
        </AttractionCityItem>
      </div>
      </div>
      <div class="mx-4 d-flex flex-column border border-dark-subtle">
        <!--맵 부분 -->
        <!-- 여기에 VKakaoMap 컴포넌트 추가 -->
        <!-- <div class="map-container"> -->
        <VKakaoMap
          :attractions="selectedStations"
          style="height: 700px"
        ></VKakaoMap>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.screen {
  background-color: transparent;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.detail-category {
  font-size: 12px;
  margin-left: 20px;
  align-self: flex-start; /* 수정된 부분 */
}

.detail-info,
.city-popular,
.city-recommand-path {
  margin-top: 20px;
  width: 80%;
  max-width: 1092px;
  margin-bottom: 100px;
}

.detail-info-title {
  background-color: #d7dbff;
  border-radius: 15px; /* 값을 조절하여 더 둥글게 만들 수 있습니다. */
  padding: 10px; /* 추가로 내용과의 간격을 조절할 수 있습니다. */
}

.detail-info-title > h3 {
  margin-left: 20px;
  margin-bottom: 20px;
  font-weight: bold;
}

.icon-text {
  flex-direction: column;
  display: flex;
  align-items: flex-start; /* 왼쪽 정렬을 유지하려면 추가 */
  margin-left: 20px;
}
.icon-text > div {
  flex-direction: row;
  display: flex;
  align-items: center;
}
.icon-text > div > * {
  margin-right: 10px;
}

.detail-content {
  margin-top: 20px;
  display: flex;
  /* border: 1px solid red; */
}

.icon-text > * {
  margin-left: 5px;
}
</style>
