<script setup>
import { ref, watch, onMounted, onUpdated } from "vue";
import { useRouter } from "vue-router";

import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel"; //스크롤

import { usePathStore } from "@/stores/pathStore";
import { storeToRefs } from "pinia";

import { getAreaListByCategory } from "@/api/attractionApi";
import {
  listSido,
  listGugun,
  createPath,
  createAndUpdatePathDetails,
  getPathDetailsWithAttraction,
} from "@/api/pathApi";

import PathMakeListItem from "@/components/path/item/PathMakeListItem.vue";
import VSelect from "@/components/common/VSelect.vue";
import VKakaoMap from "@/components/common/VKakaoMap.vue";
import * as bootstrap from 'bootstrap';

// const route = useRoute();
const router = useRouter();

const pathStore = usePathStore();
const { pathInfo } = storeToRefs(pathStore);

// const attractionStore = useAttractionStore();
// const { attractionList } = storeToRefs(attractionStore);

const attractionList = ref([]);

const sidoList = ref([]);
const gugunList = ref([{ text: "구군선택", value: "" }]);
const gugunDisable = ref(false);

const param = ref({
  zscode: 0,
  city: "",
  category: "",
  litmit: 0,
});

const detailParam = ref({
  id: 0,
  myAttractionList: [],
});

//여행 기간
const days = ref(0);

//내 여행 경로
const myAttractionList = ref([]);
const orders = ref([]); //여행 일자 별 여행지의 순서

//PathMakeListIme 에서 받은 attraction으로 경로에 추가
//PathMakeListIme 에서 받은 attraction으로 경로에 추가
const addAttractionToPath = (attraction) => {
  // 중복 검사: 동일한 content_id를 가진 관광지가 이미 리스트에 있는지 확인
  const isDuplicate = myAttractionList.value.some(
    (item) =>
      item.content_id === attraction.content_id && item.day === activeTab.value
  );

  if (isDuplicate) {
    // 중복이 있다면 알림을 표시하고 추가하지 않음
    alert("중복되는 여행지입니다!");
  } else {
    const newAddAttraction = {
      title: attraction.title,
      addr1: attraction.addr1,
      addr2: attraction.addr2,
      contentId: attraction.content_id,
      first_image: attraction.first_image,
      gugun_code: attraction.gugun_code,
      sido_code: attraction.sido_code,
      latitude: attraction.latitude,
      longitude: attraction.longitude,
    };
    // attraction;
    newAddAttraction.orders = orders.value[activeTab.value]++;
    newAddAttraction.day = activeTab.value;
    newAddAttraction.id = null;

    // 중복이 없다면 리스트에 관광지 추가
    console.log("여행지 경로에 추가된 여행지:", newAddAttraction);
    // myAttractionList에 추가
    myAttractionList.value.push(newAddAttraction);
    console.log(
      "day ",
      activeTab.value,
      " order ",
      orders.value[activeTab.value] - 1
    );

    // console.log(newAttraction);
    console.log(myAttractionList.value);
  }
};

//PathMakeListIme 에서 받은 attraction으로 경로에서 삭제 추가
const removeAttractionToPath = (attraction) => {
  console.log(
    "Attraction remove from path:",
    attraction.title,
    attraction.day,
    attraction.orders
  );
  // attraction의 content_id, orders, day를 기준으로 삭제할 여행지의 인덱스를 찾음
  const attractionIndex = myAttractionList.value.findIndex(
    (item) =>
      item.content_id === attraction.content_id &&
      item.orders === attraction.orders &&
      item.day === attraction.day
  );
  if (attractionIndex !== -1) {
    // myAttractionList에서 해당 day의 orders가 큰 요소들을 찾아서 orders-1을 수행
    myAttractionList.value.forEach((item) => {
      if (item.day === attraction.day && item.orders > attraction.orders) {
        console.log("item", item.orders, item.title);
        item.orders -= 1;
        console.log("item", item.orders, item.title);
      }
    });

    //해당 day의 orders 전체 크기 -1
    --orders.value[activeTab.value];
    //myAttractionList에서 삭제
    myAttractionList.value.splice(attractionIndex, 1);
  }

  console.log(myAttractionList.value);
};

