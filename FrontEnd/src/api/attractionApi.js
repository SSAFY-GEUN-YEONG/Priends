import { localAxios } from "@/util/http-commons";

const local = localAxios();

function listArea(param, success, fail) {
  console.log("word: ", param);
  local.get(`/attraction/main`, { params: param }).then(success).catch(fail);
}

function getAttractionDetailApi(attractionId, success, fail) {
  return local.get(`/attraction/${attractionId}/view`).then(success).catch(fail);
}

// 특정 지역 정보 home 가져오기
function getAreaInfo(param, success, fail) {
  console.log("area : ", `${param.city} ${param.category}`);
  return local
    .get(`/attraction/area/${param.city}/home`, { params: param })
    .then(success)
    .catch(fail);
}

// 특정 지역 정보 category별 list 가져오기
function getAreaListByCategory(param, success, fail) {
  console.log("area : ", `${param.city} ${param.category}`);
  local
    .get(`/attraction/area/${param.city}/${param.category}`, { params: param })
    .then(success)
    .catch(fail);
}

function getAreaName(param, success, fail) {
  // console.log("area : ", param);
  local.get(`/attraction/area/get/name`, { params: param }).then(success).catch(fail);
}

// 조회수 기준 상위 4개 관광지 정보 가져오기
function topGetAttractionListApi(success, fail) {
  return local.get(`/attraction/top/get`).then(success).catch(fail);
}

// 무작위로 4개 관광지 정보 가져오기
// 추후에 추천 알고리즘 적용한 관광지 정보 가져오기
function recommendGetAttractionListApi(success, fail) {
  return local.get(`/attraction/recommend/get`).then(success).catch(fail);
}

// 해당 관광지 id를 통해 가장 가까운 3곳의 정보 가져오기
function nearGetAttractionListApi(attractionId, success, fail) {
  return local.get(`/attraction/${attractionId}/near/get`).then(success).catch(fail);
}

export {
  listArea,
  getAreaInfo,
  getAreaListByCategory,
  getAttractionDetailApi,
  getAreaName,
  topGetAttractionListApi,
  recommendGetAttractionListApi,
  nearGetAttractionListApi,
};
