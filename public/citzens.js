class Citizen {
    constructor(name) {
        this.name = name;
        this.thoughts = [];
    }

    addThought(thought) {
        this.thoughts.push(thought);
    }

    getThoughts() {
        return this.thoughts;
    }
}

class ChatEvent {
    constructor() {
        this.events = [];
        this.citizens = {};
    }

    // Method to add a plot message to the events stream
    addPlotMessage(message) {
        this.events.push({ type: 'plotMessage', message });
    }

    // Method to add a chat message from a specific citizen
    addChatMessage(citizenName, message) {
        if (!this.citizens[citizenName]) {
            this.citizens[citizenName] = new Citizen(citizenName);
        }
        this.events.push({ type: 'chatMessage', citizenName, message });
    }

    // Method to add a thought for a specific citizen
    addThoughtToCitizen(citizenName, thought) {
        if (!this.citizens[citizenName]) {
            this.citizens[citizenName] = new Citizen(citizenName);
        }
        this.citizens[citizenName].addThought(thought);
    }

    // Method to get a full stream of events
    getEvents() {
        return this.events;
    }

    // Method to get thoughts for a specific citizen or all thoughts if no name provided
    getThoughts(citizenName = null) {
        if (citizenName) {
            return this.citizens[citizenName] ? this.citizens[citizenName].getThoughts() : [];
        } else {
            // Return all thoughts from all citizens
            return Object.values(this.citizens).reduce((allThoughts, citizen) => {
                return allThoughts.concat(citizen.getThoughts());
            }, []);
        }
    }
}

// Example usage:
const chat = new ChatEvent();

// Adding plot and chat messages
chat.addPlotMessage("A new chapter begins.");
chat.addChatMessage("Alice", "Hello, everyone!");
chat.addChatMessage("Bob", "Good morning!");

// Adding thoughts for specific citizens
chat.addThoughtToCitizen("Alice", "I wonder how the story will unfold.");
chat.addThoughtToCitizen("Bob", "Excited to see what's next!");

// Fetching the full event stream
console.log(chat.getEvents());
// Output: 
// [
//   { type: 'plotMessage', message: 'A new chapter begins.' },
//   { type: 'chatMessage', citizenName: 'Alice', message: 'Hello, everyone!' },
//   { type: 'chatMessage', citizenName: 'Bob', message: 'Good morning!' }
// ]

// Fetching all thoughts for a specific citizen
console.log(chat.getThoughts("Alice")); // Output: ["I wonder how the story will unfold."]

// Fetching all thoughts from all citizens
console.log(chat.getThoughts()); 
// Output: ["I wonder how the story will unfold.", "Excited to see what's next!"]
