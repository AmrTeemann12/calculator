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
    if (+b === 0) return "Error";
    return a / b;
}

let num1 = "";
let operator = "";
let num2 = "";

function operate(num1, operator, num2){
    let result
    if(`${num1}`.includes("π")){
        let split1 = num1.split("π")

        for(let i = 0; i < split1.length; i++){
            if(split1[i] === "") split1[i] = 1;
        }
        let red1 = split1.reduce((sum, item) => sum * item, 1)
        
        num1 = red1 * Math.PI**(split1.length-1)
    }

    if(num2.includes("π")){
        let split2 = num2.split("π")

        for(let i = 0; i < split2.length; i++){
            if(split2[i] === "") split2[i] = 1;
        }
        let red2 = split2.reduce((sum, item) => sum * item, 1)

        num2 = red2 * Math.PI**(split2.length-1)
    }

    num1 = +num1;
    num2 = +num2;
    switch(operator){
        case "+":
            result = add(num1, num2)
        break;
        case "-":
            result = subtract(num1, num2)
        break;
        case "×":
            result = multiply(num1, num2)
        break;
        case "÷":
            result = divide(num1, num2)
        break;
        default:
            result = num1;
    }
    if (Number.isNaN(result)) return "Error";
    return result;
}

function updateOut (){
    const result = operate(num1, operator, num2);
    if(result === "Error") return;
    displayOut.textContent = result;
}

function updateIn(){
    displayIn.textContent = `${num1} ${operator} ${num2}`
}

function calc(){
    const result = operate(num1, operator, num2)
    displayIn.textContent = result;
    num1 = result;
    operator = "";
    num2 = "";
    displayOut.textContent = "";
    overPrevious = true;
}

const numBtns = document.querySelectorAll(".num-btn")
const calcBtns = document.querySelectorAll(".calc-btn")
const equal = document.querySelector("#equal")
const clrAll = document.querySelector("#clr-all")
const displayIn = document.querySelector("#input")
const displayOut = document.querySelector("#output")
const pi = document.querySelector("#pi")
const convert = document.querySelector("#convert")
const clrLast = document.querySelector("#clr-last")
let overPrevious = false;

numBtns.forEach(btn => btn.addEventListener("click", (e) => {
    if (overPrevious && !operator){
        num1 = "";
        overPrevious = false;
    }

    if (!operator){
        if(!(num1.includes(".") && e.target.textContent === ".")){
            num1 += e.target.textContent
        }
    } else if(!(num2.includes(".") && e.target.textContent === ".")){
        num2 += e.target.textContent
    }

    updateIn()
    updateOut()
}))

calcBtns.forEach(btn => btn.addEventListener("click", (e) => {
    if (!operator && num1){
        operator = e.target.textContent;
        updateIn()
    }
    if(num2){
       calc()
       operator = e.target.textContent;
       updateIn()
    }
}))

equal.addEventListener("click", calc)

clrAll.addEventListener("click", () => {
    num1 = "";
    num2 = "";
    operator = "";
    displayIn.textContent = "";
    displayOut.textContent = "";
})

convert.addEventListener("click", () => {
    if(num1 !== "Error"){ 
        if(!operator && num1 && !`${num1}`.includes("-")){
            num1 = "-" + num1;
        } else if(!operator && num1 && `${num1}`.includes("-")){
            num1 = `${num1}`.slice(1);
        } else if (num2 && !num2.includes("-")){
            num2 = "-" + num2;
        } else if(num2 && num2.includes("-")){
            num2 = num2.slice(1);
        }
    }
    updateIn()
    updateOut()
})

clrLast.addEventListener("click", () => {
    if(!overPrevious && !operator){
        num1 = num1.slice(0, -1);
        if(num1 === "-") num1 = "";
    } else if(operator && !num2){
        operator = ""
    } else if(num2){
        num2 = num2.slice(0, -1);
        if(num2 === "-") num2 = "";
    }

    updateIn()
    updateOut()
})