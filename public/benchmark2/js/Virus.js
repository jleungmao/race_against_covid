class Virus extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, 'coronavirus');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        this.scene = scene;
        this.type = type;
        this.health = 0;
        this.canMove = false;
    }
    
    updateHealth() {
        if (this.health <= 0) {
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
                        this.scene.player.points += 20
                    }
                });
            });
        }
    }

    decrementMobCount(){
        for(let room in this.scene.rooms){
            let roomLeft   = this.scene.rooms[room].x;
            let roomRight  = this.scene.rooms[room].x + this.scene.rooms[room].width;
            let roomTop    = this.scene.rooms[room].y;
            let roomBottom = this.scene.rooms[room].y + this.scene.rooms[room].height;
            // Virus is within the boundaries of this room.
            if (this.x > roomLeft && this.x < roomRight &&
                this.y > roomTop  && this.y < roomBottom) {
                this.scene.virusCount[room]--;
            }
        }
    }

    inRoom(roomNum){
        let roomLeft   = this.scene.rooms[roomNum].x;
        let roomRight  = this.scene.rooms[roomNum].x + this.scene.rooms[roomNum].width;
        let roomTop    = this.scene.rooms[roomNum].y;
        let roomBottom = this.scene.rooms[roomNum].y + this.scene.rooms[roomNum].height;
        if (this.x > roomLeft && this.x < roomRight &&
            this.y > roomTop  && this.y < roomBottom) {
            return true;
        }
    }
}