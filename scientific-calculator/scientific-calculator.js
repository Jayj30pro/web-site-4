let firstNumber = 0;
let secondNumber = 0;
let currentFunction = "";


function clearScreen() {
    let display = document.getElementById("display");
    
    display.innerHTML = 0;
    firstNumber = 0;
    secondNumber = 0;
    currentFunction = ""
}

function one() {
    let display = document.getElementById("display");
    
    if (display.innerHTML == 0) {
        display.innerHTML = 1;
    }
    else {
        display.innerHTML += 1;
    }
    
}

function two() {
    let display = document.getElementById("display");
    
    if (display.innerHTML == 0) {
        display.innerHTML = 2;
    }
    else {
        display.innerHTML += 2;
    }
    
}

function three() {
    let display = document.getElementById("display");
    
    if (display.innerHTML == 0) {
        display.innerHTML = 3;
    }
    else {
        display.innerHTML += 3;
    }
    
}

function four() {
    let display = document.getElementById("display");
    
    if (display.innerHTML == 0) {
        display.innerHTML = 4;
    }
    else {
        display.innerHTML += 4;
    }
    
}

function five() {
    let display = document.getElementById("display");
    
    if (display.innerHTML == 0) {
        display.innerHTML = 5;
    }
    else {
        display.innerHTML += 5;
    }
    
}

function six() {
    let display = document.getElementById("display");
    
    if (display.innerHTML == 0) {
        display.innerHTML = 6;
    }
    else {
        display.innerHTML += 6;
    }
    
}

function seven() {
    let display = document.getElementById("display");
    
    if (display.innerHTML == 0) {
        display.innerHTML = 7;
    }
    else {
        display.innerHTML += 7;
    }
    
}

function eight() {
    let display = document.getElementById("display");
    
    if (display.innerHTML == 0) {
        display.innerHTML = 8;
    }
    else {
        display.innerHTML += 8;
    }
    
}

function nine() {
    let display = document.getElementById("display");
    
    if (display.innerHTML == 0) {
        display.innerHTML = 9;
    }
    else {
        display.innerHTML += 9;
    }
    
}

function zero() {
    let display = document.getElementById("display");
    
    if (display.innerHTML == 0) {
        display.innerHTML = 0;
    }
    else {
        display.innerHTML += 0;
    }
    
}

function add() {
    if (currentFunction == ""){
        currentFunction = "+";
        display.innerHTML += " + ";
    }
    
    

}

function equals() {
    let display = document.getElementById("display");
    if (currentFunction != ""){
        let mathProblem = display.innerHTML.split(" ");
        firstNumber = Number(mathProblem[0]);
        secondNumber = Number(mathProblem[2]);
        console.log(mathProblem);
        display.innerHTML = firstNumber + secondNumber;
    }
    
}