<template>
  <main>
    <table class="tableInfo">
      <thead>
        <tr>
          <th>Time</th>
          <th>Weather</th>
          <th>Main</th>
          <th>Temperature</th>
          <th>Pressure</th>
          <th>Humidity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="day in filteredInfo" :key="day.dt">
          <td class="time">
            {{ toggleTimeFormat(day.dt * 1000, timeFormat) }}
          </td>
          <td class="weather">
            <img
              class=""
              :src="store.weatherIcon(day.weather[0].description)"
              alt="logo"
              width="50px"
            />
          </td>
          <td class="main">{{ day.weather[0].description }}</td>
          <td class="temperature">
            {{ toggleTempFormat(day.main.temp, tempFormat) }}
          </td>
          <td class="pressure">{{ day.main.pressure }}</td>
          <td class="humidity">{{ day.main.humidity }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
import { useStore } from "../stores/store";
export default {
  name: "TableInfo",
  props: {
    filteredInfo: {
      type: Array,
      required: true,
    },

    toggleTimeFormat: {
      type: Function,
      required: true,
    },

    toggleTempFormat: {
      type: Function,
      required: true,
    },

    tempFormat: {
      type: Boolean,
      required: true,
    },

    timeFormat: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      store: useStore(),
    };
  },
};
</script>

<style lang="scss" scoped>
.tableInfo {
  margin: 20px auto;
  width: 90%;
  text-align: center;

  thead {
    color: rgb(245, 245, 60);
    font-size: 30px;
  }

  td {
    padding: 0;
    margin: 0;
    height: 56px;
  }

  .time {
    width: 120px;
    font-size: 30px;
  }

  .weather {
    width: 100px;
  }

  .main {
    width: 200px;
    font-size: 20px;
  }

  .temperature {
    width: 180px;
    font-size: 30px;
  }

  .pressure {
    width: 150px;
    font-size: 30px;
  }

  .humidity {
    width: 100px;
    font-size: 30px;
  }
}
</style>
