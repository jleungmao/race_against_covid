class LevelFourScene extends LevelScene {
    constructor() {
        super({
            key : LEVEL_FOUR
        });
        this.key = LEVEL_FOUR;
        this.timeLeft = 360;
    }

    create() {
        super.loadMap('levelFour');
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