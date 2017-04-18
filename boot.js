var boot = function() {};

boot.prototype = {
  preload: function() {
    console.log('boot:preload');
    // Loading bar
    this.game.load.image('loading', 'assets/Loading_bar.png');
  },

  create: function() {
    console.log('boot:create');
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.refresh();

    this.game.state.start('Preload');
  },
};