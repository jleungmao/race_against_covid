class WinScene extends Phaser.Scene {
    
    constructor() {
        super({
            key : WIN
        });
        this.pausedScene;
    }

    create() {
        this.add.image(0, 0, "winBG").setOrigin(0);
        var nextLevelButton = this.add.image(WIDTH/2, 300, "nextlevelbutton");
        var restartButton = this.add.image(WIDTH/2, 400, "restartbutton");
        var exitButton = this.add.image(WIDTH/2, 500, "exitbutton");

        if (this.pausedScene.key == LEVEL_SIX) {
            nextLevelButton.setVisible(false);
            restartButton.y = 300;
            exitButton.y = 450;
        }

        nextLevelButton.setInteractive();
        nextLevelButton.on("pointerover", () => {
            nextLevelButton.setScale(BUTTON_SCALE_ENLARGE);
        })
        nextLevelButton.on("pointerout", () => {
            nextLevelButton.setScale(BUTTON_SCALE);
        })
        nextLevelButton.on("pointerup", () => {
            this.pausedScene.reset();
            this.pausedScene.scene.stop();
            switch(this.pausedScene.key) {
                case LEVEL_ONE:
                    this.scene.start(LEVEL_TWO);
                    break;
                case LEVEL_TWO:
                    this.scene.start(LEVEL_THREE);
                    break;
                case LEVEL_THREE:
                    this.scene.start(LEVEL_FOUR);
                    break;
                case LEVEL_FOUR:
                    this.scene.start(LEVEL_FIVE);
                    break;
                case LEVEL_FIVE:
                    this.scene.start(LEVEL_SIX);
                    break;
            }
        })

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

        
        this.scene.launch(LEVEL_SELECT);
        var levelSelect = this.scene.get(LEVEL_SELECT);
        for(let i = 0; i<levelSelect.levels.length-1; i++){
            if(levelSelect.levels[i] == this.pausedScene.key){
                levelSelect.unlockedLevels[i+1] = 1;
            }
        }
        this.scene.stop(LEVEL_SELECT);
    }

    update() {
    }
}