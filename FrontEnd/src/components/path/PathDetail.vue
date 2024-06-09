<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMemberStore } from "@/stores/memberStore";
import { usePathStore } from "@/stores/pathStore";
import { storeToRefs } from "pinia";
import * as bootstrap from 'bootstrap';

import {
  getPathList,
  getPathDetailsWithAttraction,
  deletePath,
} from "@/api/pathApi.js";

import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel"; //스크롤
import PathDetailItem from "./item/PathDetailItem.vue";
import VKakaoMap from "@/components/common/VKakaoMap.vue";
const route = useRoute();
const router = useRouter();

const memberStore = useMemberStore();
const { memberInfo } = memberStore;

const pathStore = usePathStore();
const { pathInfo } = storeToRefs(pathStore);

const path = ref({
  title: "",
  content: "",
  startDate: "",
  endDate: "",
  memberId: "",
  memberNickname: "",
  isDeleted: "",
});

// 기존의 pathDetails 변수는 모든 여행 경로 데이터를 저장하는 용도로 사용합니다.
const pathDetails = ref([]);

const period = ref(0);

const pathParam = ref({
  pathId: route.params.pathId,
  city: "",
  order: 1,
  limitCount: 0,
});

onMounted(() => {
  console.log("이거 한번 확인해보자 여러번 찍히는지");
  getPathInfo();
  getPathDetail();
  if (memberInfo != null) {
    console.log("member info ", memberInfo.value);
  } else {
    console.log("멤버 인포 없음");
  }
});

const getPathInfo = () => {
  console.log("path 정보 가져오기!");
  getPathList(
    pathParam.value,
    ({ data }) => {
      // console.log(data.dataBody[0]);
      path.value = data.dataBody[0];
      console.log("path : ", path.value);
      period.value = calcPeriod();
    },
    (error) => {
      console.log(error);
    }
  );
};

const getPathDetail = () => {
  console.log("path detail 가져오기!");
  getPathDetailsWithAttraction(
    route.params.pathId,
    ({ data }) => {
      // console.log(data.dataBody);
      pathDetails.value = data.dataBody;
      console.log("pathDetails : ", pathDetails.value);
    },
    (error) => {
      console.error(error);
    }
  );
};

const calcPeriod = () => {
  // 문자열을 Date 객체로 변환
  const date1 = new Date(path.value.startDate);
  const date2 = new Date(path.value.endDate);

  // 두 날짜 간의 차이를 밀리초로 얻고 일로 변환
  const dayDifference = Math.abs(date2 - date1) / (1000 * 60 * 60 * 24) + 1;
  // console.log("day :::", dayDifference);
  return dayDifference;
};

//pathDetail에서 해당 날짜별로만 가져오기
const filteredAttractions = (dayIndex) => {
  const attractions = pathDetails.value.filter((item) => item.day === dayIndex);
  console.log(`필터링된 관광지 (Day ${dayIndex}):`, attractions);
  return attractions;
};

//days nav활성화
const activeTab = ref(1);

function changeTab(dayIndex) {
  console.log("Tab 변경: ", dayIndex);
  activeTab.value = dayIndex;
}
const modifyMyPath = () => {
  pathStore.reset();
  pathInfo.value.id = path.value.id;
  pathInfo.value.title = path.value.title;
  pathInfo.value.startDate = path.value.startDate;
  pathInfo.value.endDate = path.value.endDate;
  pathInfo.value.isNew = false;
  console.log("pathInfo pinia ", pathInfo.value);
  router.push({ name: "make-step2" });
};

const deleteMyPath = () => {
  deletePath(
    route.params.pathId,
    ({ data }) => {
      // console.log(data.dataBody);
      const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
      deleteModal.show();
      // 확인 버튼 이벤트 리스너
      document.getElementById('deleteModalConfirmButton').addEventListener('click', () => {
        deleteModal.hide();
        router.push({ name: "path-list" });
      });
      

      // pathDetails.value = data.dataBody;
      // console.log("pathDetails : ", pathDetails.value);
    },
    (error) => {
      console.log(error);
    }
  );
};

const displayedPathDetails = computed(() => {
  return pathDetails.value.filter((item) => item.day === activeTab.value);
});

const showAlertModal = (modalId, message) => {
  const modalElement = document.getElementById(modalId);
  const modalMessageElement = modalElement.querySelector('.modal-body p');
  modalMessageElement.textContent = message;
  const alertModal = new bootstrap.Modal(modalElement, {});
  alertModal.show();
};
</script>

