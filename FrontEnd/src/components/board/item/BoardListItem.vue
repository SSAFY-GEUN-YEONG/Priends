<script setup>
defineProps({ article: Object });
</script>

<template>
  <tr class="text-center">
    <th scope="row">{{ article.id }}</th>
    <td class="text-start">
      <router-link
        :to="{ name: 'article-view', params: { id: article.id } }"
        class="article-title link-dark"
      >
        {{ article.title }}
      </router-link>
    </td>
    <td>{{ article.member_nickname }}</td>
    <td>{{ article.hit }}</td>
    <td>{{ article.createdAt }}</td>
  </tr>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
