<script setup></script>

<template>
  <div class="attraction-recommand-path-item m-4">
    <div class="recommand-path-map"></div>
    <div class="recommand-path-info">
      <div class="recommand-path-info-text">
        <p>2023.11.11 출발</p>
        <p>2일간</p>
      </div>
      <div class="icon-text">
        <font-awesome-icon :icon="['far', 'heart']" style="height: 15px" />
        <div>234</div>
        <font-awesome-icon :icon="['far', 'eye']" style="height: 15px" />
        <div>898</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.attraction-recommand-path-item {
  width: 260px;
  height: 340px;
  border: 1px solid #c9c9c9;
}
.recommand-path-map {
  width: 100%;
  height: 260px;
  top: 0;
  background-color: lightgray;
}

.recommand-path-info-text {
  display: flex;
  justify-content: space-between;
  margin: 5px;
}

.icon-text {
  flex-direction: row;
  display: flex;
  align-items: center;
}
.icon-text > * {
  margin-left: 5px;
}
</style>
