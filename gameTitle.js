var gameTitle = function(game){}

gameTitle.prototype = {
	create: function(){
		console.log("in create of gameTitle.js");
        var gameBanner = this.game.add.sprite(20, 100, "title");
		var playButton = this.game.add.button(240,480,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	}
}