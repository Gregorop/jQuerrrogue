function Game() {
    this.map = new GameMap();
    this.hero = new Hero(this.map);
    this.enemies = [];

    this.init = function() {
        this.map.generate();
        this.hero.init();
        this.hero.setup_controls();
        for (var i = 0; i < 10; i++) {
            var enemy = new Enemy(this.map, this.enemies, this.hero);
            enemy.init();
        }
        this.hero.enemy_list = this.enemies;

        this.gameLoop();
    };

    this.gameLoop = function() {
        this.enemies.forEach(enemy => enemy.make_step());
        this.map.render();
        this.hero.update_health_bar();
        if (this.enemies.length === 0){
            alert('ура');
            location.reload();
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    };
}
