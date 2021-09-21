document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground-moving')
    let gap = 460
    let birdLeft = 220
    let birdBottom = 100
    let gravity = 2
    let isGameOver = false
    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    let timerId = setInterval(startGame,20)

    
    function control(e) {
        if (e.keyCode === 32) {
            jump()
        }
    }

    function jump(){
        if (birdBottom < 500) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
        console.log(birdBottom)
    }
    function logJump(){
        console.log('jump')
    }

    document.addEventListener('keyup', control)
    //document.addEventListener('keyup', jump)
    function generateObstacle(){
        let obstacleLeft = 500
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')

        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }

        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'
        function moveObstacle() {
            obstacleLeft -=2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === -60) {
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }
            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200)||
                birdBottom === 0 
                ) {
                gameOver()
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle, 20)

        if (!isGameOver) setTimeout(generateObstacle,3000)
    }
    generateObstacle()

    function gameOver() {
        clearInterval(timerId)
        isGameOver = true
        console.log('Game Over')
        document.removeEventListener('keyup',control)
        ground.classList.add('ground')
        ground.classList.remove('ground-moving')
    }
  
    
})