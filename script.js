let scoreCount = 0;
const pipeGap = 140;
const birdColor = 'blue';

function showScore() {
    scoreCount++;
    document.querySelector('.score').innerHTML = `Score: ${scoreCount}`;
}

setTimeout((() => setInterval(showScore, 1000)),2000);


setInterval(() => {
    const bird = document.querySelector('.bird');
    const down = `${birdColor}bird-downflap.png`;
    const mid  = `${birdColor}bird-midflap.png`;
    const up   = `${birdColor}bird-upflap.png`;

    if (bird.src.endsWith(down)) {
        bird.src = `sprites/${mid}`;
    }
    else if (bird.src.endsWith(mid)) {
        bird.src = `sprites/${up}`;
    }
    else {
        bird.src = `sprites/${down}`;
    }

}, 100);



function createPipe(pipeNumber)
{
    let calculateHeight = 0;
    while(calculateHeight < pipeGap || calculateHeight > (400-pipeGap)) calculateHeight = Math.random()*400;
    
    let secondHeight = 400-calculateHeight-pipeGap;
    
    // if( pipeNumber === 2 ){
    //     let x = calculateHeight;
    //     calculateHeight = secondHeight;
    //     secondHeight = x;
    // }

    const HTML = `
    <img class="pipe uppipe" style="height: ${secondHeight}px;" src="sprites/pipe-green.png" alt="">
    <img class="pipe downpipe" style="height: ${calculateHeight}px;" src="sprites/pipe-green.png" alt="">
    `
    document.querySelector(`.js-pipe${pipeNumber}`).innerHTML = HTML;

}
setInterval(() => createPipe(1), 2000);
setTimeout((() => setInterval(() => createPipe(2), 2000)),1000);

const bird = document.querySelector('.bird');
let birdY = 200;
let velocity = 0;
const gravity = 0.43;
const jumpPower = -6.4;

function updateVelocity() {
    velocity +=gravity;
    birdY += velocity; 
    bird.style.top = birdY + "px";

    requestAnimationFrame(updateVelocity);   
}  

updateVelocity();

// setInterval(()=> {
//     velocity +=gravity;
//     birdY += velocity; 
//     bird.style.top = birdY + "px";
// },15);

document.addEventListener("keydown", () => jump());
document.addEventListener("mousedown", () => jump());

function jump() {
    velocity = jumpPower;
}

function isColliding(rect1,rect2) {
    return !(rect1.right-3 < rect2.left ||
        rect1.left-3 > rect2.right ||
        rect1.bottom-3 < rect2.top ||
        rect1.top > rect2.bottom
    )
}

const playBox = document.querySelector('.container');
const playBoxRect = playBox.getBoundingClientRect();

const base  =document.querySelector('.base');
const baseRect = base.getBoundingClientRect();

function checkCollisoin(){
    const bird = document.querySelector('.bird');
    const birdRect  = bird.getBoundingClientRect();

    const pipe = document.querySelectorAll('.pipe');

    pipe.forEach((pipe) => {
        const pipeRect = pipe.getBoundingClientRect(); 

        if(isColliding(birdRect,pipeRect)) {
            gameOver();
        }
    })

    if (birdRect.top <= playBoxRect.top || birdRect.bottom-3 >= baseRect.top) {
        gameOver();
    }
}

function updateCollision() {
    checkCollisoin();

    requestAnimationFrame(updateCollision);
}

updateCollision();

// setInterval(checkCollisoin, 15);

let gameOverTriggered = false;

function gameOver() {
    if (gameOverTriggered) return;
    gameOverTriggered = true;

    alert('Game Over!');
    location.reload();
}




