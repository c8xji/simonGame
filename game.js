let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 1;
let gameStarted = false;

$(document).ready(function() {
    $(".btn").prop("disabled", true);
    $("h1").on("touchstart", function() {
        let start = $("h1").text();
        if (start === "Press A Key to Start" || start === "Game Over, Press Any Key to Restart") {
            $("h2").fadeOut(200, function() { 
                $(this).text("You are currently on level " + level).fadeIn(400); 
            });
            gameStarted = true;
            $(".btn").prop("disabled", false);
            nextSequence();
        }
    });
});

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(120).fadeIn(50);

    playSound(randomChosenColour);
    level++;
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function gameOver() {
    let body = $("body");
    body.addClass("game-over");
    setTimeout(() => {
        body.removeClass("game-over");
        }, 200);
    userClickedPattern = [];
    gamePattern = [];
    $(".btn").prop("disabled", true);
    gameStarted = false;
    let restart = $("h1");
    restart.text("Game Over, Press Any Key to Restart");
    level = 1;
}

function checkAnswer() {
    let correct = true;
    for (let i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] !== gamePattern[i]) {
            let wrong = new Audio("sounds/wrong.mp3");
            wrong.play();
            gameOver();
            correct = false;
            break;
        }
    }
    if (userClickedPattern.length === gamePattern.length) {
        if (correct) {
            userClickedPattern = [];
            setTimeout(() => {
             $("h2").text("You are currently on level " + level);   
             nextSequence();
            }, 1000);
            
        }
    } 

}


$(".btn").click(function () {
    if (!gameStarted) return;

    let userChoseColour = $(this).attr("id");
    userClickedPattern.push(userChoseColour);

    let self = $(this);
    self.fadeOut(120).fadeIn(50);
    self.addClass("pressed");

    setTimeout(function(){
        self.removeClass("pressed");
    }, 200);

    playSound(userChoseColour);
    checkAnswer();
});

$(document).keydown(function(){
    let start = $("h1").text();
    if (start === "Press A Key to Start" || start === "Game Over, Press Any Key to Restart") {
        $("h1").text("Simon");
        $("h2").stop(true, true).hide().text("You are currently on level " + level).fadeIn(400);
        gameStarted = true;
        $(".btn").prop("disabled", false);
        nextSequence();
    }
});
