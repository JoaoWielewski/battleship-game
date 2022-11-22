const xCoord = document.querySelector(".x")
const yCoord = document.querySelector(".y")
const fireButton = document.querySelector(".fire-button")
const shotsFiredMessage = document.querySelector(".shots-fired")
const mainMessage = document.querySelector(".message")
const shipsHitMessage = document.querySelector(".ships-shot")
const pointsMessage = document.querySelector(".total-points")
const livesLeftMessage = document.querySelector(".lives-left")
const bombContainer = document.querySelector(".bomb-container")
const atomicContainer = document.querySelector(".atomic-container")
const startContainer = document.querySelector(".start-div")
const startButton = document.querySelector(".start-btn")
const messagesCheckbox = document.querySelector(".messages-check")
const restartButton = document.querySelector(".restart-btn")

const mainHeader = document.querySelector(".main-header")
const gridContainer = document.querySelector(".grid-container")
const messagesContainer = document.querySelector(".messages-container")
const shotContainer = document.querySelector(".shot-container")

const livesContainer = document.querySelector(".lives-container")
const livesNumbers = document.querySelector(".lives-number-container")

const bombCounter = document.querySelector(".bomb-counter")
const atomicCounter = document.querySelector(".atomic-counter")

startButton.addEventListener("click", () => {
    startGame()
})

messagesCheckbox.addEventListener("click", () => {
    if (messagesCheckbox.checked == true) {
        messagesContainer.classList.add("hide")
    } else {
        messagesContainer.classList.remove("hide")
    }
})

xCoord.addEventListener("click", () => {
    xCoord.value = ""
})

yCoord.addEventListener("click", () => {
    yCoord.value = ""
})

fireButton.addEventListener("click", () => {
    validateShot()
})

restartButton.addEventListener("click", () => {
    restartGame()
})

bombContainer.addEventListener("click", () => {
    if (!bombContainer.classList.contains("out-of")) {
        switchBomb()
        if (atomicActive) {
            switchAtomic()
        }
    }
})

atomicContainer.addEventListener("click", () => {
    if (!atomicContainer.classList.contains("out-of")) {
        switchAtomic()
        if (bombActive) {
            switchBomb()
        } 
    }
})


const SHIP_QUANTITY = 7;
const SUBMARINE_QUANTITY = 5;
const CARRIER_QUANTITY = 4;
const SUBMARINE_POINTS = 1;
const SHIP_POINTS = 2;
const CARRIER_POINTS = 3;
const BOMB_QUANTITY = 1;
const ATOMIC_QUANTITY = 1;


let shotsFired = 0;
let targetsShot = 0;
let totalPoints = 0;

const all = [];
const ships = [];
const submarines = [];
const carriers = [];
const alreadyShot = [];
const bombs = [];
const atomics = [];

function startGame() {
    startContainer.classList.add("hide")
    startContainer.classList.remove("flex")
    mainHeader.classList.remove("hide")
    gridContainer.classList.remove("hide")
    messagesContainer.classList.remove("hide")
    shotContainer.classList.remove("hide")
    gridContainer.classList.add("grid")
    messagesCheckbox.classList.remove("hide")
    bombCounter.innerHTML = bombQuantity
    atomicCounter.innerHTML = atomicQuantity
    position3Elements()
    position2Elements()
    position1Elements(ships, SHIP_QUANTITY)
    position1Elements(submarines, SUBMARINE_QUANTITY)
    position1Elements(carriers, CARRIER_QUANTITY)
    position1Elements(bombs, BOMB_QUANTITY)
    position1Elements(atomics, ATOMIC_QUANTITY)
}

function position3Elements() {

    for (let i = 0; i < 2; i++)
        while(true) {
            var coords = [];
            var coords2 =[];
            var coords3 = [];
            let same = false
            let x = (Math.floor(Math.random() * 9))
            let y = (Math.floor(Math.random() * 8))
            coords.push(x)
            coords.push(y)
            coords2.push(x)
            coords2.push(y + 1)
            coords3.push(x)
            coords3.push(y + 2)
            same = checkTile(all, coords)
            if (same == false) {
                same = checkTile(all, coords2)
            }
            if (same == false) {
                same = checkTile(all, coords3)
            }
            if (same === true) {
                continue
            } else {
                all.push(coords)
                all.push(coords2)
                all.push(coords3)
                ships.push(coords)
                ships.push(coords2)
                ships.push(coords3)
                break
            }
        }
}

