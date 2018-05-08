/*
 * Create a list that holds all of your cards
 */
let cardsFace = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 
'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 
'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];//all the cards to be shuffled

let matchCheck = []; //array to hold cards selected
let newDeck = document.querySelectorAll('.deck li'); //holds the new shuffled cards
let moveCount = document.querySelector('.moves'); //counts the moves
let matchCounter = 0; //counts the match
let secondCounter = document.querySelector('.second'); //counts the seconds spent
let minuteCounter = document.querySelector('.minute'); //counts the minutes spent
let scoreMessage = document.querySelector('.score-board'); //It'll add a score message with moves made, time, and star rating
const restart = document.querySelector('.restart'); //selects the restart button to add "restart" function
const everyCard = document.querySelector('.deck');
let timerId = 0;	//to hold timer ID in order to use clearInterval() function
let firstClick = true;		//in order to start a timer instead of having the timer run automatically from the start

function flipCard(card){                  //flip card function
	card.target.className = 'card open show';
	if(firstClick){
		timerId = setInterval(startTimer, 1000); //id for clearInterval and sets interval to 1 second
		firstClick = false;
	}
}

function addCardToList(card, list){       //adding card to the list function
	list.push(card.target.firstElementChild);
}

function cardsMatch(card, list, moveCounter){		//check the array for a match when 2 cards are in the array
	if(list.length === 2 && list[0].className === list[1].className){
		while(list.length > 0){
			list.pop().parentElement.className = 'card match';
		}
		moveCounter.innerText++;
		matchCounter++;
		starScore();
	}
}

function cardsNotMatch(card, list, moveCounter){		//check the array for a match when 2 cards are in the array
	if(list.length === 2 && list[0].className !== list[1].className){
		while(list.length > 0){
			list.pop().parentElement.className = 'card';
		}
		moveCounter.innerText++;
		starScore();
	}	
}

function endGame(){		//when all cards get matched, ends the game
	if(matchCounter === 8){
		clearInterval(timerId);
		modal.style.display = "block";
		scoreMessage.style.textAlign = "center";
		scoreMessage.innerText = moveCount.innerText + " Moves " + "::" + " Time: " + minuteCounter.innerText + ":" + secondCounter.innerText + " ::" + " Star rating: " + stars.childElementCount;
	}
}

function tooManyCardsBugFix(list){//test function to fix a bug where cards are clicked too fast
	if(list.length > 2){
		while(list.length > 0){
			list.pop().parentElement.className = 'card';
		}
	}
}

everyCard.addEventListener('click', function(card) {		//adds event listener to all the cards
	if(card.target && card.target.className === 'card'){
		flipCard(card);
		addCardToList(card, matchCheck);
		cardsMatch(card, matchCheck, moveCount);
		setTimeout(cardsNotMatch, 800, card, matchCheck, moveCount);
		tooManyCardsBugFix(matchCheck);
		setTimeout(endGame, 100);
	}
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
function startTimer(){		//timer to count seconds, and when seconds hit 60, increments minute and reset second to 0
	secondCounter.innerText++;
	if(secondCounter.innerText === "60"){
		minuteCounter.innerText++;
		secondCounter.innerText = 0;
	}
}

deckShuffle(cardsFace, newDeck);
 
function deckShuffle(cardList, deckArray){		//shuffles the cards and put them back in the deck
	cardList = shuffle(cardList);
	for(let i = 0; i < deckArray.length; i++){
		deckArray[i].firstElementChild.className = cardList[i];
		deckArray[i].className = 'card';
	}
}



//restart logic
restart.addEventListener('click', playAgain);

function playAgain(){		//resets everything and reshuffles the cards.
	deckShuffle(cardsFace, newDeck);
	moveCount.innerText = 0;
	matchCounter = 0;
	secondCounter.innerText = 0;
	minuteCounter.innerText = 0;
	matchCheck = [];
	if(!firstClick){
		clearInterval(timerId);
		firstClick = true;
	}
	if(stars.childElementCount != 3){
		stars.innerHTML = ' <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>'
	}
}


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

 //testing modal
 const modal = document.querySelector('.modal'); //modal layout
 const x = document.getElementById("myBtn");	//test to check on modal without finishing the game
 const yes = document.querySelector('.play-again'); //yes button to play again
 const no = document.querySelector('.dont-play-again'); //no button to close the modal
 
 x.addEventListener('click', function(){
	 modal.style.display = "block";
 });
 yes.addEventListener('click', function(){	//adds playAgain() function to the yes button
	 playAgain();
	 modal.style.display = "none";
 });
 
 no.addEventListener('click', function(){	//it's just used to close the modal
	 modal.style.display = "none";
 });
 
 //star function test
 const stars = document.querySelector('.stars'); //for star rating
 function starScore (){		//if moveCount is 15, one star will disappear
	if(moveCount.innerText == 15){
		stars.removeChild(stars.childNodes[1]);
	}
	if(moveCount.innerText == 25){ //if moveCount is 25, second star will disappear
		stars.removeChild(stars.childNodes[2]);
	}
 }