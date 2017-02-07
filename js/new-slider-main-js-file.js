$(document).ready(function ($) {initAll();});

	var timer1 = 0;
	var moveCounter = 1;
	var clickIndex = 0;
	var a = '<li><img class="display-img" alt="psieslajdy" src="images/slide';
	var b = '.png"></li>'
	var allImages = [a+1+b,a+2+b,a+3+b,a+4+b,a+5+b,a+6+b,a+1+b,a+2+b,a+3+b,a+4+b,a+5+b,a+6+b];

function initAll() {

timer1 = setInterval(function () {moveRightAuto();}, 6000);

var slideCount = $('#slid-img-chan ul li').length;
var slideWidth = $('#slid-img-chan ul li').width();
var slideHeight = $('#slid-img-chan ul li').height();
var sliderUlWidth = slideCount * slideWidth;
$('#slid-img-chan').css({ width: slideWidth, height: slideHeight });
$('#slid-img-chan ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
$('#slid-img-chan ul li:last-child').prependTo('#slid-img-chan ul');

function moveLeft() {
	$('#slid-img-chan ul').animate({
		left: + slideWidth
	}, 1200, function () {
		$('#slid-img-chan ul').css('left', '');
	});
};
function moveLeftAuto() {
	$('#slid-img-chan ul').animate({
		left: + slideWidth
	}, 1200, function () {
		$('#slid-img-chan ul li:last-child').prependTo('#slid-img-chan ul');
		$('#slid-img-chan ul').css('left', '');
	});
};
function moveRight() {
	$('#slid-img-chan ul').animate({
		left: - slideWidth
	}, 1200, function () {
		$('#slid-img-chan ul').css('left', '');
	});	
};
function moveRightAuto() {
	$('#slid-img-chan ul').animate({
		left: - slideWidth
	}, 1200, function () {
		$('#slid-img-chan ul li:first-child').appendTo('#slid-img-chan ul');
		$('#slid-img-chan ul').css('left', '');
	});	
};
function listFilling(clickInd) {
	var newLiSet = "";
	for (i=0; i<6; i++) {
		var loopCnt = i+clickInd-1;
		newLiSet = newLiSet + allImages[loopCnt];
	}
	$('#myOwnSlider').html(newLiSet);
};
$('#previous-slide').click(function () {
	$('#slid-img-chan ul').stop();
	moveLeftAuto();
	moveCounting(1);
	clearInterval(timer1);
	timer1 = setInterval(function () {
		moveRightAuto();
	}, 6000);
});
$('#next-slide').click(function () {
	$('#slid-img-chan ul').stop();
	moveRightAuto();
	moveCounting(2);
	clearInterval(timer1);
	timer1 = setInterval(function () {
		moveRightAuto();
	}, 6000);
});
function continueInterval() {
	clearInterval(timer1);
	timer1 = setInterval(function () {
	moveRightAuto();
	}, 6000);
};
function moveCounting(toDo) {
	if (toDo === 1) {
		moveCounter--;
		if (moveCounter < 1) {
			moveCounter = 6;
		}
	} else if (toDo === 2) {
		moveCounter++;
		if (moveCounter >6) {
			moveCounter = 1;
		}
	}
};
function teleport(clickNum){
	var slideNum = clickNum - 1;
	$('#slid-img-chan ul').stop();
	clickIndex = clickNum;
	if (clickIndex > moveCounter) {
		$('#myOwnSlider').find('li').first().next().after(allImages[slideNum]);
		moveRight();	
		setTimeout(function() {
			listFilling(clickIndex);
			$('#slid-img-chan ul li:last-child').prependTo('#slid-img-chan ul');
			continueInterval();
		}, 1200);
	} else if (clickIndex < moveCounter) {
		$('#myOwnSlider').find('li').first().prepend(allImages[slideNum]);
		moveLeft();
		setTimeout(function() {
			listFilling(clickIndex);
			$('#slid-img-chan ul li:last-child').prependTo('#slid-img-chan ul');
			continueInterval();
		}, 1200);		
	};
	moveCounter = clickNum;
}; //end of teleport
$('#first-thumb-img').click(function() {
	teleport(1);});
$('#second-thumb-img').click(function() {
	teleport(2);});
$('#third-thumb-img').click(function() {
	teleport(3);});
$('#fourth-thumb-img').click(function() {
	teleport(4);});
$('#fifth-thumb-img').click(function() {
	teleport(5);});
$('#sixth-thumb-img').click(function() {
	teleport(6);});
}; //end of initAll