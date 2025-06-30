function Tile(type, x, y, tileSize) {
    this.element = $('<div>', {
        class: 'tile tile' + type,
        css: {
            left: x * tileSize.w,
            top: y * tileSize.h
        }
    });
}
