var preload = function(game){}

preload.prototype= {
    function preload(){
        var loadingBg = this.add.sprite(0, 0, "loading_bar.png");

        game.load.image("bot1", "bot1.jpg", 300, 300);
        game.load.image("top1", "bg2.png", 300, 300);
        game.load.spritesheet("princess", "princess.png", 32, 48);
    },
    create: function(){
        this.game.state.start("GameTitle");
    }
}