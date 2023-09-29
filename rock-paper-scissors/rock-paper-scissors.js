
let palyerChoice = "";
let info =  document.getElementById("message");

function selectRock() {
    info.innerHTML = "You selected rock";
    palyerChoice = "rock";
    computerSelect();
}

function selectPaper() {
    info.innerHTML = "You selected paper";
    palyerChoice = "paper";
    computerSelect();
}

function selectScissors() {
    info.innerHTML = "You selected scissors";
    palyerChoice = "scissors";
    computerSelect();
}

function computerSelect() {
     let choices = ["rock", "paper", "scissors"];
     let computerChoice = Math.floor(Math.random() * 3);
     let decision = document.getElementById("computer-selection");
     decision.innerHTML =  `The computer chose ${choices[computerChoice]}`;
     findWinner(choices[computerChoice]);
}

function findWinner(computerChoice) {
    let results = document.getElementById("results");

    if (computerChoice == palyerChoice) {
        results.innerHTML = " It is a tie!";
    }

    if (computerChoice == "rock" && palyerChoice == "paper") {
        results.innerHTML = " You win! ";
    }

    if (computerChoice == "paper" && palyerChoice == "scissors") {
        results.innerHTML = " You win! ";
    }

    if (computerChoice == "scissors" && palyerChoice == "rock") {
        results.innerHTML = " You win! ";
    }

    if (computerChoice == "rock" && palyerChoice == "scissors") {
        results.innerHTML = " The comptuer wins ";
    }

    if (computerChoice == "scissors" && palyerChoice == "paper") {
        results.innerHTML = " The comptuer wins ";
    }

    if (computerChoice == "paper" && palyerChoice == "rock") {
        results.innerHTML = " The comptuer wins ";
    }

}
