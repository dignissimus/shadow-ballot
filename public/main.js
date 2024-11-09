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

async function getTweet(character, event, interests, log=[]) {
    let interestsString  = interests.join(',');

    const randomNumber = Math.floor(Math.random() * 3) + 1;

    const recentTweets = getRecentTweets(log);
    console.log(log, recentTweets);
    if(recentTweets.length > 0){

        const logString = recentTweets.map(logEntry=>`${logEntry.from}: ${logEntry.content}`).join('\n');
        const prompt = `You are a robot politician with the following profile: ${character}. There is an undercover human on twitter. Attack a random character from the list of recent tweets, accusing them of being a human: ${logString} in less than 100 characters. Be mean.`;
        console.log(prompt);
        return await getMistralOutput(prompt) + '❗❗';
    }

    const prompt = `You are a politician with the following profile: ${character}. You are responding to the following event: ${event}. Return a tweet of 120 characters or less responding to the event, it must be heavily dependent on your profile. Refer to your interests (${interestsString}) and STAY IN CHARACTER (${character})`;
    return getMistralOutput(prompt);
}

async function getCitizenTweet(character, event) {
    const prompt = `You are a citizen with the following profile: ${character}. You are responding to the following event: ${event}. Return a tweet of 120 characters or less responding to the event, it must be heavily dependent on your profile and you must say what your interests are and how a presidential candidate should respond to this event to satisfy your interests.`;
    return getMistralOutput(prompt);
}

async function getAllTweets(characters, event) {
    outputs = {};
    for (const character in characters) {
        outputs[character] = await getTweet(characters[character], event);
    }

    return outputs;
}

async function decipherInterestsFromTweet(tweet, possibleInterests) {
    // Queries Mistral for which of the interests in possibleInterests are present in the tweet
    const prompt = "This is a tweet from a presidential candidate:\n" 
        + tweet + 
        "\n\nThis is a list of possible interests: " + possibleInterests.join(", ") + ".\n\n"
        + "Give a space separated list of these interests that are present in the tweet.";
    const response = await getMistralOutput(prompt);

    // Extract the interests from the response
    let foundInterests = [];
    for (let interest of possibleInterests) {
        if (response.includes(interest)) {
            foundInterests.push(interest);
        }
    }

    return foundInterests;
}

async function getMistralOutput(content, temperature = 0.8) {
    const data = {
        model: "mistral-small-latest",
        messages: [
            {
                role: "system",
                content: content
            }
        ],
        temperature
    };
    return callChatEndpoint(
        data
    )
}

let requestTimestamps = [];

