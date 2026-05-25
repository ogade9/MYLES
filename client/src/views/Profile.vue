<script setup>
/*import { RouterLink } from 'vue-router';
import {ref,onMounted} from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faUsers} from '@fortawesome/free-solid-svg-icons'

import { faPen } from "@fortawesome/free-solid-svg-icons";
import Icons from '@/components/Icons.vue';//import router from '@/router';
import { useRouter } from 'vue-router';
import { useUserStore } from "@/stores/user";
import { useInviteStore } from "@/stores/invites";
library.add(faBars, faUsers,faPen);
const userStore = useUserStore();
const inviteStore = useInviteStore();
console.log(inviteStore.excursionInvite)
const firstName = localStorage.getItem("firstName");
const lastName = localStorage.getItem("lastName");
const email = localStorage.getItem("email");
console.log(firstName)
const currentUser = localStorage.getItem("userId")
const isSideNavOpen = ref(false);
const trips = ref([]);
const excursions = ref([]);
const friendId = ref('');
console.log(firstName)
const invitations = JSON.parse(localStorage.getItem("excursionInvites")||'[]');
console.log(firstName)



//id to send for invite:680c636cf211241821ee8b2b

console.log(firstName)
console.log(currentUser)
const check1 = ref(false);
const abbr1 = ref('');
const abbr2 = ref('');

console.log(firstName)
 function nthSelector(){
  abbr1.value = firstName.charAt(0) || '';
  abbr2.value = lastName.charAt(0) || '';
 }
 onMounted(() => {
  nthSelector();

});

console.log(firstName)

function openSideNav(){
  isSideNavOpen.value= true;
}
function closeSideNav(){
  isSideNavOpen.value=false;
}
//console.log(firstName)

async function getTripById() {
  const token=localStorage.getItem("token");
  const tripIds =JSON.parse(localStorage.getItem("newtripIds"))
  let storedTripIds=tripIds
console.log(storedTripIds)

  for(let i =0;i<storedTripIds.length;i++){
    //console.log(id)
    const serverUrl= `https://excursions-api-server.azurewebsites.net/trip/${storedTripIds[i]}`;
    const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}` },
      };
    const response = await fetch(serverUrl,options);
    const data = await response.json();

        if(response.status==200){
            console.log("got ID")
            console.log(data)

        }
        else{
          console.log(response.status)
        }

  }
}
//console.log(firstName)
async function getTripByUserId() {
  const token=localStorage.getItem("token");




    const serverUrl= "https://excursions-api-server.azurewebsites.net/trips";
    const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}` },
      };
    const response = await fetch(serverUrl,options);
    const data = await response.json();

        if(response.status==200){
            console.log("got ID")
            console.log(data)
            if (Array.isArray(data.trips)) {
                trips.value = data.trips.map(trip => ({
                  tripId: trip._id,
                  tripName: trip.name,
                  tripDescription: trip.description,
                  tripStartDate: trip.startDate.replace(/T.*Z/, ""),
                  tripEndDate: trip.endDate.replace(/T.*Z/, ""),
                }));
              }
              else if (data.trip) {
              trips.value.push({
                tripId: data.trip._id,
                tripName: data.trip.name,
                tripDescription: data.trip.description,
                tripStartDate: data.trip.startDate.replace(/T.*Z/, ""),
                tripEndDate: data.trip.endDate.replace(/T.*Z/, ""),
              });

        }
        }

        else{
          console.log(response.status)
        }


}
console.log(firstName)
async function getExcursionByUserId() {
  const token=localStorage.getItem("token");
//  const tripIds =JSON.parse(localStorage.getItem("newtripIds"))
// "680c986d394aa86883410d8b"


    const serverUrl= "https://excursions-api-server.azurewebsites.net/excursions";
    const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}` },
      };
    const response = await fetch(serverUrl,options);
    const data = await response.json();

        if(response.status==200){
            console.log("got ID")
            console.log(data)
            if (Array.isArray(data.excursions)) {
                excursions.value = data.excursions.map(excursion => ({
                  excursiontrips: excursion.trips,
                  excursionName: excursion.name,
                  excursionDescription: excursion.description,
                  excursionId:excursion._id

                }));
              }
              else if (data.excursion) {
              excursions.value.push({
                excursiontrips: data.excursion.trips,
                excursionName: data.excursion.name,
                excursionDescription: data.excursion.description,
                excursionId:data.excursion._id

              });

        }
        console.log("excursions", excursions.value)
        }

        else{
          console.log(response.status)
        }


}
console.log(firstName)
async function getExcursionById() {
  const token=localStorage.getItem("token");
  const excursionIds =JSON.parse(localStorage.getItem("newexcursionIds"))
  let storedExcursionIds=excursionIds
  console.log(storedExcursionIds)

  for(let i =0;i<storedExcursionIds.length;i++){
    //console.log(id)
    const serverUrl= `https://excursions-api-server.azurewebsites.net/excursion/${storedExcursionIds[i]}`;
    const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}` },
      };
    const response = await fetch(serverUrl,options);
    const data = await response.json();

        if(response.status==200){
            console.log("got excursionID")
            console.log(data)
          //  const tripNames = data.excursion[0].trips.map(trip => trip.name)

        }
        else{
          console.log(response.status)
        }


  }
}
console.log(firstName)
async function deleteTripById(index) {
  const token=localStorage.getItem("token");
  const tripIds =JSON.parse(localStorage.getItem("newtripIds"))

  console.log("Trip ID at index", index, ":", tripIds[index]);

  console.log("here")
    const serverUrl= `https://excursions-api-server.azurewebsites.net/trip/${tripIds[index]}`;
    const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}` },
      };
    const response = await fetch(serverUrl,options);
      console.log("here")
        if(response.status==200){
            console.log("got ID")
            console.log("deleted")
            trips.value.splice(index, 1);
            tripIds.splice(index, 1);
            localStorage.setItem("newtripIds", JSON.stringify(tripIds));
            localStorage.setItem("tripIds", JSON.stringify(tripIds));



        }
        else{
          console.log(response.status)
        }


}
async function deleteExcursionById(index) {
  const token=localStorage.getItem("token");
  const excursionIds =JSON.parse(localStorage.getItem("newexcursionIds"))

  console.log("Trip ID at index", index, ":", excursionIds[index]);
  console.log("here")
    const serverUrl= `https://excursions-api-server.azurewebsites.net/excursion/${excursionIds[index]}`;
    const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}` },
      };
    const response = await fetch(serverUrl,options);
      console.log("here")
        if(response.status==200){
            console.log("got ID")
            console.log("deleted")
            excursions.value.splice(index, 1);
            excursionIds.splice(index, 1);
            localStorage.setItem("excursionIds", JSON.stringify(excursionIds));
            localStorage.setItem("newexcursionIds", JSON.stringify(excursionIds));


        }
        else{
          console.log(response.status)
        }


}
console.log(firstName)
async function sendExcursionInvite(index) {
  //inviteForm.value.style.display="block";
  const token = localStorage.getItem("token");
  const excursionIds =JSON.parse(localStorage.getItem("newexcursionIds"))
  console.log("Trip ID at index", index, ":", excursionIds[index]);
  const serverUrl= `https://excursions-api-server.azurewebsites.net/share/excursion/${excursionIds[index]}`
  const options = {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({friendId: friendId.value}),
  };
  const response = await fetch(serverUrl,options);
  const data = await response.json();

  if(response.ok){
    console.log(data)
  }
  else{
    console.log(response.status)
  }
}
console.log('invites', invitations)
function check(){
  if(currentUser==invitations.userId){
    check1.value = true;


  }
}
check()
onMounted (async() => {
  //getTripById();
  getExcursionByUserId();
  getTripByUserId();



})*/


