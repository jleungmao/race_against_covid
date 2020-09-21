class SplashScene extends Phaser.Scene {
    
    constructor() {
        super({
            key: SPLASH,
            pack: {
                files: [
                    {
                        type: "image",
                        key: "splashScreen",
                        url: "assets/splashbackground.png"
                    }
                ]
            }
        });
    }

    preload() {
        this.add.image(0, 0, "splashScreen").setOrigin(0);

        var loadingBox = this.add.graphics();
        var loadingBar = this.add.graphics();
        loadingBox.fillStyle(0xffffff); // white
        loadingBox.fillRect(WIDTH/2 - (WIDTH/4), HEIGHT - 100, WIDTH/2, 30);
        loadingBar.fillStyle(0x00b300);

        // background
        this.load.image("menuBG", "assets/splashbackground.png");
        this.load.image("aboutBG", "assets/aboutbackground.png");
        this.load.image("pauseBG", "assets/pausebackground.png");
        this.load.image("controlsBG", "assets/controlsbackground.png");
        this.load.image("levelSelectBG", "assets/levelselectbackground.png");
        this.load.image("loseBG", "assets/losebackground.png");
        this.load.image("winBG", "assets/winbackground.png");

        // buttons
        this.load.image("backbutton", "assets/backbutton.png");
        this.load.image("unmutebutton", "assets/unmute.png");
        this.load.image("mutebutton", "assets/mute.png");
        this.load.image("playbutton", "assets/playbutton.png");
        this.load.image("aboutbutton", "assets/aboutbutton.png");
        this.load.image("controlsbutton", "assets/controlsbutton.png");
        this.load.image("exitbutton", "assets/exitbutton.png");
        this.load.image("restartbutton", "assets/restartbutton.png");
        this.load.image("resumebutton", "assets/resumebutton.png");
        this.load.image("levelonebutton", "assets/levelonebutton.png");
        this.load.image("leveltwobutton", "assets/leveltwobutton.png");
        this.load.image("levelthreebutton", "assets/levelthreebutton.png");
        this.load.image("levelfourbutton", "assets/levelfourbutton.png");
        this.load.image("levelfivebutton", "assets/levelfivebutton.png");
        this.load.image("levelsixbutton", "assets/levelsixbutton.png");
        this.load.image("nextlevelbutton", "assets/nextlevelbutton.png");

        // tilemaps
        this.load.image("tileset", "assets/tileset.png");
        this.load.tilemapTiledJSON("levelOne", "assets/tilemaps/intro1.json");
        this.load.tilemapTiledJSON("levelTwo", "assets/tilemaps/level2.json");
        this.load.tilemapTiledJSON("levelThree", "assets/tilemaps/level3.json");
        this.load.tilemapTiledJSON("levelFour", "assets/tilemaps/level4.json");
        this.load.tilemapTiledJSON("levelFive", "assets/tilemaps/level5.json");
        this.load.tilemapTiledJSON("levelSix", "assets/tilemaps/level6.json");

        // spritesheets
        this.load.spritesheet("pill", "assets/spritesheet/pill_spritesheet.png", {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("coronavirus", "assets/spritesheet/coronavirus.png", {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("boss", "assets/spritesheet/coronavirus_boss.png", {frameWidth: 288, frameHeight: 64});
        this.load.spritesheet("virusbullet", "assets/spritesheet/coronavirus_bullet.png", {frameWidth: 7, frameHeight: 7});
        this.load.spritesheet("virusslowbullet", "assets/spritesheet/coronavirus_slow.png", {frameWidth: 7, frameHeight: 7});
        this.load.spritesheet("pillbullet", "assets/spritesheet/pill_bullet.png", {frameWidth: 7, frameHeight: 3});

        // sounds
        this.load.audio("bgmusic", "assets/sounds/backgroundmusic.mp3");
        this.load.audio("pillattack", "assets/sounds/pillshoot.mp3");
        this.load.audio("virusattack", "assets/sounds/virusshoot.mp3");
        this.load.audio("virusdead", "assets/sounds/virusdead.mp3");
        
        this.load.on("progress", (percentage) => {
            loadingBar.fillRect(WIDTH/2 - (WIDTH/4), HEIGHT - 100, WIDTH/2 * percentage, 30);
        });

        this.load.on("complete", () => {
            loadingBox.destroy();
            loadingBar.destroy();
            let data = {
                "unlockedLevels" : [1, 0, 0, 0, 0, 0]
            }
            let music = this.sound.add("bgmusic", {
                volume : .25,
                loop: true
            });
            music.play();
            this.scene.start(MENU, data);
        });
    }
}