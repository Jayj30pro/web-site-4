
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height= 550;
const gravity = 0.5;
const left = document.getElementById("left");
const right = document.getElementById("right");
const jump = document.getElementById("jump");
const couponFire = document.getElementById("coupon-fire");
let couponX = 0;
let couponY = 0;

//const shot = document.getElementById("shot");


const images = {};
images.bar = new Image();
images.bar.src = "burgerPlace.png";
images.ground = new Image();
images.ground.src = "level1floor.png";
images.walls = new Image();
images.walls.src = "walls.png";
images.character = new Image();
images.character.src = "karen-sprite-sheet.png";
images.coupon1 = new Image();
images.coupon1.src = "coupon2.png";
images.enemy = new Image();
images.enemy.src = "employee-sprite-sheet1.png";
images.boss = new Image();
images.boss.src = "manager-sprite-sheet2.png";





class Player {
    constructor() {
        this.speed = 8;
        this.position = {
            x: 100,
            y: 300
        }
        this.frame = {
            x: 0,
            y: 3
        }
        this.width = 107.88;
        this.height = 59.55;
        this.velocity = {
            x: 0,
            y: 0
        }
    }

    draw() {
        ctx.drawImage(images.character, this.width * this.frame.x, this.height * this.frame.y, this.width, this.height, this.position.x, this.position.y - this.height + 15, this.width * 2, this.height * 2);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y += gravity;
        }
        
    }
}

// crew member enemy

class EnemyCrew {
    constructor({ x, y }) {
        this.position = {
            x: x,
            y: y
        }

        this.frame = {
            x: 0,
            y: 0
        }

        this.width = 107.79; 
        this.height = 60;
    }
    //draw functions

    draw() {
        ctx.drawImage(images.enemy, this.width * this.frame.x, this.height * this.frame.y, this.width, this.height, this.position.x, this.position.y - this.height + 15, this.width * 2, this.height * 2.5);
    }

    update() {
        this.draw();
        if (this.frame.x <= 19) {
            this.frame.x += 1;
        }
        else {
            this.frame.x = 0;
        }
        
    }   
}

// add Boss enemy
    
class EnemyManager {
    constructor({ x, y }) {
        this.position = {
            x: x,
            y: y
        }

        this.frame = {
            x: 0,
            y: 0
        }

        
        this.width = 107.79; 
        this.height = 60;
        this.onscreen = false;
        this.attackReady = false;
        this.wasSeen = false;
        this.speed = 3;
        this.health = 16;
        // this.health = 4; // test health
        this.cooldown = 0;
    }
    //draw functions


    draw() {
        ctx.drawImage(images.boss, this.width * this.frame.x, this.height * this.frame.y, this.width, this.height, this.position.x, this.position.y - this.height + 15, this.width * 3.8, this.height * 3);
    }

    update() {
        this.draw();
        this.positionCheck();
        this.attack();
        if (this.attackReady){

            if (this.frame.x <= 19) { 
                this.frame.x += 1;
            }
            else {
                this.frame.x = 0;
                this.frame.y += 1;
                
            }
            if (this.frame.y > 3) {
                this.frame.y = 0;

            }
        }
        else {
            this.frame.y = 0;
            if (this.frame.x <= 19) { 
                this.frame.x += 1;
            }
            else {
                this.frame.x = 0;
            }
        }
                        
        }
        
        
    

    positionCheck(){
        if (scrollPosition > 6700) { 
            this.onscreen = true;
            this.wasSeen = true;
        }
        if (scrollPosition < 6000) {
            this.onscreen = false;
        }

        // if (scrollPosition > 6950) { //test
        //     this.onscreen = true;
        //     this.wasSeen = true;
        // }

        
        // if (scrollPosition < 6750) { //test
        //     this.onscreen = false;
        // }
    }

    attack() {
        if (this.onscreen) {
            if (this.cooldown == 0) {
                this.attackReady = true;
                this.position.x -= this.speed;
                if (this.position.x < -200){
                    this.speed *= -1;
                }
                if (this.position.x > 800 && this.speed < 0){
                    this.speed *= -1;
                    this.cooldown += 60
                    this.attackReady = false;
                }   
            }
            else {
                this.attackReady = false;
                this.cooldown -= 1;
            }
        }
        else {
            this.frame.y = 0;
            this.attackReady = false;
            this.speed = 3;
            if (this.wasSeen){
                this.position.x = 1500;
                this.wasSeen = false;
                this.cooldown = 0;
                
            }
            

        }
    }
}


class Platform {
    constructor({ x, y }) {
        this.position = {
            x: x,
            y: y
        }

        this.width = 400
        this.height = 90
    }

