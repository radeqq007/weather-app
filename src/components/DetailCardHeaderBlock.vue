<template>
  <header class="header">
    <div class="cityName">{{ cityName }}</div>
    <div class="topBar">
      <button class="removeBtn" @click="closeDetails"></button>
      <div class="tempBlock">
        <div class="min">
          <span class="tempLabel">Min Daily Temp:</span>
          <img
            class="minImg"
            src="../assets/ui/min.png"
            alt="min"
            width="50px"
          />
          {{ toggleTempFormat(this.minTemp, this.tempFormat) }}
        </div>
        <div class="max">
          <span class="tempLabel">Max Daily Temp:</span>
          <img
            class="maxImg"
            src="../assets/ui/max.png"
            alt="max"
            width="50px"
          />
          {{ toggleTempFormat(this.maxTemp, this.tempFormat) }}
        </div>
      </div>
      <div class="timeToggle">
        <span class="timeLabel">12h</span>
        <label class="switch">
          <input type="checkbox" :checked="timeFormat" @change="toggleTime" />
          <span class="slider"></span>
        </label>
        <span class="timeLabel">24h</span>
      </div>
      <div class="tempToggle">
        <img src="../assets/ui/celcius.png" alt="celcius" width="30px" />
        <label class="switch">
          <input type="checkbox" :checked="tempFormat" @change="toggleTemp" />
          <span class="slider"></span>
        </label>
        <img src="../assets/ui/fahrenheit.png" alt="fahrenheit" width="30px" />
      </div>
    </div>
  </header>
</template>

<script>
import { useStore } from "../stores/store";

export default {
  name: "DetailCardHeaderBlock",
  props: ["cityName", "minTemp", "maxTemp", "tempFormat", "timeFormat"],
  emits: ["closeDetails"],
  data() {
    return {
      store: useStore(),
    };
  },

  methods: {
    toggleTempFormat(temp, tempFormat) {
      if (temp === undefined || temp === null) {
        return "N/A";
      }
      return tempFormat
        ? ((temp * 9) / 5 + 32).toFixed(0) + " °F"
        : temp.toFixed(0) + " °C";
    },

    toggleTime(event) {
      this.$emit("update:timeFormat", event.target.checked);
    },

    toggleTemp(event) {
      this.$emit("update:tempFormat", event.target.checked);
    },

    closeDetails() {
      this.$emit("closeDetails");
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  .cityName {
    text-align: center;
    font-size: 48px;
  }

  .topBar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

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

    .tempBlock {
      display: flex;
      justify-content: center;
      align-items: center;

      .tempLabel {
        font-size: 20px;
        color: white;
      }

      .min,
      .max {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
        margin-right: 10px;
        padding: 5px;
      }

      .min {
        color: #0093e2;
      }

      .max {
        color: #ff3d3d;
      }
    }

    .timeToggle {
      display: flex;
      justify-content: center;
      align-items: center;

      .timeLabel {
        font-size: 26px;
        padding: 5px;
      }
    }

    .tempToggle {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
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
  background-color: #ff3d3d;
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
  background-color: #ffffff;
  transition: 0.4s;
}

/* Стили для переключателя в включенном состоянии */
input:checked + .slider {
  background-color: #0093e2;
}

/* Стили для ползунка переключателя в включенном состоянии */
input:checked + .slider:before {
  transform: translateX(26px);
}

@media (max-width: 768px) {
  .header {
    display: relative;
    width: 100vw;

    .topBar {
      .tempBlock {
        position: relative;
        flex-direction: column;
        left: -100px;

        .tempLabel {
          display: none;
        }
      }

      .timeToggle {
        position: absolute;
        top: 60px;
        right: 39px;
      }

      .tempToggle {
        position: absolute;
        top: 130px;
        right: 40px;
      }

      .removeBtn {
        position: absolute;
        top: 16px;
        right: 30px;
      }
    }
  }
}
</style>
