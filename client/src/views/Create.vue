<script setup>
import {ref} from 'vue';
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebase";
import {useRouter} from 'vue-router'
const password = ref('');
const errorMessage = ref([]);
const fullname = ref('');
const email = ref('');
const username = ref('');
const router = useRouter();
const postUrl = "https://myles-hdjv.onrender.com/api/user"
//this is my url for my serevr

function validatePassword(){
  const length = 8;
  const hasUpperCase = (password) => /[A-Z]/.test(password);
  const hasLowerCase = (password) => /[a-z]/.test(password);
  const hasNumber = (password) => /\d/.test(password);
  const hasSpecialCharacter = (password) => /[@$!_]/.test(password);
  if(password.value.length < 8){
     errorMessage.value.push("Password is less than 8 characters")
     console.log("what?");
  }
  if(hasUpperCase(password.value) == false){
    errorMessage.value.push("Password needs at least one UpperCase letter")
  }
  if(hasLowerCase(password.value) == false){
    errorMessage.value.push("Password needs at least one LowerCase letter")
  }
  if(hasNumber(password.value) == false){
    errorMessage.value.push("Password needs a numerical character")
  }
  if(hasSpecialCharacter(password.value) == false){
    errorMessage.value.push("Password need to have at least one special character e.g '@$!_'")
  }
  if(errorMessage.value.length == 0){
    createUserWithEmailAndPassword(auth,email.value,password.value).then((userCredential) => {
    const user = userCredential.user
    postUserData(postUrl,{
    userId :  user.uid,
    fullname : fullname.value,
    email : email.value,
    username : username.value,})
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
  })
}
    router.push('/signin')
  
  
}
async function postUserData(url="", data={}){
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!(response.ok)){
    throw new Error(`Response status: ${response.status}`)
  }
  return response.json();
}




</script>

<template>
<nav>
</nav>
<div class="min-h-screen flex items-center justify-center bg-stone-50 px-4">
  <div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg py-20">
    <h2 class="text-2xl font-bold">Create your account</h2>
    <p class= "text-gray-500">Start planning in under a minute.</p>
    <form class="space-y-5 mt-8"  @submit.prevent="validatePassword">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="fullname" >Full name</label>
        <input class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200" type="text" placeholder="John Doe" id="fullname" v-model = "fullname" name="fullname" autocomplete="off">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email" >Email</label>
        <input class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200" v-model = "email" type="email" placeholder="john@gmail.com" id="email" name="email" autocomplete="off">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username" >Username</label>
        <input class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200" type="text" placeholder="@johndoe" id="username" name="username" v-model= "username" autocomplete="off">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password" minlength = 8 >Password</label>
        <input class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200" type="password" placeholder="" id="password" name="password" v-model="password" autocomplete="off">
      </div>
      <div class="mb-4">
        <input class="w-full bg-green-900 cursor-pointer hover:bg-opacity-20 rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200" type="submit" value="Create Account" >
      </div>
      <li v-for=" item in errorMessage" class="text-red-500">{{item}}</li>
    </form>
    <div class="flex flex-row gap-2 justify-center" >
    <p class="text-gray-500">Already have an account?</p>
    <RouterLink to="/signin" class="text-blue-500 underline">Sign in</RouterLink>
    </div>
  </div>

</div>


</template>