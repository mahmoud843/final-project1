// Dark Mode Toggle
var dark = document.getElementById("clicked");
dark.onclick = function (){
    document.body.classList.toggle("dark-mode");
}

// To Do List functionality
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

var list = document.querySelector('ul');
if(list) {
    list.addEventListener('click', function(ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
        }
    }, false);
}

// "Add" button list
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

/*snake game*/
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board-1');
    if(board) {
        const scoreBox = document.getElementById('scoreBox');
        const highScoreBox = document.getElementById('hiscoreBox');

        const snakeBoardSize = 18;
        const speed = 100;
        let score = 0;
        let highScore = 0;
        let snake = [{ x: 9, y: 9 }];
        let food = { x: 5, y: 5 };
        let dx = 0;
        let dy = 0;
        let changingDirection = false;

        function main() {
            if (hasGameEnded()) return;

            changingDirection = false;
            setTimeout(function onTick() {
                clearBoard();
                drawFood();
                moveSnake();
                drawSnake();
                main();
            }, speed);
        }

        function clearBoard() {
            board.innerHTML = '';
        }

        function drawFood() {
            const foodElement = document.createElement('div');
            foodElement.style.gridRowStart = food.y;
            foodElement.style.gridColumnStart = food.x;
            foodElement.classList.add('food');
            board.appendChild(foodElement);
        }

        function moveSnake() {
            const head = { x: snake[0].x + dx, y: snake[0].y + dy };
            snake.unshift(head);
            const hasEatenFood = snake[0].x === food.x && snake[0].y === food.y;
            if (hasEatenFood) {
                score += 10;
                if (score > highScore) {
                    highScore = score;
                    highScoreBox.textContent = 'HighScore: ' + highScore;
                }
                scoreBox.textContent = 'Score: ' + score;
                generateFood();
            } else {
                snake.pop();
            }
        }

        function hasGameEnded() {
            for (let i = 1; i < snake.length; i++) {
                if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
            }
            
            if (snake[0].x < 1 || snake[0].x > snakeBoardSize || snake[0].y < 1 || snake[0].y > snakeBoardSize) {
                return true;
            }
            
            return false;
        }

        function generateFood() {
            food.x = Math.floor(Math.random() * snakeBoardSize) + 1;
            food.y = Math.floor(Math.random() * snakeBoardSize) + 1;
            snake.forEach(segment => {
                if (segment.x === food.x && segment.y === food.y) {
                    generateFood();
                }
            });
        }

        function drawSnake() {
            snake.forEach(segment => {
                const snakeElement = document.createElement('div');
                snakeElement.style.gridRowStart = segment.y;
                snakeElement.style.gridColumnStart = segment.x;
                snakeElement.classList.add('snake');
                board.appendChild(snakeElement);
            });
        }

        document.addEventListener('keydown', changeDirection);

        function changeDirection(event) {
            const LEFT_KEY = 37;
            const RIGHT_KEY = 39;
            const UP_KEY = 38;
            const DOWN_KEY = 40;

            if (changingDirection) return;
            changingDirection = true;

            const keyPressed = event.keyCode;

            const goingUp = dy === -1;
            const goingDown = dy === 1;
            const goingRight = dx === 1;
            const goingLeft = dx === -1;

            if (keyPressed === LEFT_KEY && !goingRight) {
                dx = -1;
                dy = 0;
            }

            if (keyPressed === UP_KEY && !goingDown) {
                dx = 0;
                dy = -1;
            }

            if (keyPressed === RIGHT_KEY && !goingLeft) {
                dx = 1;
                dy = 0;
            }

            if (keyPressed === DOWN_KEY && !goingUp) {
                dx = 0;
                dy = 1;
            }
        }

        main();
    }
});

/*rock paper scissors*/
function playAgainstComputer(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    const computerChoiceElement = document.getElementById('computer-choice');
    const resultElement = document.getElementById('result');
    
    if(computerChoiceElement) computerChoiceElement.innerText = `Computer chose: ${computerChoice}`;

    if (playerChoice === computerChoice) {
        if(resultElement) resultElement.innerText = "It's a tie!";
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        if(resultElement) resultElement.innerText = "You win!";
    } else {
        if(resultElement) resultElement.innerText = "Computer wins!";
    }
}

