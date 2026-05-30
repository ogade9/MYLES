<script setup>
import {useRouter} from 'vue-router'
import {ref} from 'vue';
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'

//Write a function that retrieves from the national park api
const search = ref('');
const router = useRouter()
let search_result = ref('')

const key = "VETJHYmMiqooqDU2rs8Xpdfe5gbbhegddjAWqid8"
async function getSearch(){
  let url;
  if(search.value.length == 2){
    url = `https://developer.nps.gov/api/v1/parks?stateCode=${search.value}&limit=1&api_key=VETJHYmMiqooqDU2rs8Xpdfe5gbbhegddjAWqid8`
      console.log(url)
  }
  else{
    url = `https://developer.nps.gov/api/v1/parks?parkCode=${search.value}&stateCode=&limit=1&api_key=VETJHYmMiqooqDU2rs8Xpdfe5gbbhegddjAWqid8`



  }
  console.log(search.value)
  const response = await fetch(url, {
    method : "GET",
    headers : {
      "Content-Type" : "application/json",
    },
  })
  if(response.ok){
    console.log("it works")
    const data = await response.json();
    console.log(data.data)
    //console.log("fullName:", data.data[0].fullName)
    search_result.value = data.data[0]
    console.log(search_result.value)
  }
  else{
    throw new Error(`Response status ${response.status}`)
  }
}
</script>
<template>
    <Navbar/>
  <div class="min-h-screen py-30 flex flex-col px-4  space-y-3 overflow-y-auto pb-24 bg-white justify-center w-full px-20">
    <h2 class="text-2xl font-bold">Find a park</h2>
    <p class= "text-gray-500 text-sm">Search by parkCode</p>
  <form @submit.prevent="getSearch">  
    <div class="flex gap-2 mt-12">
          <div class="relative flex-1">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              v-model = "search"
              type="text"
              placeholder="e.g. Yose, Glac, Yell"
              class="w-full h-9 pl-9 pr-3 rounded-sm  shadow-lg bg-card text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <button class="h-9 px-4 rounded-md bg-black shadow-lg focus:outline-none focus:ring-2 focus:ring-green-200 text-primary-foreground text-sm text-white font-medium hover:bg-primary/90">
            Search
          </button>
          <!--<p v-if="search && filteredItems.length === 0"> No results found for "{{ search }}"</p>-->
    </div>
  </form>
  <RouterLink :to="`/details/${search_result.parkCode}`" class="cursor-pointer bg-card">
    <div class="flex flex-col items-center text-sm text-wrap justify-center border border-border border-pink-200 shadow-sm shadow-pink-200 p-1 rounded-lg">{{ search_result.fullName }}</div></RouterLink>


  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-col-3 gap-6 mt-20 mx-width-md">
    <a href="#" class="block rounded-lg overflow-hidden bg-card hover:border-primary border border-gray-300 transition">
          <div class="h-32 bg-gray-100 bg-secondary/60 grid place-items-center border border-bottom border-gray-200 text-xs text-muted ">
            [ Yosemite photo ]
          </div>
      <div class="p-4">
            <div class="flex justify-between bg-white items-baseline">
              <h3 class="font-semibold">Yosemite</h3>
              <span class="text-xs text-muted">California</span>
            </div>
            <p class="text-sm text-muted mt-1">Granite cliffs, giant sequoias, and waterfalls.</p>
          </div>
      </a>
      <a href="#" class="block rounded-lg overflow-hidden bg-card hover:border-primary border border-gray-300 transition">
          <div class="h-32 bg-gray-100 bg-secondary/60 grid place-items-center border border-bottom border-gray-200 text-xs text-muted ">
            [ Yellowstone photo ]
          </div>
      <div class="p-4">
            <div class="flex justify-between bg-white items-baseline">
              <h3 class="font-semibold">Yellowstone</h3>
              <span class="text-xs text-muted">Wyoming</span>
            </div>
            <p class="text-sm text-muted mt-1">Geysers, hot springs, and wildlife across volcanic terrain.</p>
          </div>
      </a>
      <a href="#" class="block rounded-lg overflow-hidden bg-card hover:border-primary border border-gray-300 transition">
          <div class="h-32 bg-gray-100 bg-secondary/60 grid place-items-center border border-bottom border-gray-200 text-xs text-muted ">
            [ Zion photo ]
          </div>
      <div class="p-4">
            <div class="flex justify-between bg-white items-baseline">
              <h3 class="font-semibold">Zion</h3>
              <span class="text-xs text-muted">Utah</span>
            </div>
            <p class="text-sm text-muted mt-1">Red rock canyons and the iconic Narrows river hike.</p>
          </div>
      </a>
      <a href="#" class="block rounded-lg overflow-hidden bg-card hover:border-primary border border-gray-300 transition">
          <div class="h-32 bg-gray-100 bg-secondary/60 grid place-items-center border border-bottom border-gray-200 text-xs text-muted ">
            [ Acadia photo ]
          </div>
      <div class="p-4">
            <div class="flex justify-between bg-white items-baseline">
              <h3 class="font-semibold">Acadia</h3>
              <span class="text-xs text-muted">Maine</span>
            </div>
            <p class="text-sm text-muted mt-1">Rugged Atlantic coastline and Cadillac Mountain sunrises.</p>
          </div>
      </a>
      <a href="#" class="block rounded-lg overflow-hidden bg-card hover:border-primary border border-gray-300 transition">
          <div class="h-32 bg-gray-100 bg-secondary/60 grid place-items-center border border-bottom border-gray-200 text-xs text-muted ">
            [ Glacier photo ]
          </div>
      <div class="p-4">
            <div class="flex justify-between bg-white items-baseline">
              <h3 class="font-semibold">Glacier</h3>
              <span class="text-xs text-muted">Montana</span>
            </div>
            <p class="text-sm text-muted mt-1">Alpine lakes, glaciers, and the Going-to-the-Sun Road.</p>
          </div>
      </a>
      <a href="#" class="block rounded-lg overflow-hidden bg-card hover:border-primary border border-gray-300 transition">
          <div class="h-32 bg-gray-100 bg-secondary/60 grid place-items-center border border-bottom border-gray-200 text-xs text-muted ">
            [ Yosemite photo ]
          </div>
      <div class="p-4">
            <div class="flex justify-between bg-white items-baseline">
              <h3 class="font-semibold">Yosemite</h3>
              <span class="text-xs text-muted">California</span>
            </div>
            <p class="text-sm text-muted mt-1">Granite cliffs, giant sequoias, and waterfalls.</p>
          </div>
      </a>
  </div>
  <Footer/>
  </div>
  
</template>