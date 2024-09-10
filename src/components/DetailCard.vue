<template>
  <main class="detailCard">
    <div class="wrapper">
      <div class="card">
        <header>
          <div class="title">{{ cityName }}</div>
          <button class="btnClose" @click="closeDetails">Close</button>
          <div class="tempBlock">
            <div class="min">
              <img
                class="minImg"
                src="../assets/ui/min.png"
                alt="min"
                width="20px"
              />
              {{ toggleTempFormat(this.minTemp, this.tempFormat) }}
            </div>
            <div class="max">
              <img
                class="maxImg"
                src="../assets/ui/max.png"
                alt="min"
                width="20px"
              />
              {{ toggleTempFormat(this.maxTemp, this.tempFormat) }}
            </div>
          </div>
          <div class="timeBlock">
            <span>12h</span>
            <label class="switch">
              <input type="checkbox" v-model="this.timeFormat" />
              <span class="slider"></span>
            </label>
            <span>24h</span>
          </div>
          <div class="temp">
            <img src="../assets/ui/celcius.png" alt="celcius" width="30px" />
            <label class="switch">
              <input type="checkbox" v-model="this.tempFormat" />
              <span class="slider"></span>
              <div></div>
            </label>
            <img
              src="../assets/ui/fahrenheit.png"
              alt="fahrenheit"
              width="30px"
            />
          </div>
          <div class="daysBlock">
            <button
              class="btnWeekday"
              v-for="(day, id) in this.getUniqueDays()"
              :key="id"
              @click="filterDay(getDay(day))"
            >
              <div class="day">
                {{ getDay(day) }}
              </div>
              <div class="weekday">
                {{ getWeekday(day) }}
              </div>
            </button>
          </div>
        </header>
        <table class="tableInfo">
          <thead>
            <tr>
              <td>Time</td>
              <td>Weather</td>
              <td>Main</td>
              <td>Temperature</td>
              <td>Pressure</td>
              <td>Humidity</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="day in this.filteredInfo" :key="day">
              <td>
                {{ toggleTimeFormat(day.dt * 1000, this.timeFormat) }}
              </td>
              <td>
                <img
                  :src="store.weatherIcon(day.weather[0].description)"
                  alt="logo"
                  width="50px"
                />
              </td>
              <td>{{ day.weather[0].description }}</td>
              <td>{{ toggleTempFormat(day.main.temp, this.tempFormat) }}</td>
              <td>{{ day.main.pressure }}</td>
              <td>{{ day.main.humidity }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
import { useStore } from "../stores/store";
export default {
  emits: ["closeDetails"],
  props: {
    city: {
      type: Object,
      require: true,
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
      return tempFormat
        ? ((temp * 9) / 5 + 32).toFixed(0) + " °F"
        : temp.toFixed(0) + " °C";
    },

    getUniqueDays() {
      const allDays = this.city.list.map((city) =>
        Intl.DateTimeFormat("en-US", {
          weekday: "long",
          day: "numeric",
        }).format(city.dt * 1000)
      );
      return [...new Set([...allDays])];
    },

    getDay(day) {
      return +day.split(" ")[0];
    },

    getWeekday(day) {
      return day.split(" ")[1];
    },

    filterDay(day) {
      this.filteredInfo = this.city.list.filter(
        (date) => new Date(date.dt * 1000).getDate() === day
      );

      this.getMinMax();
    },

    getMinMax() {
      const temps = this.filteredInfo.map((info) => info.main.temp);

      this.minTemp = Math.min(...temps);
      this.maxTemp = Math.max(...temps);
    },

    closeDetails() {
      this.$emit("closeDetails");
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
  inset: 0;
  border: 1px solid red;

  .wrapper {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(10, 10, 10, 0.5);
    backdrop-filter: blur(5px);

    .card {
      width: 1000px;
      height: 400px;
      border: 1px solid blue;

      .title {
        text-align: center;
      }

      .btnClose {
        position: relative;
        inset: 0;
        top: -19px;
        left: 950px;
      }

      .tempBlock {
        border: 1px solid red;
      }

      .daysBlock {
        display: flex;
        justify-content: space-evenly;

        .day {
          color: red;
        }

        .weekday {
          color: green;
        }
      }

      .tableInfo {
        margin: 10px auto;
        width: 70%;
        text-align: center;
        border: 1px solid red;
      }
    }
  }
}

/* Стили для контейнера переключателя */
.toggle-container {
  justify-content: center;
  align-items: center;
}

/* Стили для самого переключателя */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Скрытие реального checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* Стили для ползунка переключателя */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

/* Стили для ползунка переключателя, когда включен */
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  border-radius: 50%;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

/* Стили для переключателя в включенном состоянии */
input:checked + .slider {
  background-color: #4caf50;
}

/* Стили для ползунка переключателя в включенном состоянии */
input:checked + .slider:before {
  transform: translateX(26px);
}
</style>
