class AboutScene extends Phaser.Scene {
   
    constructor() {
        super({
            key : ABOUT
        })
    }

    init(data) {
        this.unlockedLevels = data.unlockedLevels;
    }

    create() {
        this.add.image(0, 0, "aboutBG").setOrigin(0);
        var backButton = this.add.image(50, 50, "backbutton").setScale(MINI_BUTTON_SCALE);
        
        this.add.text(10, HEIGHT - 100,
            'Music by Kevin MacLeod (incompetech.com) \n' +
            'Licensed under Creative Commons: \n' +
            'By Attribution 4.0 License \n' +
            'http://creativecommons.org/licenses/by/4.0/',
            {color: 'white', font: '12px'});

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