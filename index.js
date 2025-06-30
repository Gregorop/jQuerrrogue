function Game() {
    this.map = new GameMap();
    this.hero = new Hero(this.map);
    this.enemies = [];

    this.init = function() {
        this.map.generate();
        this.hero.init();
        this.hero.setup_controls();
        for (var i = 0; i < 10; i++) {
            var enemy = new Enemy(this.map);
            enemy.init();
            this.enemies.push(enemy);
        }

        this.gameLoop();
    };

    this.gameLoop = function() {
        this.enemies.forEach(enemy => enemy.make_step());
        this.map.render();
        requestAnimationFrame(this.gameLoop.bind(this));
    };
}
