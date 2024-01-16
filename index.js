/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page


function addGamesToPage(games) {
    
    for (const game of games) {
        const markup = `
        <img class="game-img" src="${game.img}"  />
        <h2>${game.name}</h2>
        <p>${game.description}</p>
        <p>Backers: ${game.backers}</p>
        `;
        const gameDiv = document.createElement("div");
        gameDiv.classList.add("game-card");

        gameDiv.innerHTML = markup;
        gamesContainer.append(gameDiv);
    }
};

addGamesToPage(GAMES_JSON);

// loop over each item in the data


// create a new div element, which will become the game card


// add the class game-card to the list


// set the inner HTML using a template literal to display some info 
// about each game
// TIP: if your images are not displaying, make sure there is space
// between the end of the src attribute and the end of the tag ("/>")


// append the game to the games-container




// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element


// use reduce() to count the number of total contributions by summing the backers
const contributionsCard = document.getElementById("num-contributions");
const totalContributions = GAMES_JSON.reduce((backers, game) => {
    return (backers + game.backers)
}, 0);

const raisedCard = document.getElementById("total-raised");
const totalPledged = GAMES_JSON.reduce((pledged, game) => {
    return (pledged + game.pledged)
}, 0);

const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;

contributionsCard.append(totalContributions.toLocaleString('en-US'));
raisedCard.append(`$ ${totalPledged.toLocaleString('en-US')}`);
gamesCard.append(totalGames.toLocaleString('en-US'));
//const totalListens = songs.reduce( (acc, song) => {
//    return acc + song.listens;
//}, 0);


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised


// set inner HTML using template literal


// grab number of games card and set its inner HTML




/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    let unfundedGames = GAMES_JSON.filter((game) => {
        return (game.pledged < game.goal);

    });
    addGamesToPage(unfundedGames);


    // use filter() to get a list of games that have not yet met their goal


    // use the function we previously created to add the unfunded games to the DOM

};
// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    let fundedGames = GAMES_JSON.filter( (game) => {
        return (game.pledged > game.goal);
    });
    addGamesToPage(fundedGames);
    // use filter() to get a list of games that have met or exceeded their goal


    // use the function we previously created to add unfunded games to the DOM

};

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
};

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly)
fundedBtn.addEventListener('click', filterFundedOnly)
allBtn.addEventListener('click', showAllGames)

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let sumOfUnfundedGames = (GAMES_JSON.filter( (game) => {
    return (game.pledged < game.goal);}).length);

let sumOfAllGames = GAMES_JSON.length;

let isPlural = sumOfUnfundedGames > 1;
let displayStrGrammar = isPlural ? "games" : "game";
const displayStr = `<p>A total of $${totalPledged.toLocaleString('en-US')} has been raised for ${sumOfAllGames} games. Currently, ${sumOfUnfundedGames} ${displayStrGrammar}
remain unfunded. We need your help to fund these amazing games!</p>`;

// create a string that explains the number of unfunded games using the ternary operator
let unfundedDesc = document.createElement("p");
unfundedDesc.innerHTML = displayStr;
descriptionContainer.append(unfundedDesc);
// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
});
const [topFunded, runnerUp] = GAMES_JSON;

firstGameContainer.append(topFunded.name);
secondGameContainer.append(runnerUp.name);




// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item