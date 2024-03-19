const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// getContext() method會回傳一個canvas的drawing context，
// drawing context可以用來在canvas內畫圖
const unit = 20;
const row = canvas.height / unit; // 320 / 20 = 16
const column = canvas.width / unit; // 320 / 20 = 16

let snake = []; // array中的每個元素，都是一個物件

// 有直式和橫式兩種蛇的模式
const mode = Math.floor(Math.random() * 2)
function createSnake() {
  // 物件的工作是，儲存身體的x, y座標
  // 產生隨機的座標位置
  const cx = Math.floor(Math.random() * column) * unit;
  const cy = Math.floor(Math.random() * row) * unit;

  if (mode === 0) {
    snake[0] = {
      x: cx,
      y: cy,
    };

    snake[1] = {
      x: cx - 20,
      y: cy,
    };

    snake[2] = {
      x: cx - 40,
      y: cy,
    };

    snake[3] = {
      x: cx - 60,
      y: cy,
    };
  } else {
    snake[0] = {
      x: cx,
      y: cy,
    };

    snake[1] = {
      x: cx,
      y: cy - 20,
    };

    snake[2] = {
      x: cx,
      y: cy - 40,
    };

    snake[3] = {
      x: cx,
      y: cy - 60,
    };
  }

}

class Fruit {
  constructor() {
    this.x = Math.floor(Math.random() * column) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }

  drawFruit() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, unit, unit);
  }

  pickALocation() {
    let overlapping = false;
    let new_x;
    let new_y;

    function checkOverlap(new_x, new_y) {
      for (let i = 0; i < snake.length; i++) {
        if (new_x == snake[i].x && new_y == snake[i].y) {
          console.log("overlapping...");
          overlapping = true;
          return;
        } else {
          overlapping = false;
        }
      }
    }

    do {
      new_x = Math.floor(Math.random() * column) * unit;
      new_y = Math.floor(Math.random() * row) * unit;
      checkOverlap(new_x, new_y);
    } while (overlapping);

    this.x = new_x;
    this.y = new_y;
  }
}

// 初始設定
createSnake();
let myFruit = new Fruit();
window.addEventListener("keydown", changeDirection);

// 產生隨機方向 且方向和模式不重複 不然會死掉
let derection = ['Right', 'Down', 'Up', 'Left']
let index;
let validDerection = false
do {
  index = Math.floor(Math.random() * 4)
  if (mode === 0 && index === 3) {
    validDerection = true
  } else if (mode === 1 && index === 2) {
    validDerection = true
  } else {
    validDerection = false
  }
} while (validDerection)

let d = derection[index]
//let d = "Right";
function changeDirection(e) {
  if (e.key == "ArrowRight" && d != "Left") {
    d = "Right";
  } else if (e.key == "ArrowDown" && d != "Up") {
    d = "Down";
  } else if (e.key == "ArrowLeft" && d != "Right") {
    d = "Left";
  } else if (e.key == "ArrowUp" && d != "Down") {
    d = "Up";
  }

  // 每次按下上下左右鍵之後，在下一幀被畫出來之前，
  // 不接受任何keydown事件
  // 這樣可以防止連續按鍵導致蛇在邏輯上自殺
  window.removeEventListener("keydown", changeDirection);
}
let highestScore;
loadHighestScore();
let score = 0;
document.getElementById("myScore").innerHTML = "遊戲分數:" + score;
document.getElementById("myScore2").innerHTML = "最高分數:" + highestScore;

function draw() {
  // 每次畫圖之前，確認蛇有沒有咬到自己
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      clearInterval(myGame);
      alert("遊戲結束");
      return;
    }
  }

  // 背景全設定為黑色
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  myFruit.drawFruit();

  // 劃出蛇
  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      ctx.fillStyle = "lightgreen";
    } else {
      ctx.fillStyle = "lightblue";
    }
    ctx.strokeStyle = "white";

    if (snake[i].x >= canvas.width) {
      snake[i].x = 0;
    }
    if (snake[i].x < 0) {
      snake[i].x = canvas.width - unit;
    }
    if (snake[i].y >= canvas.height) {
      snake[i].y = 0;
    }
    if (snake[i].y < 0) {
      snake[i].y = canvas.height - unit;
    }

    // x, y, width, height
    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
  }

  // 以目前的d變數方向，來決定蛇的下一幀要放在哪個座標
  let snakeX = snake[0].x; // snake[0]是一個物件，但snake[0].x是個number
  let snakeY = snake[0].y;
  if (d == "Left") {
    snakeX -= unit;
  } else if (d == "Up") {
    snakeY -= unit;
  } else if (d == "Right") {
    snakeX += unit;
  } else if (d == "Down") {
    snakeY += unit;
  }

  // 新的頭 用unshift在第一個位置產生新的 然後把舊的pop
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  // 確認蛇是否有吃到果實
  if (snake[0].x == myFruit.x && snake[0].y == myFruit.y) {
    myFruit.pickALocation();
    score++;
    setHighestScore(score);
    document.getElementById("myScore").innerHTML = "遊戲分數:" + score;
    document.getElementById("myScore2").innerHTML = "最高分數:" + highestScore;
  } else {
    snake.pop();
  }

  snake.unshift(newHead);
  window.addEventListener("keydown", changeDirection);
}


// 簡化的函數：設置cookie
function setCookie(key, value, days) {
  document.cookie = `${key}=${value}; expires=${new Date(new Date().getTime() + days * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
}

// 簡化的函數：獲取cookie
function getCookie(key) {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
      const [cookieKey, cookieValue] = cookie.split('=');
      if (cookieKey === key) {
          return cookieValue;
      }
  }
  return '';
}

// 每次reload時根據難度調整前端的點點
document.addEventListener("DOMContentLoaded", function() {
  // 檢查是否有保存的難易度
  var savedDifficulty = getCookie("level");

  // 如果有保存的難易度，則根據該值設置radio按鈕為checked
  if (savedDifficulty !== null) {
      var radioButtons = document.getElementsByName("level");
      for (var i = 0; i < radioButtons.length; i++) {
          if (radioButtons[i].value === savedDifficulty) {
              radioButtons[i].checked = true;
              break;
          }
      }
  }
});

// 難度選擇onchange
let a = 1;
var radioButtons = document.querySelectorAll('input[name="level"]');
// 遍历每个 radio 按钮，并为其添加事件监听器
radioButtons.forEach(function (radio) {
  radio.addEventListener('change', function () {
    setCookie('level', this.value, 1)
  });
});

// 修改時間調整難易度
if (getCookie('level')) {
  a = getCookie('level')
}
let level = [200, 100, 50]
let myGame = setInterval(draw, level[a]);

function loadHighestScore() {
  if (localStorage.getItem("highestScore") == null) {
    highestScore = 0;
  } else {
    highestScore = Number(localStorage.getItem("highestScore"));
  }
}

function setHighestScore(score) {
  if (score > highestScore) {
    localStorage.setItem("highestScore", score);
    highestScore = score;
  }
}
