class Citizen {
    constructor() {
        // Initialize an empty array to store thoughts
        this.thoughts = [];
    }

    // Method to add a thought
    addThought(thought) {
        this.thoughts.push(thought);
    }

    // Method to get all thoughts
    getThoughts() {
        return this.thoughts;
    }
}

// Example usage:
const citizen = new Citizen();
citizen.addThought("I wonder what tomorrow holds.");
citizen.addThought("Life is a beautiful journey.");
console.log(citizen.getThoughts()); // Output: ["I wonder what tomorrow holds.", "Life is a beautiful journey."]
