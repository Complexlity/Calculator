class Calculator {
    constructor( previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        message.innerHTML = ''
    }

    delete(){
        message.style.display = 'none'
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }

    appendNumber(number){
        if (this.currentOperand.toString().length > 12){
            message.style.display = 'block'
            message.innerHTML = 'CANNOT EXCEED 12 CHARACTERS'
            setTimeout(() => {
                message.style.display = 'none'
            }, 1000)
            return
        }
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOPeration(operation){
        if (this.currentOperand === '') return
        if (this.previousOperand != '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation.toFixed(2)

        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ''
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits:0
            })
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
            }
            else {
                return integerDisplay
            }
        
    }
    updateDisplay(){
        if (this.currentOperand.toString().length > 14){
            message.style.display = 'block'
            message.innerHTML = 'NOTE: Number Too Large!! Result May Be Inaccurate!!'
            setTimeout(() => {
                message.innerHTML = ''
            }, 3000)
        }
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else{
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const message = document.querySelector('[data-message]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


window.setInterval(function() {
  currentOperandTextElement.scrollLeft = currentOperandTextElement.scrollWidth;
}, 5000);


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOPeration(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})


allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()

})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()

})

// function badDisplay(){
//     let tested = calculator.currentOperand.toString().length
//     console.log(tested)
//     if (tested > 15){
//         console.log('I failed')
//         message.innerHTML = 'Max Number Reached'
//         return true
//     }

//     else if (tested <= 15){
//         console.log('I passed')
//         message.innerHTML = ''
//         return false
//     }
// }

