<template>
  <q-page>
    <div class="q-pa-md" style="max-width: 400px">
      <div>
        <q-form @submit="getLocation" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            type="text"
            v-model="cityToFind"
            label="city"
            lazy-rules
            :rules="[val => (val !== null && val !== '') || 'Please type city']"
          />
          <q-btn label="Get location" type="submit" color="primary" />
        </q-form>
      </div>
      <div style="margin-top: 60px">
        <q-form @submit="getWeather" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            type="text"
            v-model="lat"
            label="latitude"
            lazy-rules
            :rules="[
              val => (val !== null && val !== '') || 'Please type your latitude'
            ]"
          />

          <q-input
            filled
            type="text"
            v-model="lon"
            label="longitude"
            lazy-rules
            :rules="[
              val => (val !== null && val !== '') || 'Please type longitude'
            ]"
          />
          <div class="q-pa-md">
            <q-date v-model="days" multiple today-btn :options="optionsFn" />
          </div>
          <div>
            <q-btn label="Check Weather" type="submit" color="primary" />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </div>
    </div>

    <div class="q-pa-md">
      <div class="q-gutter-y-md flex flex-center" style="max-width: 800px">
        <q-card v-if="weatherData">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab
              v-if="showDate.includes(0)"
              name="day0"
              :label="dateForLabel[0]"
            />
            <q-tab
              v-if="showDate.includes(1)"
              name="day1"
              :label="dateForLabel[1]"
            />
            <q-tab
              v-if="showDate.includes(2)"
              name="day2"
              :label="dateForLabel[2]"
            />
            <q-tab
              v-if="showDate.includes(3)"
              name="day3"
              :label="dateForLabel[3]"
            />
            <q-tab
              v-if="showDate.includes(4)"
              name="day4"
              :label="dateForLabel[4]"
            />
            <q-tab
              v-if="showDate.includes(5)"
              name="day5"
              :label="dateForLabel[5]"
            />
            <q-tab
              v-if="showDate.includes(6)"
              name="day6"
              :label="dateForLabel[6]"
            />
            <q-tab
              v-if="showDate.includes(7)"
              name="day7"
              :label="dateForLabel[7]"
            />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel v-if="showDate.includes(0)" name="day0">
              <div class="text-h5">
                Weather:
                {{
                  this.weatherData.data.daily[0].weather[0].main +
                    " - " +
                    this.weatherData.data.daily[0].weather[0].description
                }}
              </div>
              <div class="text-h6">
                Temperature:
                {{
                  (this.weatherData.data.daily[0].temp.day - 273.15).toFixed(2)
                }}
                ℃
              </div>
              <div class="text-h6">
                Sensed temperature:
                {{
                  (
                    this.weatherData.data.daily[0].feels_like.day - 273.15
                  ).toFixed(2)
                }}
                ℃
              </div>
              <div class="text-h6">
                Pressure:
                {{ this.weatherData.data.daily[0].pressure }} hPa
              </div>
              <div class="text-h6">
                Humidity:
                {{ this.weatherData.data.daily[0].humidity }} %
              </div>
              <div class="text-h6">
                Wind speed: {{ this.weatherData.data.daily[0].wind_speed }} km/h
              </div>
            </q-tab-panel>

            <q-tab-panel v-if="showDate.includes(1)" name="day1">
              <div class="text-h5">
                Weather:
                {{
                  this.weatherData.data.daily[1].weather[0].main +
                    " - " +
                    this.weatherData.data.daily[1].weather[0].description
                }}
              </div>
              <div class="text-h6">
                Temperature:
                {{
                  (this.weatherData.data.daily[1].temp.day - 273.15).toFixed(2)
                }}
                ℃
              </div>
              <div class="text-h6">
                Sensed temperature:
                {{
                  (
                    this.weatherData.data.daily[1].feels_like.day - 273.15
                  ).toFixed(2)
                }}
                ℃
              </div>
              <div class="text-h6">
                Pressure:
                {{ this.weatherData.data.daily[1].pressure }} hPa
              </div>
              <div class="text-h6">
                Humidity:
                {{ this.weatherData.data.daily[1].humidity }} %
              </div>
              <div class="text-h6">
                Wind speed: {{ this.weatherData.data.daily[1].wind_speed }} km/h
              </div>
            </q-tab-panel>

            <q-tab-panel v-if="showDate.includes(2)" name="day2">
              <div class="text-h5">
                Weather:
                {{
                  this.weatherData.data.daily[2].weather[0].main +
                    " - " +
                    this.weatherData.data.daily[2].weather[0].description
                }}
              </div>
              <div class="text-h6">
                Temperature:
                {{
                  (this.weatherData.data.daily[2].temp.day - 273.15).toFixed(2)
                }}
                ℃
              </div>
              <div class="text-h6">
                Sensed temperature:
                {{
                  (
                    this.weatherData.data.daily[2].feels_like.day - 273.15
                  ).toFixed(2)
                }}
                ℃
              </div>
              <div class="text-h6">
                Pressure:
                {{ this.weatherData.data.daily[2].pressure }} hPa
              </div>
              <div class="text-h6">
                Humidity:
                {{ this.weatherData.data.daily[2].humidity }} %
              </div>
              <div class="text-h6">
                Wind speed: {{ this.weatherData.data.daily[2].wind_speed }} km/h
              </div>
            </q-tab-panel>

            <q-tab-panel v-if="showDate.includes(3)" name="day3">
              <div class="text-h5">
                Weather:
                {{
                  this.weatherData.data.daily[3].weather[0].main +
                    " - " +
                    this.weatherData.data.daily[3].weather[0].description
                }}
              </div>
              <div class="text-h6">
                Temperature:
                {{
                  (this.weatherData.data.daily[3].temp.day - 273.15).toFixed(2)
                }}
                ℃
              </div>
              <div class="text-h6">
                Sensed temperature:
                {{
                  (
                    this.weatherData.data.daily[3].feels_like.day - 273.15
                  ).toFixed(2)
                }}
                ℃
              </div>
              <div class="text-h6">
                Pressure:
                {{ this.weatherData.data.daily[3].pressure }} hPa
              </div>
              <div class="text-h6">
                Humidity:
                {{ this.weatherData.data.daily[3].humidity }} %
              </div>
              <div class="text-h6">
                Wind speed: {{ this.weatherData.data.daily[3].wind_speed }} km/h
              </div>
            </q-tab-panel>

            <q-tab-panel v-if="showDate.includes(4)" name="day4">
              <div class="text-h5">
                Weather:
                {{
                  this.weatherData.data.daily[4].weather[0].main +
                    " - " +
                    this.weatherData.data.daily[4].weather[0].description
                }}
              </div>
              <div class="text-h6">
                Temperature:
                {{
                  (this.weatherData.data.daily[4].temp.day - 273.15).toFixed(2)
                }}
                ℃
              </div>
              <div class="text-h6">
                Sensed temperature:
                {{
                  (
                    this.weatherData.data.daily[4].feels_like.day - 273.15
                  ).toFixed(2)
                }}
                ℃
              </div>
              <div class="text-h6">
                Pressure:
                {{ this.weatherData.data.daily[4].pressure }} hPa
              </div>
              <div class="text-h6">
                Humidity:
                {{ this.weatherData.data.daily[4].humidity }} %
              </div>
              <div class="text-h6">
                Wind speed: {{ this.weatherData.data.daily[4].wind_speed }} km/h
              </div>
            </q-tab-panel>

            <q-tab-panel v-if="showDate.includes(5)" name="day5">
              <div class="text-h5">
                Weather:
                {{
                  this.weatherData.data.daily[5].weather[0].main +
                    " - " +
                    this.weatherData.data.daily[5].weather[0].description
                }}
              </div>
              <div class="text-h6">
                Temperature:
                {{
                  (this.weatherData.data.daily[5].temp.day - 273.15).toFixed(2)
                }}
                ℃
              </div>
              <div class="text-h6">
                Sensed temperature:
                {{
                  (
                    this.weatherData.data.daily[5].feels_like.day - 273.15
                  ).toFixed(2)
                }}
                ℃
              </div>
              <div class="text-h6">
                Pressure:
                {{ this.weatherData.data.daily[5].pressure }} hPa
              </div>
              <div class="text-h6">
                Humidity:
                {{ this.weatherData.data.daily[5].humidity }} %
              </div>
              <div class="text-h6">
                Wind speed: {{ this.weatherData.data.daily[5].wind_speed }} km/h
              </div>
            </q-tab-panel>

            <q-tab-panel v-if="showDate.includes(6)" name="day6">
              <div class="text-h5">
                Weather:
                {{
                  this.weatherData.data.daily[6].weather[0].main +
                    " - " +
                    this.weatherData.data.daily[6].weather[0].description
                }}
              </div>
              <div class="text-h6">
                Temperature:
                {{
                  (this.weatherData.data.daily[6].temp.day - 273.15).toFixed(2)
                }}
                ℃
              </div>
              <div class="text-h6">
                Sensed temperature:
                {{
                  (
                    this.weatherData.data.daily[6].feels_like.day - 273.15
                  ).toFixed(2)
                }}
                ℃
              </div>
              <div class="text-h6">
                Pressure:
                {{ this.weatherData.data.daily[6].pressure }} hPa
              </div>
              <div class="text-h6">
                Humidity:
                {{ this.weatherData.data.daily[6].humidity }} %
              </div>
              <div class="text-h6">
                Wind speed: {{ this.weatherData.data.daily[6].wind_speed }} km/h
              </div>
            </q-tab-panel>

            <q-tab-panel v-if="showDate.includes(7)" name="day7">
              <div class="text-h5">
                Weather:
                {{
                  this.weatherData.data.daily[7].weather[0].main +
                    " - " +
                    this.weatherData.data.daily[7].weather[0].description
                }}
              </div>
              <div class="text-h6">
                Temperature:
                {{
                  (this.weatherData.data.daily[7].temp.day - 273.15).toFixed(2)
                }}
                ℃
              </div>
              <div class="text-h6">
                Sensed temperature:
                {{
                  (
                    this.weatherData.data.daily[7].feels_like.day - 273.15
                  ).toFixed(2)
                }}
                ℃
              </div>
              <div class="text-h6">
                Pressure:
                {{ this.weatherData.data.daily[7].pressure }} hPa
              </div>
              <div class="text-h6">
                Humidity:
                {{ this.weatherData.data.daily[7].humidity }} %
              </div>
              <div class="text-h6">
                Wind speed: {{ this.weatherData.data.daily[7].wind_speed }} km/h
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script src="./Weather.js" />
