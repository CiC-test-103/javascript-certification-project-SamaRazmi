const { LinkedList } = require("./LinkedList"); // Import LinkedList class
const { Student } = require("./Student"); // Import Student class
const readline = require("readline"); // Import readline for user input
const fs = require("fs").promises; // Import file system module with promises support

const rl = readline.createInterface({
  input: process.stdin, // Set input stream to standard input (CLI)
  output: process.stdout, // Set output stream to standard output (CLI)
});

const studentManagementSystem = new LinkedList(); // Create a new LinkedList instance for student management

// Function to display available commands to the user
function main() {
  console.log(`
    Available Commands:
    - add [name] [year] [email] [specialization]: Add a student
    - remove [email]: Remove a student by email
    - display: Show all students
    - find [email]: Find a student by email
    - save: Save the current linked list to the specified file
    - load [fileName]: Load a linked list from a file
    - clear: Clear the current linked list
    - q: Quit the terminal
  `);
}

// Function to handle user commands
async function handleCommand(command) {
  const [operation, ...args] = command.trim().split(" "); // Split command into operation and arguments

  switch (operation) {
    case "add":
      console.log("Adding student..."); // Log the operation
      const [name, year, email, specialization] = args; // Extract student details
      const newStudent = new Student(
        name,
        parseInt(year),
        email,
        specialization
      ); // Create a new student instance
      studentManagementSystem.addStudent(newStudent); // Add student to the linked list
      console.log("Student added successfully."); // Confirmation message
      break;

    case "remove":
      console.log("Removing student..."); // Log the operation
      const removeEmail = args[0]; // Get the email of the student to remove
      studentManagementSystem.removeStudent(removeEmail); // Remove student from the linked list
      console.log("Student removed successfully."); // Confirmation message
      break;

    case "display":
      console.log("Displaying students..."); // Log the operation
      const students = studentManagementSystem.displayStudents(); // Get all students from the linked list
      if (students.length > 0) {
        console.log("Students in the system: ");
        console.log(students); // Display students in the system
      } else {
        console.log("No students found."); // If no students are found
      }
      break;

    case "find":
      console.log("Finding student..."); // Log the operation
      const findEmail = args[0]; // Get the email of the student to find
      const student = studentManagementSystem.findStudent(findEmail); // Search for the student by email
      if (student !== -1) {
        console.log(student.getString()); // Display student's details if found
      } else {
        console.log("Student does not exist."); // If student is not found
      }
      break;

    case "save":
      console.log("Saving data..."); // Log the operation
      const saveFileName = args[0]; // Get the file name to save data
      await studentManagementSystem.saveToJson(saveFileName); // Save the linked list to a file in JSON format
      console.log(`Data saved to ${saveFileName}`); // Confirmation message
      break;

    case "load":
      console.log("Loading data..."); // Log the operation
      const loadFileName = args[0]; // Get the file name to load data
      await studentManagementSystem.loadFromJSON(loadFileName); // Load the linked list from the file
      console.log(`Data loaded from ${loadFileName}`); // Confirmation message
      break;

    case "clear":
      console.log("Clearing data..."); // Log the operation
      studentManagementSystem.clearStudents(); // Clear all students from the linked list
      console.log("Data cleared."); // Confirmation message
      break;

    case "q":
      console.log("Exiting..."); // Log the operation
      rl.close(); // Close the readline interface and quit
      break;

    default:
      console.log('Unknown command. Type "help" for a list of commands.'); // Handle unknown commands
      break;
  }
}

// Display the welcome message and the available commands
console.log("Welcome to the Student Management System!");
main();

// Handle user input
rl.on("line", async (input) => {
  if (input.trim().toLowerCase() === "help") {
    main(); // Show the available commands again
  } else {
    await handleCommand(input); // Handle the user's command
  }
});

// Handle the closure of the readline interface
rl.on("close", () => {
  console.log("Goodbye!"); // Print a goodbye message when the program ends
});
