//Tabulating data in postcourse

const tablebody1 = document.querySelector("#tablebody1");
const tablebody2 = document.querySelector("#tablebody2");
function populateTable(data, id) {
  id.innerHTML = "";
  data.forEach((element) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${element.name}</td >
        <td>${element.code}</td>
        <td>${element.capacity}</td>
        <td>${element.graded ? "Graded ✅" : "Non-Graded ❌"}</td>
        <td>${element.credits}</td>`;
    id.appendChild(row);
  });
}

//taking values and appending the data to the table
// const postButton = document.getElementById('post-button');
function append() {
  const name = document.getElementById("input-name").value;
  const code = document.getElementById("input-code").value;
  const capacity = document.getElementById("input-capacity").value;
  const credits = document.getElementById("input-credits").value;
  const graded = document.getElementById("input-grade").value;
  console.log(name);
  console.log(code);
  console.log(credits);
  console.log(capacity);
  console.log(graded);
  if (
    name == "" ||
    code == "" ||
    capacity == "" ||
    credits == "" ||
    graded == ""
  ) {
    alert("Fill all the applicable sections");
    return false;
  } else {
    const row = {
      name,
      code,
      capacity,
      credits,
      graded,
    };
    availabledata.push(row);
    const tablebody1 = document.querySelector("#tablebody1");
    tablebody1.innerHTML = "";
    populateTable(availabledata, tablebody1);
    return false;
  }
}

function populateDropdowns(id, data) {
  const toPopulate = document.getElementById(id);
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "-- Select a course --";
  toPopulate.appendChild(defaultOption);
  data.forEach((course) => {
    const option = document.createElement("option");
    option.value = course.name;
    option.text = course.name;
    toPopulate.appendChild(option);
  });
}

// // Populating data in Registered course
// Dropdown
// Table

const tablebody3 = document.querySelector("#tablebody3");
function populateRegisteredTable(data) {
  const selectedOption = document.getElementById("register-select").value;
  // Clear previous content from the table
  tablebody3.innerHTML = "";

  data.forEach((element) => {
    if (element.courseName == selectedOption) {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${element.registrationNumber}</td >
          <td>${element.studentName}</td>
          <td>${element.courseName}</td>
          <td>${element.Slot}</td>
          <td>${element.credits}</td>`;
      tablebody3.appendChild(row);
    }
  });
}

function igniteRegisteredTable() {
  populateRegisteredTable(studentData);
}

//Deletion of the courses
const deleteButton = document.querySelector("#delete-button");
const deleteSelect = document.querySelector("#delete-select");

deleteButton.addEventListener("click", function () {
  const value = deleteSelect.value;
  availabledata = availabledata.filter((course) => course.name !== value);
  studentData = studentData.filter((course) => course.courseName !== value);
  console.log(studentData);
  tablebody2.innerHTML = "";
  populateTable(availabledata, tablebody2);
  document.getElementById("delete-select").innerHTML = "";
  populateDropdowns("delete-select", availabledata);
  alert(`Deleted the course "${value}", successfully`);
});

//Menu button handlers
one = document.getElementById("one");
two = document.getElementById("two");
three = document.getElementById("three");
intro = document.getElementById("intro");

document
  .getElementById("post_new_course")
  .addEventListener("click", function () {
    populateTable(availabledata, tablebody1);
    one.classList = `post-course`;
    two.classList = `delete-course hidden`;
    three.classList = `registered-users hidden`;
    intro.classList = `intro-course hidden`;
  });
document.getElementById("delete_course").addEventListener("click", function () {
  tablebody2.innerHTML = "";
  document.getElementById("delete-select").innerHTML = "";
  //Populating table whenever menu button is clicked
  populateTable(availabledata, tablebody2);
  //Populating dropdowns whenever menu button is clicked
  populateDropdowns("delete-select", availabledata);
  one.classList = `post-course hidden`;
  two.classList = `delete-course `;
  three.classList = `registered-users hidden`;
  intro.classList = `intro-course hidden`;
});
document
  .getElementById("registered_users")
  .addEventListener("click", function () {
    tablebody3.innerHTML = "";
    document.getElementById("register-select").innerHTML = "";
    populateDropdowns("register-select", availabledata);
    one.classList = `post-course hidden`;
    two.classList = `delete-course hidden`;
    three.classList = `registered-users `;
    intro.classList = `intro-course hidden`;
  });

//Goback
function goback() {
  window.location.href = "../loginConnector.html";
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
//animation
const loggedinSpan = document.querySelector(".loggedinas");
setTimeout(() => {
  loggedinSpan.classList.add("active");
}, 150);
