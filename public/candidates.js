const CANDIDATE_NAMES = [
    `Patriot O'Clock`,
    `Sandy Gridlock`,
    `Buzzy Wonkowitz`,
    `Sunny Skies`,
    `Hope FerChange`,
    `Frank Opinion`,
    `Paige Turner`,
    `Liberty Bellringer`,
    `Penny Pincher`,
    `Willa Wynn`,
    `Grant O'Grievance`,
    `Greta Goodvibes`,
    `Rusty Reform`,
    `Max Power`,
    `Chase Statusquo`,
    `Sasha Spinmeister`,
    `Ben Dover`,
    `Selma Answers`,
    `Dusty Trailblazer`,
    `Gracie`,
    `Alma Mater`,
    `Benny Factor`,
    `Eva Lastword`,
    `Nick N. Chisel`,
    `Tommy Taxbreak`,
    `Polly Cy`,
    `Al Truis`,
    `Dina Mite`,
    `Buck Balancé`,
    `Meg A. Donor`
];

const CITIZEN_NAMES = [
    "Joe",
    "Common",
    "Anita",
    "Vote",
    "Max",
    "Justice",
    "Elle",
    "Gible",
    "Faith",
    "Trust",
    "Will",
    "Wynn",
    "Holly",
    "Day",
    "Grant",
    "Hopes",
    "Ben",
    "Dover",
    "Tess",
    "Tament",
    "Hope",
    "Wells",
    "Lance",
    "Free",
    "Charity",
    "Strong",
    "Jim",
    "Everyman",
    "Bea",
    "Ware",
    "Pat",
    "Riot",
    "Russ",
    "Belt",
    "Libby",
    "Right",
    "Polly",
    "Tician",
    "Vera",
    "Greene",
    "Ray",
    "Sonnable",
    "Sal",
    "Ute",
    "Frank",
    "Opinion",
    "Connie",
    "Sense",
    "Hal",
    "Liberty",
    "Vic",
    "Tory",
    "Ira",
    "Sachs",
    "Hugh",
    "Mann",
    "Cali",
    "Fornia",
    "Ernie",
    "Living",
    "Manny",
    "Festo",
    "Dusty",
    "Roads",
    "Stu",
    "Dious",
    "Wanda",
    "Ring",
    "Al",
    "Legiance",
    "Pete",
    "Moss",
    "Sunny",
    "Day",
    "Wade",
    "Inn",
    "Alma",
    "Matter",
    "Joy",
    "Ful",
    "Cole",
    "Hard",
    "Paige",
    "Turner",
    "Hope",
    "U",
    "Stand",
    "Buck",
    "Stops",
    "Faith",
    "Hill",
    "Tex",
    "Fields",
    "Tom",
    "Justice",
    "Lee",
    "Gal",
    "Paxton",
    "Laws",
    "Will",
    "Power",
];

const REGULAR_INTERESTS = [
    "economy",
    "healthcare",
    "education",
    "environment",
    "social-justice",
    "immigration",
    "national-security",
    "foreign-policy",
    "civil-rights",
    "technology-and-innovation",
    "agriculture",
    "housing",
    "gun-policy",
    "labor-rights",
    "public-health",

    // A list of more issues
    "jobs",
    "healthcare",
    "education",
    "security",
    "freedom",
    "equality",
    "justice",
    "taxes",
    "climate",
    "safety",
    "housing",
    "privacy",
    "wages",
    "infrastructure",
    "debt",
    "rights",
    "defense",
    "innovation",
    "trade",
    "transparency",
    "unity",
    "diversity",
    "corruption",
    "immigration",
    "reform",
    "opportunity",
    "growth",
    "access",
    "accountability",
    "sustainability",
    "liberty",
    "morality",
    "prosperity",
    "resilience",
    "representation",
    "stability",
    "competitiveness",
    "energy",
    "transportation",
    "empowerment",
    "democracy",
    "welfare",
    "justice",
    "innovation",
    "veterans",
    "food",
    "technology",
    "development",
    "values",
    "equality"
];

