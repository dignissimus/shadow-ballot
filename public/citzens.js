class Person {
    constructor(name, isCandidate = false, interests = []) {
        this.name = name;
        this.isCandidate = isCandidate; // Flag indicating if the person is a candidate
        this.interests = interests;     // Array to store interests
        this.thoughts = [];
    }

    addThought(thought) {
        this.thoughts.push(thought);
    }

    getThoughts() {
        return this.thoughts;
    }

    addInterest(interest) {
        this.interests.push(interest);
    }

    getInterests() {
        return this.interests;
    }
}

class ChatEvent {
    constructor() {
        this.events = [];
        this.people = {}; // Renamed from citizens to people
    }

    // Method to add a plot message to the events stream
    addPlotMessage(message) {
        this.events.push({ type: 'plotMessage', message });
    }

    // Method to add a chat message from a specific person
    addChatMessage(personName, message) {
        if (!this.people[personName]) {
            this.people[personName] = new Person(personName);
        }
        this.events.push({ type: 'chatMessage', personName, message });
    }

    // Method to add a thought for a specific person
    addThoughtToPerson(personName, thought) {
        if (!this.people[personName]) {
            this.people[personName] = new Person(personName);
        }
        this.people[personName].addThought(thought);
    }

    // Method to get a full stream of events
    getEvents() {
        return this.events;
    }

    // Method to get thoughts for a specific person or all thoughts if no name provided
    getThoughts(personName = null) {
        if (personName) {
            return this.people[personName] ? this.people[personName].getThoughts() : [];
        } else {
            // Return all thoughts from all people
            return Object.values(this.people).reduce((allThoughts, person) => {
                return allThoughts.concat(person.getThoughts());
            }, []);
        }
    }

    // Method to add an interest for a specific person
    addInterestToPerson(personName, interest) {
        if (!this.people[personName]) {
            this.people[personName] = new Person(personName);
        }
        this.people[personName].addInterest(interest);
    }

    // Method to get interests of a specific person or all interests if no name provided
    getInterests(personName = null) {
        if (personName) {
            return this.people[personName] ? this.people[personName].getInterests() : [];
        } else {
            // Return all interests from all people
            return Object.values(this.people).reduce((allInterests, person) => {
                return allInterests.concat(person.getInterests());
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

// Adding thoughts for specific people
chat.addThoughtToPerson("Alice", "I wonder how the story will unfold.");
chat.addThoughtToPerson("Bob", "Excited to see what's next!");

// Marking people as candidates and adding interests
chat.people["Alice"] = new Person("Alice", true, ["reading", "adventure"]);
chat.people["Bob"] = new Person("Bob", false, ["technology", "sports"]);

// Adding additional interests
chat.addInterestToPerson("Alice", "mystery novels");
chat.addInterestToPerson("Bob", "hiking");

// Fetching the full event stream
console.log(chat.getEvents());

// Fetching all thoughts for a specific person
console.log(chat.getThoughts("Alice"));

// Fetching all thoughts from all people
console.log(chat.getThoughts());

// Fetching all interests for a specific person
console.log(chat.getInterests("Alice"));

// Fetching all interests from all people
console.log(chat.getInterests());
