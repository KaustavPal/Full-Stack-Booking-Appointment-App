const name = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const date = document.querySelector("#date");
const time = document.querySelector("#time");
const addBtn = document.querySelector("#add-btn");
const userList = document.querySelector("#user-list");
const deleteBtn = document.querySelector("#deleteBtn");

function showUser(response) {
  response.forEach((user) => {
    let li = document.createElement("li");
    li.id = user.id;
    li.innerHTML = `${user.name} - ${user.email} - ${user.phone} - ${user.date} - ${user.time} - <button id="deleteBtn" class="deleteBtn btn btn-danger" onclick="deleteUser('${user.id}')">Delete</button>`;
    userList.appendChild(li);
  });
}

async function deleteUser(id) {
  try {
    let li = document.getElementById(id);
    await axios.get(`http://localhost:3000/user/appointment/deleteUser/${id}`);
    userList.removeChild(li);
  } catch (err) {
    console.log(err);
  }
}

async function getAllUsers() {
  try {
    const res = await axios.get(
      "http://localhost:3000/user/appointment/user-data"
    );
    const response = res.data;
    showUser(response);
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener("DOMContentLoaded", getAllUsers);
