class LevelOneScene extends LevelScene {
    constructor() {
        super({
            key : LEVEL_ONE
        });
        this.key = LEVEL_ONE;
        this.timeLeft = 240;
        this.text = null;
    }

    create() {
        super.loadMap('levelOne');
        super.loadTimer(this.timeLeft);
        super.loadHP();
        super.loadPoints();
        //display instructions for hp, and shooting
        this.add.text(this.rooms[0].x+65,
            this.rooms[0].y+485,
            'Click to shoot\n' +
            'Be careful not to shoot recklessly\n' +
            'Each shot will reduce RX-2020\'s HP\n' +
            'Survive with at least 20 HP\n' +
            'Otherwise, you won\'t be effective enough to cure the patient\n' + 
            'When you are ready, advance to the next room',
            {color: 'white', font: '15px'});
        
        //display instructions for hp, and shooting
        this.text = this.add.text(this.rooms[1].x+65,
            this.rooms[1].y+510,
            'Killing viruses awards you with points for upgrades!\n' +
            'Upgrading your weapon increases your firing rate.\n' +
            'Upgrading your health heals you for 20 HP.\n' +
            'Try upgrading your weapon (Q) or your health (E) now!',
            {color: 'white', font: '15px'});
        this.text.setVisible(false);
    
        //display instructions for hp, and shooting
        this.add.text(this.rooms[2].x+312,
            this.rooms[2].y+350,
            'Orange slices will heal you for 20 HP!',
            {color: 'white', font: '15px'});
    }

    update() {
        super.update();
        if (this.viruses.length == 0) {
            this.text.setVisible(true)
        }
    }

    reset(){
        this.timeLeft = 240;
        super.reset();
    }
}