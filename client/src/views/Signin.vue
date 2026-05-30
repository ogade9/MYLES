<script setup>
import {ref} from 'vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase"
import {useRouter} from 'vue-router'
const email = ref('');
const password = ref('');
const verify = ref('')
const router = useRouter();
const url = "https://myles-hdjv.onrender.com/api/user/signin"
function signIn(){
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      router.push('/homepage')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      verify.value = "Invalid email or password!"
    });
}
</script>
<template>
<nav>
</nav>
<div class="min-h-screen flex items-center justify-center bg-stone-50 px-4">
  <div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg py-20">
    <h2 class="text-2xl font-bold">Welcome back</h2>
    <p class= "text-gray-500">Sign in to keep planning.</p>
    <div class="mb-8">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password" minlength = 8 ></label>
        <div class="w-full text-center font-bold text-text-sm rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200">Sign in with Google</div>
    </div>
    <div class="flex">
        <div class="text-center w-full font-bold text-text-sm border-t border-gray-300 px-4 mt-3 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"></div>
        <span class="text-center rounded-lg px-1 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200">OR</span>
        <div class="w-full border-t mt-3 border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"></div>

    </div>
    <form class="space-y-5 mt-8"  @submit.prevent="signIn">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email" >Email</label>
        <input class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200" v-model = "email" type="email" placeholder="john@gmail.com" id="email" name="email" autocomplete="off">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password" minlength = 8 >Password</label>
        <input class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200" type="password" placeholder="" id="password" name="password" v-model="password" autocomplete="off">
      </div>
      <div class="mb-4">
        <input class="w-full bg-green-900 cursor-pointer hover:bg-opacity-20 rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200" type="submit" value="Sign in" >
      </div>
      <p  class="text-red-500 text-sm text-bold" v-bind="verify">{{verify}}</p>
    </form>
    <div class="flex flex-row gap-2 justify-center" >
    <p class="text-gray-500">New here?</p>
    <RouterLink to="/create" class="text-blue-500 underline">Create account</RouterLink>
    </div>
  </div>

</div>


</template>
