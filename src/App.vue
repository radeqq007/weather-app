<template>
  <main class="app">
    <header class="header">
      <h1>Weather App</h1>
    </header>
    <div class="search">
      <input
        type="text"
        v-model.trim="store.city"
        @keydown.enter="store.getCity"
      />
      <button @click="store.getCity">Get</button>
    </div>
    <div class="cityList">
      <city-card v-for="city in store.cities" :key="city.id" :city="city" />
    </div>
  </main>
</template>

<script>
import { useStore } from "./stores/store";
import CityCard from "./components/CityCard.vue";

export default {
  components: { CityCard },

  data() {
    return {
      store: useStore(),
    };
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
  .cityList {
    display: flex;
  }
}
</style>
