class LevelFiveScene extends LevelScene {
    constructor() {
        super({
            key : LEVEL_FIVE
        });
        this.key = LEVEL_FIVE;
        this.timeLeft = 300;
    }

    create() {
        super.loadMap('levelFive');
        super.loadTimer(this.timeLeft);
        super.loadHP();
        super.loadPoints();
    }

    update() {
        super.update();
    }

    reset(){
        this.timeLeft = 240;
        super.reset();
    }
}