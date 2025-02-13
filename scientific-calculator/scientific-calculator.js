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

function percent() {
    let display = document.getElementById("display");
    
    if (display.innerHTML != 0) {

        if (currentFunction == ""){
            
            let temp = Number(display.innerHTML); 
            temp *= 0.01;
            display.innerHTML = temp;

            
        }
        else {
            if (currentFunction != ""){
                let mathProblem = display.innerHTML.split(" ");
                firstNumber = Number(mathProblem[0]);
                activeFunction = mathProblem[1];
                secondNumber = Number(mathProblem[2]);
                secondNumber *= 0.01;
                display.innerHTML = firstNumber + " " + activeFunction + " " + secondNumber;
            }    
        }
    }
}

function exponent() {
    if (currentFunction == ""){
        currentFunction = "^";
        display.innerHTML += " ^ ";
    }
}

function divide() {
    if (currentFunction == ""){
        currentFunction = "/";
        display.innerHTML += " / ";
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

function multiply() {
    if (currentFunction == ""){
        currentFunction = "*";
        display.innerHTML += " * ";
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

function subtract() {
    if (currentFunction == ""){
        currentFunction = "-";
        display.innerHTML += " - ";
    }
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

function add() {
    if (currentFunction == ""){
        currentFunction = "+";
        display.innerHTML += " + ";
    }
}


function positiveNegative() {
    let display = document.getElementById("display");
    let result = "";
    // first number
    if (currentFunction == ""){
        let currentNumber = (display.innerHTML);
        negativeNumber = currentNumber;
        negativeNumber *= -1;
        display.innerHTML = negativeNumber;
    }
    // second number
    else {
        if (currentFunction != ""){
            let mathProblem = display.innerHTML.split(" ");
            firstNumber = Number(mathProblem[0]);
            activeFunction = mathProblem[1];
            secondNumber = Number(mathProblem[2]);
            secondNumber *= -1;
            display.innerHTML = firstNumber + " " + activeFunction + " " + secondNumber;
        }    
    
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

function decimal() {
    let display = document.getElementById("display");
    if (display.innerHTML == 0) {
        display.innerHTML = '.';
    }
    if (currentFunction == ""){
        if(display.innerHTML.includes('.')){
            console.log('nothing happened');
        }
        else {
            display.innerHTML += "."
        }
    }
    else {
        if (currentFunction != ""){
            let mathProblem = display.innerHTML.split(" ");
            firstNumber = Number(mathProblem[0]);
            activeFunction = mathProblem[1];
            secondNumber = Number(mathProblem[2]);
            secondNumber += ".";
            display.innerHTML = firstNumber + " " + activeFunction + " " + secondNumber;
        }    
    }
}

function equals() {
    let display = document.getElementById("display");
    if (currentFunction == ""){
        console.log("pick a function first");
    }
    if (currentFunction != ""){
        let mathProblem = display.innerHTML.split(" ");
        firstNumber = Number(mathProblem[0]);
        secondNumber = Number(mathProblem[2]);
        switch(mathProblem[1]) {
            case "+":
                display.innerHTML = firstNumber + secondNumber;
                break;
            
            case "-":
                display.innerHTML = firstNumber - secondNumber;
                break;

            case "*":
                display.innerHTML = firstNumber * secondNumber;
                break;
        
            case "/":
                display.innerHTML = firstNumber / secondNumber;
                break;

            case "^":
                display.innerHTML = Math.pow(firstNumber, secondNumber);
                break;
        }
        //console.log(mathProblem);
        
        currentFunction = "";
    
    }
    
}