    draw() {
        ctx.drawImage(images.bar, this.position.x, this.position.y, this.width, this.height);
    }
}

class Floor {
    constructor({ x, y }) {
        this.position = {
            x: x,
            y: y
        }

        this.width = 500;
        this.height = 100;
    }

    draw() {
        ctx.drawImage(images.ground, this.position.x, this.position.y, this.width, this.height);
    }
}

class Background {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }
    }

    draw() {
        ctx.drawImage(images.walls, this.position.x, this.position.y);
    }
}


// create items
let endBoss = new EnemyManager({x: 7500, y:400});
let karen = new Player();
let platforms = [];
let grounds = [];
let scenery = [];
let enemies = [];
let scrollPosition = 0;
let direction = 1;
let projectile = 0;
let projectilePosition = 0;
let fire = 0;
let debug = false;

function start(){
    endBoss = new EnemyManager({x: 7500, y:400});
    //endBoss = new EnemyManager({x: 6550, y:400});
    karen = new Player();
    enemies = [new EnemyCrew({x: 550, y:265}),new EnemyCrew({x: 1850, y:265}),new EnemyCrew({x: 3050, y:115}),new EnemyCrew({x: 4000, y:415}),new EnemyCrew({x: 4600, y:415}),new EnemyCrew({x: 5000, y:415}),new EnemyCrew({x: 6000, y:415}),new EnemyCrew({x: 7000, y:265}),new EnemyCrew({x: 7300, y:115})];
    platforms = [new Platform({x: 500, y: 350}), new Platform({x: 1800, y: 350}), new Platform({x: 2600, y: 350}), new Platform({x: 3000, y: 200}), new Platform({x: 7300, y: 200}), new Platform({x: 7000, y: 350})];
    grounds = [new Floor({x: 0, y: 500}), new Floor({x: 500, y: 500}), new Floor({x: 1200, y: 500}), new Floor({x: 1700, y: 500}), new Floor({x: 2600, y: 500}), new Floor({x: 3600, y: 500}), new Floor({x: 4100, y: 500}), new Floor({x: 4600, y: 500}), new Floor({x: 5100, y: 500}), new Floor({x: 5600, y: 500}), new Floor({x: 6100, y: 500}), new Floor({x: 6600, y: 500}), new Floor({x: 7100, y: 500}), new Floor({x: 7600, y: 500})];
    scenery = [new Background()];
    scrollPosition = 0;
    projectile = 0;
    projectilePosition = 0;
    
}
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}


