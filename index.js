
var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern= [];
var level =0 ;
var started = false;


$(document).keypress(function(){
    if(!started){
    nextSequence();
    $("h1").html("Level "+level);
    started=true;
  }
});

// nextSequence();
$(".btn").click(function (){
  var userChosencolor= $(this).attr('id');
  userClickedPattern.push(userChosencolor);
  checkAnswer(userClickedPattern.length-1);
  playSound(userChosencolor);
  animatepress(userChosencolor);

});

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("h1").html("Level "+level);
  var randomnumber = Math.floor(Math.random()*4);
  var randomChosencolor = buttonColors[randomnumber];
  gamePattern.push(randomChosencolor);
  $("."+randomChosencolor).fadeOut(100).fadeIn(100);
  playSound(randomChosencolor);


}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatepress(name){
  $("."+name).addClass("pressed");
  setTimeout(function(){
    $("."+name).removeClass("pressed")}
    ,100);
}

function checkAnswer(currLevel){
if(gamePattern[currLevel]===userClickedPattern[currLevel]) {

  if (userClickedPattern.length === gamePattern.length){
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
}
else{
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over")}
    ,200);
    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();
}
}

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];

}
