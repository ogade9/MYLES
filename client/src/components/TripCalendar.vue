<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import {ref} from 'vue'
const emit = defineEmits(['close','updateDates'])
const startstring = ref('')
const endstring = ref('')


function close() {
  emit('updateDates', {
  start: startstring.value,
  end: endstring.value
})
  emit('close')
}


const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],

  initialView: 'dayGridMonth',

  selectable: true,

  headerToolbar: {
    left: 'prev,next',
    center: 'title',
    right: ''
  },
  dateClick(info){

    if(startstring.value == ''){
    startstring.value = new Date(info.dateStr + 'T00:00:00').toLocaleDateString(
      'en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
  }
    )
    console.log('Start Date:', startstring.value)
    }
    else if(startstring.value != '' && endstring.value == ''){
      endstring.value =new Date(info.dateStr + 'T00:00:00').toLocaleDateString(
          'en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
      console.log('End Date:', endstring.value)
      close()


    }

  }



}

</script>

<template>

  <!-- Overlay -->
  <div
    class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
    @click.self="close"
  >

    <!-- Modal -->
    <div
      class="bg-white w-[90%] max-w-3xl rounded-3xl p-6 shadow-2xl"
    >

      <!-- Header -->
      <div class="flex items-center justify-between mb-5">

        <h2 class="text-2xl font-bold text-gray-800">
          Select Trip Dates
        </h2>

        <button
          @click="close"
          class="w-10 h-10 rounded-full bg-pink-100 text-pink-500"
        >
          ✕
        </button>

      </div>
      
      <!-- Calendar -->
      <FullCalendar :options="calendarOptions" />

    </div>

  </div>

</template>

<style>
.fc {
  font-family: inherit;
}

.fc-toolbar-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #374151;
}

.fc-button {
  background: #f472b6 !important;
  border: none !important;
  border-radius: 14px !important;
  padding: 8px 14px !important;
}

.fc-button:hover {
  background: #ec4899 !important;
}

.fc-daygrid-day:hover {
  background: #fdf2f8;
  cursor: pointer;
}

.fc-highlight {
  background: rgba(244, 114, 182, 0.2) !important;
}

.fc-theme-standard td,
.fc-theme-standard th,
.fc-theme-standard .fc-scrollgrid {
  border-color: #f3f4f6;
}

.fc-daygrid-day-number {
  color: #374151;
  font-weight: 500;
}

.fc-col-header-cell-cushion {
  color: #9ca3af;
  font-weight: 600;
  text-decoration: none;
}

.fc .fc-button:focus {
  box-shadow: none !important;
}
</style>