//**************************/ animaiton loop **************************************************

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = "#FFF"
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // coupon collision detection
    
    if (endBoss.attackReady == false) {
        if(couponY > endBoss.position.y - 50 &&
            couponY < endBoss.position.y + 50 &&
            projectilePosition > endBoss.position.x - 20 &&
            projectilePosition < endBoss.position.x + 20){
                endBoss.health -= 1;
            }
    }


    enemies = enemies.filter(enemy => {
        
        if (projectile > 0 &&
            couponY > enemy.position.y - 50 &&
            couponY < enemy.position.y + 50 &&
            projectilePosition > enemy.position.x - 20 &&
            projectilePosition < enemy.position.x + 20){
            
                console.log("got em!!");
                projectile = 0;
                projectilePosition = 0;
                return false; // Remove this enemy
                
            
        }
            
        return true; // Keep this enemy
    });

    // enemy collision detection

    if (karen.position.y == 440) {
        if (karen.position.x > endBoss.position.x +55 && karen.position.x < endBoss.position.x + 80){
        start();
        }
    }

    enemies.forEach(enemy => {
        
            if (karen.position.y > enemy.position.y - 50 && karen.position.y < enemy.position.y + 50){
                if (karen.position.x > enemy.position.x - 10 && karen.position.x < enemy.position.x + 10) {
                    console.log("I'm HIT!!!");
                    projectile = 0;
                    projectilePosition = 0;
                    start();
    
                }
            }
    });

    scenery.forEach(scene => {
        scene.draw();
    });
    
    platforms.forEach(platform => {
        platform.draw();
    });
    
    grounds.forEach(ground => {
        ground.draw();
    });

    enemies.forEach(crew => {
        crew.update();
    })
    
    endBoss.update();
    karen.update();

    updateProjectile();

    //experimental debugging function 

    if (debug) {
        debugInfo();
    }

    // movement

    if (keys.right.pressed) {
        moveRight();
    }
    else if (keys.left.pressed) {
        moveLeft();
    }
    else {
        moveNot();
    }

    //scorlling 

    if (keys.right.pressed && karen.position.x < 500) {
        karen.velocity.x = karen.speed;
    }
    else if (keys.left.pressed && scrollPosition == 0 && karen.position.x > -100) {
        karen.velocity.x = -karen.speed;
    }
    else if (keys.left.pressed && karen.position.x > 100) {
        karen.velocity.x = -karen.speed;
    }
    else {
        karen.velocity.x = 0;

        


        if(keys.right.pressed) {
            endBoss.position.x -= karen.speed;
            enemies.forEach(crew => {
                crew.position.x -= karen.speed;
            });
            platforms.forEach(platform => {
                platform.position.x -= karen.speed;
            });            
            grounds.forEach(ground => {
                ground.position.x -= karen.speed;
            });
            scenery.forEach(scene => {
                scene.position.x -= karen.speed * 0.6;
            });
            scrollPosition += karen.speed;

            
            
        }
        else if (keys.left.pressed && scrollPosition > 0) {
            endBoss.position.x += karen.speed;
            enemies.forEach(crew => {
                crew.position.x += karen.speed;
            });
            platforms.forEach(platform => {
                platform.position.x += karen.speed;
            });
            grounds.forEach(ground => {
                ground.position.x += karen.speed;
            });
            scenery.forEach(scene => {
                scene.position.x += karen.speed * 0.6;
            });            
            scrollPosition -= karen.speed;

            //add move boss left 
            
        }
    }

    
    // platform and ground collision detection
    platforms.forEach(platform => {    
        if (karen.position.y + karen.height <= platform.position.y && karen.position.y + karen.height + karen.velocity.y >= platform.position.y && karen.position.x + karen.width >= platform.position.x && karen.position.x + 100 <= platform.position.x + platform.width) {
            karen.velocity.y = 0;
        }
    });
    grounds.forEach(ground => {    
        if (karen.position.y + karen.height <= ground.position.y && karen.position.y + karen.height + karen.velocity.y >= ground.position.y && karen.position.x + karen.width >= ground.position.x && karen.position.x + 100 <= ground.position.x + ground.width) {
            karen.velocity.y = 0;
        }
    });

    

    // end of level                    ---------- Add defeat animation
    // Check if the boss is defeated
    if (endBoss.health <= 0) {
        console.log("Boss defeated! Redirecting to the next level...");
        window.location.href = "./karen-wins.html";
    }


    //death
    if (karen.position.y > canvas.height) {
        start();
    }
}

// sprite animation 

function moveRight() {
    karen.frame.y = 3;
    karen.frame.x += 1;
    if (karen.frame.x > 19) {
        karen.frame.x = 0;
    }
}

function moveLeft() {
    karen.frame.y = 4;
    karen.frame.x += 1;
    if (karen.frame.x > 19) {
        karen.frame.x = 0;
    }
}

function moveNot() {
    karen.frame.x = 0;
}

//add shoot frames******************************
function shoot() {  

}

function fireCoupon() {
    if (projectile == 0) {
        projectile = 1;
        couponY = karen.position.y;
        couponX = karen.position.x;
    }
}

function updateProjectile() {
    if (projectile > 0) {
        ctx.drawImage(images.coupon1, couponX + 50 + projectilePosition, couponY - 30, 80, 50);

        // Determine direction
        projectilePosition += (fire === 2 ? -15 : 15);

        // Reset if out of bounds
        if (projectilePosition < -450 || projectilePosition > canvas.width) {
            projectile = 0;
            projectilePosition = 0;
        }
    }
}

//experimental debugging function 

function toggleDebug() {
    if (debug) {
        debug = false;
    }
    else {
        debug = true;
    }
}

function debugInfo() {
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText(`Position: (${karen.position.x.toFixed(1)}, ${karen.position.y.toFixed(1)})`, 10, 20);
    ctx.fillText(`Scroll: ${scrollPosition}`, 10, 40);
    ctx.fillText(`Projectile: ${projectile}`, 10, 60);
    ctx.fillText(`boss Health: ${endBoss.health}`, 10, 80);
}
 


start();
animate();



window.addEventListener("keydown", (event) => {
    let code = event.code;
    switch (code) {
        case "KeyA":
            keys.left.pressed = true;
            direction = 2;
            break;
        case "KeyS": // down
            break;
        case "KeyD":
            keys.right.pressed = true;
            direction = 1;
            break;
        case "KeyW":
            if (karen.velocity.y ==0){
                karen.velocity.y -= 12;
            }
            break;
        case "Space":
            if (direction == 2 && projectile == 0) {
                fire = 2;
                fireCoupon();
            }
            else if (direction == 1 && projectile == 0){
                fire = 1;
                fireCoupon();
            }
            break;
        case "KeyB":
            toggleDebug();
            break;
    }
});

