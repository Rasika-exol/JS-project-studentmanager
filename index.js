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
      "https://crudcrud.com/api/27fc1f00087d4954a6f1b4804dbaea3e/students",
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
        `https://crudcrud.com/api/27fc1f00087d4954a6f1b4804dbaea3e/students/${student._id}`
      )
      .then(() => {
        li.remove();
        updateStudentCount();
      })
      .catch((err) => console.log(err));
  };
  li.appendChild(deleteBtn);

  document.getElementById("student-list").appendChild(li);
}

function updateStudentCount() {
  axios
    .get("https://crudcrud.com/api/27fc1f00087d4954a6f1b4804dbaea3e/students")
    .then((res) => {
      document.getElementById("student-count").textContent = res.data.length;
    });
}

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/27fc1f00087d4954a6f1b4804dbaea3e/students")
    .then((response) => {
      document.querySelector("ul").innerHTML = "";
      for (let i = 0; i < response.data.length; i++) {
        displayStudent(response.data[i]);
      }
      updateStudentCount();
    })
    .catch((error) => console.log(error));
});
