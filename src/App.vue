<template>
  <main class="app">
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

export default {
  name: "App",
  components: { CityCard, MainHeaderBlock },

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
.cityList {
  display: flex;
  justify-content: center;
  width: 70%;
  margin: 20px auto;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
