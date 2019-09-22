$(document).ready(function () {
    $(".character").click(function () {
        characterChoice(this);
    });

    startGame();
});

var selectedPlayer = null;

function startGame(){
    $("#instructions").text("Choose Your Character");
}

function characterChoice(that) {
    if (selectedPlayer === null) {
        $(that).insertBefore($("#battleground"));
        selectedPlayer = that;
    }
}