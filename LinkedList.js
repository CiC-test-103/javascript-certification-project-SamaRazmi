const { Student } = require("./Student");

// Node class to store data and link to the next node
class Node {
  constructor(data, next = null) {
    this.data = data; // The student data that this node holds
    this.next = next; // The pointer to the next node in the list
  }
}

// LinkedList class to manage a list of students
class LinkedList {
  constructor() {
    this.head = null; // The first node of the list
    this.tail = null; // The last node of the list
    this.length = 0; // The number of nodes in the list
  }

  // Method to add a new student to the end of the list
  addStudent(newStudent) {
    const newNode = new Node(newStudent); // Create a new node with student data
    if (this.tail) {
      this.tail.next = newNode; // Link the current tail to the new node
      this.tail = newNode; // Update the tail to be the new node
    } else {
      this.head = this.tail = newNode; // If the list is empty, both head and tail point to the new node
    }
    this.length++; // Increment the length of the list
  }

  // Method to remove a student by their email
  removeStudent(email) {
    if (!this.head) return; // If the list is empty, nothing to remove
    if (this.head.data.getEmail() === email) {
      this.head = this.head.next; // Remove the first node if it matches the email
      if (!this.head) this.tail = null; // If the list is now empty, set tail to null
      this.length--; // Decrement the length of the list
      return;
    }

    let current = this.head;
    while (current.next && current.next.data.getEmail() !== email) {
      current = current.next; // Traverse the list to find the node to remove
    }

    if (current.next) {
      current.next = current.next.next; // Remove the node by skipping it in the list
      if (!current.next) this.tail = current; // If we removed the last node, update the tail
      this.length--; // Decrement the length of the list
    }
  }

  // Method to find and return a student by their email
  findStudent(email) {
    let current = this.head;
    while (current) {
      if (current.data.getEmail() === email) {
        return current.data; // Return the student if the email matches
      }
      current = current.next; // Move to the next node
    }
    return -1; // Return -1 if the student is not found
  }

  // Private method to clear all students from the list
  #clearStudents() {
    this.head = this.tail = null; // Set both head and tail to null
    this.length = 0; // Reset the length of the list
  }

  // Method to display all students in the list as a string of names
  displayStudents() {
    let current = this.head;
    let students = [];
    while (current) {
      students.push(current.data.getName()); // Add the student name to the list
      current = current.next; // Move to the next node
    }
    return students.join(", "); // Join the names into a single string separated by commas
  }

  // Private method to sort students alphabetically by name
  #sortStudentsByName() {
    let current = this.head;
    let students = [];
    while (current) {
      students.push(current.data); // Collect all student objects
      current = current.next; // Move to the next node
    }

    students.sort((a, b) => a.getName().localeCompare(b.getName())); // Sort the students by name
    return students; // Return the sorted array of students
  }

  // Method to filter students by their specialization
  filterBySpecialization(specialization) {
    const sortedStudents = this.#sortStudentsByName(); // Sort students first
    return sortedStudents.filter(
      (student) => student.getSpecialization() === specialization
    ); // Filter by specialization
  }

  // Method to filter students by minimum year (age)
  filterByMinAge(minAge) {
    const sortedStudents = this.#sortStudentsByName(); // Sort students first
    return sortedStudents.filter((student) => student.getYear() >= minAge); // Filter by year
  }

  // Method to save the list of students to a JSON file
  async saveToJson(fileName) {
    const fs = require("fs").promises; // Use Node's fs module for file operations
    const students = [];
    let current = this.head;
    while (current) {
      students.push(current.data); // Collect all students into an array
      current = current.next; // Move to the next node
    }
    await fs.writeFile(fileName, JSON.stringify(students, null, 2)); // Write the students to a file
  }

  // Method to load students from a JSON file and populate the list
  async loadFromJSON(fileName) {
    const fs = require("fs").promises; // Use Node's fs module for file operations
    try {
      const data = await fs.readFile(fileName); // Read the file
      const studentsArray = JSON.parse(data); // Parse the JSON data into an array of students
      console.log("Loaded students:", studentsArray); // Check if data is correctly loaded

      this.#clearStudents(); // Clear the current list

      studentsArray.forEach((studentData) => {
        const student = new Student(
          studentData.name,
          studentData.year,
          studentData.email,
          studentData.specialization
        ); // Create a new student
        this.addStudent(student); // Add the student to the list
      });
    } catch (error) {
      console.error("Error loading from JSON:", error);
    }
  }
}

module.exports = { LinkedList }; // Export the LinkedList class for use in other files