function playWithFriend(playerChoice, player) {
    if (player === 'player1') {
        const player1ChoiceElement = document.getElementById('player1-choice');
        if(player1ChoiceElement) player1ChoiceElement.innerText = `Player 1 has made his choice`;
        sessionStorage.setItem('player1Choice', playerChoice);
    } else if (player === 'player2') {
        const player2ChoiceElement = document.getElementById('player2-choice');
        const result2Element = document.getElementById('result2');
        
        if(player2ChoiceElement) player2ChoiceElement.innerText = `Player 2 chose: ${playerChoice}`;
        sessionStorage.setItem('player2Choice', playerChoice);

        const player1Choice = sessionStorage.getItem('player1Choice');
        const player2Choice = playerChoice;

        if (player1Choice && player2Choice) {
            if (player1Choice === player2Choice) {
                if(result2Element) result2Element.innerText = "It's a tie!";
            } else if (
                (player1Choice === 'rock' && player2Choice === 'scissors') ||
                (player1Choice === 'paper' && player2Choice === 'rock') ||
                (player1Choice === 'scissors' && player2Choice === 'paper')
            ) {
                if(result2Element) result2Element.innerText = "Player 1 wins!";
            } else {
                if(result2Element) result2Element.innerText = "Player 2 wins!";
            }
        }
    }
}

/*x,o game*/
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleMove(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameBoard[index] === '' && !checkWinner()) {
        gameBoard[index] = currentPlayer;
        cell.innerText = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
        cell.style.pointerEvents = 'none'; 

        if (checkWinner()) {
            const resultElement = document.getElementById('result');
            if(resultElement) resultElement.innerText = `Player ${currentPlayer} wins!`;
        } else if (gameBoard.every(cell => cell !== '')) {
            const resultElement = document.getElementById('result');
            if(resultElement) resultElement.innerText = "It's a tie!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    return winningCombos.some(combo => {
        if (gameBoard[combo[0]] && gameBoard[combo[0]] === gameBoard[combo[1]] && gameBoard[combo[1]] === gameBoard[combo[2]]) {
            highlightWinnerCells(combo);
            return true;
        }
        return false;
    });
}

function highlightWinnerCells(combo) {
    combo.forEach(index => {
        const cell = document.querySelector(`[data-index="${index}"]`);
        if(cell) cell.style.backgroundColor = 'lightgreen';
    });
}

function handleRestartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
        cell.style.pointerEvents = 'auto';
        cell.style.backgroundColor = '#f0f0f0';
        cell.classList.remove('x', 'o'); 
    });
    const resultElement = document.getElementById('result');
    if(resultElement) resultElement.innerText = '';
}

const restartButton = document.querySelector('.game--restart');
if(restartButton) {
    restartButton.addEventListener('click', handleRestartGame);
}

// Follow buttons functionality
const followButtons = document.querySelectorAll('.follow-btn');
followButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === 'Follow') {
            button.textContent = 'Followed';
            button.classList.add('followed');
        } else {
            button.textContent = 'Follow';
            button.classList.remove('followed');
        }
    });
});

// Simple comment system (frontend only)
function addComment() {
    const commentInput = document.getElementById('commentInput');
    const commentList = document.getElementById('commentList');
    
    if(commentInput && commentList) {
        const commentText = commentInput.value;
        if (commentText) {
            const li = document.createElement('li');
            li.textContent = commentText;
            commentList.appendChild(li);
            commentInput.value = '';
        }
    }
}

// Programming Languages Bar - FIXED VERSION
document.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById("communitiesBtn");
    const bar = document.getElementById("languagesBar");
    const communitiesSection = document.getElementById("communitiesSection");

    console.log("✅ JavaScript is running");
    console.log("Communities button:", btn);
    console.log("Languages bar:", bar);

    if (!btn || !bar) {
        console.warn("Communities button or languages bar not found!");
        return;
    }

    // لما تضغط على Communities
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Communities clicked!");
        bar.classList.toggle("show");
    });

    // يقفل القائمة لما تضغط بره
    document.addEventListener("click", (e) => {
        if (!communitiesSection.contains(e.target)) {
            bar.classList.remove("show");
        }
    });

    // تظهر بالـ hover
    communitiesSection.addEventListener("mouseenter", () => {
        console.log("Mouse entered communities");
        bar.classList.add("show");
    });

    communitiesSection.addEventListener("mouseleave", () => {
        console.log("Mouse left communities");
        bar.classList.remove("show");
    });

    // منع إغلاق القائمة عند النقر داخلها
    bar.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    // Add click functionality to language items
    const languageItems = bar.querySelectorAll('li');
    languageItems.forEach(item => {
        item.addEventListener('click', function() {
            const language = this.textContent;
            alert(`You selected: ${language}`);
            bar.classList.remove('show');
        });
    });
});