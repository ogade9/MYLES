<script setup>
import { HugeiconsIcon } from '@hugeicons/vue'
import { Home01Icon } from '@hugeicons/core-free-icons'
import { Search01Icon } from '@hugeicons/core-free-icons'
import { Bus03Icon } from '@hugeicons/core-free-icons'
import { Backpack01Icon } from '@hugeicons/core-free-icons'
import { AddTeamIcon } from '@hugeicons/core-free-icons'
import { UserIcon } from '@hugeicons/core-free-icons'
</script>
<template>
<nav class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full flex flex-row justify-center item-center bg-card bg-white border-t border-gray-200">
      <ul class="grid grid-cols-6 gap-4 text-sm">
        <li><a href="#" class="flex flex-col items-center gap-1 py-3 text-primary font-medium"><HugeiconsIcon :icon="Home01Icon" class="text-pink-400" /><span>Home</span></a></li>
        <li><a href="#" class="flex flex-col items-center gap-1 py-3 text-primary font-medium"><HugeiconsIcon :icon="Search01Icon" class="text-pink-400" /><span>Search</span></a></li>
        <li><a href="#" class="flex flex-col items-center gap-1 py-3 text-primary font-medium"><HugeiconsIcon :icon="Bus03Icon" class="text-pink-400"/><span>Excursions</span></a></li>
        <li><a href="#" class="flex flex-col items-center gap-1 py-3 text-primary font-medium"><HugeiconsIcon :icon="Backpack01Icon" class="text-pink-400"/><span>Trips</span></a></li>
        <li><a href="#" class="flex flex-col items-center gap-1 py-3 text-primary font-medium"><HugeiconsIcon :icon="AddTeamIcon" class="text-pink-400" /><span>Invites</span></a></li>
        <li><a href="#" class="flex flex-col items-center gap-1 py-3 text-primary font-medium"><HugeiconsIcon :icon="UserIcon" class="text-pink-400"/><span>Profile</span></a></li>
      </ul>
    </nav>
</template>