const numbers = document.querySelectorAll('.number')
const operations = document.querySelectorAll('.operation')
const dot = document.querySelector('.dot')
const clear = document.querySelector('.clear')
const display = document.querySelector('.display')
const clearOneSimbol = document.querySelector('.delete')
const minus = document.querySelector('.minus')
const ERROR_TEXT = 'Error'

let MEMORY_OLD_NUMBER = 0
let isMemoryNewNumber = false
let MEMORY_OPERATION = ''

function render(value) {
  const MAX_NUMBER_OF_CHARECTERS = 14
  const isMaxLengthSimbolsOnDisplay = value.length > MAX_NUMBER_OF_CHARECTERS

  if (isMaxLengthSimbolsOnDisplay) {
    display.innerText = ERROR_TEXT
  } else {
    display.innerText = value
  }
}

function getDisplayValue() {
  const isViewOnDisplayError = display.innerText.includes(ERROR_TEXT)

  if (isViewOnDisplayError) {
    return ''
  }
  return display.innerText
}

function viewNumber(value) {
  if (isMemoryNewNumber) {
    render(value)
    isMemoryNewNumber = false
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
  const isOptionsForAccount = isMemoryNewNumber && MEMORY_OPERATION !== '='

  if (isOptionsForAccount) {
    render(MEMORY_OLD_NUMBER)
    isMemoryNewNumber = false
  } else {
    isMemoryNewNumber = true
    if (MEMORY_OPERATION === '+') {
      MEMORY_OLD_NUMBER += parseFloat(localOper)
    } else if (MEMORY_OPERATION === '-') {
      MEMORY_OLD_NUMBER -= parseFloat(localOper)
    } else if (MEMORY_OPERATION === '*') {
      MEMORY_OLD_NUMBER *= parseFloat(localOper)
    } else if (MEMORY_OPERATION === '/') {
      if (localOper === '0') {
        MEMORY_OLD_NUMBER = 'Error'
      } else {
        MEMORY_OLD_NUMBER /= parseFloat(localOper)
      }
    } else {
      MEMORY_OLD_NUMBER = parseFloat(localOper)
    }
    render(MEMORY_OLD_NUMBER.toString().slice(0, 13))
    MEMORY_OPERATION = oper
  }
}

operations.forEach((sign) => {
  sign.addEventListener('click', (e) => {
    viewOperations(e.target.innerText)
  })
})

dot.addEventListener('click', () => {
  let localDot = getDisplayValue()

  if (isMemoryNewNumber) {
    localDot = '.'
    isMemoryNewNumber = false
  } else if (localDot.indexOf('.') === -1) {
    localDot += '.'
  }
  render(localDot)
})

clearOneSimbol.addEventListener('click', () => {
  const newValue = getDisplayValue().slice(0, -1)
  render(newValue)
  isMemoryNewNumber = false
})

clear.addEventListener('click', () => {
  render('')
  isMemoryNewNumber = false
  MEMORY_OLD_NUMBER = 0
  MEMORY_OPERATION = ''
})

minus.addEventListener('click', () => {
  const newValue = getDisplayValue() * -1
  render(newValue.toString())
  isMemoryNewNumber = false
})
