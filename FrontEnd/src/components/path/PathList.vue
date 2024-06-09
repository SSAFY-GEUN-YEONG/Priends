<script setup>
import PathListItem from "./item/PathListItem.vue";
import { ref, watch, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { getPathList } from "@/api/pathApi.js";

const router = useRouter();

const pathList = ref([]);

onBeforeMount(() => {
  getListPath();
});

const param = ref({
  pathId: -1,
  city: "",
  order: 2, //1:최신순 2:인기순
  limitCount: 0,
});

const getListPath = () => {
  console.log("path 목록 가져오기!");
  getPathList(
    param.value,
    ({ data }) => {
      // console.log(data.dataBody);
      pathList.value = data.dataBody;
      console.log("pathList : ", pathList.value);
    },
    (error) => {
      console.log(error);
    }
  );
};

function goToPathDetail(id) {
  router.push({
    name: "path-detail",
    params: { pathId: id },
  });
}

function changePathListOrder(val) {
  const newOrder = val;
  param.value.order = newOrder;
  console.log("param order ", param.value.order);
}
function setCityName(area) {
  param.value.city = area;
  param.value.order = 2;
  console.log("cityname" + param.value.city);

  getListPath();
}
watch(
  () => param.value.order,
  () => {
    getListPath();
  }
);
</script>

<template>
  <div class="screen">
    <div class="search-area">
      <div class="text-wrapper text-center pt-5 fs-2 fw-bolder">
        Priends의 여행 계획을 살펴보세요!
      </div>
      <div class="div-search-area mt-0">
        <form @submit.prevent="onSubmit" class="mx-5 mt-4">
          <div class="input-group input-group-sm pt-2">
            <input
              type="text"
              class="form-control"
              v-model="param.city"
              placeholder="계획하고 싶은 도시를 입력하세요." />
            <button class="btn btn-dark" type="button" @click="getListPath">
              검색
            </button>
          </div>
          <div class="recommand_city mt-3">추천도시 : 제주, 부산, 서울</div>
        </form>
      </div>
    </div>

    <div class="major-city">
      <table class="table">
        <tbody>
          <tr>
            <th scope="row">주요도시</th>
            <td @click="() => setCityName('서울')">서울</td>
            <td @click="() => setCityName('제주')">제주</td>
            <td @click="() => setCityName('부산')">부산</td>
            <td @click="() => setCityName('대구')">대구</td>
            <td @click="() => setCityName('인천')">인천</td>
            <td @click="() => setCityName('광주')">광주</td>
            <td @click="() => setCityName('울산')">울산</td>
            <td @click="() => setCityName('대전')">대전</td>
          </tr>
          <tr>
            <th scope="row" rowspan="2">주요지역</th>

            <td @click="() => setCityName('강원도')">강원도</td>
            <td @click="() => setCityName('경기도')">경기도</td>
            <td @click="() => setCityName('경상남도')">경상남도</td>
            <td @click="() => setCityName('경상북도')">경상북도</td>
            <td @click="() => setCityName('전라남도')">전라남도</td>
            <td @click="() => setCityName('전라북도')">전라북도</td>
            <td @click="() => setCityName('충청남도')">충청남도</td>
            <td @click="() => setCityName('충청북도')">충청북도</td>
          </tr>
          <tr>
            <td @click="() => setCityName('가평')">가평</td>
            <td @click="() => setCityName('강릉')">강릉</td>
            <td @click="() => setCityName('경주')">경주</td>
            <td @click="() => setCityName('목포')">목포</td>
            <td @click="() => setCityName('속초')">속초</td>
            <td @click="() => setCityName('양양')">양양</td>
            <td @click="() => setCityName('여수')">여수</td>
            <td @click="() => setCityName('전주')">전주</td>
            <td @click="() => setCityName('춘천')">춘천</td>
            <td @click="() => setCityName('포항')">포항</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="d-flex flex-column path-list">
      <div
        class="d-flex justify-content-between align-items-center mb-2 path-list-item">
        <div class="">
          <button
            class="btn"
            @click="changePathListOrder(2)"
            :class="{ 'btn-active': param.order === 2 }">
            인기
          </button>
          |
          <button
            class="btn"
            @click="changePathListOrder(1)"
            :class="{ 'btn-active': param.order === 1 }">
            신규
          </button>
        </div>
        <p class="plan-count mb-0 me-1">총 {{ pathList.length }}개의 계획</p>
      </div>

      <div class="d-flex flex-column mb-5">
        <PathListItem
          v-for="item in pathList"
          :key="item.id"
          :pathInfo="item"
          @click="goToPathDetail(item.id)">
        </PathListItem>
      </div>
    </div>
  </div>
</template>

<style scoped>
.screen {
  background-color: transparent;
  display: block;
  flex-direction: row;
  justify-content: center;
  width: 100%;

  position: -webkit-sticky;
  position: sticky;
}

.search-area {
  display: block;
  position: relative;
  width: 100%;
  height: 400px;
  background: url(@/assets/img/field.jpg) center/cover;
}

.search-area .text-wrapper {
  font: 700 34.6px/36px;
  color: #ffffff;
  text-shadow: 0px 0px 5px #00000080;
}

.div-search-area {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 가운데 정렬을 위한 트랜스폼 */
  width: 698px;
  height: 138px;
  background-color: #363636b2;
  border-radius: 3px;
}

.search-area .input {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 650px;
  height: 50px;
  background-color: white;
}

.search-area .recommend_city {
  height: 14px;
  font: 400 14px/14px;
  color: #ffffff;
}

.search-area {
  font: 400 14px;
  color: #ffffff;
  white-space: nowrap;
}

.path-list {
  width: 1200px;
  margin: 100px auto;
}

.major-city {
  width: 1200px;
  height: 300px;
  border: 1px solid black;
  font: 16px;
  margin: 100px auto;
  align-items: center;
  justify-content: center;
  text-align: center; /* 텍스트 중앙 정렬을 위한 추가 */
}
table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid black;
  vertical-align: middle; /* 텍스트를 수직으로 가운데 정렬 */
}
tr {
  height: 100px;
  border-bottom: 1px solid black;
}
th {
  border: 1px solid black;
}
td {
  text-align: center;
  width: 100px;
}

.path-list-item {
  width: 1200px;
}

.plan-count {
  color: #5a3886;
}
.btn-active {
  color: #a06cd5;
}
.btn {
  --bs-btn-focus-shadow-rgb: var(--bs-white);
  --bs-btn-active-color: #a06cd5;
  --bs-btn-active-bg: var(--bs-white);
  --bs-btn-active-border-color: var(--bs-white);
}
</style>
