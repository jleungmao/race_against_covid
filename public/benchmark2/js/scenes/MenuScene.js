class MenuScene extends Phaser.Scene {
    
    constructor() {
        super({
            key : MENU
        })
    }

    init(data) {
        this.unlockedLevels = data.unlockedLevels;
    }

    create() {
        this.add.image(0, 0, "menuBG").setOrigin(0);
        var playButton = this.add.image(WIDTH/2, 350, "playbutton");
        var controlsButton = this.add.image(WIDTH/2, 450, "controlsbutton");
        var aboutButton = this.add.image(WIDTH/2, 550, "aboutbutton");

        playButton.setInteractive();
        playButton.on("pointerover", () => {
            playButton.setScale(BUTTON_SCALE_ENLARGE);
        })
        playButton.on("pointerout", () => {
            playButton.setScale(BUTTON_SCALE);
        })
        playButton.on("pointerup", () => {
            let data = {
                "unlockedLevels" : this.unlockedLevels
            }
            this.scene.start(LEVEL_SELECT, data);
        })

        controlsButton.setInteractive();
        controlsButton.on("pointerover", () => {
            controlsButton.setScale(BUTTON_SCALE_ENLARGE);
        })
        controlsButton.on("pointerout", () => {
            controlsButton.setScale(BUTTON_SCALE);
        })
        controlsButton.on("pointerup", () => {
            this.scene.launch(CONTROLS);
            var controlScene = this.scene.get(CONTROLS);
            controlScene.caller = MENU;
            this.scene.bringToTop(CONTROLS);
        })

        aboutButton.setInteractive();
        aboutButton.on("pointerover", () => {
            aboutButton.setScale(BUTTON_SCALE_ENLARGE);
        })
        aboutButton.on("pointerout", () => {
            aboutButton.setScale(BUTTON_SCALE);
        })
        aboutButton.on("pointerup", () => {
            this.scene.start(ABOUT);
        })

    }
}