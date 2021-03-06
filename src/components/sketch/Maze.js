export default class Maze {
  constructor(p, h, w, cellH, cellW, cellMap) {
    this.x = 25;
    this.y = 25;
    this.h = h;
    this.w = w;
    this.cellH = cellH;
    this.cellW = cellW;
    this.cellMap = JSON.parse(cellMap);
    this.p = p;
  }

  showCells() {

    this.p.stroke(0);
    this.p.fill(255);

    let symbol = null;
    let cell = 0;
    for(let col = 0; col < this.w; col++) {

      for(let row = this.h; row > 0; row--) {

        let cellX = (col * this.cellW) + this.x;
        let cellY = (row * (this.cellH)) + this.y;

        let color = '#1919A6';
        if(cell === 312) {
          color = 255;
          symbol = '★';
        } else {
          symbol = null;
        }

        this.makeCell(this.cellMap[cell], cellX, cellY, this.cellH, this.cellW, color, symbol);

        cell++;
      }
    }

  }

  makeCell(cellData, x, y, w, h, color, symbol) {

    let exits = Object.keys(cellData.exits);
    let wallE = { x1: x + w, y1: y, x2: x + w, y2: y + h };
    let wallW = { x1: x, y1: y, x2: x, y2: y + h };
    let wallN = { x1: x, y1: y, x2: x + w, y2: y };
    let wallS = { x1: x, w, y1: y + h, x2: x + w, y2: y + h };

    let walls = { e: wallE, w: wallW, n: wallN, s: wallS };

    exits.forEach(exit => {
      if(walls[exit]) delete walls[exit];
    });

    this.p.noStroke();
    this.p.fill(color);
    this.p.rect(x, y, w, h);

    if(symbol) {
      this.p.fill(0);
      this.p.text(symbol, x + 5, y + 20);
    }

    Object.values(walls).forEach(wall => {
      this.p.strokeWeight(3.5);
      this.p.stroke('#ff00ee');
      this.p.line(wall.x1, wall.y1, wall.x2, wall.y2);
    });

  }
}
