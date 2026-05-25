<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
const showSplash = ref(true);
const router = useRouter();

setTimeout(() => {
    showSplash.value = false;
    setTimeout(() => {
        router.push('/welcome')
    },500)
}, 2000);

</script>
<template>
    <Transition name = "fade">
        <div v-if = "showSplash" class = "min-h-screen bg-black flex justify-center items-center max-w-lvw mx-auto">
        <img src ="/splash.svg">
        </div>
    </Transition>
</template>
<style scoped>
.fade-leave-active {
    transition: opacity 0.5s ease;
}
.fade-leave-to {
    opacity: 20;
}
</style>