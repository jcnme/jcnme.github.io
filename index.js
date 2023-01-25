// Global data
// Players
players = [[0, 'Test']];
selectedPlayer = players[0] ?? false;

// Deck
deck = buildDeck();
drawn = [];
discarded = [];

// Rules
// rules = JSON.parse(
//     {
//         "1":"[PLAYER] [ACTION] 1 SVIRPs",
//         "2":"[PLAYER] [ACTION] 2 SVIRPs",
//         "3":"[PLAYER] [ACTION] 3 SVIRPs",
//         "4":"[PLAYER] [ACTION] 4 SVIRPs",
//         "5":"[PLAYER] [ACTION] 5 SVIRPs",
//         "6":"[PLAYER] earned a TABLE THUMB",
//         "7":"[PLAYER] earned a GLASS FINGER",
//         "8":"[PLAYER] [ACTION] a BUS",
//         "9":"WILDCARD",
//         "10":"SVIRP!",
//         "11":"[PLAYER] earned THE WOODEN MAN",
//         "12":"[NUMBER OF RULE] RULE is in play: [RULE OF RULE]",
//         "13":"[PLAYER] is THE KING",
//         "14":"[PLAYER] is the KINGMAKER"
//     }
// );

actions = 
[
    "[PLAYER] [DIRECTION] 1 SVIRPs",
    "[PLAYER] [DIRECTION] 2 SVIRPs",
    "[PLAYER] [DIRECTION] 3 SVIRPs",
    "[PLAYER] [DIRECTION] 4 SVIRPs",
    "[PLAYER] [DIRECTION] 5 SVIRPs",
    "[PLAYER] earned a TABLE THUMB",
    "[PLAYER] earned a GLASS FINGER",
    "[PLAYER] [DIRECTION] a BUS",
    "WILDCARD",
    "SVIRP!",
    "[PLAYER] earned THE WOODEN MAN",
    "RULE [NUMBER OF RULE] is in play: [RULE]",
    "[PLAYER] is THE KING",
    "[PLAYER] is the KINGMAKER"
]

rulesInactive = [
    'NO WORDS in ENGLISH',
    'NO NAMES', 
    'EVERYTHING with LEFT', 
    'DRINK with LEFT', 
];

rulesActive = []

// Main
main();
function main () {
    initialize();
}

function initialize() {
    displayConsole(players, drawn, deck, discarded);
    addPlayer()
    addDraw();
}

// Functions
// Build Deck
function buildDeck() {
    deck = [];
    getSuits().forEach(suit => {
        getCards().forEach(card => {
            deck.push([suit, card]);
        });
    });

    shuffle(deck);

    return deck;
}

function getSuits() {
    return getRange(4, 1);
}

function getCards() {
    return getRange(14, 1);
}

function getRange(range, offset = 0) {
    return [...Array(range).keys()].map(i => i + offset);
}


// Add Player
function addPlayer() {
    addPlayerInput = document.querySelector('.controls .players input');
    addPlayerButton = document.querySelector('.controls .players button');
    addPlayerButton.addEventListener('click', function() {
        // Check for name
        if (!addPlayerInput.value) {
            alert('Write in a name.')
        } else {
            // Check if exists
            players.forEach(element => {
                if (element[1].toLowerCase() == addPlayerInput.value.toLowerCase()) {
                    alert('Name is in use.');
                } else {
                    players.push([players.length, addPlayerInput.value]);
                    if (!selectedPlayer) {
                        selectedPlayer = players[0];
                    }
                    addPlayerInput.value = '';
                    displayConsole(players, drawn, deck, discarded);
                }
            });
        }
    });
}

// Draw
function addDraw() {
    drawButton = document.querySelector('.controls .draw');
    drawButton.addEventListener('click', function() {
        // Check for players
        if (!selectedPlayer) {
            alert('No players.');
        // Switch to next player    
        } else {
            selectedPlayer = players[(selectedPlayer[0] + 1)] ?? players[0];
        }
        
        // Draw
        drawn = deck.pop();
        determineAction();
        discarded.push(drawn);
        displayConsole(players, drawn, deck, discarded);
    });
}

function determineAction() {
    action = actions[(drawn[1] - 1)];
    
    // Determine Player
    player = selectedPlayer[1];
    action = action.replace('[PLAYER]', player);

    // Determine Direction
    if ([1,2,3,4,5,8].includes(drawn[1])) {
        direction = [1,3].includes(drawn[0]) ? 'must take' : 'can give';
        action = action.replace('[DIRECTION]', direction);
    }

    // Determine Rule
    if ([12].includes(drawn[1])) {
        rule = rulesInactive.pop();
        rulesActive.push(rule);
        action = action.replace('[NUMBER OF RULE]', rulesActive.length);
        action = action.replace('[RULE]', rule);
    }

    alert(action);
}

// Shuffle Deck
function shuffle(deck) {
    deck.sort((a,b) => 0.5 - Math.random());
}

// Display Console
function display(selector, data) {
    document.querySelector(selector).innerText = JSON.stringify(data);
}

function displayConsole(players, drawn, deck, discarded) {
    displayPlayers(players);
    displayDrawn(drawn);
    displayDeck(deck);
    displayDiscarded(discarded);
}

function displayPlayers(players) {
    display('.console .players', players);
}

function displayDeck(deck) {
    display('.console .deck', deck);
}

function displayDrawn (drawn) {
    display('.console .drawn', drawn);
}

function displayDiscarded(discarded) {
    display('.console .discarded', discarded);
}