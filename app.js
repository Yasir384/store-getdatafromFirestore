import {
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { db } from "./config.js";

const form = document.querySelector("#form");
const tittle = document.querySelector("#tittle");
const description = document.querySelector("#description");
const div = document.querySelector(".container");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log(tittle.value);
  console.log(description.value);
  try {
    const docRef = await addDoc(collection(db, "todos"), {
      tittle: tittle.value,
      description: description.value,
    });
    console.log("Document written with ID: ", docRef.id);
    tittle.value = "";
    description.value = "";
    
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

const arr = [];
async function getData() {
  const querySnapshot = await getDocs(collection(db, "todos"));
  querySnapshot.forEach((doc) => {
    arr.push({ id: doc.id, ...doc.data() }); 
  });
  console.log(arr); 
  renderData(); 
}

function renderData() {
  div.innerHTML = ""; 
  arr.forEach((item) => {
    div.innerHTML += `
    <div class="box">
            <p>id: ${item.id}</p>
            <p>Title: ${item.tittle}</p>
            <p>Description: ${item.description}</p>
    </div>`
  });
}

getData();

