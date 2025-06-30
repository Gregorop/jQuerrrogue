function Game() {
    this.map = new GameMap();
    this.hero = new Hero(this.map);

    this.init = function() {
        this.map.generate();
        this.hero.init();
        this.hero.setup_controls();
        this.gameLoop();
    };

    this.gameLoop = function() {
        this.map.render();
        requestAnimationFrame(this.gameLoop.bind(this));
    };
}
