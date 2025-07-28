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

  displayStudent(studentDetails);

  document.getElementById("name").value = "";
  document.getElementById("mobile").value = "";
  document.getElementById("address").value = "";
}

function displayStudent(student) {
  const li = document.createElement("li");
  li.textContent = `${student.name} ${student.mobile} ${student.address}`;
  document.getElementById("student-list").appendChild(li);
}
