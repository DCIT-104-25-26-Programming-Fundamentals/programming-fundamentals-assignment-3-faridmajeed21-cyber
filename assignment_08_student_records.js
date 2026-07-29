// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 8
// =============================================================================
//
// TASK: Student Record Management System
//
// Build a console-based program that stores and manages student information.
// Each student is represented as a JavaScript object containing:
//
//   - name   : the student's full name  (string)
//   - id     : a unique student ID number (number, e.g. 20240001)
//   - scores : an array of scores from multiple assessments (e.g. [75, 88, 90])
//
// Example object:
//   { name: "Alice Mensah", id: 20240001, scores: [78, 85, 90] }
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_08_student_records.js
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Student
//      - Ask the user to enter the student's name and ID.
//      - Ask how many scores to enter, then collect each score one by one.
//      - Save the student object and confirm it was added.
//
//   2. Display All Students
//      - Print a formatted table showing every student's:
//          Name, ID, individual scores, and their average score.
//      - If no students have been added yet, print a message saying so.
//
//   3. Calculate Average Score for a Specific Student
//      - Ask the user to enter a student ID.
//      - Find the student and print their average score.
//      - If the ID is not found, print an error message.
//
//   4. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ================================
//      STUDENT RECORD SYSTEM MENU
//   ================================
//   1. Add student
//   2. Display all students
//   3. Calculate average score
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Student name: Alice Mensah
//   Student ID: 20240001
//   How many scores? 3
//   Enter score 1: 78
//   Enter score 2: 85
//   Enter score 3: 90
//   Student "Alice Mensah" added successfully.
//
//   Enter your choice (1-4): 3
//   Enter student ID: 20240001
//   Alice Mensah's average score: 84.33
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store all student records in an array of objects.
// - Average scores must be displayed to 2 decimal places (use .toFixed(2)).
// - Each feature MUST be in its own function (see scaffold below).
// - Handle invalid menu choices and missing student IDs gracefully.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================
const readlineSync = require('readline-sync');

// Global array to store student objects
let students = [];

/**
 * Helper function to calculate the average of an array of numbers.
 * @param {number[]} scores - Array of numbers.
 * @returns {number} Average score.
 */
function calculateAverageScore(scores) {
  if (!scores || scores.length === 0) return 0;
  let sum = 0;
  for (let i = 0; i < scores.length; i++) {
    sum += scores[i];
  }
  return sum / scores.length;
}

/**
 * FEATURE 1: Adds a new student record to the system.
 */
function addStudent() {
  const name = readlineSync.question('Student name: ');
  const id = readlineSync.questionInt('Student ID: ');

  // Check if ID already exists
  const existingStudent = students.find((s) => s.id === id);
  if (existingStudent) {
    console.log(`Error: A student with ID ${id} already exists.`);
    return;
  }

  const numScores = readlineSync.questionInt('How many scores? ');
  if (numScores <= 0) {
    console.log('Error: Number of scores must be greater than 0.');
    return;
  }

  const scores = [];
  for (let i = 1; i <= numScores; i++) {
    const score = readlineSync.questionFloat(`Enter score ${i}: `);
    scores.push(score);
  }

  const newStudent = {
    name: name,
    id: id,
    scores: scores,
  };

  students.push(newStudent);
  console.log(`Student "${name}" added successfully.`);
}

/**
 * FEATURE 2: Displays all students in a formatted list/table.
 */
function displayAllStudents() {
  if (students.length === 0) {
    console.log('No student records found.');
    return;
  }

  console.log('\n=============================================================');
  console.log('ALL STUDENT RECORDS');
  console.log('=============================================================');

  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const avg = calculateAverageScore(student.scores);
    console.log(`ID: ${student.id} | Name: ${student.name}`);
    console.log(`Scores: [${student.scores.join(', ')}] | Average: ${avg.toFixed(2)}`);
    console.log('-------------------------------------------------------------');
  }
}

/**
 * FEATURE 3: Calculates and displays the average score for a student by ID.
 */
function calculateSpecificAverage() {
  if (students.length === 0) {
    console.log('No student records found.');
    return;
  }

  const searchId = readlineSync.questionInt('Enter student ID: ');
  let foundStudent = null;

  for (let i = 0; i < students.length; i++) {
    if (students[i].id === searchId) {
      foundStudent = students[i];
      break;
    }
  }

  if (foundStudent) {
    const avg = calculateAverageScore(foundStudent.scores);
    console.log(`${foundStudent.name}'s average score: ${avg.toFixed(2)}`);
  } else {
    console.log(`Error: Student with ID ${searchId} not found.`);
  }
}

/**
 * Displays the main menu choices.
 */
function displayMenu() {
  console.log('\n================================');
  console.log('   STUDENT RECORD SYSTEM MENU   ');
  console.log('================================');
  console.log('1. Add student');
  console.log('2. Display all students');
  console.log('3. Calculate average score');
  console.log('4. Quit');
}

/**
 * Main application loop.
 */
function main() {
  let isRunning = true;

  while (isRunning) {
    displayMenu();
    const choice = readlineSync.questionInt('Enter your choice (1-4): ');

    switch (choice) {
      case 1:
        addStudent();
        break;
      case 2:
        displayAllStudents();
        break;
      case 3:
        calculateSpecificAverage();
        break;
      case 4:
        console.log('Goodbye!');
        isRunning = false;
        break;
      default:
        console.log('Error: Invalid choice. Please enter a number between 1 and 4.');
        break;
    }
  }
}

// Execute the program
main();

