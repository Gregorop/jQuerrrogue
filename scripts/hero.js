function Hero(map) {
    this.init = function(){
        this.map = map;
        this.pos = map.get_random_empty_cell();
        map.spawn_item(this.pos.x,this.pos.y,"P");
    }

    this.make_step = function(dx,dy){
        if (this.map.cell_is_empty(this.pos.x+dx,this.pos.y+dy)){
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
