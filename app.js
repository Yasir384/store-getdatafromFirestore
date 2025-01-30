import {collection, addDoc, getDocs,query,orderBy,Timestamp, doc, deleteDoc,updateDoc} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
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
      time: Timestamp.fromDate(new Date())
    });
    console.log("Document written with ID: ", docRef.id);
    tittle.value = "";
    description.value = "";
    getData()
   
    
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

const arr = [];
async function getData() {
  arr.length=0;
  const q = query(collection(db, "todos"), orderBy("time", "asc"));
  const querySnapshot = await getDocs(q);
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
    <p>Title: ${item.tittle}</p>
    <p>Description: ${item.description}</p>
    <p>Time: ${new Date(item.time.seconds * 1000).toLocaleString()}</p>
    <div class="stylebtn">
    <button class="delBtn">delete</button>
    <button class="editBtn">edit</button>
    </div>
    </div>`
  });
  const delBtn=document.querySelectorAll('.delBtn');
  const editBtn=document.querySelectorAll('.editBtn');

  delBtn.forEach((btnn , index)=>{
    btnn.addEventListener('click', async () => {
      console.log(arr[index]);
      await deleteDoc(doc(db, "todos", arr[index].id));
      console.log("Data deleted");
      arr.splice(index, 1);
      renderData();
      // console.log(arr);
      
      
    })
    
  })

  editBtn.forEach((edit,index)=>{
    edit.addEventListener('click',async () => {
      console.log(arr[index]);
      const updatedNewValue = prompt("enter new new description");
      const todoUpdated = doc(db, "todos", arr[index].id);
      await updateDoc(todoUpdated, { description:updatedNewValue});
      console.log("update todo");
      arr[index].description = updatedNewValue;
      renderData();
      
      
    })
  })
}

getData();





