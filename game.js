let buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).on("keydown", function () {
  if (!started) {
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function (event) {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  let randNum = Math.floor(Math.random() * 4);
  let randColor = buttonColors[randNum];
  gamePattern.push(randColor);
  $("#" + randColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 150);
}
