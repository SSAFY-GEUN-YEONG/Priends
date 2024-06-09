import { localAxios } from "@/util/http-commons";

const local = localAxios();

function listSido(success, fail) {
  local.get(`/path/make/sido`).then(success).catch(fail);
}

function listGugun(param, success, fail) {
  local.get(`/path/make/gugun`, { params: param }).then(success).catch(fail);
}

function createPath(param, success, fail) {
  // console.log("param", param);
  local.post(`/path/create`, JSON.stringify(param)).then(success).catch(fail);
}

function deletePath(pathId, success, fail) {
  local.put(`/path/delete/${pathId}`, pathId).then(success).catch(fail);
}

function createAndUpdatePathDetails(param, success, fail) {
  console.log("param", param);
  local
    .post(`/path/detail/create/${param.id}`, JSON.stringify(param.myAttractionList))
    .then(success)
    .catch(fail);
}

function getPathList(param, success, fail) {
  console.log("getPathList param", param);
  return local.get(`/path/get/list`, { params: param }).then(success).catch(fail);
}

function getMyPathList(success, fail) {
  local.get(`/path/get/mylist`).then(success).catch(fail);
}

function getPathDetailsWithAttraction(pathId, success, fail) {
  // console.log("getPathDetailsWithAttraction param", pathId);
  return local.get(`/path/detail/get/list/${pathId}`).then(success).catch(fail);
}

export {
  listSido,
  listGugun,
  createPath,
  deletePath,
  createAndUpdatePathDetails,
  getPathList,
  getMyPathList,
  getPathDetailsWithAttraction,
};
