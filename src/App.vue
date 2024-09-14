<template>
  <main class="app">
    <corner-git />
    <main-header-block />
    <div class="cityList">
      <city-card v-for="city in store.cities" :key="city.id" :city="city" />
    </div>
  </main>
</template>

<script>
import { useStore } from "./stores/store";
import CityCard from "./components/CityCard.vue";
import MainHeaderBlock from "./components/MainHeaderBlock.vue";
import CornerGit from "./components/CornerGit.vue";

export default {
  name: "App",
  components: { CityCard, MainHeaderBlock, CornerGit },

  data() {
    return {
      store: useStore(),
    };
  },

  methods: {
    randomColor() {
      return "bg" + Math.floor(Math.random() * 9 + 1);
    },
  },

  mounted() {
    this.store.fromStorage();
    this.store.startUpdateInfo();
  },

  beforeUnmount() {
    this.store.stopUpdateInfo();
  },
};
</script>

<style lang="scss" scoped>
.app {
  overflow-y: auto;
  height: 100vh;

  &::-webkit-scrollbar {
    width: 0;
  }
  scrollbar-width: none;
}
.cityList {
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 20px auto;
  flex-wrap: wrap;
  gap: 10px;

  &::-webkit-scrollbar {
    width: 0;
  }
  scrollbar-width: none;
}
@media (max-width: 768px) {
  .cityList {
    width: 100%;
  }
}
</style>
