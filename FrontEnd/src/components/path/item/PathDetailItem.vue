<script setup>
import { ref, defineProps, watch } from "vue";
import PathDetailItemAttraction from "./PathDetailItemAttraction.vue";
import { getAreaName } from "@/api/attractionApi";

const props = defineProps(["pathDetail", "dayNum", "startDate"]);

watch(
  () => props.pathDetail,
  (newAreaSet, oldAreaSet) => {
    if (oldAreaSet === undefined) {
      // 첫 실행 때는 실행하지 않음
      return;
    }
    // 변경된 사항을 여기서 처리합니다.
    getAreaNameSet(newAreaSet);
    console.log(
      "new",
      newAreaSet,
      "old",
      oldAreaSet,
      "areaNameset",
      areaNameSet.value,
      "path detail ,",
      props.pathDetail
    );
  }
);
// console.log(props.dayNum);
// console.log(props.areaSet);
// console.log(props.startDate);

const areaNameSet = ref(new Set());
const getAreaNameSet = (val) => {
  // Set을 초기화합니다.
  areaNameSet.value = new Set();

  val.forEach(async (item) => {
    await getAreaName(
      {
        sido: item.sidoCode,
        gugun: item.gugunCode,
      },
      ({ data }) => {
        // console.log("get Area naem data", data.dataBody);
        areaNameSet.value.add(data.dataBody);
      },
      (error) => {
        console.log(error);
      }
    );
  });
};

//여행 당일날짜와 요일 얻기
const calcDate = () => {
  const startDate = new Date(props.startDate);
  startDate.setDate(startDate.getDate() + props.dayNum - 1);
  // 요일 얻기
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = daysOfWeek[startDate.getDay()];

  return {
    date: startDate.toISOString().split("T")[0],
    dayOfWeek: dayOfWeek,
  };
};
let nowDate = {};

nowDate = calcDate();
</script>

<template>
  <div class="path-detail-item">
    <div class="path-detail-title">
      <h4>DAY{{ dayNum }}</h4>
      <div class="path-detail-date-city">
        <p>{{ nowDate.date }}({{ nowDate.dayOfWeek }})</p>
        <p>{{ Array.from(areaNameSet).join(", ") }}</p>
      </div>
    </div>
    <PathDetailItemAttraction
      v-for="item in pathDetail"
      :key="item.orders"
      :pathDetailInfo="item"></PathDetailItemAttraction>
  </div>
</template>

<style scoped>
.path-detail-item {
  margin-bottom: 20px;
}
.path-detail-title {
  display: flex;
  align-items: center;
  border: 1px solid black;
}

.path-detail-title h4 {
  padding: 10px;
  margin: 0 15px;
}

.path-detail-date-city {
  border-left: 1px solid black;
  font-size: 15px;
  padding-left: 10px;
  padding-top: 10px;
}
</style>
