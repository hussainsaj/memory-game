//initial variables
/////////////////////////////////////////////////////////////
let cards_opened;
let cards_matched;
let star_counter;
let moves_counter;
let cards_selected = [];
//list of all the cards
let cards_list1 = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];
let cards_list = cards_list1.concat(cards_list1);

//shuffles the cards
/////////////////////////////////////////////////////////////

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



//resets and starts new game
/////////////////////////////////////////////////////////////

 function new_game() {
	//hides the message if the game is restarted
	$('.message_field').addClass('hide');
	$('.deck').removeClass('hide')
	//gets the cards, shuffles them and puts them back
 	let cards = $('.card');
 	let cards_new_list = shuffle(cards_list);
 	cards_selected = cards.children('i');
 	cards_selected.removeClass('fa-diamond fa-paper-plane-o fa-anchor fa-bolt fa-cube fa-leaf fa-bicycle fa-bomb');
 	cards_selected.each( function(index, item) {
 		$(item).addClass(cards_new_list[index]); 
 	});
	//hides all the cards
	cards.removeClass('match open show');
	//gives each variable an initial value
 	cards_opened = []; 
 	cards_matched = [];
 	star_counter = 3;
 	moves_counter = 0;
 	$('.moves').text(0);
 	$('.fa-star').css('color','#000');
 	clearInterval(timer);
 }



//timer
/////////////////////////////////////////////////////////////

function time_count() {
   ++time;
   var hour = Math.floor(time /3600);
   var minute = Math.floor((time - hour*3600)/60);
   var seconds = time - (hour*3600 + minute*60);
	if (hour>0) {
	   document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
	} else if (minute>0) {
	   document.getElementById("timer").innerHTML = minute + ":" + seconds;
	} else {
	   document.getElementById("timer").innerHTML = seconds;
	}
}

function time_reset() {
	clearInterval(timer);
	time = 0;
	timer = setInterval(time_count, 1000);
}

//variables require to handle time
var timer = setInterval(time_count, 1000);
var time = 0;



//increases move counter
/////////////////////////////////////////////////////////////

function counter_increase() {
	moves_counter += 1;
	$('.moves').text(moves_counter);
	//hides the star if the moves counter reaches a certain number
	if (moves_counter===20) { 
		$('.star_3').css('color','#fefefe');
		star_counter=2;
	} else if (moves_counter===35) {
		$('.star_2').css('color','#fefefe');
		star_counter=1;
	} else if (moves_counter>50) {
		$('.star_1').css('color','#fefefe');
		//hides the deck and shows the losing message
		show_message(false);
	}
}



//checks if selected cared match
/////////////////////////////////////////////////////////////

function check_match() {
	if (cards_opened.length==2) {
		if (cards_opened[0]==cards_opened[1]) {
			$('.card:has(.'+cards_opened[0]+')').addClass('match');
			$('.card:has(.'+cards_opened[0]+')').removeClass('open show');			
			cards_matched.push(cards_opened[0]);
			if (cards_matched.length===8) {
			 	clearInterval(timer);
			 	show_message(true);	
			  }
		} else {
			($('.card:has(.'+cards_opened[0]+')')).removeClass('open show');
			($('.card:has(.'+cards_opened[1]+')')).removeClass('open show');
		}
		cards_opened=[];
	} 
}



//winning and losing message
/////////////////////////////////////////////////////////////

function show_message(won) {
	if (won==true) {
		document.getElementById("message").innerHTML = "Congratulations! It took you "+time+" seconds and your score is "+star_counter+" star(s)!";
	} else {
		document.getElementById("message").innerHTML = "Sorry, you've ran out of moves. Better luck next time!";
	}
	//hides the deck and shows the message
	$('.message_field').removeClass('hide');
	$('.deck').addClass('hide')
}



//event listners
/////////////////////////////////////////////////////////////

$(document).ready(new_game);  //starts a new game when document is loaded

$('.restart').click(new_game); //resets everything

$('.card').click(function(event) {
	//starts the timer
	if (moves_counter===0) {
		time_reset();
	}
	let card = $(event.target); 
	if (!card.hasClass('match') && !card.hasClass('show')) {
		if (cards_opened.length<=1) { 
			card.addClass('open show');
			let cardPic=card.children('i').attr('class').split(' ')[1];
			cards_opened.push(cardPic);
			setTimeout(check_match,800);
			counter_increase();
		}
	}
});

//brings back the deck if user does not wish to restart
$('.stay').click(function() {
	$('.message_field').addClass('hide');
	$('.deck').removeClass('hide')
    clearInterval(timerVar);
});