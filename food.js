import { onSnake, expandSnake } from "./snake.js"
import { randomGridPosition } from "./grid.js"


let food = getRandomFoodPosition()
let EXPANSION_RATE = 1 // determines how much the snake will expand with each food eaten
let eaten = false

export function update() {
    if (onSnake(food)) { // if snake meet food
        expandSnake(EXPANSION_RATE) // expand the snake
        food = getRandomFoodPosition() // recreate new food
        eaten = true;
    } 
}

export function draw(gameBoard) {
    const foodElement = document.createElement("div")
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add("food")
    gameBoard.appendChild(foodElement) 
}


function getRandomFoodPosition() {
    let newFoodPosition
    while (newFoodPosition == null || onSnake(newFoodPosition)) { // make sure the food does not reappear on the snake body
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}

export function checkEaten() {
    if (eaten) {
        eaten = false
        return EXPANSION_RATE
    } else {
        return 0
    }
}