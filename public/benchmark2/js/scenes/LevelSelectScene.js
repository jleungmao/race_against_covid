class LevelSelectScene extends Phaser.Scene {
    
    constructor() {
        super({
            key : LEVEL_SELECT
        })
        this.levels = [LEVEL_ONE, LEVEL_TWO, LEVEL_THREE, LEVEL_FOUR, LEVEL_FIVE, LEVEL_SIX];
    }

    init(data) {
        this.unlockedLevels = data.unlockedLevels;
    }

    create() {
        this.add.image(0, 0, "levelSelectBG").setOrigin(0);
        var backButton = this.add.image(50, 50, "backbutton").setScale(MINI_BUTTON_SCALE);
        var levelOneButton = this.add.image(150, 250, "levelonebutton");
        var levelTwoButton = this.add.image(WIDTH/2, 250, "leveltwobutton");
        var levelThreeButton = this.add.image(WIDTH - 150, 250, "levelthreebutton");
        var levelFourButton = this.add.image(150, 500, "levelfourbutton");
        var levelFiveButton = this.add.image(WIDTH/2, 500, "levelfivebutton");
        var levelSixButton = this.add.image(WIDTH - 150, 500, "levelsixbutton");

        let buttons = [levelOneButton, levelTwoButton, levelThreeButton, levelFourButton, levelFiveButton, levelSixButton]

        for (let i = 0; i < buttons.length; i++) {
            if (this.unlockedLevels[i]) {
                buttons[i].setInteractive();
                buttons[i].on("pointerover", () => {
                    buttons[i].setScale(BUTTON_SCALE_ENLARGE);
                })
                buttons[i].on("pointerout", () => {
                    buttons[i].setScale(BUTTON_SCALE);
                })
                buttons[i].on("pointerup", () => {
                    this.scene.start(this.levels[i]);
                })
            }
        }
        
        backButton.setInteractive();
        backButton.on("pointerover", () => {
            backButton.setScale(MINI_BUTTON_SCALE_ENLARGE);
        })
        backButton.on("pointerout", () => {
            backButton.setScale(MINI_BUTTON_SCALE);
        })
        backButton.on("pointerup", () => {
            this.scene.start(MENU);
        })
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown((this.input.keyboard.addKey('ESC')))) {
            this.scene.start(MENU);
        }
    }
}