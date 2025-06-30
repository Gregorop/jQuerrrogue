function GameMap() {
    this.field = $('.field')
    this.widthN = 40;
    this.heightN = 24;
    this.tileSize = {w:this.field.width()/this.widthN, h:this.field.height()/this.heightN}
    this.grid = [];

    this.generate = function() {
        for (var y = 0; y < this.heightN; y++) {
            this.grid[y] = [];
            for (var x = 0; x < this.widthN; x++) {
                this.grid[y][x] = "W";
            }
        }
    };

    this.render = function() {
        this.field.empty();
        for (var y = 0; y < this.heightN; y++) {
            for (var x = 0; x < this.widthN; x++) {
                var tile = new Tile('W', x, y, this.tileSize)
                tile.element.appendTo(this.field);
            }
        }
    };
}
