function Game() {
    this.map = new GameMap()
    
    this.init = function() {
        this.map.generate();
        this.map.render();
    };
}
