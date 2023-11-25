'use strict'

let config = {
    parent: 'phaser-game',
    type: Phaser.AUTO,
    pixelArt: true,
    width: 800,
    height: 600,
    scene: [ Basics ]
}

let keyJUMP, keyLEFT, keyRIGHT;
const game = new Phaser.Game(config)