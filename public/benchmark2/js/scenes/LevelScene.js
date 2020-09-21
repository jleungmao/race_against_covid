class LevelScene extends Phaser.Scene {
    constructor(config) {
        super(config);
        this.key = null;
        this.player = null;
        this.map = null;
        this.rooms = [];
        this.visited = [];
        this.floor = null;
        this.holes = null;
        this.collisionLayer = null;
        this.doors = null;
        this.openDoors=null;
        this.viruses = [];
        this.timer;
        this.timeLeft;
        this.hpText;
        this.pointsText;
        this.upgradeHPText;
        this.upgradeWeaponText;
        this.virusCount = [];
        this.winTile;
    }

    create() {
        this.loadMap('levelOne');
        this.loadTimer();
        this.loadHP();
        this.loadPoints();
    }

    update() {
        this.setView();
        this.player.update();
        this.viruses.forEach(virus => {
            virus.update();
        });
        if (Phaser.Input.Keyboard.JustDown((this.input.keyboard.addKey('ESC')))) {
            this.scene.launch(PAUSE);
            let pauseScene = this.scene.get(PAUSE);
            pauseScene.pausedScene = this;
            this.scene.pause();
            this.scene.bringToTop(PAUSE);
        }

        
        if (this.input.keyboard.addKey('ONE').isDown === true) {
            this.scene.pause();
            this.reset();
            this.scene.stop();
            this.scene.start(LEVEL_ONE);
        }
        if (this.input.keyboard.addKey('TWO').isDown === true) {
            this.scene.pause();
            this.reset();
            this.scene.stop();
            this.scene.start(LEVEL_TWO);
        }

        
    }


    
    loadMap(level){
        this.map = this.add.tilemap(level);
        var tileset = this.map.addTilesetImage("tileset");
        this.floor = this.map.createStaticLayer("floor", tileset, 0, 0);
        this.holes = this.map.createStaticLayer("holes", tileset, 0, 0);
        this.collisionLayer = this.map.createDynamicLayer("collidable", tileset, 0, 0);
        this.openDoors = this.map.createStaticLayer("openDoors", tileset, 0, 0);
        this.doors = this.map.createStaticLayer("doors", tileset, 0, 0);

        //create list of rooms
        this.map.findObject('Objects', function(object) {
            // rooms
            if (object.type === 'Room') {
                this.rooms.push(object);
                let x = object.properties.find(function(property) {
                    return property.name === 'monsters';
                }).value;
                let visited = object.properties.find(function(property) {
                    return property.name === 'visited';
                } ).value;
                this.virusCount.push(x);
                this.visited.push(visited);
            }
            if (object.type === 'Spawn') {
                if (object.name === 'Player') {
                    this.player = new Pill(this, object.x+32, object.y+32);
                }
            }
            if (object.type === 'Melee') {
                let physical_virus = new PhysicalVirusOne(this, object.x, object.y, PHYSICAL);
                physical_virus.canMove = false;
                this.viruses.push(physical_virus);
            }
            if (object.type === 'Ranged'){
                var ranged_virus = new RangedVirusOne(this, object.x, object.y, RANGED);
                ranged_virus.canMove = false;
                this.viruses.push(ranged_virus);
            }
        }, this);



        //move camera to specific room
        this.cameras.main.setBounds(this.rooms[this.player.room].x,
            this.rooms[this.player.room].y,
            this.rooms[this.player.room].width,
            this.rooms[this.player.room].height,
            true
        );

        this.viruses.forEach(virus => {
            this.physics.world.addCollider(this.player, virus, () => {
                // SOME ACTION THAT HAPPENS WHEN PLAYER COLLIDES WITH VIRUS
            });
            this.physics.add.collider(virus, this.collisionLayer);
            this.physics.add.collider(this.player, this.doors);
        })


        // on collide with powerup, set the powerup to stone
        this.physics.add.collider(this.player, this.collisionLayer, function(player, object){
            if(object.index == 18){
                object.index = 19;
                player.health += 20;
            }
        });
        this.physics.add.collider(this.player, this.holes);
        this.physics.add.collider(this.player, this.doors);
        this.collisionLayer.setCollisionByProperty({collides:true});
        this.holes.setCollisionByProperty({collides:true});
        this.doors.setCollisionByProperty({collides:true});
        this.openDoors.setCollisionByProperty({collides:true});

        
        var that = this;
        this.physics.add.overlap(this.player,  this.openDoors, function(player, tile) {
            if(tile.properties.win){
                if(Math.abs(tile.x*tile.width-this.player.x)<=40 && Math.abs(tile.y*tile.height-this.player.y)<=40){
                    if(this.player.health >= 20 && this.timeLeft > 0){
                        that.scene.launch(WIN);
                        let winScene = that.scene.get(WIN);
                        winScene.pausedScene = that;
                        that.scene.pause();
                        that.scene.bringToTop(WIN);
                    }else{
                        that.scene.launch(LOSE);
                        let loseScene = that.scene.get(LOSE);
                        loseScene.pausedScene = that;
                        that.scene.pause();
                        that.scene.bringToTop(LOSE);
                    }
                }
            }
        }, null, this);
    }


    loadTimer(timeLeft){
        //time variables
        let oneSecond = 1000;
        this.timeLeft = timeLeft;

        //display timer
        this.timer = this.add.text(this.rooms[this.player.room].x+15,
                                    this.rooms[this.player.room].y+15,
                                    'Time Left: ' + this.timeLeft, 
                                    {color: 'white', font: '20px'});

        //update timeLeft
        this.time.addEvent({
            delay: 1000,                // ms
            callback: function(){
                if(this.timeLeft > 0){
                    //decrement
                    this.timeLeft--;
                    this.timer.setText('Time Left: ' + this.timeLeft);
                }
            },
            //args: [],
            callbackScope: this,
            loop: true
        });

        //end game if timer runs out
        var that = this;
        this.time.delayedCall(this.timeLeft*oneSecond, function(){
            that.scene.launch(LOSE);
            let loseScene = that.scene.get(LOSE);
            loseScene.pausedScene = that;
            that.scene.pause();
            that.scene.bringToTop(LOSE);
        }, this);
    }

    loadHP(){
        //display current HP
        this.hpText = this.add.text(this.rooms[this.player.room].x+820,
            this.rooms[this.player.room].y+15,
            'HP:'+this.player.health+'/'+this.player.maxHealth,
            {color: 'white', font: '20px'});
    }

    loadPoints() {
        this.pointsText = this.add.text(this.rooms[this.player.room].x+820,
            this.rooms[this.player.room].y+35,
            'Points:'+this.player.points,
            {color: 'white', font: '20px'});

            
        this.upgradeHPText = this.add.text(this.rooms[this.player.room].x+625,
            this.rooms[this.player.room].y+585,
            50+' points to upgrade HP',
            {color: 'white', font: '20px'});

        this.upgradeWeaponText = this.add.text(this.rooms[this.player.room].x+600,
            this.rooms[this.player.room].y+610,
            100+' points to upgrade weapon',
            {color: 'white', font: '20px'});
    }


    setView(){
        // On player room change, stop player movement, fade camera, and set boundaries.
        this.cameras.main._ch = this.map.heightInPixels;
        this.cameras.main._cw = this.map.widthInPixels;
        if (this.player.roomChange) {
            // Change camera boundaries when fade out complete.
            this.cameras.main.setBounds(this.rooms[this.player.room].x,
                                        this.rooms[this.player.room].y,
                                        this.rooms[this.player.room].width,
                                        this.rooms[this.player.room].height,
                                        true);
            this.timer.setPosition(this.rooms[this.player.room].x+15, this.rooms[this.player.room].y+15);
            this.hpText.setPosition(this.rooms[this.player.room].x+820, this.rooms[this.player.room].y+15);
            this.pointsText.setPosition(this.rooms[this.player.room].x+820, this.rooms[this.player.room].y+30);
            this.upgradeHPText.setPosition(this.rooms[this.player.room].x+625, this.rooms[this.player.room].y+585);
            this.upgradeWeaponText.setPosition(this.rooms[this.player.room].x+600, this.rooms[this.player.room].y+610);
            this.pointsText.setPosition(this.rooms[this.player.room].x+820, this.rooms[this.player.room].y+35);
            // Fade back in with new boundaries.
            this.player.canMove = true;
            this.pointsText.setText('Points:'+this.player.points);
            this.upgradeHPText.setText(50+' points to upgrade HP');
            this.upgradeWeaponText.setText(100+' points to upgrade weapon');
        }
    }
    reset(){
        this.player = null;
        this.map = null;
        this.rooms = [];
        this.visited = [];
        this.floor = null;
        this.collisionLayer = null;
        this.doors = null;
        this.openDoors=null;
        this.viruses = [];
        this.timer;
        this.timeLeft;
        this.bulletTime = 0; // DETERMINES BULLET FIRE RATE
        this.hpText;
        this.upgradeHPText;
        this.upgradeWeaponText;
        this.pointsText;
        this.virusCount=[];
    }






}