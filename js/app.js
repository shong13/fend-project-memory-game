/*
 * Create a list that holds all of your cards
 */
let cardsFace = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 
'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 
'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];

let matchCheck = [];
let newDeck = document.querySelectorAll('.deck li');
let moveCount = document.querySelector('.moves');
const restart = document.querySelector('.restart');

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

cardsFace = shuffle(cardsFace);

//card logic
for(let i = 0; i < newDeck.length; i++){
	newDeck[i].firstElementChild.className = cardsFace[i];
	newDeck[i].addEventListener('click',function(){
		if(newDeck[i].className === 'card'){
			newDeck[i].className = 'card open show';
			matchCheck.push(newDeck[i].firstElementChild);
			moveCount.innerText++;
		}
		//check 2 cards in the queue for match
		if(matchCheck.length === 2){
			if(matchCheck[0].className === matchCheck[1].className){    
				matchCheck[0].parentElement.className = 'card match';
				matchCheck[1].parentElement.className = 'card match';
				matchCheck = []; //empty out the array
			}
			else{
				matchCheck[0].parentElement.className = 'card';
				matchCheck[1].parentElement.className = 'card';
				matchCheck = []; //empty out the array
			}
		}

	});
}


//restart logic
restart.addEventListener('click',function(){
	cardsFace = shuffle(cardsFace);
	for(let i = 0; i < newDeck.length; i++){
		newDeck[i].firstElementChild.className = cardsFace[i];
		newDeck[i].className = 'card';
	}
	moveCount.innerText = 0;
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