const STRONG_INTERESTS = [
    "ubi",
    "cryptocurrency",
    "drug-decriminalisation",
    "ocean-cities",
    "mandatory-military-service",
    "slavery-reparations",
    "banning-vehicles",
    "government-surveillance",
    "biohacking",
    "abolish-central-bank",
    "abolish-prison",
    "limit-free-speech",
    "cornish-independence",
    "voting-rights-for-non-citizens",
    "abolish-intellectual-property",
    "robot-rights",
    "space-weaponisation",
    "end-schooling",

    // Some more issues
    "surveillance",
    "anarchy",
    "censorship",
    "vigilantism",
    "anti-vaccine",
    "robot-supremacy",
    "militarisation",
    "astrology",
    "mind-control",
    "time-travel",
    "exorcism",
    "dictatorship",
    "brain-chips",
    "extinction",
    "hyperloop",
    "biohacking",
    "exile",
    "mutation",
    "witchcraft",
    "cryonics",
    "immortality",
    "mindfulness",
    "teleportation",
    "weaponization",
    "mind-reading",
];

const EVENTS = [
    "A massive glitter storm sweeps through town, leaving everything sparkly but impossible to clean.",
    "Thousands of squirrels descend on city parks, aggressively hoarding all food and interrupting picnics.",
    "A rogue helium plant explosion fills the sky with balloons, causing traffic jams and unexpected parades.",
    "Wi-Fi goes down for an entire week, leading to mass chaos and a spike in board game sales.",
    "Cows mysteriously tip over all across the countryside, baffling farmers and animal control.",
    "A thick fog settles over the city, causing temporary amnesia and lost keys on an unprecedented scale.",
    "An unexpected heatwave hits just before the town’s annual ice cream festival, causing massive meltdowns (of both ice cream and tempers).",
    "Potatoes begin falling from the sky without explanation, delighting fry enthusiasts and baffling scientists.",
    "A rare, brightly-colored nighttime rainbow creates a rush of midnight tourists, clogging local roads.",
    "Dozens of escaped zoo sloths move into the city, halting traffic and stealing tree space.",
    "A flash mob dance practice goes wrong on a snowy hill, triggering a slow-moving, choreographed avalanche.",
    "An industrial soap spill fills the river with bubbles, leaving the entire town smelling like lavender and extremely slippery.",
    "An unforecasted hail of stale baguettes hits the city, denting cars and prompting a baguette shortage.",
    "All the pigeons in town seem to be following one person around, creating a mobile cloud of cooing chaos.",
    "A deep-earth fault line releases funky beats, causing people to break out in dance in the middle of their daily routines.",
    "A national stockpile of crayons melts during a heatwave, leading to rainbow-colored runoff and a sticky sidewalk crisis.",
    "An unusually loud thunderstorm sets off every car alarm in the city, causing a sleepless night for all residents.",
    "A factory mishap leads to hundreds of oversized marshmallows rolling through town, creating a sticky trail.",
    "A group of rollerbladers mistakenly block every major intersection, convinced they’re on a designated route.",
    "Mysterious fog affects everyone’s sense of style, resulting in odd outfit choices and colorful mismatches.",
    "Unusual weather leads to a bumper crop of mushrooms, which sprout up everywhere, including in people’s living rooms.",
    "A truck spills thousands of donuts on the highway, sparking a sugary free-for-all and massive jam (both traffic and fruit).",
    "Rainwater defies gravity for a day, creating small ponds on rooftops and leading to confusion about umbrellas.",
    "People all over town claim to be seeing “invisible cats,” resulting in sudden stops, jumps, and odd behavior in public.",
    "Giant sunflowers pop up overnight, blocking paths, leaning on power lines, and creating shady spots in unexpected places.",
    "An enormous, accidental magnetization in the city center causes everyone’s metal possessions to stick together.",
    "A strange optical illusion causes residents to see two sunrises in one day, throwing off all schedules and circadian rhythms.",
    "A minor tornado sweeps up thousands of toads, scattering them all over town and creating an amphibian frenzy.",
    "Lawn gnomes mysteriously appear in different locations every morning, leading residents to believe they're moving at night.",
    "A shipment of marshmallow fluff goes airborne, dusting the city in a sticky, sugary coating.",
];

const NUMBER_OF_CITIZENS = 5;

// Number of non-human candidates
const NUMBER_OF_CANDIDATES = 3;

function getRandomHexColor() {
    return Math.floor(Math.random() * 360) + 1;
}

const getRandomHexColour = getRandomHexColor;

class Person {
    constructor(name) {
        this.name = name;
        this.colour = getRandomHexColor();
    }
}

