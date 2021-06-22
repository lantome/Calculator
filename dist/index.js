const numbers = document.querySelectorAll('.number')
const operations = document.querySelectorAll('.operation')
const dot = document.querySelector('.dot')
const clear = document.querySelector('.clear')
const display = document.querySelector('.display')
const clearOneSimbol = document.querySelector('.delete')
const minus = document.querySelector('.minus')
const ERROR_TEXT = 'Error'

let memoryOldNumber = 0
let memoryNewNumber = false
let memoryOperation = ''

function render(value) {
  const maxLengthSimbolsOnDisplay = value.length > 14
  if (maxLengthSimbolsOnDisplay) {
    display.innerText = ERROR_TEXT
  } else {
    display.innerText = value
  }
}

function getDisplayValue() {
  const viewOnDisplayError = display.innerText.includes(ERROR_TEXT)
  if (viewOnDisplayError) {
    return ''
  }
  return display.innerText
}

function viewNumber(value) {
  if (memoryNewNumber) {
    render(value)
    memoryNewNumber = false
  } else if (display.innerText === '0') {
    render(value)
  } else {
    const newValue = getDisplayValue() + value
    render(newValue)
  }
}

numbers.forEach((number) => {
  number.addEventListener('click', (e) => {
    viewNumber(e.target.innerText)
  })
})

function viewOperations(oper) {
  const localOper = getDisplayValue()
  const optionsForAccount = memoryNewNumber && memoryOperation !== '='
  if (optionsForAccount) {
    render(memoryOldNumber)
    memoryNewNumber = false
  } else {
    memoryNewNumber = true
    if (memoryOperation === '+') {
      memoryOldNumber += parseFloat(localOper)
    } else if (memoryOperation === '-') {
      memoryOldNumber -= parseFloat(localOper)
    } else if (memoryOperation === '*') {
      memoryOldNumber *= parseFloat(localOper)
    } else if (memoryOperation === '/') {
      if (localOper === '0') {
        memoryOldNumber = 'Error'
      } else {
        memoryOldNumber /= parseFloat(localOper)
      }
    } else {
      memoryOldNumber = parseFloat(localOper)
    }
    render(memoryOldNumber.toString().slice(0, 13))
    memoryOperation = oper
  }
}

operations.forEach((sign) => {
  sign.addEventListener('click', (e) => {
    viewOperations(e.target.innerText)
  })
})

dot.addEventListener('click', () => {
  let localDot = getDisplayValue()
  if (memoryNewNumber) {
    localDot = '.'
    memoryNewNumber = false
  } else if (localDot.indexOf('.') === -1) {
    localDot += '.'
  }
  render(localDot)
})

clearOneSimbol.addEventListener('click', () => {
  const newValue = getDisplayValue().slice(0, -1)
  render(newValue)
  memoryNewNumber = false
})

clear.addEventListener('click', () => {
  render('')
  memoryNewNumber = false
  memoryOldNumber = 0
  memoryOperation = ''
})

minus.addEventListener('click', () => {
  const newValue = getDisplayValue() * -1
  render(newValue.toString())
  memoryNewNumber = false
})
