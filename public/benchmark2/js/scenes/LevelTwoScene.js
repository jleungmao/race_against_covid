class LevelTwoScene extends LevelScene {
    constructor() {
        super({
            key : LEVEL_TWO
        });
        this.key = LEVEL_TWO;
        this.timeLeft = 240;
    }

    create() {
        super.loadMap('levelTwo');
        super.loadTimer(this.timeLeft);
        super.loadHP();
        super.loadPoints();
    }

    update() {
        super.update();
        // if (this.input.keyboard.addKey('W').isDown === true) {
        //     this.cameras.main.setBounds(this.rooms[0].x,
        //     this.rooms[0].y,
        //     this.rooms[0].width,
        //     this.rooms[0].height,
        //     true);
        // }
    }
    reset(){
        this.timeLeft = 240;
        super.reset();
    }
}