<template>
  <main class="detailCard">
    <div class="wrapper">
      <div class="card">
        <detail-card-main-block
          :cityName="cityName"
          :minTemp="minTemp"
          :maxTemp="maxTemp"
          v-model:tempFormat="tempFormat"
          v-model:timeFormat="timeFormat"
          @closeDetails="closeDetails"
          :uniqueDays="getUniqueDays()"
        />
        <days-block
          :uniqueDays="getUniqueDays()"
          :cityList="city.list"
          :filterDay="filterDay"
          @dayFiltered="handleDayFiltered"
        />
        <table-info
          :filteredInfo="filteredInfo"
          :tempFormat="tempFormat"
          :timeFormat="timeFormat"
          :toggleTimeFormat="toggleTimeFormat"
          :toggleTempFormat="toggleTempFormat"
        />
      </div>
    </div>
  </main>
</template>

<script>
import { useStore } from "../stores/store";
import DetailCardMainBlock from "./DetailCardHeaderBlock.vue";
import DaysBlock from "./DaysBlock.vue";
import TableInfo from "./TableInfo.vue";

export default {
  name: "DetailCard",
  components: { DetailCardMainBlock, DaysBlock, TableInfo },
  emits: ["closeDetails"],
  props: {
    city: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      store: useStore(),
      filteredInfo: [],
      timeFormat: true,
      tempFormat: false,
      minTemp: 0,
      maxTemp: 0,
    };
  },

  computed: {
    cityName() {
      return this.city.city.name;
    },
  },

  methods: {
    toggleTimeFormat(sec, timeFormat) {
      return Intl.DateTimeFormat(timeFormat ? "ru-RU" : "en-US", {
        hour: "numeric",
        minute: "2-digit",
      }).format(sec);
    },

    toggleTempFormat(temp, tempFormat) {
      if (temp === undefined || temp === null) {
        return "N/A";
      }
      return tempFormat
        ? ((temp * 9) / 5 + 32).toFixed(0) + " °F"
        : temp.toFixed(0) + " °C";
    },

    getUniqueDays() {
      if (!this.city.list || !this.city.list.length) return [];
      const allDays = this.city.list.map((city) =>
        Intl.DateTimeFormat("en-US", {
          weekday: "long",
          day: "numeric",
        }).format(city.dt * 1000)
      );
      return [...new Set(allDays)];
    },

    filterDay(day) {
      if (!this.city.list) return;
      this.filteredInfo = this.city.list.filter(
        (date) => new Date(date.dt * 1000).getDate() === day
      );

      this.getMinMax();
    },

    getMinMax() {
      if (this.filteredInfo.length === 0) {
        this.minTemp = 0;
        this.maxTemp = 0;
        return;
      }

      const temps = this.filteredInfo.map((info) => info.main.temp);
      this.minTemp = Math.min(...temps);
      this.maxTemp = Math.max(...temps);
    },

    closeDetails() {
      this.$emit("closeDetails");
    },

    handleDayFiltered(day) {
      this.filterDay(day);
    },
  },

  mounted() {
    this.filterDay(new Date().getDate());
  },
};
</script>

<style lang="scss" scoped>
.detailCard {
  position: absolute;
  height: 100vh;
  inset: 0;
  z-index: 100;
  overflow: hidden; /* Prevent scrolling */

  .wrapper {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(10, 10, 10, 0.5);
    backdrop-filter: blur(5px);
    overflow: hidden; /* Prevent scrolling */

    .card {
      position: relative;
      top: 30px;
      width: 1000px;
      height: 100vh;
      min-height: 750px;
      border-radius: 30px;
      backdrop-filter: brightness(7);
      overflow: hidden; /* Prevent scrolling */
    }
  }
}

@media (max-width: 768px) {
  .detailCard {
    width: 100%;
    z-index: 1000;

    .wrapper {
      width: 100%;

      z-index: 1000;

      .card {
        position: absolute;
        inset: 0;
        width: 100vw;
        border-radius: 0px;
        z-index: 1000;
      }
    }
  }
}
</style>