function position2Elements() {
    for (let i = 0; i < 3; i++)
        while(true) {
            var coords = [];
            var coords2 =[];
            let same = false
            let x = (Math.floor(Math.random() * 9))
            let y = (Math.floor(Math.random() * 9) + 1)
            coords.push(x)
            coords.push(y)
            coords2.push(x + 1)
            coords2.push(y)
            same = checkTile(all, coords)
            if (same == false) {
                same = checkTile(all, coords2)
            }
            if (same === true) {
                continue
            } else {
                all.push(coords)
                all.push(coords2)
                ships.push(coords)
                ships.push(coords2)
                break
            }
        }
}

function position1Elements(structure, quantity) {
    for (let i = 0; i < quantity; i++)
        while(true) {
            var coords = [];
            let same = false
            let x = (Math.floor(Math.random() * 9) + 1)
            let y = (Math.floor(Math.random() * 9) + 1)
            coords.push(x)
            coords.push(y)
            same = checkTile(all, coords)
            if (same === true) {
                continue
            } else {
                all.push(coords)
                structure.push(coords)
                break
            }
        }
}

function checkTile(list, coords) {
    for (let i of list) {
        if (i[0] == coords[0] && i[1] == coords[1]) {
            return true
        }
    }
    return false
}


function validateShot() {
    let x = parseInt(xCoord.value)
    let y = parseInt(yCoord.value)
    if (0 <= x && x <= 9 && 0 <= y && y <= 9) {
        if (bombActive == true) {
            bombContainer.classList.add("bomb-container-hover")
            bombContainer.classList.remove("active-bomb-container")
            if (checkTile(alreadyShot, [x, y]) == false) {
                console.log(bombQuantity)
                bombQuantity -= 1
                bombCounter.innerHTML = bombQuantity
                bombActive = false
                console.log(bombQuantity)
                if (bombQuantity == 0) {
                    outOfBomb()
                }
            }
            checkBoard(x - 1, y)
            checkBoard(x + 1, y)
            checkBoard(x, y - 1)
            checkBoard(x, y + 1)
            checkShot(x, y)
        } else if (atomicActive == true) {
            atomicContainer.classList.add("atomic-container-hover")
            atomicContainer.classList.remove("active-atomic-container")
            if (checkTile(alreadyShot, [x, y]) == false) {
                atomicQuantity -= 1
                atomicCounter.innerHTML = atomicQuantity
                atomicActive = false
                if (atomicQuantity == 0) {
                    outOfAtomic()
                }
            }
            checkBoard(x - 1, y - 1)
            checkBoard(x - 1, y)
            checkBoard(x - 1, y + 1)
            checkBoard(x, y - 1)
            checkBoard(x, y + 1)
            checkBoard(x + 1, y - 1)
            checkBoard(x + 1, y)
            checkBoard(x + 1, y + 1)
            checkShot(x, y)
        } else{ 
            checkShot(x, y)
        }

    } else {
        mainMessage.innerHTML = "The coordinates must be between 0 and 9."
    }
}

function checkBoard(x, y) {
    if (0 <= x && x <= 9 && 0 <= y && y <= 9) {
        if (checkTile(alreadyShot, [x, y]) == false) {
            shotsFired -= 1
            livesQuantity += 1
        }
        checkShot(x, y)
    }
}

