

var theGame = function(game){
    var cursors;
    var platforms;
    var player; 
    var table, shelf, bookcase, piano;
    var text;
    var index = 0;
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
        this.game.load.spritesheet("shelf", "shelf.png", 126, 109);
        this.game.load.spritesheet("bookcase", "bookcase.png", 129, 109);
        //this.game.load.spritesheet("piano", "transparent_piano.png", 32, 48);
        this.game.load.spritesheet("table", "table.png", 32, 48);
    },

    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.world.setBounds(0, 0, 900, 300);
        var floor = this.game.add.sprite(0, 300, 'bot1');
        
        platforms = this.game.add.group();
        platforms.enableBody = true;
        var bg = platforms.create(0, 0, 'top1');
        bg.body.immovable = true;
    
        
        player = this.game.add.sprite(170, this.game.world.height - 100, "princess");
        //player.anchor.setTo(0.5);
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
        
        table = this.game.add.sprite(300, 550, "table");
        this.game.physics.enable(table);
        table.body.immovable = true;
        shelf = this.game.add.sprite(0, 505, "shelf");
        this.game.physics.enable(shelf);
        shelf.body.immovable = true;
        bookcase = this.game.add.sprite(500, 400, "bookcase");
        this.game.physics.enable(bookcase);
        bookcase.body.immovable = true;
        // piano = this.game.add.sprite(500, 500, "piano");
        // this.game.physics.enable(piano);
        // piano.body.immovable = true;
    },

    update: function() {
        this.showDialogue = false;
            this.game.physics.arcade.collide(player, platforms);
            this.game.camera.follow(player);
            var graphics = this.game.add.graphics(20, 100);
            var text;
            var xpos = Math.round(player.position.x);
            if(this.game.physics.arcade.collide(player,table,null,null,this)){
                this.game.paused = true;
                createTextBox(graphics);
                var space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                text = this.game.add.text(xpos -140, 310, "Such delicious food out!\nI want to try everything. ",{font: "10pt Courier", fill: "#DC9CD2", stroke: "#BF7FCE", strokeThickness: 0 });
                text.destroy(); //not it
                text = this.game.add.text(xpos -140, 310, "Ohhhhhh… My stomach, it hurts.\nMaybe I shouldn’t have tried all of them.",{font: "10pt Courier", fill: "#DC9CD2", stroke: "#BF7FCE", strokeThickness: 1 });
                space.onDown.add(function () {   actionOnClick(graphics, text); this.game.paused = false;}, this);
            }
            if(this.game.physics.arcade.collide(player,shelf,null,null,this)){
                this.game.paused = true;
                createTextBox(graphics);
                text = this.game.add.text(xpos - 80, 310, "What is the point of this shelf?\nTo put my shoes? ",{font: "10pt Courier", fill: "#DC9CD2", stroke: "#BF7FCE", strokeThickness: 0 });
                var space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                space.onDown.add(function () {   actionOnClick(graphics, text); this.game.paused = false;}, this);
            }
            if(this.game.physics.arcade.collide(player,bookcase,null,null,this)){
                this.game.paused = true;
                createTextBox(graphics);
                text = this.game.add.text(xpos-140, 310, "So many books!\nI wonder if Father actually read them. ",{font: "10pt Courier", fill: "#DC9CD2", stroke: "#BF7FCE", strokeThickness: 0 });
                var space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                space.onDown.add(function () {   actionOnClick(graphics, text); this.game.paused = false;}, this);
            }
            // if(this.game.physics.arcade.collide(player,piano,null,null,this)){
            //     this.game.paused = true;
            //     createTextBox(graphics);
            //     text = this.game.add.text(35, 310, "I haven’t played in ages! \nIt looks so old, yet so beautiful. \nShould I play it? \nMaybe not, I don’t want to bother and anger Father. ",{font: "10pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 0 });
            //     var space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            //     space.onDown.add(function () {   actionOnClick(graphics, text); this.game.paused = false;}, this);
            // }
        
        
          
        
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
    }

//    render: function() {
//        this.game.debug.cameraInfo(this.game.camera, 32, 32);
//    }, 

}


function createTextBox(graphics,text){
    // draw a rectangle
    var xpos = Math.round(player.position.x);
    var ypos = Math.round(player.position.y);
    graphics.lineStyle(0);
    graphics.beginFill(0x333333, 1);
    player.events.onInputOver.add(function() {  graphics.graphicsData[0].fillColor = 0x5B5B5B; }, this);
    graphics.drawRect(xpos-170, 200, 350, 100);
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
    
}
//
function actionOnClick(graphics, text){
    // alert("button clicked");
    graphics.destroy();
    text.destroy();
    

} 