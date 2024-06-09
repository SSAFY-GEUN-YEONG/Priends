<script setup>
import { ref, computed, defineProps } from "vue";
const props = defineProps(["attraction"]);

const truncatedOverview = computed(() => {
  const MAX_LENGTH = 100;
  // console.log(props.attraction.overview);
  if (!props.attraction.overview) {
    return ` `;
  } else if (props.attraction.overview.length <= MAX_LENGTH) {
    return props.attraction.overview;
  } else {
    return `${props.attraction.overview.substring(0, MAX_LENGTH)}...`;
  }
});
</script>

<template>
  <div class="d-flex align-items-center border">
    <div class="flex-shrink-0">
      <img
        class="object-fit-fill ms-2"
        v-if="attraction.first_image"
        :src="attraction.first_image"
        style="height: 150px; width: 220px" />

      <img
        class="object-fit-fill ms-2 border"
        v-else
        src="@/assets/img/defaultImg.png"
        style="height: 150px; width: 220px" />
    </div>
    <div class="flex-grow-1 m-3">
      <h5>{{ attraction.title }}</h5>
      <div>
        <i class="bi bi-geo-alt"></i>
        {{ attraction.addr1 }}
      </div>
      <p class="bg-body-secondary p-2 m-1">
        {{ truncatedOverview }}
      </p>
      <div class="float-end pt-1">
        <router-link
          class="text-dark"
          :to="{
            name: 'attraction-area-detail',
            params: { attractionid: attraction.content_id },
          }">
          <button class="btn btn-outline-info">자세히 보기</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-outline-info {
  --bs-btn-color: #a06cd5;
  --bs-btn-bg: var(--bs-white);
  --bs-btn-border-color: #dac3e8;

  --bs-btn-hover-color: var(--bs-white);
  --bs-btn-hover-bg: #c19ee0;
  --bs-btn-hover-border-color: #c19ee0;

  --bs-btn-focus-shadow-rgb: #a06cd5;
  --bs-btn-active-color: var(--bs-white);
  --bs-btn-active-bg: #a06cd5;
  --bs-btn-active-border-color: #a06cd5;
}
</style>
