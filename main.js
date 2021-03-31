class Calculator {
  constructor(answerTextElem, workspaceTextElement) {
    this.answerTextElem = answerTextElem
    this.workspaceTextElement = workspaceTextElement
    this.clear()

  }

  clear() {
    this.workspace = ''
    this.answer = ''
    this.operator = undefined
  }

  delete() {
    this.workspace = this.workspace.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.workspace.includes('.'))
      return
    this.workspace = this.workspace.toString() + number.toString()
  }

  chooseOperator(operator) {
    if (this.workspace === '')
      return
    if (this.answer !== '') {
      this.compute()
    }
    this.operator = operator
    this.answer = this.workspace
    this.workspace = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.answer)
    const current = parseFloat(this.workspace)
    if (isNaN(prev) || isNaN(current))
      return
    switch (this.operator) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '/':
        computation = prev / current
        break
      default:
        return
    }
    this.workspace = computation
    this.operator = undefined
    this.answer = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.workspaceTextElement.innerText =
      this.getDisplayNumber(this.workspace)
    if (this.operator != null) {
      this.answerTextElem.innerText =
        `${this.getDisplayNumber(this.answer)}${this.operator}`
    } else {
      this.answerTextElem.innerText = ''
    }

  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const answerTextElem = document.querySelector('[data-answer]')
const workspaceTextElement = document.querySelector('[data-workspace]')

const calculator = new Calculator(answerTextElem, workspaceTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperator(button.innerText)
    calculator.updateDisplay()
  })
})

equalButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})