//const { editUser } = require("../../controllers/user");

const uName = document.querySelector("#name");
const uEmail = document.querySelector("#email");
const uPhone = document.querySelector("#phone");
const uDate = document.querySelector("#date");
const uTime = document.querySelector("#time");
const addBtn = document.querySelector("#add-btn");
const userList = document.querySelector("#user-list");
const deleteBtn = document.querySelectorAll("#delete-btn");
const editBtn = document.querySelectorAll("#edit-btn");
const updateBtn = document.querySelector("#update-btn");
const cancelBtn = document.querySelector("#cancel-btn");
let updateId = null;

addBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const name = uName.value;
  const email = uEmail.value;
  const phone = uPhone.value;
  const date = uDate.value;
  const time = uTime.value;

  try {
    await axios.post("http://localhost:3000/user/appointment", {
      name,
      email,
      phone,
      date,
      time,
    });

    uName.value = "";
    uEmail.value = "";
    uPhone.value = "";
    uDate.value = "";
    uTime.value = "";

    await getAllUsers();
  } catch (err) {
    console.error("Error while adding User Details:", err);
  }
});

async function editUser(id) {
  try {
    let editId = id;
    updateId = id;
    const response = await axios.get(
      `http://localhost:3000/user/appointment/getUser/${editId}`
    );
    const userToEdit = response.data;

    if (!userToEdit) {
      console.error("User not found");
      return;
    }

    uName.value = userToEdit.name;
    uEmail.value = userToEdit.email;
    uPhone.value = userToEdit.phone;
    uDate.value = userToEdit.date;
    uTime.value = userToEdit.time;

    updateBtn.style.display = "inline-block";
    cancelBtn.style.display = "inline-block";
    addBtn.style.display = "none";
  } catch (err) {
    console.log(err);
  }
}

updateBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const nameToUpdate = uName.value;
  const emailToUpdate = uEmail.value;
  const phoneToUpdate = uPhone.value;
  const dateToUpdate = uDate.value;
  const timeToUpdate = uTime.value;

  try {
    const response = await axios.get(
      `http://localhost:3000/user/appointment/getUser/${updateId}`
    );
    if (response.data) {
      await axios.put(
        `http://localhost:3000/user/appointment/editUser/${updateId}`,
        {
          name: nameToUpdate,
          email: emailToUpdate,
          phone: phoneToUpdate,
          date: dateToUpdate,
          time: timeToUpdate,
        }
      );

      uName.value = "";
      uEmail.value = "";
      uPhone.value = "";
      uDate.value = "";
      uTime.value = "";

      updateBtn.style.display = "none";
      cancelBtn.style.display = "none";
      addBtn.style.display = "inline-block";

      updateId = null;

      await getAllUsers();
    } else {
      console.log("Error: User not found");
      uName.value = "";
      uEmail.value = "";
      uPhone.value = "";
      uDate.value = "";
      uTime.value = "";

      updateBtn.style.display = "none";
      cancelBtn.style.display = "none";
      addBtn.style.display = "inline-block";

      updateId = null;
    }
  } catch (err) {
    console.error("Error while adding User Details:", err);
  }
});

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();

  uName.value = "";
  uEmail.value = "";
  uPhone.value = "";
  uDate.value = "";
  uTime.value = "";

  updateBtn.style.display = "none";
  cancelBtn.style.display = "none";
  addBtn.style.display = "inline-block";

  updateId = null;
});

function showUser(response) {
  userList.innerHTML = "";
  response.forEach((user) => {
    let li = document.createElement("li");
    li.id = user.id;
    li.innerHTML = `${user.name} - ${user.email} - ${user.phone} - ${user.date} - ${user.time} - <button id="delete-btn" class="delete-btn btn btn-danger" onclick="deleteUser('${user.id}')">Delete</button> <button id="edit-btn" class="edit-btn btn btn-primary" onclick="editUser('${user.id}')">Edit</button>`;
    userList.appendChild(li);
  });
}

async function deleteUser(id) {
  try {
    let li = document.getElementById(id);
    await axios.delete(
      `http://localhost:3000/user/appointment/deleteUser/${id}`
    );
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
