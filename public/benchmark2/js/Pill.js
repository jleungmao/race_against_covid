class Pill extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "pill", 21);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        this.keys = scene.input.keyboard.addKeys('W, A, S, D, Q, E');
        this.scene = scene;
        this.health = 100;
        this.maxHealth = 100;
        this.tier = TIER_ONE;
        this.fireRate = 0;
        this.hasFired = false;
        this.direction = DOWN;
        this.points = 0;
        this.canMove = true;
        this.lastKeyDown = null;
        this.pillToSpriteAngle = null;
        this.isTakingDamage = false;

        this.room = 0;
        this.roomChange = false;

        this.healthBox = scene.add.graphics();
        this.healthBox.fillStyle(0xff0000);
        this.healthBox.fillRect(this.body.x - 15, this.body.y - 15, 100, 10);
        this.healthBar = scene.add.graphics();
        this.healthBar.fillStyle(0x00b300);
        this.healthBar.fillRect(this.body.x - 15, this.body.y - 15, 100, 10);

        this.create();
    }

    create() {
        this.createAnimations();
        this.addEventListeners();
        
    }

    update() {
        this.checkFiring();
        this.updateWeapon();
        this.updateHealth();
        this.updatePoints();
        this.updateMovement();
        this.getRoom();
    }

    createAnimations() {
        this.scene.anims.create({
            key: "walk_left_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 84,
                end: 87
            })
        });
        this.scene.anims.create({
            key: "walk_right_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 91,
                end: 94
            })
        });
        this.scene.anims.create({
            key: "walk_up_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 98,
                end: 101
            })
        });
        this.scene.anims.create({
            key: "walk_down_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 77,
                end: 80
            })
        });
        this.scene.anims.create({
            key: "walk_left_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 252,
                end: 255
            })
        });
        this.scene.anims.create({
            key: "walk_right_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 259,
                end: 262
            })
        });
        this.scene.anims.create({
            key: "walk_up_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 266,
                end: 269
            })
        });
        this.scene.anims.create({
            key: "walk_down_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 245,
                end: 248
            })
        });
        this.scene.anims.create({
            key: "walk_left_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 168,
                end: 171
            })
        });
        this.scene.anims.create({
            key: "walk_right_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 175,
                end: 178
            })
        });
        this.scene.anims.create({
            key: "walk_up_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 182,
                end: 185
            })
        });
        this.scene.anims.create({
            key: "walk_down_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 161,
                end: 164
            })
        });
        this.scene.anims.create({
            key: "attack_left_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 28,
                end: 31
            })
        });
        this.scene.anims.create({
            key: "attack_right_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 35,
                end: 38
            })
        });
        this.scene.anims.create({
            key: "attack_up_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 42,
                end: 45
            })
        });
        this.scene.anims.create({
            key: "attack_down_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 21,
                end: 24
            })
        });
        this.scene.anims.create({
            key: "attack_left_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 196,
                end: 199
            })
        });
        this.scene.anims.create({
            key: "attack_right_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 203,
                end: 206
            })
        });
        this.scene.anims.create({
            key: "attack_up_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 210,
                end: 213
            })
        });
        this.scene.anims.create({
            key: "attack_down_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 189,
                end: 192
            })
        });
        this.scene.anims.create({
            key: "attack_left_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 112,
                end: 115
            })
        });
        this.scene.anims.create({
            key: "attack_right_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 119,
                end: 122
            })
        });
        this.scene.anims.create({
            key: "attack_up_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 126,
                end: 129
            })
        });
        this.scene.anims.create({
            key: "attack_down_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 105,
                end: 108
            })
        });
        this.scene.anims.create({
            key: "dead",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 0,
                end: 0
            })
        });
        this.scene.anims.create({
            key: "dying",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 7,
                end: 10
            })
        });
        this.scene.anims.create({
            key: "obtain_powerup",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 14,
                end: 20
            })
        });
        this.scene.anims.create({
            key: "taking_damage_left_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 56,
                end: 59
            })
        });
        this.scene.anims.create({
            key: "taking_damage_right_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 63,
                end: 66
            })
        });
        this.scene.anims.create({
            key: "taking_damage_up_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 70,
                end: 73
            })
        });
        this.scene.anims.create({
            key: "taking_damage_down_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 49,
                end: 52
            })
        });
        this.scene.anims.create({
            key: "taking_damage_left_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 224,
                end: 227
            })
        });
        this.scene.anims.create({
            key: "taking_damage_right_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 231,
                end: 234
            })
        });
        this.scene.anims.create({
            key: "taking_damage_up_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 238,
                end: 241
            })
        });
        this.scene.anims.create({
            key: "taking_damage_down_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 217,
                end: 220
            })
        });
        this.scene.anims.create({
            key: "taking_damage_left_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 140,
                end: 143
            })
        });
        this.scene.anims.create({
            key: "taking_damage_right_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 147,
                end: 150
            })
        });
        this.scene.anims.create({
            key: "taking_damage_up_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 154,
                end: 157
            })
        });
        this.scene.anims.create({
            key: "taking_damage_down_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pill", {
                start: 133,
                end: 136
            })
        });
    }

    addEventListeners() {
        this.keys.W.on('down', event => {
            this.lastKeyDown = this.keys.W;
        });
        this.keys.A.on('down', event => {
            this.lastKeyDown = this.keys.A;
        });
        this.keys.S.on('down', event => {
            this.lastKeyDown = this.keys.S;
        });
        this.keys.D.on('down', event => {
            this.lastKeyDown = this.keys.D;
        });
        this.scene.input.on('pointermove', (pointer) => {
            let pillX = this.body.x + this.body.width / 2;
            let pillY = this.body.y + this.body.height / 2;
            this.pillToSpriteAngle = Phaser.Math.Angle.Between(pillX, pillY, pointer.x + this.scene.cameras.main.scrollX, pointer.y + this.scene.cameras.main.scrollY);
        });
    }

    checkFiring() {
        if (this.scene.input.activePointer.isDown && this.hasFired == false) {
            this.fire();
            if (this.direction == LEFT) {
                this.play("attack_left" + this.tier, true);
            }
            else if (this.direction == RIGHT) {
                this.play("attack_left" + this.tier, true);
            }
            else if (this.direction == DOWN) {
                this.play("attack_down" + this.tier, true);
            }
            else if (this.direction == UP) {
                this.play("attack_up" + this.tier, true);
            }
        }
    }

    fire() {
        if (this.health > 0) {
            this.health -= 1;
            this.hasFired = true;
            let bullet = this.scene.physics.add.sprite(0, 0, "pillbullet");
            bullet.setVisible(false);
            this.scene.sound.play("pillattack", {
                volume: 1
            });
            switch (this.tier) {
                case TIER_ONE:
                    if (this.direction == LEFT) {
                        bullet.setX(this.body.x);
                        bullet.setY(this.body.y + this.body.height / 2 - 5);
                        bullet.setVelocityX(-PILL_BULLET_VELOCITY);
                        bullet.body.angle = 0;
                        bullet.setRotation(0);
                    }
                    else if (this.direction == RIGHT) {
                        bullet.setX(this.body.x + this.body.width);
                        bullet.setY(this.body.y + this.body.height / 2 - 5);
                        bullet.setVelocityX(PILL_BULLET_VELOCITY);
                        bullet.body.angle = 0;
                        bullet.setRotation(0);
                    }
                    else if (this.direction == UP) {
                        bullet.setX(this.body.x + this.body.width - 20);
                        bullet.setY(this.body.y);
                        bullet.setVelocityY(-PILL_BULLET_VELOCITY);
                        bullet.body.angle = Math.PI / 2;
                        bullet.setRotation(Math.PI / 2);
                    }
                    else if (this.direction == DOWN) {
                        bullet.setX(this.body.x + 20);
                        bullet.setY(this.body.y + this.body.height);
                        bullet.setVelocityY(PILL_BULLET_VELOCITY);
                        bullet.body.angle = Math.PI / 2;
                        bullet.setRotation(-Math.PI / 2);
                    }
                case TIER_TWO:
                    if (this.direction == LEFT) {
                        bullet.setX(this.body.x);
                        bullet.setY(this.body.y + this.body.height / 2 - 6);
                        bullet.setVelocityX(-PILL_BULLET_VELOCITY);
                        bullet.body.angle = 0;
                        bullet.setRotation(0);
                    }
                    else if (this.direction == RIGHT) {
                        bullet.setX(this.body.x + this.body.width);
                        bullet.setY(this.body.y + this.body.height / 2 - 6);
                        bullet.setVelocityX(PILL_BULLET_VELOCITY);
                        bullet.body.angle = 0;
                        bullet.setRotation(0);
                    }
                    else if (this.direction == UP) {
                        bullet.setX(this.body.x + this.body.width - 18);
                        bullet.setY(this.body.y);
                        bullet.setVelocityY(-PILL_BULLET_VELOCITY);
                        bullet.body.angle = Math.PI / 2;
                        bullet.setRotation(Math.PI / 2);
                    }
                    else if (this.direction == DOWN) {
                        bullet.setX(this.body.x + 18);
                        bullet.setY(this.body.y + this.body.height);
                        bullet.setVelocityY(PILL_BULLET_VELOCITY);
                        bullet.body.angle = Math.PI / 2;
                        bullet.setRotation(-Math.PI / 2);
                    }
                case TIER_THREE:
                    if (this.direction == LEFT) {
                        bullet.setX(this.body.x);
                        bullet.setY(this.body.y + this.body.height / 2 - 6);
                        bullet.setVelocityX(-PILL_BULLET_VELOCITY);
                        bullet.body.angle = 0;
                        bullet.setRotation(0);
                    }
                    else if (this.direction == RIGHT) {
                        bullet.setX(this.body.x + this.body.width);
                        bullet.setY(this.body.y + this.body.height / 2 - 6);
                        bullet.setVelocityX(PILL_BULLET_VELOCITY);
                        bullet.body.angle = 0;
                        bullet.setRotation(0);
                    }
                    else if (this.direction == UP) {
                        bullet.setX(this.body.x + this.body.width - 18);
                        bullet.setY(this.body.y);
                        bullet.setVelocityY(-PILL_BULLET_VELOCITY);
                        bullet.body.angle = Math.PI / 2;
                        bullet.setRotation(Math.PI / 2);
                    }
                    else if (this.direction == DOWN) {
                        bullet.setX(this.body.x + 18);
                        bullet.setY(this.body.y + this.body.height);
                        bullet.setVelocityY(PILL_BULLET_VELOCITY);
                        bullet.body.angle = Math.PI / 2;
                        bullet.setRotation(-Math.PI / 2);
                    }
            }
            bullet.setVisible(true);
            this.scene.viruses.forEach(virus => {
                this.scene.physics.world.addCollider(bullet, virus, () => {
                    virus.health -= 1;
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

    updateMovement() {
        if (this.canMove) {
            if (this.lastKeyDown == this.keys.W && this.keys.W.isDown) {
                this.setVelocityY(-PILL_VELOCITY);
            }
            else if (this.lastKeyDown == this.keys.S && this.keys.S.isDown) {
                this.setVelocityY(PILL_VELOCITY);
            }
            else {
                if (this.keys.W.isDown) {
                    this.setVelocityY(-PILL_VELOCITY);
                }
                else if (this.keys.S.isDown) {
                    this.setVelocityY(PILL_VELOCITY);
                }
                else {
                    this.setVelocityY(0);
                }
            }
            if (this.lastKeyDown == this.keys.A && this.keys.A.isDown) {
                this.setVelocityX(-128);
            }
            else if (this.lastKeyDown == this.keys.D && this.keys.D.isDown) {
                this.setVelocityX(128);
            }
            else {
                if (this.keys.A.isDown) {
                    this.setVelocityX(-PILL_VELOCITY);
                }
                else if (this.keys.D.isDown) {
                    this.setVelocityX(PILL_VELOCITY);
                }
                else {
                    this.setVelocityX(0);
                }
            }
            if (this.pillToSpriteAngle >= -Math.PI / 4 && this.pillToSpriteAngle < Math.PI / 4 && !this.isTakingDamage)  {
                this.play("walk_right" + this.tier, true);
                this.direction = RIGHT;
            }
            else if (this.pillToSpriteAngle >= Math.PI / 4 && this.pillToSpriteAngle < Math.PI * 3 / 4 && !this.isTakingDamage) {
                this.play("walk_down" + this.tier, true);
                this.direction = DOWN;
            } 
            else if (this.pillToSpriteAngle >= Math.PI * 3 / 4 || this.pillToSpriteAngle < -Math.PI * 3 / 4 && !this.isTakingDamage) {
                this.play("walk_left" + this.tier, true);
                this.direction = LEFT;
            } 
            else if (this.pillToSpriteAngle >= -Math.PI * 3 / 4 && this.pillToSpriteAngle < -Math.PI / 4 && !this.isTakingDamage) {
                this.play("walk_up" + this.tier, true);
                this.direction = UP;
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.keys.E)) {
            this.upgradeHealth();
        }
    }
    
    getRoom(){
        let roomNumber;
        for(let room in this.scene.rooms){
            let roomLeft   = this.scene.rooms[room].x;
            let roomRight  = this.scene.rooms[room].x + this.scene.rooms[room].width;
            let roomTop    = this.scene.rooms[room].y;
            let roomBottom = this.scene.rooms[room].y + this.scene.rooms[room].height;
            // Player is within the boundaries of this room.
            if (this.x+20 > roomLeft && this.x-20 < roomRight &&
                this.y+20 > roomTop  && this.y-20 < roomBottom) {
                roomNumber = room;
            }
            if(roomNumber != this.room && roomNumber != null){
                this.room = roomNumber;
                this.roomChange = true;
                this.canMove = false;
            }else if(this.canMove){
                this.roomChange = false;
            }
            let visited = this.scene.visited[this.room];
            let mobCount = this.scene.virusCount[this.room];
            if(!visited){
                for(let virus in this.scene.viruses){
                    if(this.scene.viruses[virus].inRoom(this.room)){
                        this.scene.viruses[virus].canMove = true;
                    }
                }
                if(mobCount == 0){
                    visited = true;
                    this.scene.map.getLayer('doors').tilemapLayer.visible  = false;
                    this.scene.map.setCollisionByProperty({collides:true}, false, this.scene.map.getLayer('doors'));
                }else{
                    this.scene.map.getLayer('doors').tilemapLayer.visible = true;
                    this.scene.map.setCollisionByProperty({collides:true}, this.scene.map.getLayer('doors'));
                    if(this.x+20 < this.scene.rooms[this.room].x+64){
                        this.x = this.scene.rooms[this.room].x+96;
                    }
                    if(this.x-20 > this.scene.rooms[this.room].x+896){
                        this.x = this.scene.rooms[this.room].x+864;
                    }
                    if(this.y+20 < this.scene.rooms[this.room].y+64){
                        this.y = this.scene.rooms[this.room].y+96;
                    }
                    if(this.y-20 > this.scene.rooms[this.room].y+576){
                        this.y = this.scene.rooms[this.room].y+542;
                    }
                }
            }
            else{
                this.scene.map.getLayer('doors').tilemapLayer.visible = false;
                this.scene.map.setCollisionByProperty({collides:true}, false, this.scene.map.getLayer('doors'));
            }

        }

    }

    updateWeapon() {
        switch (this.tier) {
            case TIER_ONE:
                this.fireRate = 1000;
            case TIER_TWO:
                this.fireRate = 500;
            case TIER_THREE:
                this.fireRate = 250;
        }
        if (Phaser.Input.Keyboard.JustDown(this.keys.Q)) {
            if (this.tier == TIER_ONE && this.points >= TIER_TWO_COST) {
                this.tier = TIER_TWO;
                this.points -= TIER_TWO_COST;
            }
            else if (this.tier == TIER_TWO && this.points >= TIER_THREE_COST) {
                this.tier = TIER_THREE;
                this.points -= TIER_THREE_COST;
            }
        }
    }

    updateHealth() {
        if (Phaser.Input.Keyboard.JustDown(this.keys.E)) {
            if (this.health > 0 && this.points >= 50) {
                this.points -= 50;
                this.maxHealth += 20;
                this.health += 20;
                if (this.health > this.maxHealth) {
                    this.health = this.maxHealth;
                }
            }
        }
        if (this.health <= 0) {
            this.health = 0;
            this.canMove = false;
            this.setVelocity(0);
            this.play("dying", true);
            this.on("animationcomplete", () => {
                this.play("dead", true);
                this.on("animationcomplete", () => {
                    this.scene.scene.launch(LOSE);
                    let loseScene = this.scene.scene.get(LOSE);
                    loseScene.pausedScene = this.scene;
                    this.scene.scene.pause();
                    this.scene.scene.bringToTop(LOSE);
                })
            }, this.scene);
            this.healthBar.destroy();
        }
        if (this.health > this.maxHealth){
            this.health = this.maxHealth;
        }
        var health = (this.health/this.maxHealth) * 100;
        
        this.healthBar.clear();
        this.healthBar.fillStyle(0x00b300);
        this.healthBar.fillRect(this.body.x - 15, this.body.y - 15, health, 10);
        this.healthBox.clear();
        this.healthBox.fillStyle(0xff0000);
        this.healthBox.fillRect(this.body.x - 15, this.body.y - 15, 100, 10);
        this.scene.hpText.setText('HP:'+this.health+'/'+this.maxHealth);
    }
    

    updatePoints(){
        this.scene.pointsText.setText('Points:'+this.points);
        this.scene.upgradeHPText.setText(50+' points to upgrade HP');
        if(this.tier == TIER_ONE){
            this.scene.upgradeWeaponText.setText(TIER_TWO_COST+' points to upgrade weapon');
        }
        if(this.tier == TIER_TWO){
            this.scene.upgradeWeaponText.setText(TIER_THREE_COST+' points to upgrade weapon');
        }
        if(this.tier == TIER_THREE){
            this.scene.upgradeWeaponText.setText('Weapon upgrades are maxed out!');
        }
    }
}