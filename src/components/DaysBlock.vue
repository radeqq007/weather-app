<template>
  <div class="daysBlock">
    <button
      :class="['btnWeekday', 'active']"
      v-for="(day, index) in uniqueDays"
      :key="index"
      @click="handleFilterDay(day)"
    >
      <div class="day">{{ getDay(day) }}</div>
      <div class="weekday">{{ getWeekday(day) }}</div>
    </button>
  </div>
</template>

<script>
export default {
  name: "DayBlock",
  props: {
    uniqueDays: {
      type: Array,
      required: true,
    },
    cityList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getDay(day) {
      return +day.split(" ")[0];
    },

    getWeekday(day) {
      return day.split(" ")[1];
    },

    handleFilterDay(day) {
      const dayNumber = this.getDay(day);
      this.$emit("dayFiltered", dayNumber);
    },

    randomColor() {
      return "bg" + Math.floor(Math.random() * 9 + 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.daysBlock {
  display: flex;
  justify-content: space-evenly;
  font-family: Nerko One;

  .btnWeekday {
    border-radius: 20px;
    line-height: 20px;
    width: 130px;
    padding: 5px;
    font-family: inherit;
    background: linear-gradient(45deg, #1ab440, #20a696);

    &:hover {
      background: linear-gradient(45deg, #4fd9ff, #0093e2);
    }
  }

  .day {
    color: red;
    font-size: 30px;
    font-family: inherit;
  }

  .weekday {
    color: gold;
    font-size: 20px;
    font-family: inherit;
  }
}

.active {
  background: linear-gradient(45deg, #4fd9ff, #0093e2);
}

@media (max-width: 768px) {
  .daysBlock {
    width: 100vw;
    font-size: 20px;

    .btnWeekday {
      margin-top: 10px;
      width: 50px;
      .weekday {
        display: none;
      }
    }
  }
}
</style>
