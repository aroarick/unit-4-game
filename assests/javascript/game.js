$(document).ready(function () {
    $(".character").click(function () {
        characterChoice(this);
    });
    $("#attack-button").click(function () {
        attackButton();
    });
    $("#restart-button").click(function(){
        startGame();
    });
    startGame();
});

var selectedPlayer = null;
var selectedOpponent = null;

function startGame() {
    selectedPlayer = null;
    selectedOpponent = null;
    $("#instructions").text("Choose Your Character");
    $("#attack-button").attr("disabled", true);
    $("#character-choices").append($(".character"));
}

function characterChoice(that) {
    //SELECTS PLAYER
    if (selectedPlayer === null) {
        $(that).insertBefore($("#battleground"));
        selectedPlayer = that;
        $("#instructions").text("Choose Your Opponent");
    } else if (selectedOpponent === null) {
        $(that).insertAfter($("#battleground"));
        selectedOpponent = that;
        $("#instructions").text("Fight!");
        $("#attack-button").attr("disabled", false);
    }
}

function attackButton() {
    console.log("works");
}