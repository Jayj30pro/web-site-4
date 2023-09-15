let moves = [0,1,2,3,4,5,6,7,8];
let score1 = document.getElementById("player1");
let score2 = document.getElementById("player2");
let playSwitch = document.getElementById("cahnge-oponent");
let currentTurn = document.getElementById("turn");
let playerTurn = 0;
let currentPlayer = 0;
let plyreScr1 = 0;
let plyreScr2 = 0;


function areYouSure() {
    if (currentPlayer == 0){
        if (confirm(" Are you sure you want to play against Nicole? \nScores will reset!") == true) {
            changeOponent();
        }   
    }
    else if (currentPlayer == 1){
        if (confirm(" Is Nicole too much for you? \nScores will reset!") == true) {
            changeOponent();
        } 
    }
}

function changeNames() {
    if (currentPlayer == 1) {
        score1.innerHTML = " Player 1 <br/>0 ";
        score2.innerHTML = " Nicole <br/>0 ";    
    }
    else {
        score1.innerHTML = " Player 1 <br/>0 ";
        score2.innerHTML = " Player 2 <br/>0 ";        
    }

}

function changeOponent() {

    if (currentPlayer == 0 ) {
        playSwitch.innerHTML =  " 2 Player Mode ";
        currentPlayer = 1;
        playerTurn = 3;
        changePlayer();
        clearBoard();
        changeNames();
    }
    else {
        playSwitch.innerHTML =  " Play the Computer ";
        currentPlayer = 0;
        playerTurn = 1;
        changePlayer();
        clearBoard();
        changeNames();
    }
}

function changePlayer() {
    if (playerTurn == 0) {
        currentTurn.innerHTML = "<div class='glow2'> 0's turn </div>";
        playerTurn = 1;
    }
    else if (playerTurn == 1) {
        currentTurn.innerHTML = "<div class='glow1'> X's turn </div>";
        playerTurn = 0;
    }
    else if (playerTurn == 2) {
        currentTurn.innerHTML = "<div class='glow2'> Nicole's turn </div>";
        playerTurn = 3;
        setTimeout(function(){
            nicoleMove();
        },500);
        
    }
    else {
        currentTurn.innerHTML = "<div class='glow1'> Player's turn </div>";
        playerTurn = 2;
    }
}

function makeMove(title) {
    let spot = document.getElementById(title);
    if (playerTurn == 0 || playerTurn == 2) {
        spot.innerHTML = " X ";
        changePlayer();
    }
    else {
        spot.innerHTML = " O ";
        changePlayer();
    }
}

function topLeft() {
    makeMove("top-left");
    used("top-left");

}
function topCenter() {
    makeMove("top-center");
    used("top-center");
}
function topRight() {
    makeMove("top-right");
    used("top-right");
}
function midLeft() {
    makeMove("mid-left");
    used("mid-left");
}
function midCenter() {
    makeMove("mid-center");
    used("mid-center");
}
function midRight() {
    makeMove("mid-right");
    used("mid-right");
}
function lowLeft() {
    makeMove("low-left");
    used("low-left");
}
function lowCenter() {
    makeMove("low-center");
    used("low-center");
}
function lowRight() {
    makeMove("low-right");
    used("low-right");
}

function reset(elementID) {
    let spot = document.getElementById(elementID);
    spot.innerHTML = " - ";
    spot.onclick = function() {
        makeMove(elementID);
        used(elementID);
    }

}
function clearBoardR() {
    reset("top-left");
    reset("top-center");
    reset("top-right");
    reset("mid-left");
    reset("mid-center");
    reset("mid-right");
    reset("low-left");
    reset("low-center");
    reset("low-right");
    if (playerTurn > 1) {
        playerTurn = 3; 
    }
    else {
        playerTurn = 1;
    }
    
    changePlayer();
    moves = [0,1,2,3,4,5,6,7,8];
    
}
function clearBoard() {
    reset("top-left");
    reset("top-center");
    reset("top-right");
    reset("mid-left");
    reset("mid-center");
    reset("mid-right");
    reset("low-left");
    reset("low-center");
    reset("low-right");
    moves = [0,1,2,3,4,5,6,7,8];
}

function used(tile) {
    let spot = document.getElementById(tile);
    spot.onclick = function() {
        currentTurn.innerHTML = "<div class='glow3'> This spot is taken </div>";
    }
    if (tile == "top-left") {
        reMove = 0;
    }
    else if (tile == "top-center") {
        reMove = 1;
    }
    else if (tile == "top-right") {
        reMove = 2;
    }
    else if (tile == "mid-left") {
        reMove = 3;
    }
    else if (tile == "mid-center") {
        reMove = 4;
    }
    else if (tile == "mid-right") {
        reMove = 5;
    }
    else if (tile == "low-left") {
        reMove = 6;
    }
    else if (tile == "low-center") {
        reMove = 7;
    }
    else if (tile == "low-right") {
        reMove = 8;
    }
    let newMoves = moves.filter(usedMove);

    function usedMove(fresh) {
        return fresh != reMove;
    }
    
    moves = newMoves;
    checkWinner();
    

    
}

