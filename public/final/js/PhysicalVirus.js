class PhysicalVirus extends Virus {
    constructor(scene, x, y, type) {
        super(scene, x, y, 'coronavirus');
        this.type = type;
        this.velocity = PHYSICAL_VIRUS_ONE_VELOCITY;
        this.angleToPlayer = null;
        this.health = 3;
        this.canMove = false;
        this.create();
    }

    create() {
        this.createAnimations();
    }

    update() {
        super.updateHealth();
        if(this.canMove){
            this.move();
        }
    }

    move() {
        if (this.health > 0) {
            let thisX = this.body.x + this.body.width / 2;
            let thisY = this.body.y + this.body.height / 2;
            let pillX = this.scene.player.body.x + this.scene.player.width / 2;
            let pillY = this.scene.player.body.y + this.scene.player.height / 2;
            this.angleToPlayer = Phaser.Math.Angle.Between(thisX, thisY, pillX, pillY);
            let xVelocity = Math.cos(this.angleToPlayer) * this.velocity;
            let yVelocity = Math.sin(this.angleToPlayer) * this.velocity;
            
            this.setVelocityX(xVelocity);
            this.setVelocityY(yVelocity);
            this.play("physical_travel", true);
        }
    }

    createAnimations() {
        this.scene.anims.create({
            key: "physical_dying",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("coronavirus", {
                start: 0,
                end: 2
            })
        });
        this.scene.anims.create({
            key: "physical_travel",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("coronavirus", {
                start: 4,
                end: 5
            })
        });
    }
}