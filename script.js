let topDisplay = document.getElementById('dV');
let bottDisplay = document.getElementById('wA');
let answerLog = document.getElementById('answerlog');
let displayValue = "", workingAnswer = 0, equalsPressed = false;

const print = new Audio("sounds/print.mov");
const click = new Audio("sounds/click.mov");
const buttons = [...((document.querySelector(".calculator-buttons")).querySelectorAll('.key'))];
const operators = [...((document.querySelector(".calculator-buttons")).querySelectorAll('.akey'))];
const equals = document.getElementById("=")
const clear = document.getElementById("clear");
const del = document.getElementById("delete");
const point = document.getElementById(".")

let add =  (x,y) => x + y;
let subtract = (x,y) => x - y;
let multiply = (x,y) => x * y;
let divide = (x,y) => x / y;

let operate = (x,y,operator) => {
    switch(operator){
        case "+":
            return Number(add(x,y));
        case "-":
            return Number(subtract(x,y));
        case "×":
            return Number(multiply(x,y));
        case "÷":
            return Number(divide(x,y));
        default:
            return "You entered an invalid operator!";        
    }
}

function bestRound(val, decimals){
    decimals = decimals || 2;
    var multiplier = Math.pow(10, decimals)
    return Math.round((val * multiplier ).toFixed(decimals)) / multiplier;
  }

// let decimal = prompt("Please enter your required number of decimal places", 6);

let updateHTML = () => {
    topDisplay.innerHTML = displayValue;
    bottDisplay.innerHTML = bestRound(workingAnswer, 6);
};

let updateLog = () => {
    answerLog.innerHTML += "<span>"+bestRound(workingAnswer,6)+"</span>";
    print.currentTime = 0;
    print.play();
};

updateHTML();

let addToScreen = x => {
    x.addEventListener("click", () => {
    click.currentTime = 0;
    click.play();
    if (equalsPressed){
        displayValue = "";
        equalsPressed = false;
    }
    displayValue += x.id;
    updateHTML()});
};

let addToScreenOp = x => {
    x.addEventListener("click", () => {
    click.currentTime = 0;
    click.play();
    if (equalsPressed){
    displayValue = workingAnswer.toString();
    equalsPressed = false;
    }
    displayValue += x.id;
    updateHTML();
    point.style.pointerEvents = 'auto';
    });
};

let evalExpression = string => {
    let arr = [];
    if (string.indexOf(".") === 0){
        string = "0" + string;
    }
    if (string.indexOf("-") > 0){
        arr = [string.slice(0, string.indexOf("-")),string.slice(string.indexOf("-") + 1)];
        return operate(evalExpression(arr[0]),evalExpression(arr[1]),"-");
    } else if (string.indexOf("+") > 0){
        arr = [string.slice(0, string.indexOf("+")),string.slice(string.indexOf("+") + 1)];
        return operate(evalExpression(arr[0]),evalExpression(arr[1]),"+");
    } else if (string.indexOf("×") > 0){
        arr = [string.slice(0, string.indexOf("×")),string.slice(string.indexOf("×") + 1)];
        return operate(evalExpression(arr[0]),evalExpression(arr[1]),"×");
    } else if (string.indexOf("÷") > 0){
        arr = [string.slice(0, string.indexOf("÷")),string.slice(string.indexOf("÷") + 1)];
        if (arr[1] === "0"){
            displayValue = "";
            workingAnswer = 0;
            alert("CAN'T DIVIDE BY ZERO, you have been warned...");
            return 0;
        }
        return operate(evalExpression(arr[0]),evalExpression(arr[1]),"÷");
    } else return Number(string);
}

let getWorkingAnswer = () => {
    workingAnswer = evalExpression(displayValue.toString());
    if (isNaN(workingAnswer) || workingAnswer === Infinity || workingAnswer === -Infinity){
        equalsPressed = false;
        displayValue = "";
        workingAnswer = 0;
        alert("STOP MESSSING ABOUT!!")
    }
    
};

point.addEventListener("click", () => {
    point.style.pointerEvents = 'none';;
})
clear.addEventListener("click", () => {
    click.currentTime = 0;
    click.play();
    equalsPressed = false;
    displayValue = "";
    workingAnswer = 0;
    answerLog.innerHTML = "";
    updateHTML();
});

del.addEventListener("click", () => {
    click.currentTime = 0;
    click.play();
    displayValue = displayValue.slice(0,-1);
    updateHTML();
})

equals.addEventListener("click", () => {
    click.currentTime = 0;
    click.play();
    equalsPressed = true;
    getWorkingAnswer();
    updateLog();
    updateHTML();
});

buttons.forEach(addToScreen);
operators.forEach(addToScreenOp);

document.addEventListener("keydown", (event) => {
    switch(event.key){
        case "1":
            document.getElementById("1").click();
        break;
        case "2":
            document.getElementById("2").click();
        break;
        case "3":
            document.getElementById("3").click();
        break;
        case "4":
            document.getElementById("4").click();
        break;
        case "5":
            document.getElementById("5").click();
        break;
        case "6":
            document.getElementById("6").click();
        break;
        case "7":
            document.getElementById("7").click();
        break;
        case "8":
            document.getElementById("8").click();
        break;
        case "9":
            document.getElementById("9").click();
        break;
        case "0":
            document.getElementById("0").click();
        break;
        case "Backspace":
            document.getElementById("delete").click();
        break;
        case " ":
            document.getElementById("clear").click();
        break;
        case ".":
            document.getElementById(".").click();
        break;
        case "+":
            document.getElementById("+").click();
        break;
        case "-":
            document.getElementById("-").click();
        break;
        case "*":
            document.getElementById("×").click();
        break;
        case "/":
            document.getElementById("÷").click();
        break;
        case "Enter":
            document.getElementById("=").click();
        break;
        case "=":
            document.getElementById("=").click();
        break;
    }
}
)


