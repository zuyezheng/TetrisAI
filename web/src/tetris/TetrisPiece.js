import State from "functional/State.js";
import Random from "math/Random.js";
import Matrix from "math/Matrix.js";
import TransformationMatrix from "math/TransformationMatrix.js";

/**
 * Immutable Tetris piece.
 *
 * @author zuye.zheng
 */
export default class TetrisPiece {

    /**
     * Generate new piece given a pure random number generator.
     */
    static next(): State<TetrisPiece, Random.Generator> {
        return Random.intBetween(0, TYPE.length - 1).map(i => new TetrisPiece(i, 0));
    };

    /**
     * Rotate as part of a state transformation.
     */
    static rotateCCW(): State<Matrix, TetrisPiece> {
        return new State(piece => {
            const rotated = piece.rotateCCW();
            return [rotated.matrix, rotated];
        })
    }

    _i: number;
    _rotation: number;
    _matrix: Matrix;

    constructor(i: number, rotation: number) {
        this._i = i;
        this._rotation = rotation % 360;

        const piecePositions = TYPE[i]
            // piece represented as a grid, need to transform them to (x, y) for rotation
            .flatMapCells((rowI, colI, v) => v === 1 ? [colI, rowI] : null)
            // rotate and round
            .multiply(TransformationMatrix.rotation(rotation))
            .map(Math.round);

        // need to reindex everything to (0, 0)
        const [[minCol, maxCol], [minRow, maxRow]] = piecePositions.rows.reduce(
            (acc, row) => [
                [Math.min(acc[0][0], row[0]), Math.max(acc[0][1], row[0])],
                [Math.min(acc[1][0], row[1]), Math.max(acc[1][1], row[1])]
            ],
            new Array(2).fill([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])
        );

        // convert (x, y) positions back to a grid
        this._matrix = new Matrix(piecePositions.rows.reduce(
            (acc, row) => {
                acc[row[1] - minRow][row[0] - minCol] = 1;
                return acc;
            },
            new Array(maxRow - minRow + 1).fill(true).map(v => new Array(maxCol - minCol + 1).fill(0))
        ));
    }

    get i(): number {
        return this._i;
    }

    get rotation(): number {
        return this._rotation;
    }

    get matrix(): Matrix {
        return this._matrix;
    }

    rotateCCW(): TetrisPiece {
        return new TetrisPiece(this.i, this.rotation + 90);
    }

    rotateCW(): TetrisPiece {
        return new TetrisPiece(this.i, this.rotation - 90);
    }

}

const TYPE = [
    new Matrix([
        [0, 1, 0],
        [1, 1, 1]
    ]),
    new Matrix([
        [1, 1],
        [1, 1]
    ]),
    new Matrix([
        [1], [1], [1], [1]
    ]),
    new Matrix([
        [1, 0],
        [1, 0],
        [1, 1]
    ]),
    new Matrix([
        [0, 1],
        [0, 1],
        [1, 1]
    ]),
    new Matrix([
        [1, 0],
        [1, 1],
        [0, 1]
    ]),
    new Matrix([
        [0, 1],
        [1, 1],
        [1, 0]
    ])
];