async function callChatEndpoint(data) {
    const url = "https://api.mistral.ai/v1/chat/completions";
    const now = Date.now();
    
    // Filter timestamps to keep only the ones in the last second
    requestTimestamps = requestTimestamps.filter(timestamp => now - timestamp < 1000);

    // If there have been 5 requests in the last second, wait for 1 second before making the next request
    if (requestTimestamps.length >= 5) {
        const waitTime = 1000 - (now - requestTimestamps[requestTimestamps.length - 1]);
        console.log(`Rate limit exceeded. Waiting for ${waitTime}ms`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    // Add the current timestamp to the list of requests
    requestTimestamps.push(now);

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

function generateTweet() {

}

async function getMessages() {

}

// Add scroll listener to detect when the user scrolls
document.getElementById("messages").addEventListener("scroll", handleScroll);

// Initialize the first message

function startGame() {
    const button = document.getElementById("tweet-button");
    button.innerText = "Tweet";
    button.onclick = sendUserMessage;
    window.currentGame.stepTweet();
}

async function sendUserMessage() {
    const messageInput = document.getElementById('user-input');
    const messageText = messageInput.value.trim();

    // Only send the message if it is not empty
    if (messageText) {
        // Call the function to add the message resembling a tweet
        await addMessage('You', messageText, window.currentGame);

        // Clear the input field after sending the message
        messageInput.value = '';
    }
    await window.currentGame.stepEliminate();
    await window.currentGame.stepTweet();
}

// Function to create and add the message (tweet) to the messages box
async function addMessage(name, message, game=undefined, description="", is_bitizen=false) {
    // Get the messages container
    const messagesContainer = document.getElementById('messages');

    // Create a new message element
    const messageElement = document.createElement('div');
    messageElement.classList.add('flex', 'items-start', 'space-x-4', 'bg-white', 'p-4', 'rounded-lg', 'border', 'border-gray-200', 'shadow-sm');

    const citizenId = `progress-bar-${name.replace(/\s+"'/g, '-').toLowerCase()}`;
    if (description) globalDescription[citizenId + "-tweet"] = description;
    // Set the message content (with user icon and name)
    messageElement.innerHTML = `
        <!-- User Avatar -->
        <div class="flex-shrink-0">
            <span class="text-3xl text-gray-500">👤</span>
        </div>

        <!-- Message Content -->
        <div class="flex-grow">
            <div class="font-semibold text-gray-900 underline decoration-dotted" onclick="showToast(globalDescription['${citizenId}-tweet'])">${name}</div>
            <div class="text-gray-700 mt-1">${message}</div>
        </div>
    `;

    // Append the new message element to the messages container
    messagesContainer.appendChild(messageElement);

    // Scroll to the bottom of the messages container
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    if(game){
        game.event_log.push(
            {
                type: 'tweet',
                from: name,
                content: message
            }
        );


        if(!is_bitizen){
            let interests = await decipherInterestsFromTweet(message, REGULAR_INTERESTS.concat(STRONG_INTERESTS));
            console.log(name);
            console.log(interests);
            for (const citizen of game.citizens) {
                citizen.updateAverageProbability(interests, name);
            }

            let candidateScores = game.candidates.map(candidate => {
                return {
                    'name': candidate.name,
                    'mean_score': calculateMean(game.citizens.map((citizen) => citizen.getCandidateProbability(candidate.name)))
                }
            });
    
            let totalVote = candidateScores.reduce((acc, candidate) => acc + candidate['mean_score'], 0);
            let candidatesToDisplay = candidateScores.map(candidate => {
                return {
                    'name': candidate['name'],
                    'percentage': Math.round((candidate['mean_score'] / totalVote) * 100)
                };
            });
    
            console.log(candidatesToDisplay);
            console.log(game.candidates);
    
            renderProgressBars(candidatesToDisplay);
        }
    }
}


function showToast(message, bgColor = 'bg-blue-500') {
  const toast = document.createElement('div');
  toast.className = `p-4 w-64 text-white rounded-lg shadow-lg ${bgColor} flex items-center justify-between`;
  toast.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" class="ml-2 text-lg">&times;</button>
  `;

  document.getElementById('toast-container').appendChild(toast);

  // Auto-remove toast after 3 seconds
  setTimeout(() => toast.remove(), 3000);
}

function addSystemMessage(message, game) {
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
    window.currentGame.event_log.push(
        {
            type: 'system',
            content: message
        }
    );
}

const characters = {
    'donald': 'ginger man. passionate about cornish independence'
};

async function runEvent(event) {
    const allTweets = await getAllTweets(characters, event);

    addSystemMessage(event);

    for (const name in allTweets) {
        await addMessage(name, allTweets[name]);
    }
}


const globalDescription = {};

function renderProgressBars(citizens) {
    const container = document.getElementById("progress-tracking");

    // Clear existing progress bars
    container.innerHTML = '';

    // Define color classes for different progress bars with higher contrast text
    const colorClasses = [
        { bg: 'bg-teal-500', text: 'text-teal-900' }, // teal
        { bg: 'bg-blue-500', text: 'text-blue-900' }, // blue
        { bg: 'bg-red-500', text: 'text-red-900' },  // red
        { bg: 'bg-yellow-500', text: 'text-yellow-900' }, // yellow
        { bg: 'bg-green-500', text: 'text-green-900' },  // green
        { bg: 'bg-purple-500', text: 'text-purple-900' }, // purple
    ];

    // Iterate through the citizens and render their progress bars
    citizens.forEach((citizen, index) => {
        const { name, percentage, description } = citizen;

        // Choose a color based on the index or another logic
        const colorClass = colorClasses[index % colorClasses.length];

        // Create a unique ID for each citizen based on their name
        const citizenId = `progress-bar-${name.replace(/\s+"'/g, '-').toLowerCase()}`;
        globalDescription[citizenId] = description;

        // Create HTML for each citizen's progress bar
        const progressHTML = `
            <div class="flex items-center justify-between mb-6" id="${citizenId}">
                <button class="underline decoration-dotted text-gray-700 font-medium" onclick='showToast(globalDescription["${citizenId}"])'>${name}</button>
                <div class="w-3/4">
                    <div class="relative pt-1">
                        <div class="flex mb-2 items-center justify-between">
                            <div>
                                <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${colorClass.text} ${colorClass.bg}">
                                    ${percentage}%
                                </span>
                            </div>
                        </div>
                        <div class="flex mb-2">
                            <div class="w-full bg-teal-200 rounded-full h-2.5">
                                <div class="${colorClass.bg} h-2.5 rounded-full transition-all duration-500" style="width: ${percentage}%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Append to the container
        container.innerHTML += progressHTML;
    });

    // Scroll to the bottom of the container after content is rendered
    container.scrollTop = container.scrollHeight;
}

function updateCitizensAndRender(citizens, newValues) {
    // Update the citizens' progress values based on newValues
    citizens.forEach((citizen, index) => {
        const newValue = newValues[index];
        if (newValue !== undefined) {
            citizen.percentage = newValue;
        }
    });

    // Re-render the progress bars with the updated values
    renderProgressBars(citizens);
}

function updateProgressBarWidth(name, newPercentage) {
    // Generate the citizen's ID
    const citizenId = `progress-bar-${name.replace(/\s+/g, '-').toLowerCase()}`;

    // Check if the element exists
    const progressBarElement = document.getElementById(citizenId);
    if (progressBarElement) {
        // Find the inner div that represents the progress bar and update its width
        const progressBar = progressBarElement.querySelector('.h-2\\.5');
        if (progressBar) {
            progressBar.style.width = `${newPercentage}%`;
        }
    }
}

const userPopularity = [

];



// Example data to call the render function with
// Call the function to render the data with animation

// renderProgressBa rs(citizens);
