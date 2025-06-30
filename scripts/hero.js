function Hero(map) {
    this.init = function(){
        this.div_inventory = $('.inventory')
        this.div_inventory.empty()
        this.inventory = [];
        this.map = map;
        this.pos = map.get_random_empty_cell();
        map.spawn_item(this.pos.x,this.pos.y,"P");
    }

    this.get_loot = function(x,y){
        if (this.map.grid[y][x] === "SW"){
            if (!this.inventory.includes("sword")){
                var sword_to_inventory = $('<div>', {class: 'tileSW'})
                sword_to_inventory.appendTo(this.div_inventory);
                this.inventory.push('sword');
            }
            this.map.grid[y][x] = "bg";
        }
    }

    this.make_step = function(dx,dy){
        newX = this.pos.x+dx;
        newY = this.pos.y+dy;
        this.get_loot(newX,newY);
        if (this.map.cell_is_empty(newX,newY)){
            this.map.grid[this.pos.y][this.pos.x] = "bg";
            this.map.grid[this.pos.y+dy][this.pos.x+dx] = "P";
            this.pos.x += dx;
            this.pos.y += dy;
        }
    }

    this.setup_controls = function() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 's': 
                    this.make_step(0,1); 
                    break;
                case 'w': 
                    this.make_step(0,-1); 
                    break;
                case 'a': 
                    this.make_step(-1,0); 
                    break;
                case 'd': 
                    this.make_step(1,0); 
                    break;
                default: 
                    return;
            }
        });
    }
}