function checkShot(x, y) {  
    alreadyShot.push([x, y])
    let shipHit = false
    let submarineHit = false
    let carrierHit = false
    let bombHit = false
    let atomicHit = false
    let target = document.querySelector(".water-" + y + "-" + x)
    for (let i of ships) {
        if (x == i[0] && y == i[1]) {
            shipHit = true
        }
    }
    for (let i of submarines) {
        if (x == i[0] && y == i[1]) {
            submarineHit = true
        }
    }
    for (let i of carriers) {
        if (x == i[0] && y == i[1]) {
            carrierHit = true
        }
    }
    for (let i of bombs) {
        if (x == i[0] && y == i[1]) {
            bombHit = true
        }
    }
    for (let i of atomics) {
        if (x == i[0] && y == i[1]) {
            atomicHit = true
        }
    }
    

    if (target.classList.contains("target-hit") || target.classList.contains("water-hit")) {
        mainMessage.innerHTML = "This coordinate was already shot."
        xCoord.value = ""
        yCoord.value = ""
    } else {
        if (shipHit == true) {
            targetsShot += 1
            totalPoints += SHIP_POINTS
            target.classList.add("ship-hit")
            target.classList.add("target-hit")
            mainMessage.innerHTML = "A ship was hit!"
            shipsHitMessage.innerHTML = "Targets Shot: " + targetsShot

        } else if (submarineHit == true) {
            targetsShot += 1
            totalPoints += SUBMARINE_POINTS
            target.classList.add("submarine-hit")
            target.classList.add("target-hit")
            mainMessage.innerHTML = "A submarine was hit!"
            shipsHitMessage.innerHTML = "Targets Shot: " + targetsShot
        } else if (carrierHit == true) {
            totalPoints += CARRIER_POINTS
            targetsShot += 1
            target.classList.add("carrier-hit")
            target.classList.add("target-hit")
            mainMessage.innerHTML = "A carrier was hit!"
            shipsHitMessage.innerHTML = "Targets Shot: " + targetsShot
        } else if (bombHit == true) {
            target.classList.add("bomb-hit")
            target.classList.add("target-hit")
            mainMessage.innerHTML = "A bomb was gained!"
            if (bombQuantity == 0) {
                gainedBomb()
            }
            bombQuantity += 1
            bombCounter.innerHTML = bombQuantity
        } else if (atomicHit == true) {
            target.classList.add("atomic-hit")
            target.classList.add("target-hit")
            mainMessage.innerHTML = "An atomic bomb was gained!"
            if (atomicQuantity == 0) {
                gainedAtomic()
            }
            atomicQuantity += 1
            atomicCounter.innerHTML = atomicQuantity
        } else {
            target.classList.add("water-hit")
            mainMessage.innerHTML = "The shot landed in the water."
        }
        shotsFired += 1
        xCoord.value = ""
        yCoord.value = ""
        shotsFiredMessage.innerHTML = "Shots Fired: " + shotsFired
        pointsMessage.innerHTML = "Points Scored: " + totalPoints
        livesQuantity -= 1
        livesLeftMessage.innerHTML = "Lives Left: " + livesQuantity

    }
    if (targetsShot == 28) {
        endGameWin()
    }
    if (livesQuantity == 0 && targetsShot != 28) {
        endGameLoss()
    }
}

let bombQuantity = 3
let bombActive = false

function switchBomb() {
    if (!bombActive) {
        bombContainer.classList.add("active-bomb-container")
        bombContainer.classList.remove("bomb-container-hover")
        bombActive = true
    } else if (bombActive) {
        bombContainer.classList.add("bomb-container-hover")
        bombContainer.classList.remove("active-bomb-container")
        bombActive = false
    }
}

let atomicQuantity = 2
let atomicActive = false

function switchAtomic() {
    if (!atomicActive) {
        atomicContainer.classList.add("active-atomic-container")
        atomicContainer.classList.remove("atomic-container-hover")
        atomicActive = true
    } else if (atomicActive) {
        atomicContainer.classList.add("atomic-container-hover")
        atomicContainer.classList.remove("active-atomic-container")
        atomicActive = false
    }
}

function outOfBomb() {
    bombContainer.classList.remove("bomb-container-hover")
    bombContainer.classList.add("out-of")
}

function outOfAtomic() {
    atomicContainer.classList.remove("atomic-container-hover")
    atomicContainer.classList.add("out-of")
}

function gainedBomb() {
    bombContainer.classList.add("bomb-container-hover")
    bombContainer.classList.remove("out-of")
}

function gainedAtomic() {
    atomicContainer.classList.add("atomic-container-hover")
    atomicContainer.classList.remove("out-of")
}

function endGameWin() {
    mainMessage.innerHTML = "Game over, all ships were shot."
    shotContainer.classList.add("hide")
    restartButton.classList.remove("hide")
}

function endGameLoss() {
    mainMessage.innerHTML = "Game over, you are out of lives."
    shotContainer.classList.add("hide")
    restartButton.classList.remove("hide")
}

