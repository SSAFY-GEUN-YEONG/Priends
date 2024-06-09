<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { listArea } from "@/api/attractionApi.js";
import { useAttractionStore } from "@/stores/attractionStore";
import { storeToRefs } from "pinia";

const attractionStore = useAttractionStore();
const { cityname } = storeToRefs(attractionStore);
const route = useRoute();

const areas = ref([]);
const param = ref({
  word: "",
});

onMounted(() => {
  // console.log(route.query);
  if (route.query) {
    param.value.word = route.query.areaname;
    getListArea();
  } else {
    getListArea();
  }
});

const getListArea = () => {
  console.log("서버에서 시도 목록 얻어오자!!!", param.value);
  listArea(
    param.value,
    ({ data }) => {
      areas.value = data.dataBody.map((value) => value.gugun_name);
      console.log(areas.value);
    },
    (error) => {
      console.log(error);
    }
  );
};

function setCityName(area) {
  cityname.value = area;
  console.log("cityname" + cityname.value);
}
function clickDoEvent(value) {
  param.value.word = value;
  console.log("setParamWord", param.value);
  getListArea();
  setCityName(value);
}
</script>

<template>
  <div class="screen">
    <div class="search-area">
      <div class="text-wrapper text-center pt-5 fs-2 fw-bolder">
        어디로 여행을 가시나요?
      </div>
      <div class="div-search-area">
        <form @submit.prevent="onSubmit" class="mx-5 mt-4">
          <div class="input-group input-group-sm pt-2">
            <input
              type="text"
              class="form-control"
              v-model="param.word"
              placeholder="여행하고 싶은 도시를 입력하세요." />
            <button class="btn btn-dark" type="button" @click="getListArea">
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
            <td>
              <router-link
                class="text-dark text-decoration-none"
                :to="{
                  name: 'attraction-area',
                  params: { areaname: '서울' },
                }"
                @click="() => setCityName('서울')"
                >서울</router-link
              >
            </td>
            <td>
              <router-link
                class="text-dark text-decoration-none"
                :to="{ name: 'attraction-area', params: { areaname: '제주' } }"
                @click="() => setCityName('제주')"
                >제주</router-link
              >
            </td>
            <td>
              <router-link
                class="text-dark text-decoration-none"
                :to="{ name: 'attraction-area', params: { areaname: '부산' } }"
                @click="() => setCityName('부산')"
                >부산</router-link
              >
            </td>
            <td>
              <router-link
                class="text-dark text-decoration-none"
                :to="{ name: 'attraction-area', params: { areaname: '대구' } }"
                @click="() => setCityName('대구')"
                >대구</router-link
              >
            </td>
            <td>
              <router-link
                class="text-dark text-decoration-none"
                :to="{ name: 'attraction-area', params: { areaname: '인천' } }"
                @click="() => setCityName('인천')"
                >인천</router-link
              >
            </td>
            <td>
              <router-link
                class="text-dark text-decoration-none"
                :to="{ name: 'attraction-area', params: { areaname: '광주' } }"
                @click="() => setCityName('광주')"
                >광주</router-link
              >
            </td>
            <td>
              <router-link
                class="text-dark text-decoration-none"
                :to="{ name: 'attraction-area', params: { areaname: '울산' } }"
                @click="() => setCityName('울산')"
                >울산</router-link
              >
            </td>
            <td>
              <router-link
                class="text-dark text-decoration-none"
                :to="{ name: 'attraction-area', params: { areaname: '대전' } }"
                @click="() => setCityName('대전')"
                >대전
              </router-link>
            </td>
          </tr>
          <tr>
            <th scope="row" rowspan="2">주요지역</th>
            <td @click="clickDoEvent('강원도')">
              <a>강원도</a>
            </td>
            <td @click="clickDoEvent('경기도')">
              <a>경기도</a>
            </td>
            <td @click="clickDoEvent('경상남도')">
              <a>경상남도</a>
            </td>
            <td @click="clickDoEvent('경상북도')">
              <a>경상북도</a>
            </td>
            <td @click="clickDoEvent('전라남도')">
              <a>전라남도</a>
            </td>
            <td @click="clickDoEvent('전라북도')">
              <a>전라북도</a>
            </td>
            <td @click="clickDoEvent('충청남도')">
              <a>충청남도</a>
            </td>
            <td @click="clickDoEvent('충청북도')">
              <a>충청북도</a>
            </td>
          </tr>
          <tr>
            <td>
              <router-link
                class="text-dark text-decoration-none"
                :to="{
                  name: 'attraction-area',
                  params: { areaname: '가평' },
                }"
                @click="() => setCityName('가평')"
                >가평</router-link
              >
            </td>
            <td>
              <router-link
                class="text-dark text-decoration-none"
                :to="{
                  name: 'attraction-area',
                  params: { areaname: '강릉' },
                }"
                @click="() => setCityName('강릉')"
                >강릉</router-link
              >
            </td>
            <td>
              <router-link
                class="text-dark text-decoration-none"
                :to="{
                  name: 'attraction-area',
                  params: { areaname: '경주' },
                }"
                @click="() => setCityName('경주')"
                >경주</router-link
              >
            </td>
            <td>
              <router-link
                class="text-dark text-decoration-none"
                :to="{
                  name: 'attraction-area',
                  params: { areaname: '목포' },
                }"
                @click="() => setCityName('목포')"
                >목포</router-link
              >
            </td>
            <td>
              <router-link
                class="text-dark text-decoration-none"
                :to="{
                  name: 'attraction-area',
                  params: { areaname: '속초' },
                }"
                @click="() => setCityName('속초')"
                >속초</router-link
              >
            </td>
            <td>
              <router-link
                class="text-dark text-decoration-none"
                :to="{
                  name: 'attraction-area',
                  params: { areaname: '양양' },
                }"
                @click="() => setCityName('양양')"
                >양양</router-link
              >
            </td>
            <td>
              <router-link
                class="text-dark text-decoration-none"
                :to="{
                  name: 'attraction-area',
                  params: { areaname: '여수' },
                }"
                @click="() => setCityName('여수')"
                >여수</router-link
              >
            </td>
            <td>
              <router-link
                class="text-dark text-decoration-none"
                :to="{
                  name: 'attraction-area',
                  params: { areaname: '전주' },
                }"
                @click="() => setCityName('전주')"
                >전주</router-link
              >
            </td>
            <td>
              <router-link
                class="text-dark text-decoration-none"
                :to="{
                  name: 'attraction-area',
                  params: { areaname: '춘천' },
                }"
                @click="() => setCityName('춘천')"
                >춘천</router-link
              >
            </td>
            <td>
              <router-link
                class="text-dark text-decoration-none"
                :to="{
                  name: 'attraction-area',
                  params: { areaname: '포항' },
                }"
                @click="() => setCityName('포항')"
                >포항</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="city-list">
      <h3>도시 리스트</h3>
      <hr />
      <br /><br />
      <div class="city">
        <router-link
          v-for="area in areas"
          :key="area"
          class="text-dark text-decoration-none"
          :to="{
            name: 'attraction-area',
            params: { areaname: area },
          }"
          @click="() => setCityName(area)"
          >{{ area }}</router-link
        >
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
  background: url(@/assets/img/windmill.jpg) center/cover;
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

.search-area .recommand_city {
  height: 14px;
  font: 400 14px/14px;
  color: #ffffff;
}

.search-area {
  font: 400 14px;
  color: #ffffff;
  white-space: nowrap;
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

.city-list {
  display: block;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.city {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 26px;
  width: 1190px;
  align-items: flex-start;
  justify-content: center;
  margin: 0 auto;
}

.city > p {
  position: relative;
  width: 56px;
  height: 13px;
  margin-top: -1px;
  font-family: 12px "Inter-Bold", Helvetica;
  font-weight: 700;
  color: #555555;
  font-size: 12px;
  letter-spacing: 0;
  line-height: 13px;
  white-space: nowrap;
}
</style>
