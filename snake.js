import { getInputDirection } from "./input.js"

export const SNAKE_SPEED = 5 // how many time the snake move per second
const snakeBody = [ // snake is an array of objects. Each object give the x and y coordinates of each "segment"
    { x: 11, y: 11 } // original snake -> determines the starting point
]
let newSegments = 0  

export function update() {  
    addSegments()
    const inputDirection = getInputDirection(); // get input movement from user
    for (let i = snakeBody.length - 2; i >= 0; i--) { // to move the snake -> whereby every element except for the head will move to its parent's original position
        snakeBody[i + 1] = {...snakeBody[i]} // {... } creates new object.
    }

    snakeBody[0].x += inputDirection.x  // update the head
    snakeBody[0].y += inputDirection.y
}

export function draw(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeSegment = document.createElement("div") // loop through the snake -> and draw it in the game board.
        snakeSegment.style.gridRowStart = segment.y // determines where the element will be
        snakeSegment.style.gridColumnStart = segment.x
        snakeSegment.classList.add("snake") // for visualising
        gameBoard.appendChild(snakeSegment)  // add to the gameboard
    })
}

export function expandSnake(amount) { // add new segment to the body
    newSegments += amount 
}

function addSegments() {
    for (let i =0; i < newSegments; i++) {
        snakeBody.push({...snakeBody[snakeBody.length - 1]}) // append segment at the end
    }
    newSegments = 0
}

export function onSnake(position, { ignoreHead = false } = {}) {  // = {} for default value
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) { // snake head intersect snake head 
            return false
        }
        return equalPositions(segment, position)
    })
}

export function getSnakeHead() { // return the head of the snake
    return snakeBody[0]
}

export function snakeIntersect() {
    return onSnake(snakeBody[0], { ignoreHead: true }) // ignore head because head will always interesect with the head and will return true
}
function equalPositions(pos1, pos2) { // check if same position 
    return pos1.x === pos2.x && pos1.y === pos2.y
}

