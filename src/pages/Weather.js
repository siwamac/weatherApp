import axios from "axios";

const axiosWeather = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/"
});

const axiosGeo = axios.create({
  baseURL: "https://eu1.locationiq.com/v1/"
});

export default {
  data() {
    return {
      weatherData: null,
      lat: null,
      lon: null,
      currentLat: null,
      currentLon: null,
      cityToFind: null,
      apiKey: "e706fe7e900a132f45e8be5238b44547",
      days: [],
      tab: "weather",
      weatherFiltered: []
    };
  },

  methods: {
    optionsFn(date) {
      let dateToCompare = new Date(date);
      dateToCompare.setHours(0, 0, 0, 0);
      let today = new Date();
      today.setHours(0, 0, 0, 0);

      Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };

      let future = today.addDays(7);

      return dateToCompare >= today && dateToCompare <= future;
    },

    getWeather() {
      this.weatherFiltered = [];
      axiosWeather({
        method: "get",
        url: `onecall?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`
      })
        .then(res => {
          this.weatherData = res;
          this.dateConvert(this.days);
          //console.log(this.weatherData);
        })
        .catch(err => {
          console.log(err);
          this.weatherData = null;
        });
    },

    getLocation() {
      axiosGeo({
        method: "get",
        url: `search.php?key=pk.f9d9eb1c3a8af0d2f28ced5753ac8124&q=${this.cityToFind}&format=json`
      })
        .then(res => {
          this.lat = res.data[0].lat;
          this.lon = res.data[0].lon;
        })
        .catch(err => {
          console.log(err);
        });
    },

    onReset() {
      this.lat = null;
      this.lon = null;
      this.days = null;
    },

    autoLocation(position) {
      this.currentLat = position.coords.latitude;
      this.currentLon = position.coords.longitude;
    },

    currentLocation() {
      this.lat = this.currentLat;
      this.lon = this.currentLon;
    },

    dateConvert(daysArray) {
      for (let i = 0; i < this.weatherData.data.daily.length; i++) {
        let dayToCheck = new Date(this.weatherData.data.daily[i].dt * 1000);
        dayToCheck = dayToCheck
          .toISOString()
          .slice(0, 10)
          .replaceAll("-", "/");

        for (let j = 0; j < daysArray.length; j++) {
          if (dayToCheck == daysArray[j]) {
            let dataToAdd = {
              dt: dayToCheck,
              description: this.weatherData.data.daily[i].weather[0]
                .description,
              main: this.weatherData.data.daily[i].weather[0].main,
              temperature: (
                this.weatherData.data.daily[i].temp.day - 273.15
              ).toFixed(2)
            };
            this.weatherFiltered.push(dataToAdd);
          }
        }
      }
      console.log(this.weatherFiltered);
    }
  },

  mounted() {
    navigator.geolocation.getCurrentPosition(this.autoLocation);
    let vModelToday = new Date();
    this.days.push(
      vModelToday
        .toISOString()
        .slice(0, 10)
        .replaceAll("-", "/")
    );
  }
};
