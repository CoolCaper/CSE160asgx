//movement should be variable so enemies don't fall of platforms


//physics

//sprites different

class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame, leftDir, rightDir);
    }
    update() {
    }
}