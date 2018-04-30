/*
 * Create a list that holds all of your cards
 */
let cardsFace = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 
'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 
'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];

let matchCheck = [];
let newDeck = document.querySelectorAll('.deck li');
let moveCount = document.querySelector('.moves');
let matchCounter = 0;
let secondCounter = document.querySelector('.second');
let minuteCounter = document.querySelector('.minute');
const restart = document.querySelector('.restart');
const testing1 = document.querySelector('.deck');

function flipCard(card){                  //flip card function
	card.target.className = 'card open show';
}

function addCardToList(card, list){       //adding card to the list function
	list.push(card.target.firstElementChild);
}

function cardsMatch(card, list, moveCounter){
	if(list.length === 2 && list[0].className === list[1].className){
		while(list.length > 0){
			list.pop().parentElement.className = 'card match';
		}
		moveCounter.innerText++;
		matchCounter++;
	}
}

function cardsNotMatch(card, list, moveCounter){
	if(list.length === 2 && list[0].className !== list[1].className){
		while(list.length > 0){
			list.pop().parentElement.className = 'card';
		}
		moveCounter.innerText++;
	}
}

function endGame(){
	if(matchCounter === 8){
		alert("You won!");
	}
}

testing1.addEventListener('click', function(card) { 
	if(card.target && card.target.nodeName == 'LI'){
		flipCard(card);
		addCardToList(card, matchCheck);
		setTimeout(cardsMatch, 200, card, matchCheck, moveCount, matchCounter);
		setTimeout(cardsNotMatch, 800, card, matchCheck, moveCount);
		
	}
	setTimeout(endGame, 500);
});

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//timer logic
function startTimer(){
	secondCounter.innerText++;
	if(secondCounter.innerText === "60"){
		minuteCounter.innerText++;
		secondCounter.innerText = 0;
	}
}

let timerId = setInterval(startTimer, 1000); //id for clearInterval and sets interval to 1 second
cardsFace = shuffle(cardsFace);

function deckShuffle(cardList, deckArray){
	cardList = shuffle(cardList);
	for(let i = 0; i < deckArray.length; i++){
		deckArray[i].firstElementChild.className = cardList[i];
		deckArray[i].className = 'card';
	}
}
	


//restart logic
restart.addEventListener('click',function(){
	deckShuffle(cardsFace, newDeck)
	moveCount.innerText = 0;
	//timer logic
	clearInterval(timerId);
	secondCounter.innerText = 0;
	minuteCounter.innerText = 0;
});



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
