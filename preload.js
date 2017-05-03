var preload = function(game){}

preload.prototype= {
    preload: function(){
        var loadingBg = this.add.sprite(0, 0, "loading");
        
        this.game.load.image("play", "Startbanner.png", 100, 100);
        this.game.load.image("title", "Inheritancebanner.jpg", 100, 100);
        this.game.load.image("bot1", "bot2.jpg", 300, 300);
        this.game.load.image("top1", "bg2.png", 300, 300);
        this.game.load.image("top2", "bg_top.jpg", 300, 300);
        this.game.load.image("bot2", "bg_bot.jpg", 300, 300);
        this.game.load.image("cover", "cover.png", 300, 300);
        this.game.load.image("table", "table.png", 400, 400);
        this.game.load.image("piano", "transparent_piano.png", 122, 104);
        this.game.load.image("shelf", "shelf.png", 500, 500);
        this.game.load.image("bookcase", "bookcase.png", 300, 300);
        this.game.load.image("plant", "plant.png", 300, 300);
        this.game.load.image("box", "box.png", 300, 300);
        this.game.load.spritesheet("princess", "princess.png", 32, 48);
    },
    create: function(){
        this.game.state.start("GameTitle");
    }
}