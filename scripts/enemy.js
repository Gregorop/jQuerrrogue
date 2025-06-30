function Enemy(map, enemy_list) {
    this.step_prob = 0.05

    this.init = function(){
        this.map = map;
        this.pos = map.get_random_empty_cell();
        this.enemy_list = enemy_list;
        this.enemy_list.push(this);
        map.spawn_item(this.pos.x,this.pos.y,"E");
    }

    this.under_attack = function(x,y){
        if (Math.abs(this.pos.x-x) <= 1 && Math.abs(this.pos.y - y) <= 1){
            this.map.grid[this.pos.y][this.pos.x] = 'bg';
            index = this.enemy_list.indexOf(this);
            if (index !== -1) {
                this.enemy_list.splice(index, 1);
            }
        }
    }

    this.make_step = function(){
        if (Math.random() < this.step_prob){
            dx = Math.floor(Math.random() * 3) - 1;
            dy = dx != 0 ? 0 : Math.floor(Math.random() * 3) - 1;
            newX = this.pos.x+dx;
            newY = this.pos.y+dy;
            if (0 <= newX && newX < this.map.widthN && 0 <= newY && newY < this.map.heightN){
                if (this.map.cell_is_empty(newX,newY)){
                    this.map.grid[this.pos.y][this.pos.x] = "bg";
                    this.map.grid[newY][newX] = "E";
                    this.pos.x = newX;
                    this.pos.y = newY;
                }
            }
        }
    }
}
