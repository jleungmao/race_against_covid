class RangedVirus extends Virus {
    constructor(scene, x, y, type) {
        super(scene, x, y, 'coronavirus');
        this.type = type;
        this.setVelocityX(RANGED_VIRUS_ONE_VELOCITY);
        this.hasReversed = false;
        this.fireRate = RANGED_VIRUS_BULLET_DEFAULT_FIRERATE;
        this.hasFired = false;
        this.health = 3;
        this.canMove = false;
        this.setSize(48, 64);
        this.create();
    }

    create() {
        this.createAnimations();
    }

    update() {
        super.updateHealth();
        if(this.canMove){
            if(this.body.velocity.x == 0){
                this.setVelocityX(RANGED_VIRUS_ONE_VELOCITY);
            }
            this.move();
            this.fire();
        }else{
            this.setVelocityX(0);
        }
    }

    fire() {
        if (this.hasFired == false) {
            if (this.health > 0) {
                this.scene.sound.play("virusattack", {
                    volume: 1
                });
                this.hasFired = true;
                let bulletUp = this.scene.physics.add.sprite(this.body.x + this.body.width / 2, this.body.y, "virusbullet");
                let bulletDown = this.scene.physics.add.sprite(this.body.x  + this.body.width / 2, this.body.y + this.body.height, "virusbullet");
                let bulletLeft = this.scene.physics.add.sprite(this.body.x + 5, this.body.y + this.body.height / 2, "virusbullet");
                let bulletRight = this.scene.physics.add.sprite(this.body.x + this.body.width - 5, this.body.y + this.body.height / 2, "virusbullet");
                bulletUp.setVelocityY(-RANGED_VIRUS_ONE_BULLET_VELOCITY);
                bulletDown.setVelocityY(RANGED_VIRUS_ONE_BULLET_VELOCITY);
                bulletLeft.setVelocityX(-RANGED_VIRUS_ONE_BULLET_VELOCITY);
                bulletRight.setVelocityX(RANGED_VIRUS_ONE_BULLET_VELOCITY);
                let bullets = [bulletUp, bulletDown, bulletLeft, bulletRight];
                bullets.forEach(bullet => {
                    this.scene.physics.world.addCollider(bullet, this.scene.player, () => {
                        if (this.scene.player.canMove && !this.scene.player.isInvincible) {
                            this.scene.player.takeDamage(10);
                        }
                        bullet.destroy();
                    });
                    this.scene.physics.world.addCollider(bullet, this.scene.collisionLayer, () => {
                        bullet.destroy();
                    });
                    this.scene.physics.world.addCollider(bullet, this.scene.doors, () => {
                        bullet.destroy();
                    });
                    this.scene.physics.world.addCollider(bullet, this.scene.openDoors, () => {
                        bullet.destroy();
                    });
                });
                let timer = this.scene.time.addEvent({
                    delay: this.fireRate,
                    callback: () => {
                        this.hasFired = false;
                    }
                });
            }
        }
    }

    move() {
        if (this.health > 0) {
            if (!this.hasReversed) {
                let timer = this.scene.time.addEvent({
                    delay: 1250,
                    callback: () => {
                        this.setVelocityX(-this.body.velocity.x);
                        this.hasReversed = false;
                    }
                });
            }
            this.hasReversed = true;
            this.play("ranged_travel", true);
        }
    }

    createAnimations() {
        this.scene.anims.create({
            key: "ranged_dying",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("coronavirus", {
                start: 8,
                end: 11
            })
        });
        this.scene.anims.create({
            key: "ranged_travel",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("coronavirus", {
                start: 16,
                end: 17
            })
        });
        this.scene.anims.create({
            key: "ranged_taking_damage",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("coronavirus", {
                start: 12,
                end: 13
            })
        });
    }
}