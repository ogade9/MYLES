<script setup>
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
import {useRoute, RouterLink} from 'vue-router';
import { ref,onMounted } from 'vue';
import { HugeiconsIcon } from '@hugeicons/vue'
import { Location01Icon } from '@hugeicons/core-free-icons'

//get Park detailss
const route = useRoute()
const parkcode = route.params.parkCode
const parkName = ref(null)
const line1 = ref(null)
const  line2 = ref(null)
const cityName = ref(null)
const stateName = ref(null)
const description = ref(null)
const feedescription = ref(null)
const entrancefees = ref([''])
const expanded = ref(false)

console.log(parkcode)
async function getParkData(){
  const url = `https://developer.nps.gov/api/v1/parks?parkCode=${parkcode}&stateCode=&limit=1&api_key=VETJHYmMiqooqDU2rs8Xpdfe5gbbhegddjAWqid8` 
  console.log(url)
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type" : "application/json",
    },
  })
  if(response.ok){
    console.log("It works")
    const data = await response.json()
    console.log(data)
    parkName.value = data.data[0].fullName
    line1.value = data.data[0].addresses[0].line1
    line2.value = data.data[0].addresses[0].line2
    cityName.value= data.data[0].addresses[0].city
    stateName.value = data.data[0].states
    description.value = data.data[0].description
    feedescription.value = data.data[0].operatingHours[0].description
    entrancefees.value = data.data[0].entranceFees

    console.log("Name:",parkName)
  }
  else{
    throw new Error(`Response status: ${response.status}`)
  }
}
onMounted( async () =>{
  await getParkData()
})
</script>
<template>
  <div class="min-h-screen mt-15 flex flex-col  overflow-y-auto bg-white w-full px-10">
    <Navbar/>
    <!--Hero Image-->
    <section class="relative">
    <img
      class="h-72 w-full object-cover"
    />

    <button
      class="absolute top-4 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow"
    >
      ←
    </button>

    <button
      class="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow"
    >
      ♡
    </button>
  </section>
    <!--Title-->
    <div class="flex items-start justify-between mt-10">
      <div>
        <h1 class="text-4xl font-bold">
          {{ parkName }}
        </h1>

      </div>
      <RouterLink :to="`/trips/${parkcode}`" class="cursor-pointer">
        <button
          class="rounded-2xl bg-pink-500 px-6 py-4 font-semibold text-white"
        >
          + Add to Trip
        </button>
      </RouterLink>
    </div>
    <div class="flex flex-row  space-x-1 text-sm text-gray-400">
      <span class="text-sm"><HugeiconsIcon class="text-pink-300 h-5":icon="Location01Icon"/></span>
      <span>{{ line1 }},</span>
      <span>{{ line2}},</span>
      <span>{{ cityName }},</span>
      <span>{{ stateName }}</span>
    </div>
    <div>
      <div class="text-lg mt-5 mb-2 font-bold">Description</div>
      <p :class="[' text-ellipsis text-wrap truncate', expanded ? 'line-clamp-none': 'line-clamp-3']">{{ description }}</p>
      <button class="text-pink-400 cursor-pointer"@click = "expanded = !expanded">{{ expanded ? 'Read less' : 'Read more' }}</button>
    </div>
    <!--Operating Hours-->
    <div>
      <div class="text-lg mt-5 mb-2 font-bold">Operating Hours</div>
      <p class="text-xs italic">{{feedescription}}</p>
      <div v-for="item in standardhours" :key="item">{{item}}</div>
    </div>

    <!--Map-->
    <div class="h-50 mt-5 w-full bg-gray-100 bg-secondary/60 grid place-items-center border border-bottom border-gray-200 text-xs mb-50 ">
            [ Park Map  ]
    </div>
    <div class="min-h-screen bg-white pb-24">
  <!-- Stats -->
    <div class="mt-8 grid grid-cols-2 gap-4">
      <div class="rounded-xl border p-4">
        <p class="font-semibold">Open Year Round</p>
        <p class="text-sm text-gray-500">
          24/365 days
        </p>
      </div>

      <div class="rounded-xl border p-4">
        <p class="font-semibold">Park Size</p>
        <p class="text-sm text-gray-500">
          1,583 sq mi
        </p>
      </div>

      <div class="rounded-xl border p-4">
        <p class="font-semibold">Trails</p>
        <p class="text-sm text-gray-500">
          700+ miles
        </p>
      </div>

      <div class="rounded-xl border p-4">
        <p class="font-semibold">Pets Allowed</p>
        <p class="text-sm text-gray-500">
          On Leash
        </p>
      </div>
    </div>

    <!-- Fees -->
    <div class="mt-10">
      <h2 class="text-3xl font-bold">
        Fees & Passes
      </h2>

      <div class="mt-6 grid gap-4">
        <div class="rounded-2xl border p-5 shadow-sm">
          <h3 class="font-bold text-xl">
            Vehicle Pass
          </h3>

          <p class="mt-2 text-2xl font-bold text-pink-500">
            $35
          </p>

          <ul class="mt-4 space-y-2 text-gray-600">
            <li>• Valid for 7 days</li>
            <li>• Admits 1 vehicle</li>
            <li>• Non-transferable</li>
          </ul>

          <button
            class="mt-4 text-pink-500 font-semibold"
          >
            View Details →
          </button>
        </div>

        <div class="rounded-2xl border p-5 shadow-sm">
          <h3 class="font-bold text-xl">
            Individual Pass
          </h3>

          <p class="mt-2 text-2xl font-bold text-pink-500">
            $20
          </p>
        </div>

        <div class="rounded-2xl border p-5 shadow-sm">
          <h3 class="font-bold text-xl">
            Motorcycle Pass
          </h3>

          <p class="mt-2 text-2xl font-bold text-pink-500">
            $25
          </p>
        </div>
      </div>
    </div>

    <!-- Things To Do -->
    <div class="mt-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold">
          Things To Do
        </h2>

        <button class="text-pink-500 font-semibold">
          See All
        </button>
      </div>

      <div class="mt-5 flex gap-4 overflow-x-auto">
        <div
          class="min-w-[220px] overflow-hidden rounded-2xl"
        >
          <img
            class="h-36 w-full object-cover"
          />
          <div class="bg-black/80 p-3 text-white">
            Hiking
          </div>
        </div>

        <div
          class="min-w-[220px] overflow-hidden rounded-2xl"
        >
          <img
            class="h-36 w-full object-cover"
          />
          <div class="bg-black/80 p-3 text-white">
            Boating
          </div>
        </div>
      </div>
    </div>

    <!-- Plan Visit -->
    <div class="mt-10">
      <h2 class="text-3xl font-bold">
        Plan Your Visit
      </h2>

      <div class="mt-4 rounded-2xl border">
        <div
          class="flex items-center justify-between border-b p-5"
        >
          <div>
            <h3 class="font-semibold">
              Visitor Centers
            </h3>
            <p class="text-gray-500">
              Find hours and locations
            </p>
          </div>

          →
        </div>

        <div
          class="flex items-center justify-between p-5"
        >
          <div>
            <h3 class="font-semibold">
              Getting Here
            </h3>
            <p class="text-gray-500">
              Directions & transportation
            </p>
          </div>

          →
        </div>
      </div>
    </div>
</div>
  <Footer/>
  </div>


</template>

