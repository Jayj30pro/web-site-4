
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const images = {};
images.player = new Image();
images.player.src = "clearHelloSprites.png";

const playerWidth = 50.19;
const playerHeight = 88.66;

let playerFrameX = 1;
let playerFrameY = 0;
let playerX = playerWidth * 2;
let playerY = window.innerHeight - playerHeight * 2;
const playerSpeed = 2;

function drawSprite(img, sX, SY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, SY, sW, sH, dX, dY, dW, dH);
}

function showtime(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawSprite(images.player, playerWidth * playerFrameX , playerHeight * playerFrameY, playerWidth, playerHeight, playerX, playerY, playerWidth*2, playerHeight*2);
    wave();
}

function wave() {
    playerFrameX += 3;

    
    if (playerFrameX > 19 && playerFrameY == 0) {
        playerFrameX = 1;
        playerFrameY = 1;
    }
    else if (playerFrameX > 4 && playerFrameY == 1) {
        playerFrameX = 1;
        playerFrameY = 1;
    }
    
}

window.onload = setInterval(showtime, 200);

window.addEventListener('resize', function(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    playerX = playerWidth * 2;
    playerY = window.innerHeight - playerHeight * 2;
})
