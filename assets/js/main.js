
_up		= document.getElementById('UP');
_right  = document.getElementById('RIGHT');
_down   = document.getElementById('DOWN');
_left   = document.getElementById('LEFT');

_score = document.getElementById("score");

timer = false;
bar = document.getElementById("bar");
bar_index = 1;
var timer_obj;
var timer_start,timer_end;

var nalku = {};
nalku.wordsList = ['four','palm','five','jazz','buzz','fuzz','fizz','jump','quiz','jack','zyme','whiz','joke','java','jerk','fuze','putz','quip','jeep','flux','john','jury','jobs','nuts'];
nalku.currentWord = [];
nalku.wordIndex = 0;
nalku.wordsCompleted = 0;
nalku.init = function() {

	this.updateButtons();
	this.updateBoard();

};

nalku.updateButtons = function(){
	_up.innerHTML = nalku.wordsList[nalku.wordIndex][0];
	_right.innerHTML = nalku.wordsList[nalku.wordIndex][2];
	_down.innerHTML = nalku.wordsList[nalku.wordIndex][3];
	_left.innerHTML = nalku.wordsList[nalku.wordIndex][1];
}
nalku.updateBoard = function(){

	_el = document.getElementById('board');
		for(var i=0;i < _el.children.length;i++){
			_child = _el.children[i];
			_child.innerHTML = (typeof(nalku.currentWord[i]) != "undefined" ) ? nalku.currentWord[i] : ''; 
		}

	if(nalku.currentWord.length == 4){
		nalku.decide()
	}

}

nalku.currentWordString = function(){
	var str = '';
	for(var j=0;j<nalku.currentWord.length;j++){
		str+=nalku.currentWord[j];
	}
	return str;
}

nalku.removeLetterFromCurrentWord = function(letter){

	_arr = [];
	status = true;
	for(var k=0;k<nalku.currentWord.length;k++){
		if((letter == nalku.currentWord[k])){
			status = false;
		}else{
			_arr.push(nalku.currentWord[k])
		}
	}

	nalku.currentWord = _arr;
	nalku.updateBoard();
}

nalku.resetBoard = function(){

		_up.classList.remove('active');
	 _right.classList.remove('active');
	  _down.classList.remove('active');
	  _left.classList.remove('active');

	nalku.currentWord = [];

}

nalku.updateScore = function(){
	nalku.wordsCompleted += 1;
	score.innerHTML = nalku.wordsCompleted;

}

nalku.reset = function(){
	_up.classList.remove('active');
	 _right.classList.remove('active');
	  _down.classList.remove('active');
	  _left.classList.remove('active');

	nalku.currentWord = [];

	nalku.wordIndex = 0;

	nalku.updateButtons();

	nalku.updateBoard();

	timerReset();
	window.clearInterval(timer_obj);
	timer = false;

	nalku.wordsCompleted = -1;

	nalku.updateScore();

}

nalku.finish = function(){
	alert("Game over");

	nalku.reset();
}

nalku.gameOver = function(to){
	alert("Time up");
	window.clearInterval(to);
	nalku.reset();
}

nalku.next = function(){
	nalku.resetBoard();
	nalku.wordIndex = nalku.wordIndex + 1;
	nalku.updateScore();
	if(nalku.wordsList.length <= nalku.wordIndex){
		nalku.finish();
	}else{
		nalku.updateButtons();
	}
	
}

nalku.decide = function(){

	if( nalku.wordsList[nalku.wordIndex] === nalku.currentWordString() ){
		console.log(bar_index);
		bar_index = bar_index - (0.5*bar_index);
		nalku.next();
	}else{
		alert("Wrong");
	}

}

nalku.init();



function timerStart(){
	timer_obj = window.setInterval(function(){
		bar.style.width = (bar_index * .5) + "%";
		bar_index++;

		if(bar_index >= 200){
			nalku.gameOver(timer_obj);
		}

	},30)
}

function timerReset(){
	bar_index = 0;
	bar.style.width = "0";

}

handleClick = function(el,val){

	if(timer == false){
		timer = true;
		timerStart();
	}

	if(el.classList.contains('active')){
		console.log('active');
		nalku.removeLetterFromCurrentWord(val);
		el.classList.remove('active');
	}else{
		if(nalku.currentWord.length <= 4 ){
			nalku.currentWord.push(val);
			el.classList.add('active');
			nalku.updateBoard();
		}
	}
	console.log("handleClick",nalku.currentWord)
}


_up.addEventListener('click',function(e){
	handleClick(e.target,e.target.textContent);
});

_right.addEventListener('click',function(e){
	handleClick(e.target,e.target.textContent);
});

_down.addEventListener('click',function(e){
	handleClick(e.target,e.target.textContent);
});

_left.addEventListener('click',function(e){
	handleClick(e.target,e.target.textContent);
});

window.addEventListener('keypress',function(e){
	console.log(e.keyCode);
	if(e.keyCode == 38){
		val = _up.textContent;
		handleClick(_up,val);
	}else if(e.keyCode == 39){
		val = _right.textContent;
		handleClick(_right,val);
	}else if(e.keyCode == 40){
		val = _down.textContent;
		handleClick(_down,val);
	}else if(e.keyCode == 37){
		val = _left.textContent;
		handleClick(_left,val);
	}
})


if(window.localStorage){
	console.log("local")
}