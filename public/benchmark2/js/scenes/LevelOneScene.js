class LevelOneScene extends LevelScene {
    constructor() {
        super({
            key : LEVEL_ONE
        });
        this.key = LEVEL_ONE;
        this.timeLeft = 240;
    }

    create() {
        super.loadMap('levelOne');
        super.loadTimer(this.timeLeft);
        super.loadHP();
        super.loadPoints();
        //display instructions for hp, and shooting
        this.add.text(this.rooms[0].x+165,
            this.rooms[0].y+450,
            'Click to shoot pills that can damage the viruses. Be careful not to shoot \n'+
            'recklessly, as every shot will reduce RX-2020\'s hp. You must reach \n'+
            'the stomach with at least 20 hp or else you won\'t be effective enough \n'+
            'to cure the patient!',
            {color: 'white', font: '15px'});
        
        
        //display instructions for hp, and shooting
        this.add.text(this.rooms[2].x+175,
            this.rooms[2].y+350,
            'Orange slices will heal you for 20 HP!',
            {color: 'white', font: '15px'});

            
        //display instructions for hp, and shooting
        this.add.text(this.rooms[1].x+100,
            this.rooms[1].y+100,
            'Tap or hold left click to fire your medicine gun.\n'+
            'After gathering enough points, you will be able to\n'+
            'upgrade either your health or your weapon!\n'+
            'Your weapon may only be upgraded twice.',
            {color: 'white', font: '15px'});
        
            this.add
        
        
    }

    update() {
        super.update();
    }
    reset(){
        this.timeLeft = 240;
        super.reset();
    }

}