</script>

<template>







</template>
<style scoped>
a{
  color: aliceblue;
}
.accept{
  position: relative;
  top:-60px;
  margin-left: 80%;
  cursor: pointer;
}
.accept:hover{
  color: #81b7cd;
}
.decline{
  position: relative;
  top:-77px;
  margin-left: 95%;
  cursor: pointer;
}
.decline:hover{
  color: red;
}
.delete2{
    position: relative;
    color:white;
    top:0px;
    left: 95%;

}
.received {
  background-color: transparent;
  backdrop-filter: blur(5px);
  color: aliceblue;
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-left: 10px;
  height: 40px;
  margin-bottom: 100px;
  position: relative;
}

.received h2 {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: aliceblue;
  position: relative;
  top:-30px;
}

.received > div > div {
  background-color: rgb(41, 38, 38);
  border: 1px solid white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.received p {
  margin: 0;
  font-size: 18px;
  color:aliceblue;
  position: relative;
  top: -50px;
  text-transform: capitalize;
  font-weight: bolder;

}


.invites p{
  text-transform: capitalize;
  margin-left: 20px;
  position: relative;
  font-weight: bolder;
  top: 15px;
}
.invitations{
  height:50px;
  width: 70%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  position: relative;
  bottom: 50px;
}
.body{
  background-image: url("https://i.pinimg.com/736x/8f/49/ec/8f49ec216bb710291efad0443fec67b2.jpg");
  height: 100%;
  background-size: cover;
  background-position: center;
  width: 100%;
  background-repeat: no-repeat;
  position:fixed;
  padding-left: 10px;
  margin-left: -10px;
  margin-top: -10px;
  margin-bottom: -2px;


}

.tripfix{
  position: relative;
  top: -70px;

}
.account{
  margin-left: 20px;
}
.logo{
  color: white;
  width: 150px;
  margin-left: 55%;
  margin-top: -90px;
  position: relative;
}
.section{
  border-bottom: 1px solid aliceblue;
}
.profileName{
  text-transform: capitalize;
  margin-top: 0px;
  font-size: 23px;
  text-align: center;

}
.profileEmail{
  margin-top: 10px;
  margin-left: 0px;
  color: rgb(23, 22, 22);
  text-align: center;

}
.sidenav{

  height: 80%;
  width: 290px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  backdrop-filter: blur(10px);
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  transition: 0.5s;
  padding-top: 60px;



}
.sidenav::-webkit-scrollbar {
    display: none;
}
.share{
  position: relative;
  left: 100%;
  top:-9px;
}
.share:hover{
  color: #81b7cd;
}

.sidenav a{
  margin-top: 20px;
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color:black;
  display: block;
  border-bottom: 1px solid white;
  transition: 0.3s;
  margin-left: 5px;

}
.sidenav a:hover {
  color: #81b7cd;
}
.profile-container {
  font-family: 'Arial', sans-serif;
  height: 40px;
  top: 20px;
  position: relative;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 10px;
}
.header-icons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.icon-box {
  font-size: 30px;
  color: #45729c;
  cursor: pointer;
  transition: transform 0.3s ease, color 0.3s ease;
}

.icon-box:hover {
  transform: scale(1.1);
  color: #0056b3;
}
.welcome-message {
  font-size: 38px;
  color: aliceblue;
  text-align: center;
  margin-bottom: 10px;
}

.profile-abbr {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  font-weight: bold;
  color: #8299b1;
  margin-bottom: 20px;
  background-color: #212424;
  height: 150px;
  width: 150px;
  justify-self: center;
  border-radius: 50%;
  text-transform: uppercase;


}
.profile-abbr2 {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  color: #b7babd;
  margin-bottom: 20px;
  background-color: #212424;
  height: 60px;
  width: 60px;
  justify-self: center;
  border-radius: 50%;
  text-transform: uppercase;
  justify-self: start;
  margin-top: -90px;
  margin-left: 20px;


}
.edit-icon {
  display: flex;
  align-items: center;
  top: -60px;
  margin-left: 200px;
  position: relative;
  font-size: 24px;
  padding: 10px;
  border-radius: 50%;
  color: rgb(27, 28, 28);
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.edit-icon:hover {
  color: #0056b3;
}
.profileTrips {
  text-align: center;
  font-size: 22px;
  color:aliceblue;
  margin-top: 20px;
}
.trips-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
}

.trips-line {
  width: 20px;
  height: 2px;
  background-color: #5c6a7a;
  margin: 0 5px;
}
.icon-box span {
  font-size: 12px;
  color: #080909;
  display: block;
  text-align: center;
  margin-top: 5px;
}
.logout{
  color: blue;
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  display: block;
  border-bottom: 1px solid white;
  transition: 0.3s;
  margin-left: 5px;
  margin-top: 20px;
}
.logout:hover {
  color: #81b7cd;
  cursor: pointer;
}
.delete1{
  color: rgb(116, 22, 22);
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  display: block;
  border-bottom: 1px solid white;
  transition: 0.3s;
  margin-left: 5px;
  margin-top: 20px;

}
.delete1:hover {
  color: #81b7cd;
  cursor: pointer;
}
.delete{
  font-size: 20px;
  color: rgb(240, 237, 237);
  position: relative;
  left: 70%;
  margin-top: -10px;
  padding: 8px 8px 8px 32px;
}
.delete:hover {
  color: #81b7cd;
  cursor: pointer;
}
.createTrips{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #81b7cd;
  border-radius: 10px;
  height:50px;
  width:200px;
  text-align: center;
  justify-self: center;
  font-size: 20px;
  margin-bottom: 10px;


}
.createTrips:hover{
  color: #333;

}
.trips {
  background-color: transparent;
  backdrop-filter: blur(5px);
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  padding: 16px 20px;
  margin: 10px 0;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.05);
  height: 40px;
  max-width: 80%;
  transition: box-shadow 0.3s ease;
  margin-left: 10px;
  display: block;

}

.trips:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

}

.tripname {
  font-size: 25px;
  text-transform: capitalize;
  font-weight: bold;
  margin-bottom: -20px;
  color: aliceblue;
}

.tripdescription {
  font-size: 16px;
  color: #666;
  margin-bottom: 0px;
}

.tripDates {
  font-size: 14px;
  color: #999;
}
.trip-container{
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  padding: 16px;

}






</style>
