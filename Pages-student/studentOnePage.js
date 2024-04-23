const tablebody11 = document.querySelector("#tablebody11");
const tablebody12 = document.querySelector("#tablebody12");
const tablebody13 = document.querySelector("#tablebody13");
const tablebody14 = document.querySelector("#tablebody14");
const tablebody15 = document.querySelector("#tablebody15");
const intro = document.getElementById("intro");
//1. My courses
function populateStudentTable(data, id) {
  id.innerHTML = "";
  data.forEach((element) => {
    const row = document.createElement("tr");
    if (element.studentName === "Ava Stewart") {
      row.innerHTML = `<td>${element.courseName}</td >
        <td>${element.courseCode}</td>
        <td>${element.graded ? "Graded ✅" : "Non-Graded ❌"}</td>
        <td>${element.credits}</td>`;
      if (element.paid == "no") {
        row.classList.add("messageColorAdderRed");
      }
      id.appendChild(row);
    }
  });
}

//2. Register course ( to pass available data)
function populateRegisterTable(id) {
  id.innerHTML = "";
  //Duplicate data
  let MatchingCourses = [...AllCourses];
  studentData.forEach((item) => {
    if (item.studentName == "Ava Stewart") {
      if (MatchingCourses.includes(item.courseName)) {
        MatchingCourses = MatchingCourses.filter(
          (course) => course !== item.courseName
        );
      }
    }
  });
  //Now you will get unregistered courses over here( only names)
  //Do print out the details of the unregistered courses in the table
  let Toprintcourses = availabledata.filter((course) =>
    MatchingCourses.includes(course.name)
  );
  console.log(Toprintcourses);
  populateDropdownsreg("register-select", Toprintcourses);
  //NOw you got all the objects to get it printed
  Toprintcourses.forEach((element) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${element.name}</td >
        <td>${element.code}</td>
        <td>${element.capacity}</td>
        <td>${element.graded ? "Graded ✅" : "Non-Graded ❌"}</td>
        <td>${element.credits}</td>`;
    id.appendChild(row);
  });
}

function registerCourse() {
  const value = document.querySelector("#register-select").value;
  const object = {
    studentName: "Ava Stewart",
    registrationNumber: "REG018",
    slot: "X2",
    credits: 2,
    graded: "Graded ✅",
    courseName: value,
    courseCode: AllCoursesKeyValuePair[value],
    paid: "no",
  };
  studentData.push(object);
  AvaStewartRegisteredCourses.push(object);
  paymentRegisteredCourses = alert(
    `Successfully Registered the course: ${value}. Pay the amount in payments section to get the further details`
  );
  populateRegisterTable(tablebody12);
  return false;
}

function populateDropdownsreg(id, data) {
  const toPopulate = document.getElementById(id);
  toPopulate.innerHTML = "";
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
} //(checked)

//3. Delete course
function populateDeletionTable(data, id) {
  console.log(AvaStewartRegisteredCourses);
  id.innerHTML = "";
  data.forEach((element) => {
    const row = document.createElement("tr");
    if (element.studentName === "Ava Stewart") {
      row.innerHTML = `<td>${element.courseName}</td >
      <td>${element.courseCode}</td>
      <td>${element.credits}</td>`;
      id.appendChild(row);
    }
  });
  populateDropdownsdel("drop-select", data);
}

function populateDropdownsdel(id, data) {
  const toPopulate = document.getElementById(id);
  toPopulate.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "-- Select a course --";
  toPopulate.appendChild(defaultOption);

  data.forEach((course) => {
    const option = document.createElement("option");
    option.value = course.courseName;
    option.text = course.courseName;
    toPopulate.appendChild(option);
  });
}

function dropCourse() {
  const value = document.querySelector("#drop-select").value;
  const studentName = "Ava Stewart";

  AvaStewartRegisteredCourses = AvaStewartRegisteredCourses.filter(
    (item) => item.courseName !== value
  );
  studentData = studentData.filter(
    (item) => !(item.studentName === studentName && item.courseName === value)
  );
  alert("Course Deleted Successfully!!");
  console.log(studentData);
  populateDeletionTable(AvaStewartRegisteredCourses, tablebody13);
  return false;
}

//page-4
function populateCompletionTable(data, id) {
  id.innerHTML = "";
  data.forEach((element) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${element.courseName}</td >
        <td>${element.courseCode}</td>
        <td>${element.grade}</td>
        <td>${element.creditsEarned}</td>`;
    id.appendChild(row);
  });
}

populateCompletionTable(AvaStewartCompletedCourses, tablebody14);

