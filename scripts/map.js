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
        this.paths_generate();
        this.rooms_generate();
        this.loot_generate();
    };

    this.randomX = function(){
        return Math.floor(Math.random() * (this.widthN-2))+1;
    }

    this.randomY = function(){
        return Math.floor(Math.random() * (this.heightN-2))+1;
    }


    this.rooms_generate = function(){
        var roomCount = 5 + Math.floor(Math.random() * 5);
        
        for (var i = 0; i < roomCount; i++) {
            var roomWidth = 3 + Math.floor(Math.random() * 5);
            var roomHeight = 3 + Math.floor(Math.random() * 5);
            
            do {
                var posX = Math.floor(Math.random() * (this.widthN - roomWidth - 1)) + 1;
                var posY = Math.floor(Math.random() * (this.heightN - roomHeight - 1)) + 1;
            } while (!this.cell_is_empty(posX, posY))
            
            for (var y = posY; y < posY + roomHeight; y++) {
                for (var x = posX; x < posX + roomWidth; x++) {
                        this.grid[y][x] = "bg";
                    }
                }
            }
        }

    this.cell_is_empty = function(x,y){
        return this.grid[y][x] === 'bg'
    }

    this.get_random_empty_cell = function() {
        let x, y;
        attempts = this.widthN * this.heightN
        do {
            x = Math.floor(Math.random() * (this.widthN - 2)) + 1;
            y = Math.floor(Math.random() * (this.heightN - 2)) + 1;
            attempts--;
        } while (!this.cell_is_empty(x,y)&&attempts>0);
        if (attempts == 0){
            console.error('расширение территории...')
            this.grid[y][x] = 'bg'
        }
        return { x, y };
    };

    this.spawn_item = function(x,y,type){
        this.grid[y][x] = type;
    }

    this.spawn_N_items = function(n,type){
        for (var items = 0; items < n; items++) {
            pos = this.get_random_empty_cell();
            this.spawn_item(pos.x, pos.y, type);
        }
    }

    this.loot_generate = function(){
        this.spawn_N_items(2, "SW");
        this.spawn_N_items(10, "HP");
    }

    this.paths_generate = function(){
        var horizontalN = 3 + Math.floor(Math.random() * 2);
        var verticalN = 3 + Math.floor(Math.random() * 2);

        for (var i = 0; i < verticalN; i++) {
            var y = this.randomY();
            for (var x = 0; x < this.widthN; x++) {
                this.grid[y][x] = 'bg';
            }
        }

        for (var i = 0; i < horizontalN; i++) {
            var x = this.randomX();
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
