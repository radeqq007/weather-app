<template>
  <main class="cityCard" :class="randomColor()">
    <div class="cityName">{{ cityName }}</div>
    <img
      class="icon"
      :src="weatherIcon(weatherDescription)"
      alt="icon"
      width="90px"
    />
    <div class="desc">{{ weatherDescription }}</div>
    <div class="tempBlock">
      <div class="minTemp">
        <img src="../assets/ui/min.png" alt="hot" width="30px" height="30px" />
        <div>{{ minTemp }}°C</div>
      </div>
      <div class="currentTemp">{{ currentTemp }}°C</div>
      <div class="maxTemp">
        <img src="../assets/ui/max.png" alt="cold" width="30px" height="30px" />
        <div>{{ maxTemp }}°C</div>
      </div>
    </div>
    <button class="detailsBtn" @click="showDetails(city)">
      More details...
    </button>
    <button class="removeBtn" @click="remove(cityId)"></button>
  </main>
  <detail-card v-if="selectedCity" :city="city" @closeDetails="closeDetails" />
</template>

<script>
import axios from "axios";
import { useStore } from "../stores/store";
import DetailCard from "./DetailCard.vue";
export default {
  name: "CityCard",
  components: { DetailCard },
  inheritAttrs: false,
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
  },

  methods: {
    weatherIcon(condition) {
      return this.store.weatherIcon(condition);
    },

    randomColor() {
      return "bg" + Math.floor(Math.random() * 9 + 1);
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
  position: relative;
  text-align: center;
  width: 210px;
  height: 200px;
  margin: 10px;
  padding: 10px;
  border-radius: 30px;

  .cityName {
    font-size: 24px;
    z-index: 100;
  }

  .tempBlock {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    padding: 0;
    margin: 0;
    line-height: 40px;

    .minTemp,
    .maxTemp {
      display: flex;
      align-items: center;
      font-size: 20px;
    }

    .currentTemp {
      font-size: 48px;
    }
  }

  .desc {
    font-size: 20px;
  }
  .detailsBtn {
    margin: 5px;
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
    font-size: inherit;
    font-family: inherit;

    &:hover {
      color: rgb(192, 192, 192);
    }
  }

  .removeBtn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.1);
    border: none;
    cursor: pointer;
    padding: 0;
    border-radius: 50%;
    transition: background-color 0.3s ease;
  }

  .removeBtn::before,
  .removeBtn::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 2px;
    background-color: #333;
  }

  .removeBtn::before {
    transform: rotate(45deg);
  }

  .removeBtn::after {
    transform: rotate(-45deg);
  }

  .removeBtn:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }

  .removeBtn:hover::before,
  .removeBtn:hover::after {
    background-color: red;
  }
}

.bg1 {
  background: linear-gradient(45deg, #56e3ff, #009dbc);
}

.bg2 {
  background: linear-gradient(45deg, #ffd562, #ff8d01);
}

.bg3 {
  background: linear-gradient(45deg, #4fd9ff, #0093e2);
}

.bg4 {
  background: linear-gradient(45deg, #02355e, #0079d6);
}

.bg5 {
  background: linear-gradient(45deg, #ff8383, #ff4141);
}

.bg6 {
  background: linear-gradient(45deg, #674092, #6600ff);
}

.bg7 {
  background: linear-gradient(45deg, #17c679, #019f8d);
}

.bg8 {
  background: linear-gradient(45deg, #ab16a1, #e36698);
}

.bg9 {
  background: linear-gradient(45deg, #1ab440, #20a696);
}

@media (max-width: 768px) {
  .cityCard {
    position: relative;
    width: 100%;

    .cityName {
      position: relative;
      font-size: 40px;
    }

    .icon {
      position: absolute;
      top: 40px;
      left: 10px;
      width: 150px;
    }

    .tempBlock {
      .minTemp {
        position: absolute;
        top: 120px;
        right: 100px;
        font-size: 26px;
      }

      .currentTemp {
        position: absolute;
        top: 70px;
        left: 180px;
      }

      .maxTemp {
        top: 120px;
        right: 20px;
        position: absolute;
        font-size: 26px;
      }
    }

    .desc {
      position: absolute;
      top: 166px;
      left: 10px;
      font-size: 26px;
    }
    .removeBtn {
      z-index: 100;
    }

    .detailsBtn {
      position: absolute;
      top: 180px;
      right: 20px;
      font-size: 20px;
    }
  }
}
</style>
