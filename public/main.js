let apiKey = localStorage.getItem("apiKey");

// If not stored, prompt for API key and save it in localStorage
if (!apiKey) {
    apiKey = prompt("Enter API key");
    if (apiKey) {
        localStorage.setItem("apiKey", apiKey);
    } else {
        alert("API key is required to proceed.");
    }
}

let messages = [
    {
        role: "system",
        content: "You are participating in a democracy-themed game. Your goal is to convince a group of LLMs to vote for you as president. Your campaign includes delivering speeches, debating policies, and addressing accusations from rival candidates. The LLMs can ask questions, and you must respond to gain their favor. The game has a whimsical and satirical tone. Present the user with situations where they need to earn the trust and votes of the LLMs."
    }
];
let themeSet = false;
let userScrolling = false;

async function getTweet(character, event){
    const prompt = `You are a politician with the following profile: ${character}. You are responding to the following event: ${event}. Return a tweet of 80 characters or less responding to the event.`;
    return getMistralOutput(prompt);
}

async function getAllTweets(characters, event){
    outputs = {};
    for(const character in characters){
        outputs[character] = await getTweet(characters[character], event);
    }

    return outputs;
}

async function getMistralOutput(content){
    const data = {
        model: "mistral-small-latest",
        messages: [
            {
                role: "system",
                content: content
            }
        ],
        temperature: 0.8
    };
    return callChatEndpoint(
        data
    )
}

async function callChatEndpoint(data) {
    const url = "https://api.mistral.ai/v1/chat/completions";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const result = await response.json();
        return result.choices[0].message.content;
    } else {
        return `Error: ${response.status}, ${await response.text()}`;
    }
}

async function getOpenAIMessage() {
    const data = {
        model: "mistral-small-latest",
        messages: messages,
        temperature: 0.8
    };

    const response = await callChatEndpoint(data);
    displayMessage(response, "system");
    messages.push({ role: "system", content: response });
}

function displayMessage(content, role) {
    const messageContainer = document.getElementById("messages");
    const messageDiv = document.createElement("div");
    messageDiv.className = `p-4 rounded-lg transform transition-transform duration-200 ${role === "system" ? "bg-yellow-700 text-yellow-200 shadow-md" : "bg-blue-800 text-blue-200 shadow-md"}`;
    messageDiv.innerHTML = marked.parse(content);  // Render Markdown content as HTML
    messageContainer.appendChild(messageDiv);

    // Automatically scroll to bottom if the user isn't actively scrolling
    if (!userScrolling) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    // Limit messages to avoid excessive history in the DOM
    while (messageContainer.childElementCount > 20) {
        messageContainer.removeChild(messageContainer.firstChild);
    }
}

function handleScroll() {
    const messageContainer = document.getElementById("messages");
    userScrolling = messageContainer.scrollTop + messageContainer.clientHeight < messageContainer.scrollHeight;
}

function generateTweet(){

}

async function getMessages(){

}

async function sendUserMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    displayMessage(userInput, "user");
    messages.push({ role: "user", content: userInput });
    document.getElementById("user-input").value = "";

    
    if (!themeSet) {
        messages.push({
            role: "system",
            content: "Present the user with their first voting challenge. Ask for a campaign theme, outline potential rivals' accusations, and prompt them for their next move. Begin introducing the LLMs that will vote, with some quirky personalities."
        });
        themeSet = true;
    } else {
        messages.push({
            role: "system",
            content: "The user has responded. Analyze their campaign speech and provide feedback. If they need more support from the LLMs, offer another challenge or voting scenario. Include a table showing LLMs' current support levels."
        });
    }

    await getOpenAIMessage();
}

// Add scroll listener to detect when the user scrolls
document.getElementById("messages").addEventListener("scroll", handleScroll);

// Initialize the first message

function sendUserMessage() {
    const messageInput = document.getElementById('user-input');
    const messageText = messageInput.value.trim();

    // Only send the message if it is not empty
    if (messageText) {
        // Call the function to add the message resembling a tweet
        addMessage('User', messageText);
        
        // Clear the input field after sending the message
        messageInput.value = '';
    }
}

// Function to create and add the message (tweet) to the messages box
function addMessage(name, message) {
    // Get the messages container
    const messagesContainer = document.getElementById('messages');

    // Create a new message element
    const messageElement = document.createElement('div');
    messageElement.classList.add('flex', 'items-start', 'space-x-4', 'bg-white', 'p-4', 'rounded-lg', 'border', 'border-gray-200', 'shadow-sm');

    // Set the message content (with user icon and name)
    messageElement.innerHTML = `
        <!-- User Avatar -->
        <div class="flex-shrink-0">
            <span class="text-3xl text-gray-500">👤</span>
        </div>

        <!-- Message Content -->
        <div class="flex-grow">
            <div class="font-semibold text-gray-900">${name}</div>
            <div class="text-gray-700 mt-1">${message}</div>
        </div>
    `;

    // Append the new message element to the messages container
    messagesContainer.appendChild(messageElement);

    // Scroll to the bottom of the messages container
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addSystemMessage(message) {
    // Get the messages container
    const messagesContainer = document.getElementById('messages');

    // Create a new system message element
    const systemMessageElement = document.createElement('div');
    systemMessageElement.classList.add('flex', 'items-center', 'space-x-4', 'bg-gray-200', 'p-4', 'rounded-lg', 'border', 'border-gray-300', 'shadow-sm', 'text-gray-600');

    // Set the system message content (without the system icon)
    systemMessageElement.innerHTML = `
        <!-- System Message Content -->
        <div class="flex-grow">
            <div class="text-sm">${message}</div>
        </div>
    `;

    // Append the new system message element to the messages container
    messagesContainer.appendChild(systemMessageElement);

    // Scroll to the bottom of the messages container
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

const characters = {
    'donald': 'ginger man. passionate about cornish independence'
};

async function runEvent(event){
    const allTweets = await getAllTweets(characters, event);

    addSystemMessage(event);

    for(const name in allTweets){
        addMessage(name, allTweets[name]);
    }
}