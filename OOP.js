function Button(previousValue,currentValue){

    this.previousValue = previousValue;
    this.currentValue = currentValue;
    this.currentOp = '';
    this.previousOp = '';
    this.operation = undefined;
    this.computed = false;

    this.clearEverything = function(){
        this.currentOp = '';
        this.previousOp = '';
        this.operation = undefined;
    }

    this.addNumber = function(number){
        if(number === '.' && this.currentOp.includes('.')) return;
        if(this.computed === true){
            this.currentOp = '';
            this.computed = false;
        }
        this.currentOp = this.currentOp.toString() + number.toString()
    }

    this.addOperation = function(operation){
        if(this.currentOp === '') return;
        if(this.previousOp !== ''){
            this.compute()
        }
        this.operation = operation;
        this.previousOp = `${this.currentOp} ${operation}`;
        this.currentOp = '';
    }

    this.compute = function(){
        let result;
        const prev = parseFloat(this.previousOp)
        const curr = parseFloat(this.currentOp)
        if(isNaN(prev) || isNaN(curr)) return;
        switch (this.operation){
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                result = prev / curr;
                break;
            default:
                return;
        }
        this.currentOp = result;
        this.operation = undefined;
        this.previousOp = '';
        this.computed = true;
    }
    this.Display = function(){
        this.currentValue.innerText = this.currentOp;
        this.previousValue.innerText = this.previousOp;
    }
}

let numberButton = document.querySelectorAll('.number');
let operationButton = document.querySelectorAll('.operation');
const clearAll = document.querySelector('#clear');
let finalResult = document.querySelector('#equal');
let previousValue = document.querySelector('#previous');
let currentValue = document.querySelector('#current');

let calculator = new Button(previousValue,currentValue)

numberButton.forEach(button => button.addEventListener('click',() =>{
    calculator.addNumber(button.innerText)
    calculator.Display()
}))
operationButton.forEach(button => button.addEventListener('click',() =>{
    calculator.addOperation(button.innerText)
    calculator.Display()
}))

finalResult.addEventListener('click',button =>{
    calculator.compute()
    calculator.Display()
})

clearAll.addEventListener('click',button =>{
    calculator.clearEverything()
    calculator.Display()
})