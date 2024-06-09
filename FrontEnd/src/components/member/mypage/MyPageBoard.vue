<script setup>
import { ref, onMounted } from "vue";
import { listArticle } from "@/api/board.js";
import BoardListItem from "@/components/board/item/BoardListItem.vue";
import VPageNavigation from "@/components/common/VPageNavigation.vue";

const articles = ref([]);
const currentPage = ref(1);
const totalPage = ref(0);
const { VITE_ARTICLE_LIST_SIZE } = import.meta.env;
const param = ref({
  pgno: currentPage.value,
  spp: VITE_ARTICLE_LIST_SIZE,
  key: "",
  word: "",
  category: "FREE",
  isMyPost: "true",
});

onMounted(() => {
  getArticleList();
});
const getArticleList = () => {
  console.log("서버에서 글목록 얻어오자!!!", param.value);
  listArticle(
    param.value,
    ({ data }) => {
      console.log(data);
      articles.value = data.dataBody.articles;
      currentPage.value = data.dataBody.currentPage;
      totalPage.value = data.dataBody.totalPageCount;
    },
    (error) => {
      console.log(error);
    }
  );
};

const onPageChange = (val) => {
  console.log(val + "번 페이지로 이동 준비 끝!!!");
  currentPage.value = val;
  param.value.pgno = val;
  getArticleList();
};
</script>

<template>
  <div v-if="articles.length > 0">
    <div>
      <table class="table table-hover">
        <thead>
          <tr class="text-center">
            <th scope="col">글번호</th>
            <th scope="col">제목</th>
            <th scope="col">작성자</th>
            <th scope="col">조회수</th>
            <th scope="col">작성일</th>
          </tr>
        </thead>
        <tbody>
          <BoardListItem
            v-for="article in articles"
            :key="article.id"
            :article="article"></BoardListItem>
        </tbody>
      </table>
    </div>
    <VPageNavigation
      :current-page="currentPage"
      :total-page="totalPage"
      @pageChange="onPageChange"></VPageNavigation>
  </div>
  <div v-else>작성한 글이 없습니다.</div>
</template>

<style scoped></style>
