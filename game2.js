var theGame2 = function(game){
    var cursors;
    var platforms;
    var player; 
};
                
theGame2.prototype = {
                preload: function() {
                    this.game.load.image("bot2", "bot5.jpg");
                    this.game.load.image("top2", "bg4.png");
                    //princess x = 30+40; y = 50+40;
                    this.game.load.spritesheet("princess", "princess.png", 32, 48);
                },

                create: function() {
                    this.game.physics.startSystem(Phaser.Physics.ARCADE);
                    var floor = this.game.add.sprite(0, 300, 'bot2');
                    
                    platforms = this.game.add.group();
                    platforms.enableBody = true;
                    var bg = platforms.create(0, 0, 'top2');
                    bg.body.immovable = true;
                    
                    player = this.game.add.sprite(0, this.game.world.height - 50, "princess");
                    floor.height = this.game.height;
                    floor.width = this.game.width;
                    //  We need to enable physics on the player
                    this.game.physics.arcade.enable(player);
                    player.body.collideWorldBounds = true;

                    //  Our two animations, walking left and right.
                    player.animations.add('left', [4, 5, 6, 7], 6, true);
                    player.animations.add('right', [8, 9, 10, 11], 10, true);
                    player.animations.add('down', [0, 1, 2, 3], 2, true);
                    player.animations.add("up", [12, 13, 14, 15], 14, true);
                    cursors = this.game.input.keyboard.createCursorKeys();
                    
                    

                },

                update: function() {
                    
                        this.game.physics.arcade.collide(player, platforms);
                        if (cursors.left.isDown)
                        {
                            //  Move to the left
                            player.body.velocity.x = -150;
                            player.body.velocity.y = 0;
                            player.animations.play('left');
                        }
                        else if (cursors.right.isDown)
                        {
                            //  Move to the right
                            player.body.velocity.x = 150;
                            player.body.velocity.y = 0;
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

                            player.frame = 4;
                        }
                }
}