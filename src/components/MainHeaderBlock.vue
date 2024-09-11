<template>
  <header class="header">
    <div class="title">My Weather App</div>
    <div class="search">
      <input
        class="searchInp"
        type="text"
        v-model.trim="store.city"
        @keydown.enter="store.getCity"
        placeholder="Enter city..."
      />
      <button class="searchBtn" @click="store.getCity">Get</button>
    </div>
  </header>
</template>

<script>
import { useStore } from "../stores/store";

export default {
  name: "MainHeaderBlock",
  data() {
    return {
      store: useStore(),
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  text-align: center;

  .title {
    margin: 10px;
    font-size: 48px;
    color: orange;
  }

  .search {
    font-size: 30px;

    .searchInp {
      width: 500px;
      font-size: inherit;
      font-family: inherit;
      border: none;
      outline: none;
      border-radius: 20px 0 0 20px;
      padding-left: 20px;

      &::placeholder {
        font-family: inherit;
      }
    }

    .searchBtn {
      font-size: inherit;
      font-family: inherit;
      background: rgb(150, 150, 235);
      border: none;
      color: black;
      border-radius: 0 20px 20px 0;

      &:hover {
        background: green;
        color: inherit;
      }
    }
  }
}
</style>
