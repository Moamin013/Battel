const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

// Speler vliegtuig
const player = {
    x: canvas.width / 2,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0,
    dy: 0
};

// Kogels
const bullets = [];

// Vijandelijke vliegtuigen
const enemies = [];
let enemyCount = 0;

// Eindbaas
let boss = null;

// Toetsenbord input
let keys = {
    left: false,
    right: false,
    up: false,
    down: false,
    space: false
};

document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft" || e.key === "a") keys.left = true;
    if (e.key === "ArrowRight" || e.key === "d") keys.right = true;
    if (e.key === "ArrowUp" || e.key === "w") keys.up = true;
    if (e.key === "ArrowDown" || e.key === "s") keys.down = true;
    if (e.key === " ") keys.space = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === "ArrowLeft" || e.key === "a") keys.left = false;
    if (e.key === "ArrowRight" || e.key === "d") keys.right = false;
    if (e.key === "ArrowUp" || e.key === "w") keys.up = false;
    if (e.key === "ArrowDown" || e.key === "s") keys.down = false;
    if (e.key === " ") keys.space = false;
});

// Functie om het vliegtuig van de speler te bewegen
function movePlayer() {
    if (keys.left && player.x > 0) player.x -= player.speed;
    if (keys.right && player.x < canvas.width - player.width) player.x += player.speed;
    if (keys.up && player.y > 0) player.y -= player.speed;
    if (keys.down && player.y < canvas.height - player.height) player.y += player.speed;
}

// Functie om kogels te schieten
function shootBullet() {
    if (keys.space) {
        bullets.push({ x: player.x + player.width / 2 - 2, y: player.y, width: 5, height: 10, speed: 7 });
    }
}

// Functie om kogels te bewegen
function moveBullets() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].y -= bullets[i].speed;
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
            i--;
        }
    }
}

// Functie om vijanden te maken
function createEnemy() {
    if (enemyCount < 10) {
        enemyCount++;
        const enemy = {
            x: Math.random() * (canvas.width - 50),
            y: -50,
            width: 50,
            height: 50,
            speed: 2 + Math.random() * 2
        };
        enemies.push(enemy);
    }
}

// Functie om vijanden te bewegen
function moveEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].y += enemies[i].speed;
        if (enemies[i].y > canvas.height) {
            enemies.splice(i, 1);
            i--;
        }
    }
}

// Functie om vijanden te tekenen
function drawEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        ctx.fillStyle = "red";
        ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
    }
}

// Functie om de speler en de vijanden te tekenen
function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Functie om kogels te tekenen
function drawBullets() {
    ctx.fillStyle = "yellow";
    for (let i = 0; i < bullets.length; i++) {
        ctx.fillRect(bullets[i].x, bullets[i].y, bullets[i].width, bullets[i].height);
    }
}

// Functie om botsingen te controleren tussen kogels en vijanden
function checkCollisions() {
    for (let i = 0; i < bullets.length; i++) {
        for (let j = 0; j < enemies.length; j++) {
            if (bullets[i].x < enemies[j].x + enemies[j].width &&
                bullets[i].x + bullets[i].width > enemies[j].x &&
                bullets[i].y < enemies[j].y + enemies[j].height &&
                bullets[i].y + bullets[i].height > enemies[j].y) {
                enemies.splice(j, 1);
                bullets.splice(i, 1);
                enemyCount--;
                break;
            }
        }
    }
}

// Functie om het spel te updaten
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    movePlayer();
    shootBullet();
    moveBullets();
    moveEnemies();

    drawPlayer();
    drawBullets();
    drawEnemies();

    checkCollisions();

    createEnemy();

    // Eindbaas verschijnt na 10 verslagen vijandelijke vliegtuigen
    if (enemyCount >= 10 && !boss) {
        boss = {
            x: canvas.width / 2 - 100,
            y: -100,
            width: 200,
            height: 100,
            speed: 2,
            health: 100
        };
    }

    if (boss) {
        boss.y += boss.speed;
        ctx.fillStyle = "green";
        ctx.fillRect(boss.x, boss.y, boss.width, boss.height);
        if (boss.y > canvas.height) {
            boss = null;
        }
    }

    requestAnimationFrame(update);
}

// Start het spel
update();
