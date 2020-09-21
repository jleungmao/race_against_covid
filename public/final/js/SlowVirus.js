class SlowVirus extends Virus {
    constructor(scene, x, y, type) {
        super(scene, x, y, 'coronavirus');
        this.type = type;
        this.setVelocityX(SLOW_VIRUS_ONE_VELOCITY);
        this.hasReversed = false;
        this.fireRate = SLOW_VIRUS_BULLET_DEFAULT_FIRERATE;
        this.hasFired = false;
        this.health = 3;
        this.canMove = false;
        this.scene = scene;
        this.create();
    }

    create() {
        this.createAnimations();
    }

    update() {
        super.updateHealth();
        if(this.canMove){
            if(this.body.velocity.x == 0){
                this.setVelocityX(SLOW_VIRUS_ONE_VELOCITY);
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
                let bulletUp = this.scene.physics.add.sprite(this.body.x + this.body.width / 2, this.body.y, "virusslowbullet");
                let bulletDown = this.scene.physics.add.sprite(this.body.x  + this.body.width / 2, this.body.y + this.body.height, "virusslowbullet");
                let bulletLeft = this.scene.physics.add.sprite(this.body.x + 5, this.body.y + this.body.height / 2, "virusslowbullet");
                let bulletRight = this.scene.physics.add.sprite(this.body.x + this.body.width - 5, this.body.y + this.body.height / 2, "virusslowbullet");
                bulletUp.setVelocityY(-SLOW_VIRUS_ONE_BULLET_VELOCITY);
                bulletDown.setVelocityY(SLOW_VIRUS_ONE_BULLET_VELOCITY);
                bulletLeft.setVelocityX(-SLOW_VIRUS_ONE_BULLET_VELOCITY);
                bulletRight.setVelocityX(SLOW_VIRUS_ONE_BULLET_VELOCITY);
                let bullets = [bulletUp, bulletDown, bulletLeft, bulletRight];
                bullets.forEach(bullet => {
                    this.scene.physics.world.addCollider(bullet, this.scene.player, () => {
                        if (this.scene.player.canMove && !this.scene.player.isInvincible) {
                            this.scene.player.isSlowed = true;
                            this.scene.time.addEvent({
                                delay: 1500,
                                callback: () => {
                                    this.scene.player.isSlowed = false;
                                }
                            });
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
            this.play("slow_travel", true);
        }
    }

    createAnimations() {
        this.scene.anims.create({
            key: "slow_dying",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("coronavirus", {
                start: 20,
                end: 22
            })
        });
        this.scene.anims.create({
            key: "slow_travel",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("coronavirus", {
                start: 28,
                end: 29
            })
        });
        this.scene.anims.create({
            key: "slow_taking_damage",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("coronavirus", {
                start: 24,
                end: 25
            })
        });
    }
}