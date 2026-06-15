
<script setup>
</script>
<template>
 
   <div class=" min-h-screen flex flex-col"> 
    <!-- Hero Image -->
    <div class="w-full h-75 bg-gray-100 flex items-center justify-center">
      <span class="text-gray-400 text-sm">[ Hero image ]</span>
    </div>
    <div class="flex flex-col text-center items-center py-5">
      <h1 class = "text-3xl font-bold text-pink-400">Plan parks. Together</h1>
      <p>Discover national parks, build excursions, and share trip with your friends</p>

    <div class = "flex flex-row gap-4 mt-4">
      <RouterLink to="/create">
        <button class=" bg-pink-500 text-white text-center hover:bg-green-400 cursor-pointer  py-3 px-5 rounded">Create Account</button>
      </RouterLink>
      <RouterLink to="/signin">
        <button class= "bg-white text-black text-center hover:bg-pink-500 py-3 px-3 cursor-pointer border border-gray-300 rounded">Sign in</button>
      </RouterLink>
    </div>
    <main>
      <RouterView/>
    </main>
    <RouterLink to="/homepage" class="text-gray-400 text-sm mt-20 underline" >Skip → explore parks</RouterLink>
    </div>
  </div>
</template>