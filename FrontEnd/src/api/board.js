import { localAxios } from "@/util/http-commons";

const local = localAxios();

function listArticle(param, success, fail) {
  console.log("boardjs list", param);
  local.get(`/board/list`, { params: param }).then(success).catch(fail);
}

function detailArticle(id, success, fail) {
  local.get(`/board/view/${id}`).then(success).catch(fail);
}

function registArticle(article, success, fail) {
  console.log("boardjs article write", article);
  local.post(`/board/write`, JSON.stringify(article)).then(success).catch(fail);
}

function getModifyArticle(id, success, fail) {
  local.get(`/board/modify/${id}`).then(success).catch(fail);
}

function modifyArticle(article, success, fail) {
  local.put(`/board/modify`, JSON.stringify(article)).then(success).catch(fail);
}

function deleteArticle(id, success, fail) {
  local.put(`/board/delete/${id}`).then(success).catch(fail);
}

export {
  listArticle,
  detailArticle,
  registArticle,
  getModifyArticle,
  modifyArticle,
  deleteArticle,
};
