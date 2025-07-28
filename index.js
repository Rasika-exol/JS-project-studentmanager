document
  .getElementById("student-form")
  .addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();
  const studentDetails = {
    name: event.target.name.value,
    mobile: event.target.mobile.value,
    address: event.target.address.value,
  };
  axios
    .post(
      "https://crudcrud.com/api/bc3dcff297684fb8b88b6ffaa5952ca6/students",
      studentDetails
    )
    .then((response) => {
      displayStudent(response.data);
      updateStudentCount();
    })
    .catch((error) => console.log(error));

  document.getElementById("name").value = "";
  document.getElementById("mobile").value = "";
  document.getElementById("address").value = "";
}

function displayStudent(student) {
  const li = document.createElement("li");
  li.textContent = `${student.name} ${student.mobile} ${student.address} `;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {
    axios
      .delete(
        `https://crudcrud.com/api/bc3dcff297684fb8b88b6ffaa5952ca6/students/${student._id}`
      )
      .then(() => {
        li.remove();
        updateStudentCount();
      })
      .catch((err) => console.log(err));
  };
  li.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = () => {
    document.getElementById("name").value = student.name;
    document.getElementById("mobile").value = student.mobile;
    document.getElementById("address").value = student.address;
    axios
      .delete(
        `https://crudcrud.com/api/bc3dcff297684fb8b88b6ffaa5952ca6/students/${student._id}`
      )
      .then(() => {
        li.remove();
        updateStudentCount();
      })
      .catch((err) => console.log(err));
  };
  li.appendChild(editBtn);

  document.getElementById("student-list").appendChild(li);
}

function updateStudentCount() {
  axios
    .get("https://crudcrud.com/api/bc3dcff297684fb8b88b6ffaa5952ca6/students")
    .then((res) => {
      document.getElementById("student-count").textContent = res.data.length;
    });
}

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/bc3dcff297684fb8b88b6ffaa5952ca6/students")
    .then((response) => {
      document.querySelector("ul").innerHTML = "";
      for (let i = 0; i < response.data.length; i++) {
        displayStudent(response.data[i]);
      }
      updateStudentCount();
    })
    .catch((error) => console.log(error));
});
