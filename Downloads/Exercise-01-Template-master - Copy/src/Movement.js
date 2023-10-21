class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    preload() {
        this.load.spritesheet('character', './assets/spritesheets/Character_002.png', {
            frameWidth: 48 //48 x 48 pixels
            // we don't need to put a frameHeight since they are both 48, it will just assume the height is the same 
            //as the x if we don't put anything
        });
    }

    create() {
        this.cameras.main.setBackgroundColor(0xFACADE);
        this.player = this.physics.add.sprite(width / 2, height / 2, 'character', 1);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setSize(32, 32).setOffset(8, 16);
        this.PLAYER_VELOCITY = 350;
        cursors = this.input.keyboard.createCursorKeys();
        this.anims.create({
            key: 'idle-down',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
              start: 1,
              end: 1  
            })
        })
        
        this.anims.create({
            key: 'idle-up',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
              start: 10,
              end: 10  
            })
        })
        
        this.anims.create({
            key: 'idle-left',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
              start: 4,
              end: 4  
            })
        })
        this.anims.create({
            key: 'idle-right',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
              start: 7,
              end: 7  
            })
        })
        this.anims.create({
            key: 'walk-down',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
              start: 0,
              end: 2
            })
        })  
        this.anims.create({
            key: 'walk-up',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
              start: 9,
              end: 11
            })
        })          
        this.anims.create({
            key: 'walk-left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
              start: 3,
              end: 5
            })
        })
          
        this.anims.create({
            key: 'walk-right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
              start: 6,
              end: 8
            })
        })
    }
    
    update() {
        let playerVector = new Phaser.Math.Vector2(0, 0);  //put this in update because it's in every frame
        let playerDirection;
        if(cursors.left.isDown) {
            playerVector.x = -1;
            playerDirection = 'left';
        } else if (cursors.right.isDown) {
            playerVector.x = 1;
            playerDirection = 'right';
        }
        if(cursors.up.isDown) {
            playerVector.y = -1;
            playerDirection = 'up';
        } else if (cursors.down.isDown) {
            playerVector.y = 1;
            playerDirection = 'down';
        }
        playerVector.normalize();
        //this.player.x += playerVector.x * this.PLAYERVELOCITY;        
        //this.player.y += playerVector.y * this.PLAYERVELOCITY;
        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)
        let playerMovement 
        playerVector.length() ? playerMovement = 'walk' : playerMovement = 'idle'
        this.player.play(playerMovement + '-' + playerDirection, true);
    }
}