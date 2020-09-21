class LoseScene extends Phaser.Scene {
    
    constructor() {
        super({
            key : LOSE
        });
        this.loseText;
        this.textX;
        this.textY;
        this.pausedScene;
    }

    create() {
        this.add.image(0, 0, "loseBG").setOrigin(0);
        var restartButton = this.add.image(WIDTH/2, 350, "restartbutton");
        var exitButton = this.add.image(WIDTH/2, 450, "exitbutton");
        this.loseText = this.add.text(this.textX, this.textY, this.loseText,{color: 'white', font: '20px'});

        exitButton.setInteractive();
        exitButton.on("pointerover", () => {
            exitButton.setScale(BUTTON_SCALE_ENLARGE);
        })
        exitButton.on("pointerout", () => {
            exitButton.setScale(BUTTON_SCALE);
        })
        exitButton.on("pointerup", () => {
            this.pausedScene.reset();
            this.pausedScene.scene.stop();
            this.scene.start(MENU);
        })

        restartButton.setInteractive();
        restartButton.on("pointerover", () => {
            restartButton.setScale(BUTTON_SCALE_ENLARGE);
        })
        restartButton.on("pointerout", () => {
            restartButton.setScale(BUTTON_SCALE);
        })
        restartButton.on("pointerup", () => {
            this.pausedScene.reset();
            this.pausedScene.scene.stop();
            this.scene.start(this.pausedScene);
        })
    }

    update() {
    }
}