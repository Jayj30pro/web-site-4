
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height= 550;
const gravity = 0.5;


const images = {};
images.bar = new Image();
images.bar.src = "burgerPlace.png";
images.ground = new Image();
images.ground.src = "level1floor.png";
images.walls = new Image();
images.walls.src = "walls.png";
images.character = new Image();
images.character.src = "productionDemo.png";
images.coupon1 = new Image();
images.coupon1.src = "coupon2.png";
images.enemy = new Image();
images.enemy.src = "employeeSpriteSheet1.png";


 

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

    //add draw functions



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

        this.width = 500
        this.height = 100
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
let karen = new Player();
let platforms = [];
let grounds = [];
let scenery = [];
let enemies = [];
let scrollPosition = 0;
let direction = 1;
let projectile = 0;
let projectilePosition = 0;
let couponY = 0;
let fire = 0;

function start(){
    karen = new Player();
    enemies = [new EnemyCrew({x: 550, y:265}),new EnemyCrew({x: 1850, y:265}),new EnemyCrew({x: 3050, y:115}),new EnemyCrew({x: 4600, y:415})];
    platforms = [new Platform({x: 500, y: 350}), new Platform({x: 1800, y: 350}), new Platform({x: 2600, y: 350}), new Platform({x: 3000, y: 200}), new Platform({x: 7300, y: 200}), new Platform({x: 7000, y: 350})];
    grounds = [new Floor({x: 0, y: 500}), new Floor({x: 500, y: 500}), new Floor({x: 1200, y: 500}), new Floor({x: 1700, y: 500}), new Floor({x: 2600, y: 500}), new Floor({x: 3600, y: 500}), new Floor({x: 4100, y: 500}), new Floor({x: 4600, y: 500}), new Floor({x: 5100, y: 500}), new Floor({x: 5600, y: 500}), new Floor({x: 6100, y: 500}), new Floor({x: 6600, y: 500}), new Floor({x: 7100, y: 500}), new Floor({x: 7600, y: 500})];
    scenery = [new Background()];
    scrollPosition = 0;
    projectile = 0;
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
    
    karen.update();

    // movement

    if (projectile > 0) {
        ctx.drawImage(images.coupon1, couponX + 50 + projectilePosition, couponY - 30, 80, 50);
        if (fire ==2){
            projectileMoveLeft();
        }
        else {
            projectileMoveRight();
        }
    }
        
    

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
            platforms.forEach(platform => {
                platform.position.x -= karen.speed;
            });
            enemies.forEach(crew => {
                crew.position.x -= karen.speed;
            });
            grounds.forEach(ground => {
                ground.position.x -= karen.speed;
            });
            scenery.forEach(scene => {
                scene.position.x -= karen.speed * 0.6;
            });
            scrollPosition += karen.speed;

            //add move enemies right 
            
        }
        else if (keys.left.pressed && scrollPosition > 0) {
            platforms.forEach(platform => {
                platform.position.x += karen.speed;
            });
            grounds.forEach(ground => {
                ground.position.x += karen.speed;
            });
            scenery.forEach(scene => {
                scene.position.x += karen.speed * 0.6;
            });
            enemies.forEach(crew => {
                crew.position.x += karen.speed;
            });
            scrollPosition -= karen.speed;

            //add move enemies left 
            
        }
    }

    
    // platform collision detection
    platforms.forEach(platform => {    
        if (karen.position.y + karen.height <= platform.position.y && karen.position.y + karen.height + karen.velocity.y >= platform.position.y && karen.position.x + karen.width >= platform.position.x && karen.position.x + 100 <= platform.position.x + platform.width) {
            karen.velocity.y = 0;
        }
    });
    grounds.forEach(platform => {    
        if (karen.position.y + karen.height <= platform.position.y && karen.position.y + karen.height + karen.velocity.y >= platform.position.y && karen.position.x + karen.width >= platform.position.x && karen.position.x + 100 <= platform.position.x + platform.width) {
            karen.velocity.y = 0;
        }
    });

    // add coupon collision here



    // end of level                    ---------- Make it more fancy
    if (scrollPosition > 7100){
        console.log("You are the winner!!!");
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
        projectile += 1;
        couponY = karen.position.y
        couponX = karen.position.x
    }
}

function projectileMoveLeft() {
    projectilePosition -=15;
    if (projectilePosition < -450) {
        projectile = 0;
        projectilePosition = 0;
    }
}

function projectileMoveRight() {
    projectilePosition +=15;
    if (projectilePosition > 800) {
        projectile = 0;
        projectilePosition = 0;
    }
        
}
        
start();
animate();




window.addEventListener("keydown", ({ keyCode }) => {
    console.log(keyCode);
    switch (keyCode) {
        case 65:
            keys.left.pressed = true;
            direction = 2;
            break;
        case 83: // down
            break;
        case 68:
            keys.right.pressed = true;
            direction = 1;
            break;
        case 87:
            if (karen.velocity.y ==0){
                karen.velocity.y -= 12;
            }
            break;
        case 32:
            if (direction == 2 && projectile == 0) {
                fire = 2;
                fireCoupon();
            }
            else if (direction == 1 && projectile == 0){
                fire = 1;
                fireCoupon();
            }
            
            break;
    }
});

window.addEventListener("keyup", ({ keyCode }) => {
    //console.log(keyCode);
    switch (keyCode) {
        case 65:
            keys.left.pressed = false;
            break;
        case 83:
            break;
        case 68:
            keys.right.pressed = false;
            break;
        case 87:
            break;
    

    }
});

