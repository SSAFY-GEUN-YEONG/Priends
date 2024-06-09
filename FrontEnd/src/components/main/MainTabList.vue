<script setup></script>

<template>
  <nav class="container navbar navbar-expand-lg pt-0">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mx-auto fw-bold">
        <li class="nav-item mx-2">
          <router-link :to="{ name: 'attraction' }" class="nav-link"
            ><i class="bi bi-moon-stars me-1"></i>호텔</router-link
          >
        </li>
        <li class="nav-item mx-2">
          <router-link :to="{ name: 'attraction' }" class="nav-link"
            ><i class="bi bi-ticket-perforated me-1"></i>문화생활</router-link
          >
        </li>
        <li class="nav-item mx-2">
          <router-link :to="{ name: 'attraction' }" class="nav-link">
            <img
              class="icon-svg me-1"
              src="@/assets/img/utensils.svg"
            />음식점</router-link
          >
        </li>
        <li class="nav-item mx-2">
          <router-link :to="{ name: 'attraction' }" class="nav-link"
            ><i class="bi bi-shop-window me-1"></i>마켓</router-link
          >
        </li>
        <li class="nav-item mx-2">
          <router-link :to="{ name: 'attraction' }" class="nav-link"
            ><i class="bi bi-tsunami me-1"></i>액티비티</router-link
          >
        </li>
        <li class="nav-item mx-2">
          <router-link :to="{ name: 'attraction' }" class="nav-link"
            ><i class="bi bi-tree me-1"></i>자연</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.icon-svg {
  width: 16px;
  height: 16px;
  margin-top: -2px;
}
</style>
