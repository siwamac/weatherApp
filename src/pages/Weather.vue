<template>
  <q-page>
    <div class="q-pa-md">
      <div class="q-gutter-y-md flex flex-center" style="max-width: 1500px">
        <q-card>
          <div class="q-pa-md" style="max-width: 400px">
            <div>
              <q-form
                @submit="getLocation"
                @reset="onReset"
                class="q-gutter-md"
              >
                <q-input
                  filled
                  type="text"
                  v-model="cityToFind"
                  label="city"
                  lazy-rules
                  :rules="[
                    val => (val !== null && val !== '') || 'Please type city'
                  ]"
                />
                <div v-if="this.lat && this.lon">
                  <q-icon
                    name="location_on"
                    style="font-size: 2em"
                    color="primary"
                  />
                  Location coordinates: {{ this.lat + ", " + this.lon }}
                </div>
                <q-btn
                  label="Obtain city location"
                  type="submit"
                  color="primary"
                />
                <q-btn
                  label="Current location"
                  color="primary"
                  @click="currentLocation()"
                />
                <div class="q-pa-md">
                  <q-date
                    v-model="days"
                    multiple
                    today-btn
                    :options="optionsFn"
                  />
                </div>
                <div>
                  <q-btn
                    label="Check Weather"
                    @click="getWeather"
                    color="primary"
                  >
                    <q-popup-proxy
                      v-if="
                        this.lat == null ||
                          this.lon == null ||
                          this.days == null
                      "
                    >
                      <q-banner>
                        <template v-slot:avatar>
                          <q-icon name="error" color="primary" />
                        </template>
                        Fill correctly location and date!
                      </q-banner>
                    </q-popup-proxy>
                  </q-btn>
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
        </q-card>
        <q-card
          v-if="this.weatherFiltered"
          style="margin-left: 100px; width:450px; background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(34,34,56,1) 60%, rgba(0,212,255,1) 100%);
"
        >
          <div v-for="item in weatherFiltered" :key="item.dt">
            <h5>{{ item.dt }}</h5>
            <h6>{{ item.temperature }} ℃</h6>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script src="./Weather.js" />
