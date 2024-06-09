<script setup>
import { ref, watch, onMounted } from "vue";
import { useAttractionStore } from "@/stores/attractionStore";
import { storeToRefs } from "pinia";
import { getAreaListByCategory } from "@/api/attractionApi.js";
import { useRoute } from "vue-router";
import AttractionListItem from "./item/AttractionListItem.vue";

const route = useRoute();
const attractionStore = useAttractionStore();
const { category } = storeToRefs(attractionStore);

const param = ref({
  city: route.params.areaname,
  category: route.params.category,
  order: 2, //1:이름순 2:인기순
});

const selectOption = ref([
  { text: "이름순", value: 1 },
  { text: "인기순", value: 2 },
]);

const attractionList = ref([]);

const ListByCategory = () => {
  console.log("카테고리별 리스트 얻어오자!!!", param.value);
  getAreaListByCategory(
    param.value,
    ({ data }) => {
      console.log(data.dataBody);
      attractionList.value = data.dataBody;
      console.log(attractionList.value);
    },
    (error) => {
      console.log(error);
    }
  );
};

function setCategory(value) {
  const newCategory = value;
  category.value = newCategory;
  console.log("category :", category.value);
  param.value.category = category.value;
  param.value.order = 2;

  // console.log(param.value);
}

function changeAttractionListOrder(val) {
  const newOrder = val;
  param.value.order = newOrder;
  console.log("param order ", param.value.order);
}

onMounted(() => {
  console.log(param.value);
  ListByCategory();
});

watch(
  () => [category.value, param.value.order],
  () => {
    ListByCategory();
  }
);
</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <div class=" " style="max-width: 1092px; width: 100%">
      <div class="mb-3">여행지 > {{ param.city }} > {{ param.category }}</div>
      <h3>{{ param.city }}</h3>
      <div class="pt-1">
        <ul class="nav nav-tabs nav-fill">
          <li class="nav-item">
            <router-link
              class="nav-link text-dark"
              :to="{
                name: 'attraction-area',
                params: { areaname: param.city },
              }"
              @click="() => setCategory('')"
              >홈</router-link
            >
            <!-- <a class="nav-link text-dark active" href="#">홈</a> -->
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-dark"
              :to="{
                name: 'attraction-area-category',
                params: { areaname: param.city, category: 'hotel' },
              }"
              @click="() => setCategory('hotel')"
              >호텔</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-dark"
              :to="{
                name: 'attraction-area-category',
                params: { areaname: param.city, category: 'culture' },
              }"
              @click="() => setCategory('culture')"
              >문화생활</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-dark"
              :to="{
                name: 'attraction-area-category',
                params: { areaname: param.city, category: 'restaurant' },
              }"
              @click="() => setCategory('restaurant')"
              >음식점</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-dark"
              :to="{
                name: 'attraction-area-category',
                params: { areaname: param.city, category: 'market' },
              }"
              @click="() => setCategory('market')"
              >마켓</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-dark"
              :to="{
                name: 'attraction-area-category',
                params: { areaname: param.city, category: 'activity' },
              }"
              @click="() => setCategory('activity')"
              >액티비티</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link text-dark"
              :to="{
                name: 'attraction-area-category',
                params: { areaname: param.city, category: 'nature' },
              }"
              @click="() => setCategory('nature')"
              >자연</router-link
            >
          </li>
        </ul>
      </div>
    </div>

    <div
      class="d-flex flex-row justify-content-between pt-4 pb-2 px-2"
      style="max-width: 1092px; width: 100%"
    >
      <div class="">
        <button
          class="btn"
          @click="changeAttractionListOrder(2)"
          :class="{ 'btn-active': param.order === 2 }"
        >
          인기
        </button>
        |
        <button
          class="btn"
          @click="changeAttractionListOrder(1)"
          :class="{ 'btn-active': param.order === 1 }"
        >
          이름
        </button>
      </div>

      <p class="my-auto">총 {{ attractionList.length }}개</p>
      <!-- <VSelect
        class="mx-3 border border-primary"
        style="width: fit-content"
        :selectOption="selectOption"
        @onKeySelect="onChangeOrder"
      /> -->
    </div>

    <div class="mb-5" style="max-width: 1092px; width: 100%">
      <AttractionListItem
        v-for="item in attractionList"
        :key="item.content_id"
        :attraction="item"
      />
    </div>
  </div>
</template>

<style scoped>
.btn {
  --bs-btn-focus-shadow-rgb: var(--bs-white);
  --bs-btn-active-color: #a06cd5;
  --bs-btn-active-bg: var(--bs-white);
  --bs-btn-active-border-color: var(--bs-white);
}

.btn-active {
  color: #a06cd5;
}
</style>
