let lectures = []; // array to store the lectures
let students = []; // array to store the students
let studentLectures = []; // array to store the studentLecture objects

//create a new lecture 
function createLecture(id, name, pointSc) {
    return {
        id: id,
        name: name,
        pointSc: pointSc,
        students: []
    };
}


window.addEventListener('scroll', function () {
    var header = document.querySelector('header');
    if (window.scrollY > 0) {
        header.style.backgroundColor = 'rgba(120, 166, 200, 0.7)'; // Saydam mavi tonunda bir arka plan koydum
    } else {
        header.style.backgroundColor = 'rgb(50, 103, 137)';
    }
});


// function to create a table of lectures
function createLecTable() {
    //  changed the  resultHeader to ---> Lectures
    document.querySelector(".resultHeader").innerHTML = "Lectures";

    // create th -->table header

    document.querySelector("#resultTable").innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Point Scale</th>
            <th>Number of Students</th>
            <th>Students Passed</th>
            <th>Students Failed</th>
            <th>GPA</th>
            <th>Students</th>
            <th>Delete</th>
        </tr>
    `;
    // create table rows --> tr ${dynamicly}
    for (let i = 0; i < lectures.length; i++) {
        let lecture = lectures[i];
        document.querySelector("#resultTable").innerHTML +=
            `<tr>
                <td>${lecture.id}</td>
                <td>${lecture.name}</td>
                <td>${lecture.pointSc}</td>
                <td>${lecture.students.length}</td>
                <td>${getPassedStu(lecture)}</td>
                <td>${getFailedStu(lecture)}</td>
                <td>${getMeanScore(lecture)}</td>
                <td><button class="btn" onclick="showStuTheLec('${lecture.id}')">Students</button></td>
                <td><button class="btn" onclick="deleteLec('${lecture.id}')">Delete</button></td>
            </tr>`
            ;
    }
}


//--------------------------------------------------------------

// function to get the mean score of the lecture
function getMeanScore(lecture) {
    let totalScore = 0;
    for (let i = 0; i < studentLectures.length; i++) {
        let studentLecture = studentLectures[i];
        if (studentLecture.lecture.id == lecture.id) {
            totalScore += getLetterGradeScore(studentLecture.letterGrade);
        }
    }
    return (totalScore / lecture.students.length);
}

// function to get the number of students that passed the lecture
function getPassedStu(lecture) {
    let passedStu = 0;
    for (let i = 0; i < studentLectures.length; i++) {
        let studentLecture = studentLectures[i];
        if (studentLecture.lecture.id == lecture.id && studentLecture.letterGrade != "FF") {
            passedStu++;
        }
    }
    return passedStu;
}

// function to get the number of students that failed the lecture
function getFailedStu(lecture) {
    let failedStu = 0;
    for (let i = 0; i < studentLectures.length; i++) {
        let studentLecture = studentLectures[i];
        if (studentLecture.lecture.id == lecture.id && studentLecture.letterGrade == "FF") {
            failedStu++;
        }
    }
    return failedStu;
}




//------------------------------------------------------------------

// function to Add Lecture Button
function addLec(event) {
    event.preventDefault();
    // get the lecture id and name from the input fields
    let id = document.getElementById("lectureCode").value;
    let name = document.getElementById("lectureName").value;
    let pointSc = document.getElementById("pointSc").value;
    // Check if empty
    if (id == "" || name == "" || pointSc == "") {
        alert("Please fill in all fields!");
        return;
    }
    // Check if lecture already exists
    for (let i = 0; i < lectures.length; i++) {
        if (lectures[i].id == id) {
            alert("Lecture already exists!");
            return;
        }
    }

    // create a new lecture object
    let lecture = createLecture(id, name, pointSc);
    // add the lecture to the lectures array
    lectures.push(lecture);
    // create a table of lectures
    createLecTable();

    //after getting the input, let's clean it 
    document.getElementById("lectureCode").value = "";
    document.getElementById("lectureName").value = "";
}

// update lecture
function updateLec(event) {
    event.preventDefault();
    // get the lecture id and name from the input fields
    let id = document.getElementById("lectureCode").value;
    let name = document.getElementById("lectureName").value;
    let pointSc = document.getElementById("pointSc").value;
    // Check if empty
    if (id == "" || name == "") {
        alert("Please fill in all fields!");
        return;
    }
    // find the lecture object with the given id
    let lecture = lectures.find(lecture => lecture.id == id);
    // update the lecture name and pointSc
    lecture.name = name;
    lecture.pointSc = pointSc;
    // create a table of lectures
    createLecTable();

    //after getting the input, let's clean it 
    document.getElementById("lectureCode").value = "";
    document.getElementById("lectureName").value = "";
}


// function to Delete Lecture Button
function deleteLec(id) {
    // find the lecture object with the given id
    let lecture = lectures.find(lecture => lecture.id == id);
    // remove the lecture from the lectures array
    lectures.splice(lectures.indexOf(lecture), 1);
    // create a table of lectures
    createLecTable();
    // delete lecture from studentlecture array
    for (let i = 0; i < studentLectures.length; i++) {
        if (studentLectures[i].lecture.id == id) {
            studentLectures.splice(i, 1);
        }
    }
}

//-----------------------------------------------------

// CREATE STUDENT

// function to create a new student object
function createStudent(id, name, surname) {
    return {
        id: id,
        name: name,
        surname: surname,
        lectures: []
    };
}

// function to create a table of students
function createStuTable(lecture) {
    // change resultHeader
    document.querySelector(".resultHeader").innerHTML = "Students";

    // create table heads
    document.querySelector("#resultTable").innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Lecture Count</th>
            <th>GPA</th>
            <th>Lectures</th>
            <th>Delete</th>
        </tr>
    `;
    // create table rows
    for (let i = 0; i < students.length; i++) {
        let student = students[i];
        document.querySelector("#resultTable").innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.surname}</td>
                <td>${student.lectures.length}</td>
                <td>${getGPA(student)}</td>
                <td><button class="btn" onclick="showStudentLectures('${student.id}')">Lectures</button></td>
                <td><button class="btn" onclick="deleteStudent('${student.id}')">Delete</button></td>
            </tr>
        `;
    }
}

// function to get GPA ( 0 - 4.00 )
function getGPA(student) {
    let totalScore = 0;
    for (let i = 0; i < studentLectures.length; i++) {
        let studentLecture = studentLectures[i];
        if (studentLecture.student.id == student.id) {
            totalScore += getLetterGradeScore(studentLecture.letterGrade);
        }
    }
    return (totalScore / student.lectures.length).toFixed(2);
}
// function to get the score of a letter grade
function getLetterGradeScore(letterGrade) {
    switch (letterGrade) {
        case "A":
            return 4.00;
        case "B":
            return 3.00;
        case "C":
            return 2.00;
        case "D":
            return 1.00;
        case "F":
            return 0.00;
    }

}


//  add student and check necessary things !!!!!!!!!!!!!!!!!!!!!!


function addStudent(event) {
    event.preventDefault();
    // get the id, name and surname from input 
    let id = document.getElementById("studentId").value;
    let name = document.getElementById("studentName").value;
    let surname = document.getElementById("studentSurname").value;
    //  check the inputs if it is empty
    if (id == "" || name == "" || surname == "") {
        alert("Please fill all the fields!");
        return;
    }

    //  check the inputs if it is negative
    if (id < 0) {
        alert("Please enter a positive number!");
        return;
    }

    //  check if student already exists
    for (let i = 0; i < students.length; i++) {
        let student = students[i];
        if (student.id == id) {
            alert("Student already exists!");
            return;
        }
    }


    // 1-create a new student object
    let student = createStudent(id, name, surname);
    // 2-add the student to the students array
    students.push(student);
    // 3-create a table of students
    createStuTable();

    //after getting the input, let's clean it 
    document.getElementById("studentId").value = "";
    document.getElementById("studentName").value = "";
    document.getElementById("studentSurname").value = "";
}

//  update student
function updateStudent(event) {
    event.preventDefault();

    //  get the id, name and surname from input 
    let id = document.getElementById("studentId").value;
    let name = document.getElementById("studentName").value;
    let surname = document.getElementById("studentSurname").value;

    //  check the inputs if it is empty
    if (id == "" || name == "" || surname == "") {
        alert("Please fill all the fields!");
        return;
    }

    //  check the inputs if it is negative
    if (id < 0) {
        alert("Please enter a positive number!");
        return;
    }


    // 1-find the student with the given id
    let student = students.find(student => student.id == id);
    // 2-update the student name
    student.name = name;
    // 3-update the student surname
    student.surname = surname;
    // 4-create a table of students
    createStuTable();

    //after getting the input, let's clean it 
    document.getElementById("studentId").value = "";
    document.getElementById("studentName").value = "";
    document.getElementById("studentSurname").value = "";
}

// delete student
function deleteStudent(id) {
    // 1-find the student with the given id
    let student = students.find(student => student.id == id);
    // 2-remove the student from the students array
    students.splice(students.indexOf(student), 1);
    // 3-create a table of students
    createStuTable();
    // delete student from studentLectures array
    for (let i = 0; i < studentLectures.length; i++) {
        if (studentLectures[i].student.id == id) {
            studentLectures.splice(i, 1);
        }
    }
}

//------------------------------------------------------------

// ADD STUDENT TO LECTURE

// function to create a new object that holds both the student and lecture objects
function createStudentLecture(student, lecture, midterm, final, pointSc) {
    return {
        student: student,
        lecture: lecture,
        midterm: midterm,
        final: final,
        letterGrade: evaluateGrade(midterm, final, pointSc)
    };
}

// function to evaluate the letter grade of a student for a lecture
function evaluateGrade(midterm, final, pointSc) {
    // make them integers
    midterm = parseInt(midterm);
    final = parseInt(final);

    let totalScore = (midterm + final) / 2;

    if (totalScore >= 100 - pointSc) {
        return "A";
    } else if (totalScore >= 100 - 2 * pointSc) {
        return "B";
    } else if (totalScore >= 100 - 3 * pointSc) {
        return "C";
    } else if (totalScore >= 100 - 4 * pointSc) {
        return "D";
    } else {
        return "F";
    }
}

// function to add a student to a lecture
function addStudentToLecture(student, lecture, midterm, final) {
    // add the student to the lecture
    lecture.students.push(student);
    // add the lecture to the student
    student.lectures.push(lecture);
    // create a new object that holds both the student and lecture objects
    let studentLecture = createStudentLecture(student, lecture, midterm, final, lecture.pointSc);
    // add the studentLecture object to the studentLectures array
    studentLectures.push(studentLecture);
}

// function to Add Student to Lecture Button
function addSTLButton(event) {
    event.preventDefault();
    // get the student id, lecture id, midterm score and final score from the input fields
    let studentId = document.getElementById("add-studentId").value;
    let lectureId = document.getElementById("add-lectureCode").value;
    let midterm = document.getElementById("midterm").value;
    let final = document.getElementById("final").value;

    // check already in the list
    for (let i = 0; i < studentLectures.length; i++) {
        let studentLecture = studentLectures[i];
        if (studentLecture.student.id == studentId && studentLecture.lecture.id == lectureId) {
            alert("Student already added!");
            return;
        }
    }

    // check exist
    let checkstudent = students.find(student => student.id == studentId);
    let checklecture = lectures.find(lecture => lecture.id == lectureId);

    if (checkstudent == undefined || checklecture == undefined) {
        alert("Student or lecture not exist!");
        return;
    }

    // Check if empty
    if (studentId == "" || lectureId == "" || midterm == "" || final == "") {
        alert("Please fill all the fields!");
        return;
    }

    //negative id check
    if (studentId < 0 || lectureId < 0) {
        alert("Please enter a positive number!");
        return;
    }

    // Check if midterm score and final score are between 0 and 100
    if (midterm < 0 || midterm > 100 || final < 0 || final > 100) {
        alert("Midterm score and final score must be between 0 and 100!");
        return;
    }

    // Check if student not exist
    let student = students.find(student => student.id == studentId);
    if (student == undefined) {
        alert("Student not exist!");
        return;
    }
    // Check if lecture not exist
    let lecture = lectures.find(lecture => lecture.id == lectureId);
    if (lecture == undefined) {
        alert("Lecture not exist!");
        return;
    }
    // add the student to the lecture
    addStudentToLecture(student, lecture, midterm, final, lecture.pointSc);
    // create a table of students
    createStuTable();
}


//-------------------------------------------
// function to update Student to Lecture Button
function updateSTLButton(event) {
    event.preventDefault();
    // get the student id, lecture id, midterm score and final score from the input fields
    let studentId = document.getElementById("add-studentId").value;
    let lectureId = document.getElementById("add-lectureCode").value;
    let midterm = document.getElementById("midterm").value;
    let final = document.getElementById("final").value;

    //  check the inputs if it is empty
    if (studentId == "" || lectureId == "" || midterm == "" || final == "") {
        alert("Please fill all the fields!");
        return;
    }

    // check exist
    let checkstudent = students.find(student => student.id == studentId);
    let checklecture = lectures.find(lecture => lecture.id == lectureId);

    if (checkstudent == undefined || checklecture == undefined) {
        alert("Student or lecture not exist!");
        return;
    }

    //  check the id if it is negative
    if (studentId < 0 || lectureId < 0) {
        alert("Please enter a positive number!");
        return;
    }

    // check if midterm score and final score are between 0 and 100
    if (midterm < 0 || midterm > 100 || final < 0 || final > 100) {
        alert("Midterm score and final score must be between 0 and 100!");
        return;
    }

    // check if student not exist
    let student = students.find(student => student.id == studentId);
    if (student == undefined) {
        alert("Student not exist!");
        return;
    }
    // check if lecture not exist
    let lecture = lectures.find(lecture => lecture.id == lectureId);
    if (lecture == undefined) {
        alert("Lecture not exist!");
        return;

    }
    // check if student not in lecture
    let studentLecture = studentLectures.find(studentLecture => studentLecture.student.id == studentId && studentLecture.lecture.id == lectureId);
    if (studentLecture == undefined) {
        alert("Student not in lecture!");
        return;
    }
    // update the student lecture
    studentLecture.midterm = midterm;
    studentLecture.final = final;
    studentLecture.letterGrade = evaluateGrade(midterm, final, lecture.pointSc);
    // create a table of students
    createStuTable();
}

//-------------------
// SEARCH STUDENTS

// function to search for students by name button
function searchStudentsByName(event) {
    event.preventDefault();
    // get the name from the input
    let name = document.getElementById("search-studentName").value;
    //  check the inputs if it is empty
    if (name == "") {
        alert("Please fill the field!");
        return;
    }
    // create table heads
    document.querySelector("#resultTable").innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Lectures</th>
            <th>GPA</th>
        </tr>
    `;
    // create table rows
    for (let i = 0; i < students.length; i++) {
        let student = students[i];
        if (student.name.toLowerCase().includes(name.toLowerCase())) {
            document.querySelector("#resultTable").innerHTML += `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.surname}</td>
                    <td><button class="btn btn-primary" onclick="showStudentLectures(${student.id})">Show Lectures</button></td>
                    <td>${getGPA(student)}</td>
                </tr>
            `;
        }
    }

    //cleaning time
    document.getElementById("search-studentName").value = ""
}



