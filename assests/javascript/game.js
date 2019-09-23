$(document).ready(function () {
    $(".character").click(function () {
        characterChoice(this);
    });
    $("#attack-button").click(function () {
        attackButton();
    });
    $("#restart-button").click(function () {
        startGame();
    });
    startGame();
});

var gamePlay = {
    selectedPlayer: null,
    selectedOpponent: null,
    counter: 0,
}

function startGame() {
    gamePlay.selectedPlayer = null;
    gamePlay.selectedOpponent = null;
    gamePlay.counter = 0;
    $("#instructions").text("Choose Your Character");
    $("#attack-button").attr("disabled", true);
    $(".hiddenLose").hide();
    $(".hiddenWin").hide();
    $("#character-choices").append($(".character"));
    $(".character").each(function (index, value) {
        var health = $(value).attr("data-start-health");
        var selectedPlayerId = $(value).attr('id');
        $('#' + selectedPlayerId + " .health span").text(health);

        var attack = $(value).attr("data-start-attack-power");
        var selectedPlayerId = $(value).attr('id');
        $('#' + selectedPlayerId + " .attack span").text(attack);

        $('#' + selectedPlayerId + " .progress-bar").attr("aria-valuemax", health);
    });
}

function characterChoice(that) {
    //SELECTS PLAYER
    if (gamePlay.selectedPlayer === null) {
        $(that).insertBefore($("#battleground"));
        gamePlay.selectedPlayer = that;
        $("#instructions").text("Choose Your Opponent");
    } else if (gamePlay.selectedOpponent === null) {
        $(that).insertAfter($("#battleground"));
        gamePlay.selectedOpponent = that;
        $("#instructions").text("Fight!");
        $("#attack-button").attr("disabled", false);
    }
}

function attackButton() {
    if (gamePlay.selectedPlayer !== null && gamePlay.selectedOpponent !== null) {
        console.log(gamePlay.counter);
        var selectedPlayerId = $(gamePlay.selectedPlayer).attr('id');
        var selectedPlayerAttack = $('#' + selectedPlayerId + " .attack span").text();
        var selectedPlayerHealth = $('#' + selectedPlayerId + " .health span").text();

        var selectedOpponentId = $(gamePlay.selectedOpponent).attr('id');
        var selectedOpponentAttack = $('#' + selectedOpponentId + " .attack span").text();
        var selectedOpponentHealth = $('#' + selectedOpponentId + " .health span").text();

        //SELECTED PLAYER DAMAGES OPPONENT
        selectedOpponentHealth = selectedOpponentHealth - selectedPlayerAttack;
        $('#' + selectedOpponentId + " .health span").text(selectedOpponentHealth);
        $('#' + selectedOpponentId + " .progress-bar").attr("aria-valuenow", selectedOpponentHealth);
        var maxHealth = $('#' + selectedOpponentId).attr("data-start-health");
        $('#' + selectedOpponentId + " .progress-bar").css("width", (100/maxHealth)*selectedOpponentHealth + "%");
        console.log(maxHealth, selectedOpponentHealth, (100/maxHealth)*selectedOpponentHealth);


        //SEE IF OPPONENT IS DEAD
        if (selectedOpponentHealth <= 0) {
            $(".deads").append($(gamePlay.selectedOpponent));
            $("#instructions").text("Choose Another Opponent");
            gamePlay.selectedOpponent = null;
            $("#attack-button").attr("disabled", true);
            gamePlay.counter++;
        }

        //OPPONENT DAMAGES SELECTED PLAYER
        selectedPlayerHealth = selectedPlayerHealth - selectedOpponentAttack;
        $('#' + selectedPlayerId + " .health span").text(selectedPlayerHealth);

        //SEE IF SELECTED PLAYER IS DEAD
        if (selectedPlayerHealth <= 0) {
            $("#attack-button").attr("disabled", true);
            $(".hiddenLose").show();
        } else if (selectedPlayerHealth > 0 && selectedOpponentHealth <= 0 && gamePlay.counter >= 3) {
            $("#attack-button").attr("disabled", true);
            $(".hiddenWin").show();
        }

        //SELECTED PLAYER ATTACK POWER INCREASED
        selectedPlayerAttack = Number(selectedPlayerAttack) + Number($(gamePlay.selectedPlayer).attr("data-start-attack-power"));
        $('#' + selectedPlayerId + " .attack span").text(selectedPlayerAttack);
    }
}