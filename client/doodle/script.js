/* eslint-disable prefer-const */

/* eslint-disable no-plusplus */
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const doodler = document.createElement("div");
  let doodlerLeftSpace = 50;
  let platforms = [];
  let isGameOver = false;
  let platformCount = 5;
  let upTimerId;
  let score = 0;
  let downTimerId;
  let isJumping = true;
  let startPoint = 150;
  let isGoingLeft = false;
  let isGoingRight = false;
  let leftTimerId;
  let rightTimerId;
  let doodlerBottomSpace = startPoint;

  function createDoodler() {
    console.log("doodler creation");
    grid.appendChild(doodler);
    doodler.classList.add("doodler");
    doodlerLeftSpace = platforms[0].left;
    doodler.style.left = `${doodlerLeftSpace}px`;
    doodler.style.bottom = `${doodlerBottomSpace}px`;
  }
  class Platform {
    constructor(newPlatformBottom) {
      this.bottom = newPlatformBottom;
      this.left = Math.random() * 315;
      this.visual = document.createElement("div");

      const { visual } = this;
      visual.classList.add("platform");
      visual.style.left = `${this.left}px`;
      visual.style.bottom = `${this.bottom}px`;
      grid.appendChild(visual);
    }
  }
  function createPlatforms() {
    for (let i = 0; i < platformCount; i++) {
      let platformGap = 600 / platformCount;
      let newPlatformBottom = 100 + i * platformGap;
      let newPlatform = new Platform(newPlatformBottom);
      platforms.push(newPlatform);
    }
  }
  function movePlatforms() {
    if (doodlerBottomSpace > 200) {
      platforms.forEach((platform) => {
        // eslint-disable-next-line no-param-reassign
        platform.bottom -= 4;
        let { visual } = platform;
        visual.style.bottom = `${platform.bottom}px`;

        if (platform.bottom < 10) {
          let firstPlatform = platforms[0].visual;
          firstPlatform.classList.remove("platform");
          platforms.shift();
          console.log(platforms);
          let newPlatform = new Platform(600);
          score++;
          platforms.push(newPlatform);
        }
      });
    }
  }

  function gameOver() {
    isGameOver = true;
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
    grid.innerHTML = score;
    clearInterval(upTimerId);
    clearInterval(downTimerId);
    clearInterval(rightTimerId);
    clearInterval(leftTimerId);
  }

  function jump() {
    clearInterval(downTimerId);
    isJumping = true;
    upTimerId = setInterval(() => {
      doodlerBottomSpace += 20;
      doodler.style.bottom = `${doodlerBottomSpace}px`;
      if (doodlerBottomSpace > 350) {
        fall();
      }
    }, 30);
  }

  function fall() {
    isJumping = false;
    clearInterval(upTimerId);
    downTimerId = setInterval(() => {
      doodlerBottomSpace -= 5;
      doodler.style.bottom = `${doodlerBottomSpace}px`;
      if (doodlerBottomSpace <= 0) {
        console.log("gameover");
        gameOver();
      }
      platforms.forEach((platform) => {
        if (
          doodlerBottomSpace >= platform.bottom &&
          doodlerBottomSpace <= platform.bottom + 15 &&
          doodlerLeftSpace + 60 >= platform.left &&
          doodlerLeftSpace <= platform.left + 85 &&
          !isJumping
        ) {
          console.log("landed");
          startPoint = doodlerBottomSpace;
          jump();
        }
      });
    }, 30);
  }

  function control(e) {
    if (e.key === "ArrowLeft") {
      moveLeft();
    } else if (e.key === "ArrowRight") {
      moveRight();
    } else if (e.key === "ArrowUp") {
      moveStraight();
    }
  }
  function moveLeft() {
    if (isGoingRight) {
      clearInterval(rightTimerId);
      isGoingRight = false;
    }
    isGoingLeft = true;
    leftTimerId = setInterval(() => {
      if (doodlerLeftSpace >= 0) {
        doodlerLeftSpace -= 5;
        doodler.style.left = `${doodlerLeftSpace}px`;
      } else moveRight();
    }, 30);
  }

  function moveRight() {
    if (isGoingLeft) {
      clearInterval(leftTimerId);
      isGoingLeft = false;
    }
    isGoingRight = true;
    rightTimerId = setInterval(() => {
      if (doodlerLeftSpace <= 340) {
        doodlerLeftSpace += 5;
        doodler.style.left = `${doodlerLeftSpace}px`;
      } else moveLeft();
    }, 30);
  }

  function moveStraight() {
    isGoingRight = false;
    isGoingLeft = false;
    clearInterval(rightTimerId);
    clearInterval(leftTimerId);
  }
  function start() {
    if (!isGameOver) {
      console.log("creating doodler and platforms");
      createPlatforms();
      createDoodler();
      setInterval(movePlatforms, 30);
      jump();
      document.addEventListener("keyup", control);
    }
  }
  start();
});
