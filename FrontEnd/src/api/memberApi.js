import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function memberLoginApi(param, success, fail) {
  console.log("param", param);
  await local.post(`/member/login`, param).then(success).catch(fail);
}

async function memberEmailCheckApi(email, success, fail) {
  await local.get(`member/${email}/check`).then(success).catch(fail);
}

async function memberSignupApi(param, success, fail) {
  console.log("param", param);
  await local.post(`/member/signup`, param).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  local.defaults.headers["refreshToken"] = sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
  await local.post(`/user/refresh`, user).then(success).catch(fail);
}

async function memberLogoutApi(success, fail) {
  await local.get(`/member/logout`).then(success).catch(fail);
}

async function memberGetApi(success, fail) {
  await local.get(`/member/get`).then(success).catch(fail);
}

async function memberPasswordUpdateApi(param, success, fail) {
  await local.put(`/member/password/update`, param).then(success).catch(fail);
}

async function memberTempPasswordApi(email, success, fail) {
  await local.get(`/member/${email}/temp/password`).then(success).catch(fail);
}

function memberInfoUpdateApi(param, success, fail) {
  return local.put(`/member/update`, param).then(success).catch(fail);
}

export {
  memberLoginApi,
  memberEmailCheckApi,
  memberLogoutApi,
  tokenRegeneration,
  memberGetApi,
  memberSignupApi,
  memberPasswordUpdateApi,
  memberTempPasswordApi,
  memberInfoUpdateApi,
};
