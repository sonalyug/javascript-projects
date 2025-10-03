let display = document.getElementById('display');
let clearButton = document.getElementById('clear');
let backspaceButton = document.getElementById('backspace');
let equalsButton = document.getElementById('equals');

let numbers = document.querySelectorAll('#zero, #one, #two, #three, #four, #five, #six, #seven, #eight, #nine');
let operators = document.querySelectorAll('#add, #subtract, #multiply, #divide');
let decimalButton = document.getElementById('decimal');

let currentNumber = '';
let previousNumber = '';
let currentOperator = '';

numbers.forEach(button => {
    button.addEventListener('click', () => {
        currentNumber += button.textContent;
        display.value = currentNumber;
    });
});

operators.forEach(button => {
    button.addEventListener('click', () => {
        previousNumber = currentNumber;
        currentNumber = '';
        currentOperator = button.textContent;
    });
});

equalsButton.addEventListener('click', () => {
    let result;
    switch (currentOperator) {
        case '+':
            result = parseFloat(previousNumber) + parseFloat(currentNumber);
            break;
        case '-':
            result = parseFloat(previousNumber) - parseFloat(currentNumber);
            break;
        case '*':
            result = parseFloat(previousNumber) * parseFloat(currentNumber);
            break;
        case '/':
            result = parseFloat(previousNumber) / parseFloat(currentNumber);
            break;
        default:
            result = 0;
    }
    display.value = result;
    currentNumber = result.toString();
    previousNumber = '';
    currentOperator = '';
});