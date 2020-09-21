class LevelSixScene extends LevelScene {
    constructor() {
        super({
            key : LEVEL_SIX
        });
        this.key = LEVEL_SIX;
        this.timeLeft = 300;
        this.bossSpawned = false;
    }

    create() {
        super.loadMap('levelSix');
        super.loadTimer(this.timeLeft);
        super.loadHP();
        super.loadPoints();
    }

    update() {
        super.update();
        // all viruses in last room killed
        if (this.virusCount[this.rooms.length - 1] == 0 && !this.bossSpawned) {
            this.bossSpawned = true;
            let boss = new BossVirus(this, this.rooms[this.rooms.length - 1].x+WIDTH/2-100, this.rooms[this.rooms.length - 1].y+100, BOSS);
            boss.canMove = true;
            this.addVirus(boss);
        }
    }

    reset(){
        this.timeLeft = 240;
        super.reset();
        this.bossSpawned = false;
    }
}