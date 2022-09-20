const displayFeedEl = document.querySelector('.display-feed')
const displayInputEl = document.querySelector('.display-input')
const resultEl = document.querySelector('.result')
const numbersEl = document.querySelectorAll('.numb')
const operationsEl = document.querySelectorAll('.operation')
const equalEl = document.querySelector('.equal')
const clearEl = document.querySelector('.clear')
const clearLastEl = document.querySelector('.clear-last')

let disFeedNum = ''
let disInputNum = ''
let result = null
let lastOperation = ''
let haveDot = false

function displayNumb(){
  numbersEl.forEach(numb => {
    numb.addEventListener('click', (e)=> {
      if(e.target.innerText === '.' &&  !haveDot){
        haveDot = true
      } else if (e.target.innerText === '.' &&  haveDot){
        return
      }
      disInputNum += e.target.innerText
      displayInputEl.innerText = disInputNum
    })
  })
}
function displayOperation(){
  operationsEl.forEach(operation => {
    operation.addEventListener('click', (e) => {
      if (!disInputNum) result
      haveDot = false
      const operationName = e.target.innerText
      if(disFeedNum && disInputNum && lastOperation){
        mathOperation()
      } else{
        result = parseFloat(disInputNum)
      }
      clearVar(operationName)
      lastOperation = operationName
    })
  })
}
function clearVar(name = ''){
  disFeedNum += disInputNum+ ' ' + name + ' '
  displayFeedEl.innerText = disFeedNum
  displayInputEl.innerText = ''
  disInputNum = ''
  resultEl.innerText = result
}
function mathOperation() {
  if(lastOperation === 'X'){
    result = parseFloat(result) * parseFloat(disInputNum)
  } else  if(lastOperation === '/'){
    result = parseFloat(result) / parseFloat(disInputNum)
  }else  if(lastOperation === '+'){
    result = parseFloat(result) + parseFloat(disInputNum)
  }else  if(lastOperation === '-'){
    result = parseFloat(result) - parseFloat(disInputNum)
  }else  if(lastOperation === '%'){
    result = parseFloat(result) % parseFloat(disInputNum)
  }
}
function equal(){
  equalEl.addEventListener('click',(e) =>{
    if( !disFeedNum || !disInputNum)return
    haveDot = false
    mathOperation()
    clearVar()
   displayInputEl.innerText = result
    resultEl.innerText = ''
    disInputNum = result
   disFeedNum = ''
  })
}
function clear() {
  clearEl.addEventListener('click', (e) =>{
  displayFeedEl.innerText = '0' 
  displayInputEl.innerText = '0'
  disFeedNum = ''
  disInputNum = ''
  result = ''
  resultEl.innerText = '0'
  })
}
function cancelEntry() {
  clearLastEl.addEventListener('click', (e) => {
  displayInputEl.innerText = '0'
  disInputNum = ''
})
}
function clickButtonEl(key){
   numbersEl.forEach( button => {
     if(button.innerText === key){
       button.click()
     }
   })
}
function clickOperationEl(key){
  operationsEl.forEach( button => {
    if(button.innerText === key){
      button.click()
    }
  })
}
function clickEqual(){
  equalEl.click()
    }
function keyboard(){
  window.addEventListener('keydown', (e)=>{
    if(
      e.key === '0' ||
      e.key === '1' ||
      e.key === '2' ||
      e.key === '3' ||
      e.key === '4' ||
      e.key === '5' ||
      e.key === '6' ||
      e.key === '7' ||
      e.key === '8' ||
      e.key === '9' ||
      e.key === '.'
    ){
        clickButtonEl(e.key)} else if ( 
        e.key === '/' ||
        e.key === '+' ||
        e.key === '-' ||
        e.key === '%'
        ){
          clickOperationEl(e.key)
        } else if(e.key === '*') {
          clickOperationEl('X')
        }else if(e.key == 'Enter' || e.key === '='){
          clickEqual()
        }
  })
}
keyboard()
cancelEntry()
clear()
displayNumb()
displayOperation()
equal()