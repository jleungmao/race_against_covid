class SplittingVirus extends Virus {
    constructor(scene, x, y, type, split) {
        super(scene, x, y, 'coronavirus');
        this.type = type;
        this.splitted = split;
        if (split) {
            this.velocity = SPLIT_VIRUS_ONE_SPLIT_VELOCITY;
            this.setScale(0.5)
            this.health = 2;
        }
        else {
            this.velocity = SPLIT_VIRUS_ONE_VELOCITY;
            this.health = 3;
        }
        this.angleToPlayer = null;
        this.canMove = false;
        this.isAlive = true;
        this.create();
    }

    create() {
        this.createAnimations();
    }

    update() {
        //super.updateHealth();
        this.updateHealth();
        if(this.canMove){
            this.move();
        }
    }

    updateHealth() {
        if (this.health <= 0 && this.splitted) {
            this.scene.sound.play("virusdead", {
                volume: 1
            });
            this.isAlive = false;
            this.canMove = false;
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.play(this.type + "dying", true);
            this.on("animationcomplete", () => {
                this.scene.viruses.forEach( (v, index) => {
                    if (v == this) {
                        this.decrementMobCount();
                        this.scene.viruses.splice(index, 1);
                        this.setActive(false);
                        this.scene.player.points += 10
                    }
                });
            });
        }
        else if (this.health <= 0 && !this.splitted) {
            this.scene.viruses.forEach( (v, index) => {
                if (v == this) {
                    this.decrementMobCount();
                    this.scene.viruses.splice(index, 1);
                    this.splitVirus();
                    this.scene.player.points += 20
                    this.destroy();
                }
            });
        }
    }

    splitVirus() {
        let split_one = new SplittingVirus(this.scene, this.x-50, this.y, SPLIT, true);
        split_one.canMove = true;
        let split_two = new SplittingVirus(this.scene, this.x+50, this.y, SPLIT, true);
        split_two.canMove = true;
        this.scene.addVirus(split_one);
        this.scene.addVirus(split_two);
    }

    move() {
        if (this.health > 0) {
            let thisX = this.body.x + this.body.width / 2;
            let thisY = this.body.y + this.body.height / 2;
            let pillX = this.scene.player.body.x + this.scene.player.width / 2;
            let pillY = this.scene.player.body.y + this.scene.player.height / 2;
            this.angleToPlayer = Phaser.Math.Angle.Between(thisX, thisY, pillX, pillY-7);
            let xVelocity = Math.cos(this.angleToPlayer) * this.velocity;
            let yVelocity = Math.sin(this.angleToPlayer) * this.velocity;
            
            this.setVelocityX(xVelocity);
            this.setVelocityY(yVelocity);
            this.play("split_travel", true);
        }
    }

    createAnimations() {
        this.scene.anims.create({
            key: "split_dying",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("coronavirus", {
                start: 32,
                end: 35
            })
        });
       
        this.scene.anims.create({
            key: "split_travel",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("coronavirus", {
                start: 40,
                end: 43
            })
        });
        
        this.scene.anims.create({
            key: "split_taking_damage",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("coronavirus", {
                start: 36,
                end: 37
            })
        });
    }
}