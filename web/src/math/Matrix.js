import MatrixDim from 'math/MatrixDim.js';

/**
 * Immutable matrix with some functional operations.
 *
 * @author zuye.zheng
 */
export default class Matrix {

    +dim: MatrixDim;
    +rows: Array<Array<number>>;

    static fill(numRows: number, numCols: number, val: number): Matrix {
        return new Matrix(new Array(numRows).fill(true).map(() => new Array(numCols).fill(val)));
    }

    constructor(rows: Array<Array<number>>) {
        this.rows = rows;
        this.dim = new MatrixDim(this.rows.length, this.rows[0].length);
    }

    getRow(i: number): Array<number> {
        return this.rows[i];
    }

    /**
     * Create a new matrix with a patch of values set from another.
     */
    set(m: Matrix, rowI: number, colI: number): Matrix {
        return this.merge(m, rowI, colI, (oldVal, newVal) => newVal)
    }

    merge(m: Matrix, rowI: number, colI: number, f: (number, number) => number): Matrix {
        return new Matrix(this.rows.map((row, i) => {
            // retain untouched rows
            if(i < rowI || i >= rowI + m.dim.rows) return row;

            // copy values for rows that need to be altered
            const newRow = row.slice();
            for (let j=0; j<m.dim.cols; j++) {
                newRow[j + colI] = f(newRow[j + colI], m.getRow(i - rowI)[j]);
            }
            return newRow;
        }));
    }

    multiply(m: Matrix): Matrix {
        if (!this.dim.canMultiply(m.dim)) throw Error("Mismatched matrices.");

        const result = new Array(this.dim.rows);
        for (let y=0; y<this.dim.rows; y++) {
            let curRow = new Array(m.dim.cols);
            for (let x=0; x<m.dim.cols; x++) {
                let v = 0;
                for (let i=0; i<this.dim.cols; i++) {
                    v += this.rows[y][i] * m.rows[i][x];
                }
                curRow[x] = v;
            }
            result[y] = curRow;
        }

        return new Matrix(result);
    }

    clipRows(start: number): Matrix {
        return new Matrix(this.rows.filter((v, i) => i >= start));
    }

    /**
     * Map each cell value in place.
     */
    map(f: number => number): Matrix {
        return new Matrix(this.rows.map(row => row.map(f)));
    }

    /**
     * Map each row.
     */
    mapRows(f: Array<number> => Array<number>): Matrix {
        return new Matrix(this.rows.map(f));
    }

    /**
     * flatMap each cell value into a row given f(rowIndex, colIndex, cellValue).
     */
    flatMapCells(f: (number, number, number) => ?Array<number>): Matrix {
        return new Matrix(
            Array.prototype.concat.apply([],
                this.rows.map((row, rowI) =>
                    // $FlowFixMe
                    row.map((v, colI) => f(rowI, colI, v))
                )
            ).filter(v => v !== null)
        );
    }

    /**
     * Generator to iterate over all cell values.
     */
    *iterateValues(
        startRow: number = 0,
        startCol: number = 0,
        rows: number = this.dim.rows,
        cols: number = this.dim.cols
    ): Generator<number, void, void> {
        for (let row=startRow; row<startRow+rows; row++) {
            for (let col=startCol; col<startCol+cols; col++) {
                yield this.rows[row][col];
            }
        }
    }

}

