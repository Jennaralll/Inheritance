var preload = function(game){}

preload.prototype= {
    preload: function(){
        var loadingBg = this.add.sprite(0, 0, "loading");
        
        this.game.load.image("play", "play_button.jpg", 100, 100);
        this.game.load.image("bot1", "bot2.jpg", 300, 300);
        this.game.load.image("top1", "bg2.png", 300, 300);
        this.game.load.image("top2", "bg4.jpg", 300, 300);
        this.game.load.image("bot2", "bg5.jpg", 300, 300);
        this.game.load.image("cover", "cover.png", 300, 300);
        this.game.load.image("table", "table.png", 300, 300);
        this.game.load.image("box", "box.png", 300, 300);
        this.game.load.spritesheet("princess", "princess.png", 32, 48);
    },
    create: function(){
        this.game.state.start("GameTitle");
    }
}