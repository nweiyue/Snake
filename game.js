// game.js is the base of the game. It is like a "main" file.

import { update as updateSnake, draw as drawSnake, getSnakeHead,
     snakeIntersect, SNAKE_SPEED } from './snake.js'
import { update as updateFood, draw as drawFood, checkEaten} from './food.js'
import { outsideGrid } from "./grid.js"

// Set game loop.
let lastRenderTime = 0
let gameOver = false
let score = 0;
const gameBoard = document.getElementById("game-board")
const scoreBar = document.getElementById("score")
const instruction = document.getElementById("instruction")
let scoreUpdate = 0

function main(currentTime) {
    if (gameOver) {
        if (confirm("You lost.\n" + "Your score is " + score + "\n" + "Press OK to restart.")) {  // open dialogue
            window.location = "./" // if user press "OK", go back to the same file
            score = 0; // set score back to zero
        }
        return  // if user press "cancel", don't do anything
    }
    if  (scoreUpdate > 0) {
        score += scoreUpdate
        scoreUpdate = 0
    }
    window.requestAnimationFrame(main) // ask window(browser) when I can render the next frame -> when frame can render -> run main function
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000 // interval between renders
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) { // if snake didnt move don't do anything
        return
    }
    lastRenderTime = currentTime   // else update the time     
    update() // re-update, determines where the snake move, where is the food, whether the snake died
    draw() // re-draw
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    checkDeath()
    checkScore()
}

function draw() {
    gameBoard.innerHTML = "" // clear the view -> to remove traces of the snake
    drawSnake(gameBoard)
    drawFood(gameBoard)
    scoreBar.innerHTML = "Score:" + score
    instruction.innerHTML = "Use arrow keys to move"
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersect() // game over if snake-head exit the game-board/ snake intersect itself
}

function checkScore() {
    scoreUpdate = checkEaten()
}