function gpaHandler(data) {
  const gpa = document.querySelector("#gpa");
  gpa.innerHTML = "";

  const totalPoints = data.reduce((acc, element) => {
    let gradePoints;
    switch (element.grade) {
      case "S":
        gradePoints = 10;
        break;
      case "A":
        gradePoints = 9;
        break;
      case "B":
        gradePoints = 8;
        break;
      case "C":
        gradePoints = 7;
        break;
      default:
        gradePoints = 0; // Set default value for unknown grades
    }
    return acc + gradePoints;
  }, 0); // Start with an initial accumulator value of 0

  const gpaValue = totalPoints / data.length;

  gpa.innerHTML = gpaValue;
  if (gpaValue < 9) {
    document.getElementById("gpaMessage").innerHTML =
      "Not a 9 pointer, Better luck next time 😔";
    document
      .getElementById("gpaMessagecontainer")
      .classList.add("messageColorAdderRed");
  } else {
    document.getElementById("gpaMessage").innerHTML =
      "Congratulations 9 pointer, Maintain the streak 🎉🍾";
    document
      .getElementById("gpaMessagecontainer")
      .classList.add("messageColorAdderGreen");
  }
}

gpaHandler(AvaStewartCompletedCourses);

//page-5 payments
function populatePaymentsTable(data, id) {
  id.innerHTML = "";
  data.forEach((element) => {
    if (element.paid == "no") {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${element.courseName}</td >
      <td>${element.courseCode}</td>
      <td>${"6000/-"}</td>
      <td><button onclick="removered('${
        element.courseName
      }')">Pay</button></td>`;
      id.appendChild(row);
    }
  });
}

/////////////////// Menu button handlers
one = document.getElementById("one");
two = document.getElementById("two");
three = document.getElementById("three");
four = document.getElementById("four");
five = document.getElementById("five");

// 1
document.getElementById("my_course").addEventListener("click", function () {
  populateStudentTable(studentData, tablebody11);
  one.classList = `myCourse`;
  two.classList = `registerCourse hidden`;
  three.classList = `deleteCourse hidden`;
  four.classList = `completedCourses hidden`;
  five.classList = `payments hidden`;
  intro.classList = `intro-course hidden`;
}); //(Checked)
// 2
document
  .getElementById("register_course")
  .addEventListener("click", function () {
    tablebody12.innerHTML = "";
    document.getElementById("register-select").innerHTML = "";
    // //Populating table whenever menu button is clicked
    populateRegisterTable(tablebody12);
    one.classList = `myCourse hidden`;
    two.classList = `registerCourse `;
    three.classList = `deleteCourse hidden`;
    four.classList = `completedCourses hidden`;
    five.classList = `payments hidden`;
    intro.classList = `intro-course hidden`;
  }); //(Checked)

// 3
document.getElementById("delete_course").addEventListener("click", function () {
  console.log(studentData);
  tablebody13.innerHTML = "";
  document.getElementById("drop-select").innerHTML = "";
  //Populating table whenever menu button is clicked
  populateDeletionTable(AvaStewartRegisteredCourses, tablebody13);
  one.classList = `myCourse hidden`;
  two.classList = `registerCourse hidden`;
  three.classList = `deleteCourse `;
  four.classList = `completedCourses hidden`;
  five.classList = `payments hidden`;
  intro.classList = `intro-course hidden`;
});

//4
document
  .getElementById("completed_course")
  .addEventListener("click", function () {
    populateCompletionTable(AvaStewartCompletedCourses, tablebody14);
    one.classList = `myCourse hidden`;
    two.classList = `registerCourse hidden`;
    three.classList = `deleteCourse hidden`;
    four.classList = `completedCourses `;
    five.classList = `payments hidden`;
    intro.classList = `intro-course hidden`;
  });

//5
document.getElementById("payments").addEventListener("click", function () {
  populatePaymentsTable(AvaStewartRegisteredCourses, tablebody15);
  one.classList = `myCourse hidden`;
  two.classList = `registerCourse hidden`;
  three.classList = `deleteCourse hidden`;
  four.classList = `completedCourses hidden`;
  five.classList = `payments `;
  intro.classList = `intro-course hidden`;
});

//remove red
function removered(courseName) {
  // Update the status of the course to "paid" in your data
  AvaStewartRegisteredCourses.forEach((course) => {
    if (course.courseName === courseName) {
      console.log(course.courseName);
      course.paid = "yes";
    }
  });
  alert("Amount paid successfully !!");
  tablebody15.innerHTML = "";
  populatePaymentsTable(AvaStewartRegisteredCourses, tablebody15);
}
//Goback
function goback() {
  window.location.href = "../loginConnector.html";
}
//animation
const loggedinSpan = document.querySelector(".loggedinas");
setTimeout(() => {
  loggedinSpan.classList.add("active");
}, 150);
