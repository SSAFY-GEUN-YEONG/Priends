<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMemberStore } from "@/stores/memberStore";
import { detailArticle, deleteArticle } from "@/api/board";

const route = useRoute();
const router = useRouter();

// const articleno = ref(route.params.articleno);
const { id } = route.params;

const article = ref({});
const memberStore = useMemberStore();

onMounted(() => {
  getArticle();
});

const getArticle = () => {
  // const { articleno } = route.params;
  console.log(id + "번글 얻으러 가자!!!");
  detailArticle(
    id,
    ({ data }) => {
      article.value = data.dataBody;
      console.log(article.value);
    },
    (error) => {
      console.log(error);
    }
  );
};

// 현재 로그인한 사용자가 게시글의 작성자인지 확인하는 계산된 속성
const isAuthor = computed(() => {
  console.log(memberStore.memberInfo);
  console.log(article.value.member_id);
  return memberStore.memberInfo?.id === article.value.member_id;
});

function moveList() {
  router.push({ name: "article-list" });
}

function moveModify() {
  router.push({ name: "article-modify", params: { id } });
}

function onDeleteArticle() {
  console.log(id + "번글 삭제하러 가자!!!");
  deleteArticle(
    id,
    (response) => {
      if (response.data.dataHeader.successCode === 0) {
        //글 삭제 성공 처리
        moveList();
      } else {
        //글 등록 실패 처리
        let msg = "글삭제 처리시 문제 발생했습니다.";
        alert(msg);
      }
    },
    (error) => console.log(error)
  );
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <!-- <div class="col-lg-10">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="sky">글보기</mark>
        </h2>
      </div> -->
      <div class="col-lg-10 text-start">
        <div class="row my-2">
          <h2 class="text-secondary px-5">
            {{ article.id }}. {{ article.title }}
          </h2>
        </div>
        <div class="row">
          <div class="col-md-8">
            <div class="clearfix align-content-center">
              <img
                class="avatar me-2 float-md-start bg-light p-2"
                src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
              />
              <p>
                <span class="fw-bold">{{ article.member_nickname }}</span>
                <br />
                <span class="text-secondary fw-light">
                  {{ article.updatedAt }}
                </span>
                <br />
                <span>
                  조회 : {{ article.hit }}

                  좋아요 : {{ article.like }}
                </span>
              </p>
            </div>
          </div>
          <!-- <div class="col-md-4 align-self-center text-end">댓글 : 17</div> -->
          <div class="divider mb-3"></div>
          <div class="text-secondary">
            {{ article.content }}
          </div>
          <div class="divider mt-3 mb-3"></div>
          <div class="d-flex justify-content-end">
            <button
              type="button"
              class="btn btn-outline-primary mb-3"
              @click="moveList"
            >
              글목록
            </button>
            <button
              v-if="isAuthor"
              type="button"
              class="btn btn-outline-success mb-3 ms-1"
              @click="moveModify"
            >
              글수정
            </button>
            <button
              v-if="isAuthor"
              type="button"
              class="btn btn-outline-danger mb-3 ms-1"
              @click="onDeleteArticle"
            >
              글삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-outline-primary {
  --bs-btn-bg: #dac3e8;
  --bs-btn-border-color: #dac3e8;
  --bs-btn-hover-bg: #c19ee0;
  --bs-btn-hover-border-color: #c19ee0;
  --bs-btn-focus-shadow-rgb: #a06cd5;
  --bs-btn-active-bg: #a06cd5;
  --bs-btn-active-border-color: #a06cd5;
  color: white; /* 버튼 텍스트 색상 */
}
</style>
