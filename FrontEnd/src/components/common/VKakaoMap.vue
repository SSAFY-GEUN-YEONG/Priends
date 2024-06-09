<script setup>
import { ref, watch, onMounted } from "vue";

const map = ref(null);
const markers = ref(new Map()); // 마커를 저장할 Map 객체
const overlays = ref(new Map()); // 오버레이를 저장할 Map 객체
const polyline = ref(null);

const props = defineProps({
  attractions: Array,
});

// 관광지들의 평균 위치를 계산하는 함수
const calculateCenter = (attractions) => {
  let totalLat = 0;
  let totalLng = 0;
  attractions.forEach((attraction) => {
    totalLat += attraction.latitude;
    totalLng += attraction.longitude;
  });
  return {
    lat: totalLat / attractions.length,
    lng: totalLng / attractions.length,
  };
};

// 지도 초기화 함수
const initMap = () => {
  const container = document.getElementById("map");
  let center = new kakao.maps.LatLng(33.450701, 126.570667);

  if (props.attractions && props.attractions.length > 0) {
    const avgCenter = calculateCenter(props.attractions);
    center = new kakao.maps.LatLng(avgCenter.lat, avgCenter.lng);
  }

  const options = {
    center: center,
    level: 9,
  };

  map.value = new kakao.maps.Map(container, options);
  displayMarkersAndPolyline(); // 지도가 초기화된 후에 마커를 표시
};

const loadKakaoMapScript = () => {
  const script = document.createElement("script");
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
    import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
  }&libraries=services,clusterer`;
  script.onload = () => kakao.maps.load(initMap);
  document.head.appendChild(script);
};

const clearMarkersAndOverlays = () => {
  console.log("clearMarkersAndOverlays 호출됨");
  markers.value.forEach((marker, key) => {
    // console.log(`마커 제거 전: ${key}`, marker);
    marker.setMap(null);
    // console.log(`마커 제거 후: ${key}`, marker);
  });
  markers.value.clear();
  overlays.value.forEach((overlay, key) => {
    overlay.setMap(null);
  });
  overlays.value.clear();
  if (polyline.value) {
    console.log("폴리라인 제거");
    polyline.value.setMap(null);
    polyline.value = null;
  }
};

// 마커, 오버레이, 폴리라인을 표시하는 함수
const displayMarkersAndPolyline = () => {
  // console.log("마커랑 폴리라인 맵에 표시하기 (displayMarkersAndPolyline 메서드 호출)", props.attractions);

  if (!window.kakao || !window.kakao.maps) {
    console.error("카카오맵 API 아직 호출 안됨!!!");
    return;
  }

  clearMarkersAndOverlays();

  let path = [];

  props.attractions.forEach((attraction, index) => {
    const position = new kakao.maps.LatLng(
      attraction.latitude,
      attraction.longitude
    );

    // 마커 이미지 설정
    const imageSrc = "https://cdn-icons-png.flaticon.com/512/4467/4467108.png";
    const imageSize = new kakao.maps.Size(40, 40); // 마커 이미지 크기
    const imageOption = { offset: new kakao.maps.Point(13, 35) }; // 마커 이미지 옵션

    // 마커에 사용될 이미지 객체 생성
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    // 마커 생성 설정
    const marker = new kakao.maps.Marker({
      map: map.value,
      position: position,
      image: markerImage,
      zIndex: index, // 순서대로 표시하기 위해 z-index 설정
    });

    // 마커 순서를 표시하기 위한 오버레이
    const markerLabelContent = `
      <div class="marker-number">
        ${index + 1}
      </div>`; // 여기서 index는 마커의 순서(1부터 시작)

    const markerLabel = new kakao.maps.CustomOverlay({
      content: markerLabelContent,
      map: map.value,
      position: marker.getPosition(),
      yAnchor: 1, // 마커 이미지의 중앙 아래에 오버레이가 오도록 설정
      zIndex: index, // 순서대로 표시하기 위해 z-index 설정
    });

    markers.value.set(attraction.contentId, marker);
    overlays.value.set(attraction.contentId, markerLabel);
    map.value.setCenter(position);

    path.push(position);
  });

  polyline.value = new kakao.maps.Polyline({
    path: path, // 폴리라인 경로 설정
    strokeWeight: 5, // 선 두께
    strokeColor: "#FFAE00", // 선 색상
    strokeOpacity: 1, // 선 투명도
    strokeStyle: "solid", // 선 스타일
  });
  polyline.value.setMap(map.value); // 폴리라인 지도에 표시
};

// 값 변경될때 마다 실행
watch(
  () => props.attractions,
  (newAttractions) => {
    console.log("새로운 여행지 상세경로 리스트들 바뀜, 마커 업데이트", newAttractions);
    displayMarkersAndPolyline();
  },
  { deep: true }
);

// 해당 컴포넌트 처음 마운트 될 때 실행
onMounted(() => {
  if (!window.kakao || !window.kakao.maps) {
    loadKakaoMapScript();
  }
  else {
    initMap();
  }
});
</script>

<template>
  <div id="map" style="width: 100%; height: 100%"></div>
</template>

<style>
.overlay {
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
.marker-number {
  color: #ffffff; /* 숫자 색상 */
  background-color: #c19ee0; /* 배경 색상 */
  border-radius: 50%; /* 원형으로 표시 */
  padding: 5px 10px; /* 안쪽 여백 */
  font-size: 14px; /* 글꼴 크기 */
  font-weight: bold; /* 글꼴 굵기 */
  text-align: center; /* 텍스트 중앙 정렬 */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* 그림자 효과 */
  display: inline-block; /* 인라인 블록으로 표시 */
}
</style>