const calcDate = () => {
  // 문자열을 Date 객체로 변환
  const date1 = new Date(pathInfo.value.startDate);
  const date2 = new Date(pathInfo.value.endDate);

  // 두 날짜 간의 차이를 계산
  const timeDifference = Math.abs(date2 - date1); // 차이를 밀리초로 얻음

  // 차이를 일로 변환
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  return daysDifference;
  // console.log(daysDifference);
};

const formatDate = (val) => {
  const start = new Date(val);

  const year = start.getFullYear();
  const month = String(start.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고 두 자리로 맞춰줍니다.
  const day = String(start.getDate()).padStart(2, "0"); // 날짜도 두 자리로 맞춰줍니다.

  const formattedDate = `${year}-${month}-${day}`;
  // console.log(formattedDate);
  return formattedDate;
};

const getSidoList = () => {
  listSido(
    ({ data }) => {
      console.log("sido data : ", data.dataBody);
      let options = [];
      options.push({ text: "시도선택", value: "" });
      data.dataBody.forEach((sido) => {
        options.push({
          text: sido.sido_name,
          value: { code: sido.sido_code, name: sido.sido_name },
        });
      });
      sidoList.value = options;
      console.log(sidoList.value);
    },
    (err) => {
      console.log(err);
    }
  );
};
const onChangeSido = (val) => {
  console.log("val", val); //시도 코드
  if (val.code < 10) {
    gugunList.value = [{ text: "시군선택", value: { code: 0, name: "" } }]; // 초기화
    onChangeGugun({ code: 0 });
    gugunDisable.value = true;
    param.value.city = val.name;
    console.log(param.value);
    return;
  } else {
    gugunDisable.value = false;
  }
  listGugun(
    { sido: val.code },
    ({ data }) => {
      console.log("gugun data : ", data.dataBody);
      let options = [];
      options.push({ text: "시군선택", value: { code: 0, name: "" } });
      data.dataBody.forEach((gugun) => {
        options.push({
          text: gugun.gugun_name,
          value: { code: gugun.gugun_code, name: gugun.gugun_name },
        });
      });
      gugunList.value = options;
    },
    (err) => {
      console.log(err);
    }
  );
};

const onChangeGugun = (val) => {
  param.value.zscode = val.code;
  param.value.city = val.name;
  console.log("onchange gugun ", param.value);
};

//관광지 검색 카테고리
function selectCategory(category) {
  param.value.category = category;
  console.log("selectCategory", param.value);
}

//days nav활성화
const activeTab = ref(1);
function changeTab(dayIndex) {
  activeTab.value = dayIndex;
  console.log("changeTab = activetab ", activeTab.value);
}

//day 탭을 클릭 했을 때 내 경로에서 해당되는 날짜만 선택
const filteredAttractions = (dayIndex) => {
  return myAttractionList.value.filter((item) => item.day === dayIndex);
};

//저장 버튼
const registMyPath = () => {
  console.log("path 저장하기!!!", pathInfo.value);
  if (myAttractionList.value.length < 1) {
    showAlertModal('alertModal', "경로를 추가해주세요!");
    return;
  }

  if (!pathInfo.value.isNew) {
    detailParam.value.id = pathInfo.value.id;
    detailParam.value.myAttractionList = myAttractionList.value;
    createAndUpdatePathDetails(
      detailParam.value,
      ({ data }) => {
        console.log(data.dataBody);
        // showAlertModal('alertModal', "계획 생성이 완료되었습니다.");
        // 모달을 표시하고 확인 버튼을 클릭하면 메인 화면으로 리다이렉션
        const updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
        updateModal.show();
        // 확인 버튼 이벤트 리스너
        document.getElementById('updateModalConfirmButton').addEventListener('click', () => {
          updateModal.hide();
          pathStore.reset();
          router.push({
            name: "path-detail",
            params: { pathId: detailParam.value.id },
          });
        });
      },
      (error) => {
        console.log(error);
      }
    );
  } else {
    //path db에 저장
    createPath(
      pathInfo.value,
      ({ data }) => {
        console.log(data.dataBody);
        pathInfo.value.id = data.dataBody;
        console.log(pathInfo.value);

        detailParam.value.id = data.dataBody;
        detailParam.value.myAttractionList = myAttractionList.value;
        console.log("detailParam", detailParam.value);
        createAndUpdatePathDetails(
          detailParam.value,
          ({ data }) => {
            console.log(data.dataBody);
            // showAlertModal('alertModal', "계획 생성이 완료되었습니다.");
            // 모달을 표시하고 확인 버튼을 클릭하면 메인 화면으로 리다이렉션
            const updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
            updateModal.show();
            // 확인 버튼 이벤트 리스너
            document.getElementById('updateModalConfirmButton').addEventListener('click', () => {
              updateModal.hide();
              pathStore.reset();
              router.push({
                name: "path-detail",
                params: { pathId: detailParam.value.id },
              });
            });
            
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
};

//취소 버튼
const cancelMakePath = () => {
  pathStore.reset();
  router.push({ name: "main" });
};

//수정 시 경로 디테일 가져오기
const getDetailList = async () => {
  await getPathDetailsWithAttraction(
    pathInfo.value.id,
    ({ data }) => {
      console.log("detail list : ", data.dataBody);
      myAttractionList.value = data.dataBody;
    },
    (err) => {
      console.log(err);
    }
  );

  myAttractionList.value.forEach((item) => {
    item.first_image = item.image1;
  });
  console.log("myAttraction List : ", myAttractionList.value);
};

// 공통 모달
const showAlertModal = (modalId, message) => {
  const modalElement = document.getElementById(modalId);
  const modalMessageElement = modalElement.querySelector('.modal-body p');
  modalMessageElement.textContent = message;
  const alertModal = new bootstrap.Modal(modalElement, {});
  alertModal.show();
};

onMounted(() => {
  attractionList.value = [];
  getSidoList();

  pathInfo.value.startDate = formatDate(pathInfo.value.startDate);
  pathInfo.value.endDate = formatDate(pathInfo.value.endDate);
  days.value = calcDate() + 1;

  //수정시 pathInfo에 id가 있다면 detail list 가져오기
  if (!pathInfo.value.isNew) {
    console.log("씨발 디테일 가져와");
    getDetailList();
  }

  //일자별 여행순서 초기화
  for (let i = 1; i <= days.value; i++) {
    orders.value[i] = 1;
  }
  // console.log("orders", orders.value);
  // console.log("Dddddddddd", days.value);
  console.log("on mounted pathInfo", pathInfo.value);
  // console.log("attraction list ", attractionList.value);
});

onUpdated(() => {
  console.log("Component updated");
});

//카테고리가 변경되면 db에서 새로 가져와야함
watch(
  () => param.value.category,
  () => {
    console.log("watch : ", param.value.category);
    getAreaListByCategory(
      param.value,
      ({ data }) => {
        console.log(data.dataBody);
        attractionList.value = data.dataBody;
        console.log("watch attractionList", attractionList.value);
      },
      (error) => {
        console.log(error);
      }
    );
  }
);

// 관찰자를 사용하여 myAttractionList의 변화를 감지하고 마커를 업데이트하는 로직
watch(
  () => [...myAttractionList.value],
  (newList, oldList) => {
    if (newList.length !== oldList.length) {
      // myAttractionList가 변경될 때마다 VKakaoMap 컴포넌트에 전달되는 attractions prop를 업데이트합니다.
      // VKakaoMap 컴포넌트 내부에서는 이 prop의 변경을 감지하여 마커를 새로 그리는 로직이 있어야 합니다.
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="container-fluid p-0" style="height: fit-content">
    <!--상단 네비-->
    <nav class="navbar navbar-expand-lg bg-body-tertiary px-0 py-1">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">{{ pathInfo.title }}</a>

        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent">
          <form class="d-flex" role="search">
            <button
              class="btn btn-outline-success me-2"
              type="submit"
              @click.prevent="registMyPath">
              저장
            </button>
            <button
              class="btn btn-outline-success"
              type="button"
              @click="cancelMakePath">
              취소
            </button>
          </form>
        </div>
      </div>
    </nav>
    <div class="row">
      <div class="col-3 border">
        <h3 class="my-3 ms-2">여행지 검색</h3>
        <div class=" ">
          <div class="d-flex m-auto">
            <VSelect
              class="mx-3"
              :selectOption="sidoList"
              @onKeySelect="onChangeSido" />

            <VSelect
              class="mx-3"
              :disabled="gugunDisable"
              :selectOption="gugunList"
              @onKeySelect="onChangeGugun" />
          </div>
          <nav class="navbar navbar-expand-lg">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mx-auto fw-bold">
                <li class="nav-item mx-1">
                  <a
                    class="nav-link d-flex flex-column align-items-center"
                    @click="selectCategory('hotel')"
                    href="#"
                    ><i class="bi bi-moon-stars me-1"></i>호텔</a
                  >
                </li>
                <li class="nav-item mx-1">
                  <a
                    class="nav-link d-flex flex-column align-items-center"
                    @click="selectCategory('culture')"
                    href="#"
                    ><i class="bi bi-ticket-perforated me-1"></i>문화생활</a
                  >
                </li>
                <li class="nav-item mx-1">
                  <a
                    class="nav-link d-flex flex-column align-items-center"
                    @click="selectCategory('restaurant')"
                    href="#"
                    ><img
                      class="icon-svg me-1 my-1"
                      src="@/assets/img/utensils.svg" />음식점</a
                  >
                </li>
                <li class="nav-item mx-1">
                  <a
                    class="nav-link d-flex flex-column align-items-center"
                    @click="selectCategory('market')"
                    href="#"
                    ><i class="bi bi-shop-window me-1"></i>마켓</a
                  >
                </li>
                <li class="nav-item mx-1">
                  <a
                    class="nav-link d-flex flex-column align-items-center"
                    @click="selectCategory('activity')"
                    href="#"
                    ><i class="bi bi-tsunami me-1"></i>액티비티</a
                  >
                </li>
                <li class="nav-item mx-1">
                  <a
                    class="nav-link d-flex flex-column align-items-center"
                    @click="selectCategory('nature')"
                    href="#"
                    ><i class="bi bi-tree me-1"></i>자연</a
                  >
                </li>
              </ul>
            </div>
          </nav>
          <div
            v-if="attractionList && attractionList.length > 0"
            class="attraction-list">
            <PathMakeListItem
              v-for="item in attractionList"
              :key="item.content_id"
              :attraction="item"
              itemType="attraction"
              @addAttractionToPath="addAttractionToPath"></PathMakeListItem>
          </div>
          <div v-else class="p-3 border-top">여행지가 추가될 예정입니다.</div>
        </div>
      </div>
      <div class="border col-3">
        <h3 class="my-3 ms-2">내 여행 경로</h3>
        <carousel class="p-0 m-0" :items-to-show="3.5" :snapAlign="'start'">
          <slide
            v-for="dayIndex in days"
            :key="dayIndex"
            class="rounded-top"
            :class="{
              'border-end-0': dayIndex === days ? false : true,
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

        <div v-for="dayIndex in days" :key="dayIndex" class="attraction-list">
          <div v-if="activeTab === dayIndex">
            <PathMakeListItem
              v-for="item in filteredAttractions(dayIndex)"
              :key="item.contentId"
              :attraction="item"
              :itemType="'mypath'"
              @removeAttractionToPath="
                removeAttractionToPath
              "></PathMakeListItem>
          </div>
        </div>
      </div>
      <div class="col-6 border">
        <!-- 변경된 activeTab에 따라 attractions을 필터링하여 전달 -->
        <VKakaoMap
          style="height: 1026px"
          :attractions="filteredAttractions(activeTab)"></VKakaoMap>
      </div>
    </div>
  </div>

  <!-- Alert 모달 -->
  <div class="modal" tabindex="-1" id="alertModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">알림</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>메시지 내용</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">확인</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 회원 정보 업데이트 성공 모달 -->
  <div class="modal" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="updateModalLabel">여행 계획 세우기</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                계획이 생성되었습니다.
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="updateModalConfirmButton">확인</button>
              </div>
            </div>
          </div>
        </div>
</template>

<style scoped>
.icon-svg {
  width: 16px;
  height: 16px;
  margin-top: 8px;
}

.attraction-list {
  max-height: 800px; /* 스크롤이 나타날 최대 높이 */
  overflow-y: auto; /* 세로 스크롤 활성화 */
}

#alertModal .btn-primary {
  --bs-btn-bg: #dac3e8; /* 이 부분에 원하는 색상 코드를 입력하세요 */
  --bs-btn-border-color: #dac3e8;
  --bs-btn-hover-bg: #c19ee0;
  --bs-btn-hover-border-color: #c19ee0;
  --bs-btn-focus-shadow-rgb: #a06cd5;
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