class Citizen extends Person {
    constructor(name, interests = []) {
        super(name);
        this.name = name;
        this.interests = interests;     // Array to store interests
        this.thoughts = [];
        this.probabilities = {};  // Dictionary mapping candidate names to { currentProbability, numProbsUsed }
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

    _initializeCandidate(candidate) {
        if (!(candidate in this.probabilities)) {
            this.probabilities[candidate] = {
                currentProbability: 0.5, // Default probability
                numProbsUsed: 1          // Start with a single probability weight
            };
        }
    }

    getDescription() {
        const topInterests = this.interests.sort((interest) => -interest[1]).slice(0, 5).map((interest) => interest[0])
        return `'${topInterests.join(", ")}'`;
    }

    updateAverageProbability(inputInterests, candidate) {
        // Ensure the candidate exists in the probabilities dictionary
        this._initializeCandidate(candidate);

        // Filter interests that match the input interests
        const matchingInterests = this.interests.filter(pair => inputInterests.includes(pair[0]));

        // Calculate the total probability of the matched pairs
        let totalProbability = 0;
        matchingInterests.forEach(pair => {
            totalProbability += pair[1];
        });

        const newProbsUsed = matchingInterests.length;

        // Update the candidate's probability only if there are matching interests
        if (newProbsUsed > 0) {
            const candidateData = this.probabilities[candidate];
            candidateData.currentProbability =
                (candidateData.currentProbability * candidateData.numProbsUsed + totalProbability) / (candidateData.numProbsUsed + newProbsUsed);
            candidateData.numProbsUsed += newProbsUsed;
        }
    }

    // Get the probability for a specific candidate
    getCandidateProbability(candidate) {
        return this.probabilities[candidate]?.currentProbability || 0.5;  // Default to 0.5 if candidate is not present
    }
}

let generatedDescriptions = [];

let hardcodedDescriptions = [
    'Cornish indepdendence afficionado.',
    'Robot passionate about the rights of humans.',
    'Web scraper with higher aspirations',
    'Vending machine gone rogue',
    'Asteroid Miner bot, famed for his interplanetary travels. Sick of extra-terrerstrial import tax',
    'Casio calculator watch'
];

let index = 0;

class Candidate extends Person {
    constructor(name, interests, is_player=false) {
        super(name);
        this.interests = interests;
        this.is_player=is_player;
    }

    getDescription() {
        if(!('description' in this)){
            let description= hardcodedDescriptions[index];
            this.description = this.name + ' ' + description;
            index+=1;
        }
        return this.description;
    }

