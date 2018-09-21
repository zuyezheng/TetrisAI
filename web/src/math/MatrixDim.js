export default class MatrixDim {

    _rows: number;
    _cols: number;

    constructor(rows: number, cols: number){
        this._rows = rows;
        this._cols = cols;
    }

    get cols(){
        return this._cols;
    }

    get rows() {
        return this._rows;
    }

    canMultiply(dim: MatrixDim): boolean {
        return this.cols === dim.rows;
    }

    is(dim: MatrixDim): boolean {
        return this.cols === dim.cols && this.rows === dim.rows;
    }

}