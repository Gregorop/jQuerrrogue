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
        this.room_generate()
        this.paths_generate()
    };

    this.room_generate = function(){
        var roomCount = 5 + Math.floor(Math.random() * 5);
        
        for (var i = 0; i < roomCount; i++) {
            var roomWidth = 3 + Math.floor(Math.random() * 5);
            var roomHeight = 3 + Math.floor(Math.random() * 5);
            
            var posX = Math.floor(Math.random() * (this.widthN - roomWidth - 1)) + 1;
            var posY = Math.floor(Math.random() * (this.heightN - roomHeight - 1)) + 1;
            
            for (var y = posY; y < posY + roomHeight; y++) {
                for (var x = posX; x < posX + roomWidth; x++) {
                        this.grid[y][x] = "bg";
                    }
                }
            }
        }

    this.paths_generate = function(){
        var horizontalN = 3 + Math.floor(Math.random() * 2);
        var verticalN = 3 + Math.floor(Math.random() * 2);

        for (var i = 0; i < verticalN; i++) {
            var y = Math.floor(Math.random() * this.heightN-2)+1;
            for (var x = 0; x < this.widthN; x++) {
                this.grid[y][x] = 'bg';
            }
        }

        for (var i = 0; i < horizontalN; i++) {
            var x = Math.floor(Math.random() * this.widthN-2)+1;
            for (var y = 0; y < this.heightN; y++) {
                this.grid[y][x] = 'bg';
            }
        }
    }

    this.render = function() {
        this.field.empty();
        for (var y = 0; y < this.heightN; y++) {
            for (var x = 0; x < this.widthN; x++) {
                var tile = new Tile(this.grid[y][x], x, y, this.tileSize)
                tile.element.appendTo(this.field);
            }
        }
    };
}
