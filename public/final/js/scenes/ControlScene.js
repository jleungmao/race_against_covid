class ControlScene extends Phaser.Scene {
    
    constructor() {
        super({
            key : CONTROLS
        })
        this.caller = null;
    }

    create() {
        this.add.image(0, 0, "controlsBG").setOrigin(0);
        var backButton = this.add.image(50, 50, "backbutton").setScale(MINI_BUTTON_SCALE);
        
        backButton.setInteractive();
        backButton.on("pointerover", () => {
            backButton.setScale(MINI_BUTTON_SCALE_ENLARGE);
        })
        backButton.on("pointerout", () => {
            backButton.setScale(MINI_BUTTON_SCALE);
        })
        backButton.on("pointerup", () => {
            this.scene.stop();
            this.scene.resume(this.caller);
        })
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown((this.input.keyboard.addKey('ESC')))) {
            this.scene.stop();
            this.scene.resume(this.caller);
        }
    }
}