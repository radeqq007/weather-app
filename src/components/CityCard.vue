<template>
  <div>
    <main class="cityCard">
      <div>{{ minTemp }}</div>
      <div>{{ maxTemp }}</div>
      <div class="name">{{ cityName }}</div>
      <div class="country">{{ country }}</div>
      <div class="temp">{{ currentTemp }}</div>
      <div class="icon">
        <img :src="weatherIcon(weatherDescription)" alt="icon" width="60px" />
      </div>

      <div class="info">{{ weatherInfo }}</div>
      <div class="desc">{{ weatherDescription }}</div>
      <button class="detailsBtn" @click="showDetails(city)">
        More details
      </button>
      <button class="removeBtn" @click="remove(cityId)">Remove</button>
    </main>
    <detail-card
      v-if="selectedCity"
      :city="city"
      @closeDetails="closeDetails"
    />
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from "../stores/store";
import DetailCard from "./DetailCard.vue";
export default {
  components: { DetailCard },
  props: {
    city: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      store: useStore(),
      selectedCity: null,
      minTemp: 0,
      maxTemp: 0,
    };
  },

  computed: {
    cityName() {
      return this.city.city.name;
    },
    cityId() {
      return this.city.city.id;
    },
    country() {
      return this.city.city.country;
    },
    currentTemp() {
      return this.city.list[0].main.temp.toFixed(0);
    },
    weatherDescription() {
      return this.city.list[0].weather[0].description;
    },
    weatherInfo() {
      return this.city.list[0].weather[0].main;
    },
  },

  methods: {
    weatherIcon(condition) {
      return this.store.weatherIcon(condition);
    },

    remove(id) {
      this.store.cities = this.store.cities.filter(
        (city) => city.city.id !== id
      );
      this.store.toStorage();
    },

    showDetails(city) {
      this.selectedCity = city;
    },

    closeDetails() {
      this.selectedCity = null;
    },

    async getTemp(city) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${this.store.apiKey}`
        );

        const cityInfo = response.data;

        const now = new Date();

        const filteredData = cityInfo.list.filter((item) => {
          const itemDate = new Date(item.dt * 1000);
          return itemDate >= now;
        });

        if (filteredData.length === 0) {
          throw new Error("No data available from the current time onwards.");
        }

        const temp = filteredData.map((item) => item.main.temp.toFixed(0));
        this.minTemp = Math.min(...temp);
        this.maxTemp = Math.max(...temp);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
      }
    },
  },

  mounted() {
    this.getTemp(this.city.city.name);
  },
};
</script>

<style lang="scss">
.cityCard {
  text-align: center;
  width: 100px;
  margin: 10px;
  padding: 10px;
  border: 1px solid red;

  .icon {
    font-size: 20px;
  }

  .detailsBtn {
    margin: 5px;
  }
}
</style>