<template>
  <div class="container">
    <div class="content justify-content-center">
      <div class="main-img">
        <div class="text-container">
          <h3>{{ path.title }}</h3>
          <p>{{ path.startDate }} ~ {{ path.endDate }} ({{ period }}일)</p>

          <div class="icon-text">
            <font-awesome-icon :icon="['fas', 'location-pin']" />
            <div>{{ pathDetails.length }}</div>
            <font-awesome-icon :icon="['far', 'eye']" />
            <div>{{ path.hit }}</div>
          </div>
        </div>
        <div
          v-if="memberInfo != null && path.memberId === memberInfo.id"
          class="d-flex btn-container">
          <button
            type="button"
            class="btn btn-modify me-3"
            @click="modifyMyPath">
            수정
          </button>
          <button class="btn btn-secondary" @click="deleteMyPath">삭제</button>
        </div>
      </div>
      <div class="plan-content">
        <!-- 여행 계획 일정 부분-->
        <div class="path-detail">
          <PathDetailItem
            v-for="day in period"
            :key="day"
            :pathDetail="filteredAttractions(day)"
            :dayNum="day"
            :startDate="path.startDate"></PathDetailItem>
        </div>
        <!-- 여행 계획 지도 부분-->
        <div class="path-map-content p-1 pb-0 mt-3">
          <div class="navbar-nav" style="width: 300px">
            <carousel class="p-0 m-0" :items-to-show="3.5" :snapAlign="'start'">
              <slide
                v-for="dayIndex in period"
                :key="dayIndex"
                class="rounded-top"
                :class="{
                  'border-end-0': dayIndex === period ? false : true,
                  border: activeTab !== dayIndex,
                }"
                :style="{
                  color: activeTab === dayIndex ? 'white' : 'black',
                  backgroundColor: activeTab === dayIndex ? '#c19ee0' : '',
                }">
                <li
                  class="nav-item list-unstyled p-0 pt-2"
                  style="width: fit-content">
                  <a
                    class="nav-link"
                    :class="{ active: activeTab === dayIndex }"
                    href="#"
                    @click="changeTab(dayIndex)"
                    >Day{{ dayIndex }}</a
                  >
                </li>
              </slide>
            </carousel>
          </div>
          <VKakaoMap
            style="height: 300px; width: 300px"
            :attractions="filteredAttractions(activeTab)"></VKakaoMap>
        </div>
      </div>
    </div>
  </div>

  <!-- 회원 정보 업데이트 성공 모달 -->
  <div class="modal" id="deleteModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="deleteModalLabel">여행 계획 삭제</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                해당 여행 계획이 삭제되었습니다.
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="deleteModalConfirmButton">확인</button>
              </div>
            </div>
          </div>
        </div>
</template>

<style scoped>
.content {
  background-color: transparent;
  display: block;
  flex-direction: row;
  justify-content: center;

  width: 1092px;
}

.main-img {
  position: relative;
  width: 1092px;
  height: 350px;

  background: url(@/assets/img/map.jpg) center/cover;
}

.text-container {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 20px;
  color: white;
}
.btn-container {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 20px;
}
.icon-text {
  flex-direction: row;
  display: flex;
  align-items: center;
  border: 1px solid white;
  width: fit-content;
  padding: 5px;
}

.icon-text > * {
  margin-right: 5px;
  height: 15px;
  font-size: 15px;
}

.plan-content {
  display: flex;
}

.path-detail {
  margin-top: 20px;
  flex: 1;
}

.path-map {
  background-color: aquamarine;
  width: 300px;
  height: 300px;
}

.btn-modify {
  --bs-btn-color: var(--bs-white);
  --bs-btn-bg: #c19ee0;
  --bs-btn-border-color: #c19ee0;

  --bs-btn-hover-color: var(--bs-white);
  --bs-btn-hover-bg: #a06cd5;
  --bs-btn-hover-border-color: #a06cd5;

  --bs-btn-focus-shadow-rgb: #a06cd5;
  --bs-btn-active-color: var(--bs-white);
  --bs-btn-active-bg: #a06cd5;
  --bs-btn-active-border-color: #a06cd5;
}

.btn-primary {
    --bs-btn-bg: #dac3e8; /* 원하는 색상 코드 */
    --bs-btn-border-color: #dac3e8;
    --bs-btn-hover-bg: #c19ee0;
    --bs-btn-hover-border-color: #c19ee0;
    --bs-btn-focus-shadow-rgb: #a06cd5;
    --bs-btn-active-bg: #a06cd5;
    --bs-btn-active-border-color: #a06cd5;
  }
</style>
