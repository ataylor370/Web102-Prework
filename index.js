/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
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

    // loop over each item in the data
    for (let i = 0; i < games.length ; i++ ) {
        /* when creating elements or adding classses to the class list, the parameter must be a string */
        let game_card = document.createElement("div");
        game_card.classList.add("game-card");
        /* note image attributes should also be quoted */
        game_card.innerHTML = `<img class = "game-img" src= "${ games[i].img }"  alt = "Image of ${ games[i].name }" > The name of this game is ${games[i].name}, The description of the game is as follows: ${ games[i].description}`;
        gamesContainer.append(game_card);
    }


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}
addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
let contributers = GAMES_JSON.reduce( (total,game) => {
    return total + game.backers; 
}, 0); 

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${contributers.toLocaleString('en-US')}`;

let amountRaised = GAMES_JSON.reduce((total,game) => {
    return total + game.pledged;
}, 0);
// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
raisedCard.innerHTML = `$${amountRaised.toLocaleString('en-US')} `;
// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
let numGames = GAMES_JSON.reduce( (total,game) => {
    return total + 1; 
}, 0);
gamesCard.innerHTML = `${numGames.toLocaleString('en-us')}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    let unfunded  = GAMES_JSON.filter((games) => {
        return games.pledged < games.goal
    }); 
    console.log(unfunded);
    addGamesToPage(unfunded);
    // use filter() to get a list of games that have not yet met their goal


    // use the function we previously created to add the unfunded games to the DOM

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    let funded = GAMES_JSON.filter( (games) => {
        return games.pledged >= games.goal
    });
    addGamesToPage(funded);

    // use filter() to get a list of games that have met or exceeded their goal


    // use the function we previously created to add unfunded games to the DOM

}

function filterSearchedOnly(query) {
    let searched_game =  GAMES_JSON.filter((game) => {
        return game.name.toLowerCase().includes(query.toLowerCase());
    });
    /* Clear the search box */
    /* remove previous games from container */
    deleteChildElements(gamesContainer);
    /* Create element incase game doesnt exist */
    let non_found = document.createElement("P");
    non_found.innerText = `Sorry, no game has been found under title ${query}`; 
    non_found.style.alignSelf= "center";
    /* If there exists a game that fits the query, display the game. Else, return no game found */
    searched_game.length >= 1 ? addGamesToPage(searched_game) : gamesContainer.append(non_found);
    
}


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
    // add all games from the JSON data to the DOM

}
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");
const searchBar = document.getElementById("searchGames");
unfundedBtn.addEventListener("click",filterUnfundedOnly);
fundedBtn.addEventListener("click",filterFundedOnly);
allBtn.addEventListener("click",showAllGames);
searchBar.addEventListener("keydown", (event) => {
    if (event.key == "Enter"){
        let query = event.target.value;
        filterSearchedOnly(query);
        event.target.value = ""
    }
})
// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let count_unfunded = GAMES_JSON.reduce((count,game) => {
    return game.goal > game.pledged ? count + 1 : count ; 
}, 0);

// create a string that explains the number of unfunded games using the ternary operator
let displayStr = `A total of $${amountRaised.toLocaleString("en-us")} has been raised for ${numGames} ${numGames > 1 ? "games" : "game"}. Currently ${count_unfunded > 1 ? `${count_unfunded} games` : `${count_unfunded} game`} remain unfunded. We need your help to fund these amazing games`;

// create a new DOM element containing the template string and append it to the description container
let displayStrElement = document.createElement("P");
displayStrElement.innerHTML = displayStr;
descriptionContainer.append(displayStrElement);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame] = sortedGames;

// first game
const firstGameElement = document.createElement("p");
firstGameElement.textContent = firstGame.name;
firstGameContainer.append(firstGameElement);

// runner-up
const secondGameElement = document.createElement("p");
secondGameElement.textContent = secondGame.name;
secondGameContainer.append(secondGameElement);