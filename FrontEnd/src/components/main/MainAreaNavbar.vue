<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAttractionStore } from "@/stores/attractionStore";
import "@/assets/css/mainAreaNavbar.css";

const attractionStore = useAttractionStore();
const { cityname } = storeToRefs(attractionStore);

const param = ref({
  word: "",
});

function setCityName(area) {
  cityname.value = area;
}

// function clickDoEvent(value) {
//   param.value.word = value;
//   getListArea();
//   setCityName(value);
// }

// const getListArea = () => {
//   console.log("서버에서 시도 목록 얻어오자!!!", param.value);
//   listArea(
//     param.value,
//     ({ data }) => {
//       areas.value = data.dataBody.map((value) => value.gugun_name);
//       console.log(areas.value);
//     },
//     (error) => {
//       console.log(error);
//     }
//   );
// };
</script>

<template>
  <div class="container">
    <nav
      class="container d-flex flex-column align-items-center navbar navbar-expand-lg">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav p-3 ul-border">
          <li class="nav-item mx-2 rounded-pill li-back">
            <router-link
              class="nav-link text-dark bg-opacity-25"
              :to="{
                name: 'attraction-area',
                params: { areaname: '서울' },
              }"
              @click="() => setCityName('서울')"
              >서울</router-link
            >
          </li>
          <li class="nav-item mx-2 rounded-pill li-back">
            <router-link
              class="nav-link text-dark bg-opacity-25"
              :to="{
                name: 'attraction-area',
                params: { areaname: '부산' },
              }"
              @click="() => setCityName('부산')"
              >부산</router-link
            >
          </li>
          <li class="nav-item mx-2 rounded-pill li-back">
            <router-link
              class="nav-link text-dark bg-opacity-25"
              :to="{
                name: 'attraction-area',
                params: { areaname: '대구' },
              }"
              @click="() => setCityName('대구')"
              >대구</router-link
            >
          </li>
          <li class="nav-item mx-2 rounded-pill li-back">
            <router-link
              class="nav-link text-dark bg-opacity-25"
              :to="{
                name: 'attraction-area',
                params: { areaname: '인천' },
              }"
              @click="() => setCityName('인천')"
              >인천</router-link
            >
          </li>
          <li class="nav-item mx-2 rounded-pill li-back">
            <router-link
              class="nav-link text-dark bg-opacity-25"
              :to="{
                name: 'attraction-area',
                params: { areaname: '광주' },
              }"
              @click="() => setCityName('광주')"
              >광주</router-link
            >
          </li>
          <li class="nav-item mx-2 rounded-pill li-back">
            <router-link
              class="nav-link text-dark bg-opacity-25"
              :to="{
                name: 'attraction-area',
                params: { areaname: '울산' },
              }"
              @click="() => setCityName('울산')"
              >울산</router-link
            >
          </li>
          <li class="nav-item mx-2 rounded-pill li-back">
            <router-link
              class="nav-link text-dark bg-opacity-25"
              :to="{
                name: 'attraction-area',
                params: { areaname: '세종' },
              }"
              @click="() => setCityName('세종')"
              >세종</router-link
            >
          </li>
          <li class="nav-item mx-2 rounded-pill li-back">
            <router-link
              class="nav-link text-dark bg-opacity-25"
              :to="{
                name: 'attraction',
                query: { areaname: '경기도' },
              }"
              @click="() => setCityName('경기')"
              >경기</router-link
            >
          </li>
          <li class="nav-item mx-2 rounded-pill li-back">
            <router-link
              class="nav-link text-dark bg-opacity-25"
              :to="{
                name: 'attraction',
                query: { areaname: '강원도' },
              }"
              @click="() => setCityName('강원')"
              >강원</router-link
            >
          </li>
          <li class="nav-item mx-2 rounded-pill li-back">
            <router-link
              class="nav-link text-dark bg-opacity-25"
              :to="{
                name: 'attraction',
                query: { areaname: '충청북도' },
              }"
              @click="() => setCityName('충북')"
              >충북</router-link
            >
          </li>
          <li class="nav-item mx-2 rounded-pill li-back">
            <router-link
              class="nav-link text-dark bg-opacity-25"
              :to="{
                name: 'attraction',
                query: { areaname: '충청남도' },
              }"
              @click="() => setCityName('충남')"
              >충남</router-link
            >
          </li>
          <li class="nav-item mx-2 rounded-pill li-back">
            <router-link
              class="nav-link text-dark bg-opacity-25"
              :to="{
                name: 'attraction',
                query: { areaname: '전라북도' },
              }"
              @click="() => setCityName('전북')"
              >전북</router-link
            >
          </li>
          <li class="nav-item mx-2 rounded-pill li-back">
            <router-link
              class="nav-link text-dark bg-opacity-25"
              :to="{
                name: 'attraction',
                query: { areaname: '전라남도' },
              }"
              @click="() => setCityName('전남')"
              >전남</router-link
            >
          </li>
          <li class="nav-item mx-2 rounded-pill li-back">
            <router-link
              class="nav-link text-dark bg-opacity-25"
              :to="{
                name: 'attraction',
                query: { areaname: '경상북도' },
              }"
              @click="() => setCityName('경북')"
              >경북</router-link
            >
          </li>
          <li class="nav-item mx-2 rounded-pill li-back">
            <router-link
              class="nav-link text-dark bg-opacity-25"
              :to="{
                name: 'attraction',
                query: { areaname: '경상남도' },
              }"
              @click="() => setCityName('경남')"
              >경남</router-link
            >
          </li>
          <li class="nav-item mx-2 rounded-pill li-back">
            <router-link
              class="nav-link text-dark bg-opacity-25"
              :to="{
                name: 'attraction-area',
                params: { areaname: '제주' },
              }"
              @click="() => setCityName('제주')"
              >제주</router-link
            >
          </li>
        </ul>
      </div>
      <!-- 검색창 -->
      <!-- <div class="test input-group my-3 px-5">
        <span class="input-group-text" style="background-color: transparent">
          <i class="bi bi-search my-auto mx-2"></i>
        </span>
        <input type="text" class="form-control" />
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          검색
        </button>
      </div> -->
    </nav>
  </div>
</template>

<style scoped>
.ul-border {
  border-radius: 10px;
  border: 1px solid #b185db;
}
.li-back {
  background-color: #d2b7e5;
  padding: 0 1px;
  font-size: 12px;
}

.test {
  width: 81.5%;
}
</style>
