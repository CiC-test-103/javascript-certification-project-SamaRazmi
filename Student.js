class Student {
  // Private Fields
  #name;
  #year;
  #email;
  #specialization;

  constructor(name, year, email, specialization) {
    this.#name = name;
    this.#year = year;
    this.#email = email;
    this.#specialization = specialization;
  }

  // Getter methods
  getName() {
    return this.#name;
  }

  getYear() {
    return this.#year;
  }

  getEmail() {
    return this.#email;
  }

  getSpecialization() {
    return this.#specialization;
  }

  // String representation
  getString() {
    return `Name: ${this.#name}, Year: ${this.#year}, Email: ${
      this.#email
    }, Specialization: ${this.#specialization}`;
  }

  // Setter methods
  setEmail(newEmail) {
    this.#email = newEmail;
  }

  setSpecialization(newSpecialization) {
    this.#specialization = newSpecialization;
  }

  // Custom serialization for private fields
  toJSON() {
    return {
      name: this.#name,
      year: this.#year,
      email: this.#email,
      specialization: this.#specialization,
    };
  }

  // Custom deserialization for private fields
  static fromJSON(json) {
    return new Student(json.name, json.year, json.email, json.specialization);
  }
}

module.exports = { Student };