function restartGame() {
    all.length = 0
    ships.length = 0
    submarines.length = 0
    carriers.length = 0
    alreadyShot.length = 0
    bombs.length = 0
    atomics.length = 0
    shotsFired = 0
    targetsShot = 0
    totalPoints = 0
    if (bombQuantity == 0) {
        gainedBomb()
    }
    if (atomicQuantity == 0) {
        gainedAtomic()
    }
    bombQuantity = 3
    bombCounter.innerHTML = bombQuantity
    atomicQuantity = 2
    atomicCounter.innerHTML = atomicQuantity
    livesQuantity = 60
    startContainer.classList.remove("hide")
    startContainer.classList.add("flex")
    mainHeader.classList.add("hide")
    gridContainer.classList.add("hide")
    messagesContainer.classList.add("hide")
    shotContainer.classList.add("hide")
    gridContainer.classList.remove("grid")
    messagesCheckbox.classList.add("hide")
    restartButton.classList.add("hide")
    mainMessage.innerHTML = "Welcome, you can already make shots!"
    shotsFiredMessage.innerHTML = "Shots Fired: " + shotsFired
    shipsHitMessage.innerHTML = "Targets Shot: " + targetsShot
    pointsMessage.innerHTML = "Points Scored: " + totalPoints
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            let tile = document.querySelector(".water-" + y + "-" + x)
            if (tile.classList.contains("target-hit")) {
                tile.classList.remove("target-hit")
            }
            if (tile.classList.contains("water-hit")) {
                tile.classList.remove("water-hit")
            }
            if (tile.classList.contains("ship-hit")) {
                tile.classList.remove("ship-hit")
            }
            if (tile.classList.contains("submarine-hit")) {
                tile.classList.remove("submarine-hit")
            }
            if (tile.classList.contains("carrier-hit")) {
                tile.classList.remove("carrier-hit")
            }
            if (tile.classList.contains("bomb-hit")) {
                tile.classList.remove("bomb-hit")
            }
            if (tile.classList.contains("atomic-hit")) {
                tile.classList.remove("atomic-hit")
            }
        }
    }
}

let xPos = null
let xCounter = 14.5
let livesValue = 0

let eventListener = function(event) {
    if (!xPos) {
        xPos = event.clientX
    } else {
        let difference = (event.clientX - xPos) / 20
        if (Math.abs(difference) > 0.5 ) {
            xPos = event.clientX
            difference = (event.clientX - xPos) / 20
        }
        xCounter += difference
        if (xCounter + difference < 28 && xCounter + difference > 1.5) {
            livesNumbers.style.left = xCounter + difference + "vh"
            livesValue =  livesNumbers.style.left
            xPos = event.clientX
        }
    }
}

livesContainer.addEventListener("mousedown", () => {
    livesContainer.addEventListener("mousemove", eventListener)
    livesContainer.classList.add("cursor-grabbing")
})

livesContainer.addEventListener("mouseup", () => {
    livesContainer.removeEventListener("mousemove", eventListener)
    livesContainer.classList.remove("cursor-grabbing")
    adjustLives()
})

livesContainer.addEventListener("mouseout", () => {
    livesContainer.removeEventListener("mousemove", eventListener)
    adjustLives()
})

let livesQuantity = 60

function adjustLives() {
    let livesCounter = 0
    if (typeof livesValue === 'string' || livesValue instanceof String) {
        livesCounter = parseFloat(livesValue.replace("vh", ""))
    }
    if (livesCounter > 1 && livesCounter <= 5) {
        adjustBar(1.9)
        livesQuantity = 70
        livesLeftMessage.innerHTML = "Lives Left: 70"
    } else if (livesCounter > 5 && livesCounter <= 11) {
        adjustBar(8.3)
        livesQuantity = 65
        livesLeftMessage.innerHTML = "Lives Left: 65"
    } else if (livesCounter > 11 && livesCounter <= 17.5) {
        adjustBar(14.6)
        livesQuantity = 60
        livesLeftMessage.innerHTML = "Lives Left: 60"
    } else if (livesCounter > 17.5 && livesCounter <= 24) {
        adjustBar(20.8)
        livesQuantity = 55
        livesLeftMessage.innerHTML = "Lives Left: 55"
    } else if (livesCounter > 24 && livesCounter <= 28) {
        adjustBar(27.1)
        livesQuantity = 50
        livesLeftMessage.innerHTML = "Lives Left: 50"
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function adjustBar(target) {
    position = parseFloat(livesNumbers.style.left.replace("vh", ""))
    if (position >= target) {
        for (let i = position; i > target; i -= 0.1) {
            await sleep(10)
            livesNumbers.style.left = (i - 0.1) + "vh"
        }
    } else {
        for (let i = position; i < target; i += 0.1) {
            await sleep(10)
            livesNumbers.style.left = (i + 0.1) + "vh"
        }
    }
    xCounter = target
}
