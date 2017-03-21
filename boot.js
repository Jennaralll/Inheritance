var Game = {};

Game.Boot = =function(game){

};

Game.Boot.prototype = {
    init: function(){
        
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
    },
    
    preload: function(){
        this.load.image('preload', 'assets/*insert lancy's titlepage*);
        
    },
    
    create:function(){
        this.state.start("Preload");
    }
}