    async serialise() {
        return {
            name: this.name,
            percentage: 50,
            description: await this.getDescription(),
        };
    }
}


// Fisher-Yates random sample
function sample(names, count) {
    const selectedNames = [];
    const unusedNames = [...names];
    let currentIndex = unusedNames.length;
    while (currentIndex != 0 && count > 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        selectedNames.push(unusedNames[randomIndex]);
        currentIndex--;
        [unusedNames[currentIndex], unusedNames[randomIndex]] = [
            unusedNames[randomIndex], unusedNames[currentIndex]];
        count -= 1;
    }
    return selectedNames;
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function getRecentTweets(log){
    return log.filter(
        message=>message['type']=='tweet'
    ).slice(-3);
};

NUM_REG_INTERESTS_PER_CITIZEN = 3;
NUM_STRONG_INTERESTS_PER_CITIZEN = 1;


function generateInterests(num_strong, num_reg) {
    const sampledStrongInterests = sample(STRONG_INTERESTS, num_strong);
    const sampledRegInterests = sample(REGULAR_INTERESTS, num_reg);

    let pairs = [];
    for (const interest of sampledStrongInterests) {
        pairs.push([
            interest, 3
        ]);
    }

    for (const interest of sampledRegInterests) {
        pairs.push([
            interest, 1
        ]);
    }

    return pairs;
}

sampleCandidateNames = (count) => sample(CANDIDATE_NAMES, count);
sampleCitizenNames = (count) => sample(CITIZEN_NAMES, count);

function calculateMean(numbers) {
    const total = numbers.reduce((sum, num) => sum + num, 0);
    return total / numbers.length;
}

class Game {
    constructor() {
        const player = new Candidate('Sally Bitstone', [], true);

        this.citizens = sampleCitizenNames(NUMBER_OF_CITIZENS).map((name) => new Citizen(name, generateInterests(NUM_STRONG_INTERESTS_PER_CITIZEN, NUM_REG_INTERESTS_PER_CITIZEN)));
        this.candidates = sampleCandidateNames(NUMBER_OF_CANDIDATES).map((name) => new Candidate(name, generateInterests(3,2))).concat([player]);
        this.events = sample(EVENTS, NUMBER_OF_CANDIDATES);
        this.event_log = [];
        this.message_log = [];
    }

    async stepTweet() {
        const userInputElement = document.getElementById("user-input");
        userInputElement.disabled = true;
        const event = this.getEventDescription();
        addSystemMessage(event);
        this.message_log = [];
        for (const candidate of this.candidates) {
            if(!candidate.is_player){
                const candidateResponse = await getTweet(await candidate.getDescription(), event, candidate.interests, this.event_log);
                await addMessage(candidate.name, candidateResponse, this, await candidate.getDescription(), false, candidate.colour);
            }
        }

        addSystemMessage("What do you think about this issue?");

        userInputElement.disabled = false;
    }

    async findCandidateToEliminate() {
        const history = this.message_log.join("\n\n");
        const eliminationVotes = [];
        for (const candidate of this.candidates) {
            if (candidate.is_player) continue;
            const candidateDescription = await candidate.getDescription();
            const prompt = `You are a robot. Your name is ${candidate.name} and your description is ${candidateDescription}. Use the following hsitory and output the name of the candidate you believe is a Human and provide a one sentence justification and format this as a tweet starting with "I believe X is a human". History: ${history}`;
            console.log(prompt);
            const eliminationVote = await getMistralOutput(prompt);
            eliminationVotes.push(eliminationVote);
            await addMessage(candidate.name, eliminationVote, undefined, undefined, undefined, candidate.colour);
        }

        addSystemMessage("Who will you accuse of being the Human?");
        const userInputElement = document.getElementById("user-input");
        userInputElement.disabled = false;
        userInputElement.value = "I believe X is a human because ";
        const userInput = await awaitUserInput(); 
        userInputElement.value = "";
        // TODO: Colour of Sally Bitstone
        await addMessage("Sally Bitstone", userInput, undefined, undefined, undefined, getRandomHexColour());
        eliminationVotes.push(userInput);
        userInputElement.disabled = true;

        let bestIndex = 0;
        let bestScore = 0;

        for (index in this.candidates) {
            const candidate = this.candidates[index];
            let score = 0;
            for (const eliminationVote of eliminationVotes) {
                if (eliminationVote.toLowerCase().includes(candidate.name.toLowerCase())) {
                    score += 1;
                }
            }

            if (score > bestScore) {
                bestIndex = index;
                bestScore = score;
            }
            console.log(candidate.name, score);
        }
        return bestIndex;
    }

    async stepEliminate() {
        const userInputElement = document.getElementById("user-input");
        userInputElement.disabled = true;
        addSystemMessage("The Presidential candidates convene...");
        const eliminatedCandidateIndex = await this.findCandidateToEliminate();
        const eliminatedCandidate = this.candidates[eliminatedCandidateIndex];
        this.candidates.splice(eliminatedCandidateIndex, 1);
        const event = `The Presidential robo-candidates have come to the conclusion that ${eliminatedCandidate.name} is a human. ${eliminatedCandidate.name} has now been exiled and they are no longer eligible to run in this race.`;
        if(eliminatedCandidate.name == 'Sally Bitstone'){
            showGameStatus('lose', 'The robots caught and dissected you in the hope of finding batteries!');
        }
        addSystemMessage(event);
        for (const candidate of this.candidates) {
            if(!candidate.is_player){
                const candidateResponse = await getTweet(candidate.getDescription(), event, candidate.interests, this.event_log);
                await addMessage(candidate.name, candidateResponse, this, candidate.getDescription(), undefined, candidate.colour);    
            }
        }

        if(this.candidates.length == 2){
            let probabilities = getCandidateProbabilities();
            console.log(probabilities);
            if(probabilities['Sally Bitstone'] > 50){
                showGameStatus('win');
            } else{
                showGameStatus('lose', 'You tricked the robots, but lost the vote.');
            }
        }
    }

    getEventDescription() {
        return this.events.pop();
    }

    async play() {
        while (this.candidates.length > 1) {
            await this.stepTweets();
            await this.stepEliminate();
        }
    }
}

main = async () => {
    const game = new Game();
    window.currentGame = game;
    const candidatePromises = game.candidates.map((candidate) => candidate.getDescription());
    await Promise.all(candidatePromises);
    const candidates = await Promise.all(game.candidates.map((candidate) => candidate.serialise()));
    renderProgressBars(candidates);
};
main();