window.addEventListener("keyup", (event) => {
    let code = event.code;
    switch (code) {
        case "KeyA":
            keys.left.pressed = false;
            break;
        case "KeyS":
            break;
        case "KeyD":
            keys.right.pressed = false;
            break;
        case "KeyW":
            break;
    

    }
});
const goLeft = () => {
    keys.left.pressed = true;
    direction = 2;
}
const stopLeft = () => {
    keys.left.pressed = false;
}

const goRight = () => {
    keys.right.pressed = true;
    direction = 1;
}
const stopRight = () => {
    keys.right.pressed = false;
}

const jumpUp = () => {
    if (karen.velocity.y ==0){
        karen.velocity.y -= 12;
    }
}

const shootCoupon = () => {
    if (direction == 2 && projectile == 0) {
        fire = 2;
        fireCoupon();
    }
    else if (direction == 1 && projectile == 0){
        fire = 1;
        fireCoupon();
    }
}

// Prevent long-press context menu
const preventContextMenu = (event) => {
    event.preventDefault();
};

// Mouse events
//shot.addEventListener('mousedown', shootCoupon);
couponFire.addEventListener('mousedown', shootCoupon);
jump.addEventListener('mousedown', jumpUp);
left.addEventListener('mousedown', goLeft);
left.addEventListener('mouseup', stopLeft);
left.addEventListener('mouseout', stopLeft);
right.addEventListener('mousedown', goRight);
right.addEventListener('mouseup', stopRight);
right.addEventListener('mouseout', stopRight);

// Touch events
//shot.addEventListener('touchstart', shootCoupon);
couponFire.addEventListener('touchstart', shootCoupon);
jump.addEventListener('touchstart', jumpUp);
left.addEventListener('touchstart', goLeft);
left.addEventListener('touchend', stopLeft);
left.addEventListener('touchcancel', stopLeft);
right.addEventListener('touchstart', goRight);
right.addEventListener('touchend', stopRight);
right.addEventListener('touchcancel', stopRight);

// Handle multiple touch points


// const handleTouchStart = (event) => {
//     event.preventDefault();
//     for (let touch of event.changedTouches) {
//         const target = document.elementFromPoint(touch.clientX, touch.clientY);
//         if (target === left) {
//             goLeft();
//         } else if (target === right) {
//             goRight();
//         } else if (target === jump) {
//             jumpUp();
//         } else if (target === couponFire) {
//             shootCoupon();
//         }
//     }
// };

const handleTouchEnd = (event) => {
    event.preventDefault();
    for (let touch of event.changedTouches) {
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target === left) stopLeft();
        if (target === right) stopRight();
    }
};

//Adding event listeners to manage touch points
left.addEventListener('touchstart', handleTouchStart);
right.addEventListener('touchstart', handleTouchStart);
jump.addEventListener('touchstart', handleTouchStart);
couponFire.addEventListener('touchstart', handleTouchStart);
// shot.addEventListener('touchstart', handleTouchStart);


left.addEventListener('touchend', handleTouchEnd);
right.addEventListener('touchend', handleTouchEnd);
jump.addEventListener('touchend', handleTouchEnd);
couponFire.addEventListener('touchend', handleTouchEnd);
//shot.addEventListener('touchend', handleTouchEnd);

left.addEventListener('touchcancel', handleTouchEnd);
right.addEventListener('touchcancel', handleTouchEnd);
jump.addEventListener('touchcancel', handleTouchEnd);
couponFire.addEventListener('touchcancel', handleTouchEnd);
//shot.addEventListener('touchcancel', handleTouchEnd);

// Prevent long-press context menu
document.addEventListener('contextmenu', preventContextMenu);

function resizeCanvas() {
    const aspectRatio = 16 / 9; // Adjust based on your game's design (e.g., width:height)
    
    // Fit canvas to the available width and maintain aspect ratio
    const availableWidth = window.innerWidth;
    const availableHeight = window.innerHeight;

    // Determine the best fit for the canvas
    if (availableWidth / aspectRatio <= availableHeight) {
        canvas.width = availableWidth;
        canvas.height = availableWidth / aspectRatio;
    } else {
        canvas.width = availableHeight * aspectRatio;
        canvas.height = availableHeight;
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transformations
    // Adjust the scale of your game elements based on the new canvas size
    ctx.scale(canvas.width / 1024, canvas.height / 550); // Match original game resolution
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial call
