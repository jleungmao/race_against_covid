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
    }
    reset(){
        this.timeLeft = 240;
        super.reset();
    }
}