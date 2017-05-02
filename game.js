

var theGame = function(game){
    var cursors;
    var platforms;
    var player; 
    var table;
    var text;
    var index = 0;
    var line = '';
    var content = [
        " ",
        "photon storm presents",
        "a phaser production",
        " ",
        "Kern of Duty",
        " ",
        "directed by rich davey",
        "rendering by mat groves",
        "    ",
        "03:45, November 4th, 2014",
        "somewhere in the north pacific",
        "mission control bravo ...",
    ];
    var showDialogue = false;
    var textBox;
    var graphics;
    var next_button;

   
};
                 
theGame.prototype = {
    preload: function() {
        this.game.load.image("bot1", "bot2.jpg");
        this.game.load.image("top1", "bg2.png");
        //princess x = 30+40; y = 50+40;
        this.game.load.spritesheet("princess", "princess.png", 32, 48);
        this.game.load.spritesheet("table", "table.png", 32, 48);
        this.game.load.spritesheet("box", "box.png", 32, 48);
    },

    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.world.setBounds(0, 0, 900, 600);
        var floor = this.game.add.sprite(0, 300, 'bot1');
        
        platforms = this.game.add.group();
        platforms.enableBody = true;
        var bg = platforms.create(0, 0, 'top1');
        bg.body.immovable = true;
        
        //table.body.immovable = true;
    
        
        player = this.game.add.sprite(0, this.game.world.height - 100, "princess");
        player.anchor.setTo(0.5);
        floor.height = this.game.height;
        //floor.width = this.game.width;
        //  We need to enable physics on the player
        this.game.physics.arcade.enable(player);                    
        player.body.collideWorldBounds = true;
        
        //  Our two animations, walking left and right.
        player.animations.add('left', [4, 5, 6, 7], 6, true);
        player.animations.add('right', [8, 9, 10, 11], 10, true);
        player.animations.add('down', [0, 1, 2, 3], 2, true);
        player.animations.add("up", [12, 13, 14, 15], 14, true);
        cursors = this.game.input.keyboard.createCursorKeys();
        
        table = this.game.add.sprite(100, 550, "table");
        this.game.physics.enable(table);
        table.body.immovable = true;



        // text = this.game.add.text(32,380,'', {font: "14pt Courier", fill: "#19cb65", stroke:"#119f4e", strokeThickness: 2});
        // this.showDialogue = ;
    },

    update: function() {
        this.showDialogue = false;
            this.game.physics.arcade.collide(player, platforms);
            this.game.camera.follow(player);
            var graphics = this.game.add.graphics(20, 100);
            var text;
            if(this.game.physics.arcade.collide(player,table,null,null,this)){
                this.game.paused = true;
                createTextBox(graphics);
                text = this.game.add.text(35, 360, "hello ",{font: "10pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 0 });
                var space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                space.onDown.add(function () {   actionOnClick(graphics, text); this.game.paused = false;}, this);
            }
//            if(this.game.physics.arcade.collide(player,table,null,null,this)){
//                this.game.paused = true;
//                interact(graphics, "hello");
//            }
        
          
        
            if(player.body.position.x > 840){
                this.game.state.start("TheGame2");
            }
            if (cursors.left.isDown)
            {
                //  Move to the left
                player.body.velocity.x = -150;
                player.body.velocity.y = 0;
                this.game.camera.x -= 1.25;
                player.animations.play('left');
            }
            else if (cursors.right.isDown)
            {
                //  Move to the right
                player.body.velocity.x = 150;
                player.body.velocity.y = 0;
                this.game.camera.x += 1.25;
                player.animations.play('right');
            }
            else if(cursors.up.isDown){
                player.body.velocity.y = -150;
                player.body.velocity.x = 0;
                player.animations.play("up");
            }
            else if(cursors.down.isDown){
                player.body.velocity.y = 150;
                player.body.velocity.x = 0;
                player.animations.play("down");
            }
            else
            {
                //  Stand still
                player.animations.stop();
                
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
            }
    },

    render: function() {
        this.game.debug.cameraInfo(this.game.camera, 32, 32);
        // this.game.debug.geom(this.floor,'rgba(0,0,255,0.5)');
    }
}

function createTextBox(graphics,text){
    // draw a rectangle
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.beginFill(0x222222, 1);
    graphics.drawRect(0, 250, 450, 100);
    graphics.endFill();

    window.graphics = graphics;
 

}

//function updateLine(){
//    if (this.line.length < this.content[this.index].length){
//        this.line = this.content[index].substr(0, this.line.length + 1);
//        // text.text = line;
//        this.text.setText(this.line);
//    }
//    else
//    {
//        //  Wait 2 seconds then start a new line
//        this.game.time.events.add(Phaser.Timer.SECOND * 2, nextLine, this);
//    }
//}

function interact(graphics,text1){
    //this.showDialogue = true;
//    createTextBox(graphics);
//    var text;
//    text = this.game.add.text(35, 360, text1,{font: "10pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 0 });
//    var space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
//    space.onDown.add(function () {   actionOnClick(graphics, text); this.game.paused = false;}, this);
}
//
function actionOnClick(graphics, text){
    // alert("button clicked");
    graphics.destroy();
    text.destroy();
    

} 