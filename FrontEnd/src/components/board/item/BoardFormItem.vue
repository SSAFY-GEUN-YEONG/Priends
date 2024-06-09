<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { registArticle, getModifyArticle, modifyArticle } from "@/api/board";

import { useMemberStore } from "@/stores/memberStore";
import { storeToRefs } from "pinia";

const router = useRouter();
const route = useRoute();
const memberStore = useMemberStore();
const { memberInfo } = storeToRefs(memberStore);

const props = defineProps({ type: String, category: String });

const isUseId = ref(false);

const article = ref({
  title: "",
  content: "",
  id: "",
  category: props.category,
  nickname: memberInfo.value.nickname,
  member_id: memberInfo.value.id,
});

if (props.type === "modify") {
  let { id } = route.params;
  console.log(id + "번글 얻어와서 수정할거야");
  getModifyArticle(
    id,
    ({ data }) => {
      console.log("modify data", data);
      article.value = data.dataBody;
      // isUseId.value = true;
    },
    (error) => {
      console.log(error);
    }
  );
  isUseId.value = true;
}

const titleErrMsg = ref("");
const contentErrMsg = ref("");
watch(
  () => article.value.title,
  (value) => {
    let len = value.length;
    if (len == 0 || len > 50) {
      titleErrMsg.value = "제목을 확인해 주세요!!!";
    } else titleErrMsg.value = "";
  },
  { immediate: true }
);
watch(
  () => article.value.content,
  (value) => {
    let len = value.length;
    if (len == 0 || len > 500) {
      contentErrMsg.value = "내용을 확인해 주세요!!!";
    } else contentErrMsg.value = "";
  },
  { immediate: true }
);

function onSubmit() {
  // event.preventDefault();

  if (titleErrMsg.value) {
    alert(titleErrMsg.value);
  } else if (contentErrMsg.value) {
    alert(contentErrMsg.value);
  } else {
    props.type === "regist" ? writeArticle() : updateArticle();
  }
}

function writeArticle() {
  console.log("글등록하자!!", article.value);
  registArticle(
    article.value,
    (response) => {
      if (response.data.dataHeader.successCode === 0) {
        //글 등록 성공 처리
        moveList();
      } else {
        //글 등록 실패 처리
        let msg = "글등록 처리시 문제 발생했습니다.";
        alert(msg);
      }
    },
    (error) => console.log(error)
  );
}

function updateArticle() {
  console.log(article.value.id + "번글 수정하자!!", article.value);
  modifyArticle(
    article.value,
    (response) => {
      if (response.data.dataHeader.successCode === 0) {
        //글 수정 성공 처리
        moveList();
      } else {
        //글 수정 실패 처리
        let msg = "글수정 처리시 문제 발생했습니다.";
        alert(msg);
      }
    },
    (error) => console.log(error)
  );
}

function moveList() {
  router.push({ name: "article-list" });
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="userid" class="form-label">작성자 : </label>
      <input
        type="text"
        class="form-control"
        disabled
        v-model="memberInfo.nickname"
        placeholder="작성자..."
      />
    </div>
    <div class="mb-3">
      <label for="title" class="form-label">제목 : </label>
      <input
        type="text"
        class="form-control"
        v-model="article.title"
        placeholder="제목..."
      />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용 : </label>
      <textarea
        class="form-control"
        v-model="article.content"
        rows="10"
      ></textarea>
    </div>
    <div class="col-auto text-center">
      <button
        type="submit"
        class="btn btn-outline-primary mb-3"
        v-if="type === 'regist'"
      >
        글작성
      </button>
      <button type="submit" class="btn btn-outline-success mb-3" v-else>
        글수정
      </button>
      <button
        type="button"
        class="btn btn-outline-danger mb-3 ms-1"
        @click="moveList"
      >
        목록으로이동...
      </button>
    </div>
  </form>
</template>

<style scoped></style>
