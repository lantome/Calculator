const numbers = document.querySelectorAll('.number')
const operations = document.querySelectorAll('.operation')
const dot = document.querySelector('.dot')
const clear = document.querySelector('.clear')
const display = document.querySelector('.display')
const clearOneSymbol = document.querySelector('.delete')
const minus = document.querySelector('.minus')
const ERROR_TEXT = 'Error'

let memoryOldNumber = 0
let hasNewNumberInMemory = false
let memoryOpertion = ''

function render(value) {
  const MAX_NUMBER_OF_SYMBOL = 14
  const isMaxLengthSymbolsOnDisplay = value.length > MAX_NUMBER_OF_SYMBOL

  if (isMaxLengthSymbolsOnDisplay) {
    display.innerText = ERROR_TEXT
  } else {
    display.innerText = value
  }
}

function getDisplayValue() {
  const isDisplayError = display.innerText.includes(ERROR_TEXT)

  if (isDisplayError) {
    return ''
  }
  return display.innerText
}

function viewNumber(value) {
  if (hasNewNumberInMemory) {
    render(value)
    hasNewNumberInMemory = false
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
  const isOptionsForAccount = hasNewNumberInMemory && memoryOpertion !== '='

  if (isOptionsForAccount) {
    render(memoryOldNumber)
    hasNewNumberInMemory = false
  } else {
    hasNewNumberInMemory = true
    if (memoryOpertion === '+') {
      memoryOldNumber += parseFloat(localOper)
    } else if (memoryOpertion === '-') {
      memoryOldNumber -= parseFloat(localOper)
    } else if (memoryOpertion === '*') {
      memoryOldNumber *= parseFloat(localOper)
    } else if (memoryOpertion === '/') {
      if (localOper === '0') {
        memoryOldNumber = 'Error'
      } else {
        memoryOldNumber /= parseFloat(localOper)
      }
    } else {
      memoryOldNumber = parseFloat(localOper)
    }
    render(memoryOldNumber.toString().slice(0, 13))
    memoryOpertion = oper
  }
}

operations.forEach((sign) => {
  sign.addEventListener('click', (e) => {
    viewOperations(e.target.innerText)
  })
})

dot.addEventListener('click', () => {
  let localDot = getDisplayValue()

  if (hasNewNumberInMemory) {
    localDot = '.'
    hasNewNumberInMemory = false
  } else if (localDot.indexOf('.') === -1) {
    localDot += '.'
  }
  render(localDot)
})

clearOneSymbol.addEventListener('click', () => {
  const newValue = getDisplayValue().slice(0, -1)
  render(newValue)
  hasNewNumberInMemory = false
})

clear.addEventListener('click', () => {
  render('')
  hasNewNumberInMemory = false
  memoryOldNumber = 0
  memoryOpertion = ''
})

minus.addEventListener('click', () => {
  const newValue = getDisplayValue() * -1
  render(newValue.toString())
  hasNewNumberInMemory = false
})
