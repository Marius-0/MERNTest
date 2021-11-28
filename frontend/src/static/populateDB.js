//import axios from "axios";

const noOfUsers = 10;
const seed = "frae";
const url = `https://randomuser.me/api/?results=${noOfUsers}&seed=${seed}`;

function populateUsers() {
  console.log("Hello Sir");
  fetch(url).then((res) => console.log(res));
  var Users = [];
}

populateUsers();
