import { defineStore } from "pinia";
import axios from "axios";

export const useStore = defineStore("store", {
  state: () => ({
    updateInfoId: null,
    apiKey: "c5bea748c925d652b7e27743ab9b430d",
    city: "",
    cities: [],
  }),

  getters: {},

  actions: {
    async getData(city) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${this.apiKey}`
        );

        return await response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async getCity() {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&units=metric&appid=${this.apiKey}`
        );

        const cityInfo = await response.data;

        if (cityInfo) {
          this.addCity(cityInfo);
        }
      } catch (error) {
        console.error(error);
      }
      this.city = "";
    },

    addCity(cityInfo) {
      const currentCity = this.cities.some(
        (city) => city.city.name === cityInfo.city.name
      );

      if (!currentCity) {
        this.cities.push(cityInfo);
        this.toStorage();
      }
      this.city = "";
    },

    async updateInfo() {
      console.log("Updating weather...");
      for (let i = 0; i < this.cities.length; i++) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${this.cities[i].city.name}&units=metric&appid=${this.apiKey}`
          );

          const newInfo = response.data;

          this.cities[i] = newInfo;
        } catch (error) {
          console.log(error);
        }
      }
    },

    toStorage() {
      localStorage.setItem("cities", JSON.stringify(this.cities));
    },

    fromStorage() {
      this.cities = JSON.parse(localStorage.getItem("cities")) || [];
    },

    startUpdateInfo() {
      if (this.updateInfoId === null) {
        this.updateInfoId = setInterval(() => {
          this.updateInfo();
        }, 600000);
      }
    },

    stopUpdateInfo() {
      if (this.updateInfoId !== null) {
        clearInterval(this.updateInfoId);
        this.updateInfoId = null;
      }
    },

    weatherIcon(condition) {
      const weatherIcons = {
        "clear sky": "clearDay",
        "few clouds": "fewCloudsDay",
        "scattered clouds": "fewCloudsDay",
        "broken clouds": "fewCloudsDay",
        "overcast clouds": "clouds",
        "shower rain": "showerRain",
        "light rain": "rain",
        "moderate rain": "rain",
        "heavy rain": "heavyRain",
        thunderstorm: "thunderstorm",
        snow: "snow",
        mist: "mist",
        tornado: "tornado",
      };

      const iconName = weatherIcons[condition] || "";
      return iconName ? require(`../assets/icons/${iconName}.png`) : "";
    },
  },
});
