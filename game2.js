

var theGame2 = function(game){
    var cursors;
    var platforms;
    var player; 
    var plant;
    var text;
    var index = 0;
    var showDialogue = false;
    var textBox;
    var graphics;
    var next_button;
};
                 
theGame2.prototype = {
    preload: function() {
        this.game.load.image("bot2", "bg_bot.jpg");
        this.game.load.image("top2", "bg_top.jpg");
        //princess x = 30+40; y = 50+40;
        this.game.load.spritesheet("princess", "princess.png", 32, 48);
        this.game.load.spritesheet("plant", "plant.png", 125, 109);
        this.game.load.spritesheet("thief", "thief.png", 32, 48);
    },

    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.world.setBounds(0, 0, 850, 600);
        var floor = this.game.add.sprite(0, 300, 'bot2');
        
        platforms = this.game.add.group();
        platforms.enableBody = true;
        var bg = platforms.create(0, 0, 'top2');
        bg.body.immovable = true;
    
        
        player = this.game.add.sprite(60, this.game.world.height - 100, "princess");
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
        
        plant = this.game.add.sprite(300, 550, "plant");
        this.game.physics.enable(plant);
        plant.body.immovable = true;
        thief = this.game.add.sprite(700, 470, "thief");
        this.game.physics.enable(thief);
        thief.body.immovable = true;
    },

    update: function() {
        this.showDialogue = false;
            this.game.physics.arcade.collide(player, platforms);
            this.game.camera.follow(player);
            var graphics = this.game.add.graphics(20, 100);
            var text;
            if(this.game.physics.arcade.collide(player,plant,null,null,this)){
                this.game.paused = true;
                createTextBox(graphics);
                var xpos = Math.round(player.position.x);
                var space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                text = this.game.add.text(xpos -140, 310, "Ow! I didn’t see that there. ",{font: "10pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 1 });
                space.onDown.add(function () {   actionOnClick(graphics, text); this.game.paused = false;}, this);
            }
            if(this.game.physics.arcade.collide(player,thief,null,null,this)){
                this.game.paused = true;
                createTextBox(graphics);
                var xpos = Math.round(player.position.x);
                var space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                text = this.game.add.text(xpos -140, 310, "When you're done, come find me. ",{font: "10pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 1 });
                space.onDown.add(function () {   actionOnClick(graphics, text); this.game.paused = false;}, this);
            }
         
            //can add || player.body.position.x > 800 to the if statement 
            if(player.body.position.x < 10){
                this.game.state.start("TheGame");
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
}

function createTextBox(graphics,text){
    // draw a rectangle
    var xpos = Math.round(player.position.x);
    var ypos = Math.round(player.position.y);
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.beginFill(0x222222, 1);
    graphics.drawRect(xpos-170, 200, 350, 100);
    graphics.endFill();

    window.graphics = graphics;
 

}


function interact(graphics,text1){
    
}
//
function actionOnClick(graphics, text){
    // alert("button clicked");
    graphics.destroy();
    text.destroy();
    

} 