const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
const startButton = document.querySelector('.start-button');
const high = document.querySelector('.high');
const medium = document.querySelector('.medium');
const low = document.querySelector('.low');

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId;
let highScore = JSON.parse(localStorage.getItem('highScore')) || 0;
let speed = 500;

function randomSquare(){
  squares.forEach((square)=>{
    square.classList.remove('mole')
    square.classList.remove('get')
  })
  
  let randomPosition = squares[Math.floor(Math.random() * 9)];
  randomPosition.classList.add('mole');
  
  hitPosition = randomPosition.id;
}

console.log(speed)
//randomSquare()
function moveMole(){
  timerId = setInterval(randomSquare, speed);
}

squares.forEach((square)=>{
  square.addEventListener("click", ()=>{
    if(square.id === hitPosition){
      result ++;
      score.textContent = result;
      square.classList.add('get')
      hitPosition;
    }
  })
})

function countDown(){
  currentTime --;
  timeLeft.textContent = currentTime;
  
  if(currentTime === 0){
    clearInterval(countDownTimerId)
    clearInterval(timerId)
    if(result > highScore){
      highScore = result
      saveHighScore()
    }
    alert(`Game Over! Your score is: ${result} High score is: ${highScore}`)
  }
}
let countDownTimerId;

function startGame(){
  clearInterval(countDownTimerId)
  clearInterval(timerId)
  moveMole();
  countDownTimerId = setInterval(countDown, 1000);
  
  currentTime = 60;
  result = 0;
  score.textContent = 0;
  timeLeft.textContent = 60;
  
}

function saveHighScore(){
  localStorage.setItem('highScore', JSON.stringify(highScore))
}

function levels(){

  high.addEventListener("click", ()=>{
    document.querySelectorAll('.active').forEach(btn => {
      btn.classList.remove('active');
    });
    speed = 500
    high.classList.add('active');
    startGame()
  })
  medium.addEventListener("click", ()=>{
    document.querySelectorAll('.active').forEach(btn => {
      btn.classList.remove('active');
    });
    medium.classList.add('active');
    speed = 1000
    console.log(speed)
    startGame()
  })
  low.addEventListener("click", ()=>{
    document.querySelectorAll('.active').forEach(btn => {
      btn.classList.remove('active');
    });
    low.classList.add('active');
    speed = 1500
    startGame()
  })
   
}
levels()
//startButton.addEventListener("click", startGame())
