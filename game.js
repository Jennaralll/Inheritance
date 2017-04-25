var theGame = function(game){
    var cursors;
    var platforms;
    var player; 
};
                
theGame.prototype = {
                preload: function() {
                    this.game.load.image("bot1", "bot2.jpg");
                    this.game.load.image("top1", "bg2.png");
                    //princess x = 30+40; y = 50+40;
                    this.game.load.spritesheet("princess", "princess.png", 32, 48);
                },

                create: function() {
                    this.game.physics.startSystem(Phaser.Physics.ARCADE);
                    this.game.world.setBounds(0, 0, 900, 600);
                    var floor = this.game.add.sprite(0, 300, 'bot1');
                    
                    platforms = this.game.add.group();
                    platforms.enableBody = true;
                    var bg = platforms.create(0, 0, 'top1');
                    bg.body.immovable = true;
                    
                    player = this.game.add.sprite(0, this.game.world.height - 50, "princess");
                    player.anchor.setTo(0.5);
                    floor.height = this.game.height;
                    //floor.width = this.game.width;
                    //  We need to enable physics on the player
                    this.game.physics.arcade.enable(player);                    player.body.collideWorldBounds = true;

                    //  Our two animations, walking left and right.
                    player.animations.add('left', [4, 5, 6, 7], 6, true);
                    player.animations.add('right', [8, 9, 10, 11], 10, true);
                    player.animations.add('down', [0, 1, 2, 3], 2, true);
                    player.animations.add("up", [12, 13, 14, 15], 14, true);
                    cursors = this.game.input.keyboard.createCursorKeys();
                    
                    

                },

                update: function() {
                    
                        this.game.physics.arcade.collide(player, platforms);
                        player.fixedToCamera = true;
                        player.cameraOffset.x = 0;
                        player.cameraOffset.y = this.game.world.height -50;
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
                        console.log(this.game.world.width);
                        console.log("sprite position", player.body.position.x);
                        if(player.body.position.x === this.game.world.width){
                            this.game.state.start("TheGame2");
                        }
                },
                render: function() {
                    this.game.debug.cameraInfo(this.game.camera, 32, 32);
                }

}
            
                