// SEARCH LECTURES

// function to search for lectures by name button
function searchLecturesByName(event) {
    event.preventDefault();
    // get the name from the input field
    let name = document.getElementById("search-lectureName").value;
    // 
    if (name == "") {
        alert("Please fill the field!");
        return;
    }
    // change resultHeader
    document.querySelector(".resultHeader").innerHTML = "Lectures Search: " + name;

    // create table heads
    document.querySelector("#resultTable").innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Number of Students</th>
            <th>Students Passed</th>
            <th>Students Failed</th>
            <th>GPA</th>
            <th>Students</th>
            <th>Delete</th>
        </tr>
    `;
    // create table rows
    for (let i = 0; i < lectures.length; i++) {
        if (lectures[i].name.toLowerCase().includes(name.toLowerCase())) {
            document.querySelector("#resultTable").innerHTML += `
                <tr>
                    <td>${lectures[i].id}</td>
                    <td>${lectures[i].name}</td>
                    <td>${lectures[i].students.length}</td>
                    <td>${getPassedStu(lectures[i])}</td>
                    <td>${getFailedStu(lectures[i])}</td>
                    <td>${getMeanScore(lectures[i])}</td>
                    <td><button class="btn btn-primary" onclick="showLectureStudents(${lectures[i].id})">Students</button></td>
                    <td><button class="btn btn-danger" onclick="deleteLec(${lectures[i].id})">Delete</button></td>
                </tr>
            `;
        }
    }
    //cleaning time 
    document.getElementById("search-lectureName").value = ""
}



// SHOW STUDENT LECTURES

// function to show the lectures of a student
function showStudentLectures(studentId) {
    // change resultHeader
    document.querySelector(".resultHeader").innerHTML = "Lectures of the student:" + studentId;
    // create table heads
    document.querySelector("#resultTable").innerHTML = `
        <tr>
            <th>Lecture Code</th>
            <th>Lecture Name</th>
            <th>Passed / Failed</th>
            <th>Midterm Score</th>
            <th>Final Score</th>
            <th>Letter Grade</th>
            <th>Delete Grade</th>
        </tr>
    `;
    // create table rows
    for (let i = 0; i < studentLectures.length; i++) {
        let studentLecture = studentLectures[i];
        if (studentLecture.student.id == studentId) {
            document.querySelector("#resultTable").innerHTML += `
                <tr>
                    <td>${studentLecture.lecture.id}</td>
                    <td>${studentLecture.lecture.name}</td>
                    <td>${checkPassed(studentLecture)}</td>
                    <td>${studentLecture.midterm}</td>
                    <td>${studentLecture.final}</td>
                    <td>${studentLecture.letterGrade}</td>
                    <td><button class="btn btn-danger" onclick="deleteStudentLec('${studentLecture.student.id}', '${studentLecture.lecture.id}')">Delete</button></td>
                </tr>
            `;
        }
    }
}

// SHOW STUDENTS OF LECTURE

// function to show the students of a lecture
function showStuTheLec(lectureId) {
    // change resultHeader
    document.querySelector(".resultHeader").innerHTML = "Students of the Lecture:" + lectureId;
    // create table heads
    document.querySelector("#resultTable").innerHTML = `
        <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Student Surname</th>
            <th>Passed / Failed</th>
            <th>Midterm Score</th>
            <th>Final Score</th>
            <th>Letter Grade</th>
            <th>Delete Grade</th>
        </tr>
    `;
    // create table rows
    for (let i = 0; i < studentLectures.length; i++) {
        let studentLecture = studentLectures[i];
        if (studentLecture.lecture.id == lectureId) {
            document.querySelector("#resultTable").innerHTML += `
                <tr>
                    <td>${studentLecture.student.id}</td>
                    <td>${studentLecture.student.name}</td>
                    <td>${studentLecture.student.surname}</td>
                    <td>${checkPassed(studentLecture)}</td>
                    <td>${studentLecture.midterm}</td>
                    <td>${studentLecture.final}</td>
                    <td>${studentLecture.letterGrade}</td>
                    <td><button class="btn btn-danger" onclick="deleteStudentLec('${studentLecture.student.id}', '${studentLecture.lecture.id}')">Delete</button></td>
                </tr>
            `;
        }
    }
}

function checkPassed(studentLecture) {
    if (studentLecture.letterGrade == "F") {
        return "Failed";
    } else {
        return "Passed";
    }
}


function deleteStudentLec(studentId, lectureId) {
    // Check if student not exist
    let student = students.find(student => student.id == studentId);
    if (student == undefined) {
        alert("Student not exist!");
        return;
    }
    // Check if lecture not exist
    let lecture = lectures.find(lecture => lecture.id == lectureId);
    if (lecture == undefined) {
        alert("Lecture not exist!");
        return;
    }
    // delete the student from the lecture
    let studentLecture = studentLectures.find(studentLecture => studentLecture.student.id == studentId && studentLecture.lecture.id == lectureId);
    if (studentLecture == undefined) {
        alert("Student not exist in this lecture!");
        return;
    }
    studentLectures.splice(studentLectures.indexOf(studentLecture), 1);
    // Delete the lecture from the student
    student.lectures.splice(student.lectures.indexOf(lecture), 1);
    // Delete the student from the lecture
    lecture.students.splice(lecture.students.indexOf(student), 1);
    //tableı oluşturdukkk
    createStuTable();
}