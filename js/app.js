// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.radius = 40;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by a dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x >= 505) {
        this.x = 0;
    }
    this.x = Math.round(this.x + (dt * this.speed));
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 380;
    this.radius = 30;
};

Player.prototype.update = function(dt) {
    ctx.drawImage(Resources.get(this.sprite),this.x ,this.y);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

// Loops through each enemy to check if there are collisions,
// if yes reloads the page
Enemy.prototype.checkCollisions = function() {
    let dx = player.x - this.x;
    let dy = player.y - this.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    if(distance < player.radius + this.radius) {
        location.reload();
    }
}

// Calls the win modal after game has been won 
Player.prototype.declareWin = function() {
    let modal = document.getElementById('winModal');
    let closeButton = document.querySelector('.close');
    let playAgainButton = document.querySelector('.playAgain');
    modal.style.display = "block";
    playAgainButton.onclick = function() {
        modal.style.display = "none";
        location.reload();
    };
    closeButton.onclick = function() {
        modal.style.display = "none";
        location.reload();
    };
}

Player.prototype.handleInput = function(allowedKeys) {
    switch(allowedKeys) {
        case 'left': {
            if(this.x <= 0) {
                this.x = 500;
            }
            this.x = this.x - 100;
            break;
        }

        case 'right': {
            if(this.x >= 400) {
                this.x = 0;
            } else {
                this.x += 100;
            }
            break;
        }  
        case 'up': {
            if(this.y > 0) {
                this.y -= 80;
            } 
            if(this.y < 0) {
                setTimeout(function() {
                    player.declareWin();
                }, 200);
            }
            break;
        }
        case 'down': {
            if(this.y < 380) {
                this.y += 80;
            } 
            break;
        }
    }
    this.update();
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(0, 60, 350);
const enemy2 = new Enemy(0, 140, 250);
const enemy3 = new Enemy(0, 60, 200);
const enemy4 = new Enemy(0, 220, 120);
const allEnemies = [enemy1, enemy2, enemy3, enemy4];
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