function nicoleMove() {
    let roll = Math.floor(Math.random()*moves.length);
    let select = moves[roll];
    if (select == 0) {
        topLeft();
    }
    else if (select == 1) {
        topCenter();
    }
    else if (select == 2) {
        topRight();
    }
    else if (select == 3) {
        midLeft();
    }
    else if (select == 4) {
        midCenter();
    }
    else if (select == 5) {
        midRight();
    }
    else if (select == 6) {
        lowLeft();
    }
    else if (select == 7) {
        lowCenter();
    }
    else if (select == 8) {
        lowRight();
    }
    
}

// ---------------------End game --------------------------
function gameEnd(tile) {
    let spot = document.getElementById(tile);
    spot.onclick = function() {
        currentTurn.innerHTML = "<div class='glow3'> The Game Has Ended <br/> Press Reset to Play Again </div>";
    }
}

function playerScore1() {
    plyreScr1++;
    score1.innerHTML = " Player 1 <br/>" + plyreScr1; 
}

function playerScore2() {
    plyreScr2++;
    score2.innerHTML = " Player 2 <br/>" + plyreScr2;
}

function nicoleScore() {
    plyreScr2++;
    score2.innerHTML = " Nicole <br/>" + plyreScr2;
}

function xWin() {
    currentTurn.innerHTML = "<div class='glow1'> Player 1 Wins! <br/> Game Over </div>";
    gameOver();
    playerScore1();
}

function oWin() {
    currentTurn.innerHTML = "<div class='glow2'> Player 2 Wins! <br/> Game Over </div>";
    gameOver();
    playerScore2();
}

function nicoleWin() {
    currentTurn.innerHTML = "<div class='glow2'> Nicole Wins! <br/> Game Over </div>";
    gameOver();
    nicoleScore();
}

function gameOver() {
    gameEnd("top-left");
    gameEnd("top-center");
    gameEnd("top-right");
    gameEnd("mid-left");
    gameEnd("mid-center");
    gameEnd("mid-right");
    gameEnd("low-left");
    gameEnd("low-center");
    gameEnd("low-right");
    moves = [];
}

function checkWinner() {
    let tl = document.getElementById("top-left");
    let tc = document.getElementById("top-center");
    let tr = document.getElementById("top-right");
    let ml = document.getElementById("mid-left");
    let mc = document.getElementById("mid-center");
    let mr = document.getElementById("mid-right");
    let ll = document.getElementById("low-left");
    let lc = document.getElementById("low-center");
    let lr = document.getElementById("low-right");

    //horizontal
    if (tl.innerHTML == " X " && tc.innerHTML == " X " && tr.innerHTML == " X ") {
        xWin();
    }
    else if (tl.innerHTML == " O " && tc.innerHTML == " O " && tr.innerHTML == " O ") {
        if (currentPlayer == 1) {
            nicoleWin();
        }
        else{
            oWin();
        }
    }
    else if (ml.innerHTML == " X " && mc.innerHTML == " X " && mr.innerHTML == " X ") {
        xWin();
    }
    else if (ml.innerHTML == " O " && mc.innerHTML == " O " && mr.innerHTML == " O ") {
        if (currentPlayer == 1) {
            nicoleWin();
        }
        else{
            oWin();
        }
    }
    else if (ll.innerHTML == " X " && lc.innerHTML == " X " && lr.innerHTML == " X ") {
        xWin();
    }
    else if (ll.innerHTML == " O " && lc.innerHTML == " O " && lr.innerHTML == " O ") {
        if (currentPlayer == 1) {
            nicoleWin();
        }
        else{
            oWin();
        }
    }
    
    //vertical 
    else if (tl.innerHTML == " X " && ml.innerHTML == " X " && ll.innerHTML == " X ") {
        xWin();
    }
    else if (tl.innerHTML == " O " && ml.innerHTML == " O " && ll.innerHTML == " O ") {
        if (currentPlayer == 1) {
            nicoleWin();
        }
        else{
            oWin();
        }
    }
    else if (tc.innerHTML == " X " && mc.innerHTML == " X " && lc.innerHTML == " X ") {
        xWin();
    }
    else if (tc.innerHTML == " O " && mc.innerHTML == " O " && lc.innerHTML == " O ") {
        if (currentPlayer == 1) {
            nicoleWin();
        }
        else{
            oWin();
        }
    }
    else if (tr.innerHTML == " X " && mr.innerHTML == " X " && lr.innerHTML == " X ") {
        xWin();
    }
    else if (tr.innerHTML == " O " && mr.innerHTML == " O " && lr.innerHTML == " O ") {
        if (currentPlayer == 1) {
            nicoleWin();
        }
        else{
            oWin();
        }
    }
    //diagonal
    else if (tl.innerHTML == " X " && mc.innerHTML == " X " && lr.innerHTML == " X ") {
        xWin();
    }
    else if (tl.innerHTML == " O " && mc.innerHTML == " O " && lr.innerHTML == " O ") {
        if (currentPlayer == 1) {
            nicoleWin();
        }
        else{
            oWin();
        }
    }
    else if (tr.innerHTML == " X " && mc.innerHTML == " X " && ll.innerHTML == " X ") {
        xWin();
    }
    else if (tr.innerHTML == " O " && mc.innerHTML == " O " && ll.innerHTML == " O ") {
        if (currentPlayer == 1) {
            nicoleWin();
        }
        else{
            oWin();
        }
    }
    //no moves 
    else if (moves.length == 0) {
        currentTurn.innerHTML = "<div class='glow3'> No more moves <br/>Game Over </div>";
        gameOver();
    }
    
}

clearBoardR();