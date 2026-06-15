<script setup>
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
import TripCalendar from '../components/TripCalendar.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons'
import { Location01Icon } from '@hugeicons/core-free-icons'
import { Calendar03Icon } from '@hugeicons/core-free-icons'
import { CloudSunRainIcon } from '@hugeicons/core-free-icons'
import { useRoute } from 'vue-router'
import {onMounted, ref} from 'vue'
//import TripCalendar from '@/components/TripCalendar.vue'

const route = useRoute()
const parkcode = route.params.parkCode
const parkName = ref('')
const city = ref('')
const country = ref('')
const startDate = ref('')
const endDate = ref('')
const tripActivities = ref([])
const selectedActivities = ref([])
const isOpen = ref(false)
console.log(parkcode)

function handledates(dates){
  startDate.value = dates.start
  endDate.value = dates.end
  console.log(startDate.value)
  console.log(endDate.value)


}
async function parkTrips(){
  const  url = `https://developer.nps.gov/api/v1/parks?parkCode=${parkcode}&limit=1&api_key=VETJHYmMiqooqDU2rs8Xpdfe5gbbhegddjAWqid8`

  console.log(url)
  const response = await fetch(url, {
    method : "GET",
    headers : { 
      "Content-Type" : "application/json",
    },
  })
  if(response.ok){
    const data = await response.json()
    console.log("Data is",data)
    const data_ = data.data[0]
    parkName.value = data_.fullName
    city.value = data_.addresses[0].stateCode
    country.value = data_.addresses[0].countryCode
    const activities = data_.activities
    for(let i=0;i<activities.length;i++){
      tripActivities.value.push(activities[i].name)

    }
  }
  else{
    throw new Error(`Response status ${response.status}`)
  }
}
function closeCalendar(){
  isOpen.value = false
  console.log("closed")

}
function openCalendar(){
  isOpen.value = true
  console.log("opened")

}

onMounted(() =>{
  parkTrips()

})

</script>
<template>

  <Navbar/>
  <div class="min-h-screen mt-15 flex flex-col  overflow-y-auto bg-white w-full px-10">
  <div class="flex items-center justify-between mt-5 mb-6">

      <button
        class="w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center"
      >
        <i class="text-gray-700">
      <HugeiconsIcon :icon="ArrowLeft02Icon" />
        </i>
      </button>
      <h1 class="text-xl font-bold text-gray-800">
        Add to Trip
      </h1>
      <button
        class="bg-pink-400 text-white px-5 py-2.5 rounded-2xl font-medium shadow-sm"
      >
        Save
      </button>
    </div>
    <div
  class="relative h-72 rounded-3xl overflow-hidden shadow-sm mb-6"
>
  <img
    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    class="w-full h-full object-cover"
  />
  <div
    class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
  ></div>

  <div
    class="absolute bottom-0 left-0 p-6 text-white"
  >
    <div
      class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4"
    >
      <i class=" text-xl"><HugeiconsIcon :icon="Location01Icon" /></i>
    </div>
    <h2 class="text-3xl font-bold leading-tight">{{ parkName }}
      
    </h2>
    <p class="text-white/80 mt-1 text-lg">
      {{ city }}, {{ country }}
    </p>

  </div>
</div>
<div class="grid grid-cols-2 gap-4 mb-6">

  <!-- Trip Dates -->
  <div class="bg-white rounded-3xl shadow-sm p-5">

    <!-- Header -->
    <div class="flex items-center gap-3 mb-5">
      <div
        class="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center"
      >
        <button class="text-pink-400 cursor-pointer" @click ="openCalendar"><HugeiconsIcon :icon="Calendar03Icon"/>

        </button>
      </div>

      <h3 class="text-lg font-semibold text-gray-800">
        Trip Dates
      </h3>
    </div>

    <!-- Start Date -->
    <div
      class="border border-gray-200 rounded-2xl p-4 mb-4"
    >
      <p class="text-sm text-gray-400 mb-1">
        Start Date
      </p>

      <div class="flex items-center justify-between">
        <span class="font-medium text-gray-700">
          {{ startDate }}
        </span>
        </div>
    </div>

    <!-- End Date -->
    <div
      class="border border-gray-200 rounded-2xl p-4"
    >
      <p class="text-sm text-gray-400 mb-1">
        End Date
      </p>

      <div class="flex items-center justify-between">
        <span class="font-medium text-gray-700">
          {{ endDate }}
        </span>

        <div class="text-gray-400">
    

        </div>
      </div>
    </div>

  </div>

  <!-- Weather Forecast -->
  <div class="bg-white rounded-3xl shadow-sm p-5">

    <!-- Header -->
    <div class="flex items-center justify-between mb-5">

      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center"
        >
          <i class="text-pink-600"><HugeiconsIcon :icon="CloudSunRainIcon" /></i>
        </div>

        <h3 class="text-lg font-semibold text-gray-800">
          Weather Forecast
        </h3>
      </div>

      <button
        class="text-sm text-pink-500 font-medium"
      >
        View Details
      </button>

    </div>

    <!-- Forecast Days -->
    <div class="grid grid-cols-4 gap-2 text-center">

      <!-- Day -->
      <div>
        <p class="text-sm text-gray-500 mb-2">
          Thu
        </p>

        <i
          class="fa-solid fa-sun text-yellow-400 text-2xl mb-2"
        ></i>

        <p class="text-sm font-medium text-gray-700">
          72°
        </p>

        <p class="text-xs text-gray-400">
          48°
        </p>
      </div>

      <!-- Day -->
      <div>
        <p class="text-sm text-gray-500 mb-2">
          Fri
        </p>

        <i
          class="fa-solid fa-sun text-yellow-400 text-2xl mb-2"
        ></i>

        <p class="text-sm font-medium text-gray-700">
          75°
        </p>

        <p class="text-xs text-gray-400">
          50°
        </p>
      </div>

      <!-- Day -->
      <div>
        <p class="text-sm text-gray-500 mb-2">
          Sat
        </p>

        <i
          class="fa-solid fa-cloud text-gray-400 text-2xl mb-2"
        ></i>

        <p class="text-sm font-medium text-gray-700">
          70°
        </p>

        <p class="text-xs text-gray-400">
          49°
        </p>
      </div>

      <!-- Day -->
      <div>
        <p class="text-sm text-gray-500 mb-2">
          Sun
        </p>

        <i
          class="fa-solid fa-cloud-rain text-blue-400 text-2xl mb-2"
        ></i>

        <p class="text-sm font-medium text-gray-700">
          65°
        </p>

        <p class="text-xs text-gray-400">
          47°
        </p>
      </div>

    </div>

  </div>

</div>
  <form>
    <h2 class="text-2xl font-bold" v-bind="parkName">{{ parkName }}</h2>
    <h4 class="font-bold">Select Activities</h4>
    <h4 class="text-gray-500">Choose the activities you want to include in your trip.</h4>
    
    <select multiple  class="
      w-full
      h-72
      rounded-2xl
      border border-gray-200
      bg-pink-100
      p-4
      text-gray-700
      shadow-sm
      focus:outline-none
      focus:ring-4
      focus:ring-pink-200
      focus:border-pink-500
      scrollbar-hide
      transition
    " v-model="selectedActivities"><option class="p-3 rounded-lg hover:bg-pink-200 focus:bg-pink-300" v-bind="tripActivities" v-for="value in tripActivities">{{ value }}</option></select>

  </form>

  </div>
    <TripCalendar v-if="isOpen" @close="closeCalendar" @updateDates="handledates"/>

  <Footer/>
</template>