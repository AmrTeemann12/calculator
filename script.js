function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

let num1 = "";
let operator = "";
let num2 = "";

function operate(num1, operator, num2){
    switch(operator){
        case "+":
            return add(num1, num2)
        break;
        case "-":
            return subtract(num1, num2)
        break;
        case "×":
            return multiply(num1, num2)
        break;
        case "÷":
            return divide(num1, num2)
        break;
        default:
            return num1;
    }
}

function updateOut (){
    const result = operate(+num1, operator, +num2);
    displayOut.textContent = result;
}

const numBtns = document.querySelectorAll(".num-btn")
const opSign = document.querySelectorAll(".calc-btn")
const equal = document.querySelector("#equal")
const clrAll = document.querySelector("#clr-all")
const displayIn = document.querySelector("#input")
const displayOut = document.querySelector("#output")

numBtns.forEach(btn => btn.addEventListener("click", (e) => {
    if (!operator){
        num1 += e.target.textContent
    } else {
        num2 += e.target.textContent
    }
    displayIn.textContent = `${num1} ${operator} ${num2}`
    updateOut()
}))

opSign.forEach(btn => btn.addEventListener("click", (e) => {
    if (!operator && num1){
        operator = e.target.textContent
    }
    displayIn.textContent = `${num1} ${operator} ${num2}`
}))

equal.addEventListener("click", () => {
    const result = operate(+num1, operator, +num2)
    console.log(result)
    displayIn.textContent = result;
    num1 = result;
    operator = "";
    num2 = "";
    displayOut.textContent = "";
})

clrAll.addEventListener("click", () => {
    num1 = "";
    num2 = "";
    operator = "";
    displayIn.textContent = "";
    displayOut.textContent = "";
})