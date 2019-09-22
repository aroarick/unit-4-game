$(document).ready(function () {
    $(".character").click(function () {
        characterChoice(this);
    });

    startGame();
});

var selectedPlayer = null;
var selectedOpponent = null;

function startGame(){
    $("#instructions").text("Choose Your Character");
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
        
    }
}