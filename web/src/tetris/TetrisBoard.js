import List from "functional/List.js";
import Option from "functional/Option.js";
import Matrix from "math/Matrix.js";
import TetrisPiece from "tetris/TetrisPiece.js";

/**
 * Immutable state of tetris board at the current moment in time.
 *
 * @author zuye.zheng
 */
export default class TetrisBoard {

    static _clipPiece(piece: TetrisPiece, row: number): [Matrix, number] {
        if (row < 0) {
            const clipStart = Math.abs(row);
            return [piece.matrix.clipRows(clipStart), 0];
        } else {
            return [piece.matrix, row];
        }
    }

    static of(rows: number, cols: number): TetrisBoard {
        return new TetrisBoard(Matrix.fill(rows, cols, 0), Option.none());
    }
    
    _board: Matrix;
    _pieceAndPosition: Option<PieceAndPosition>;
    _score: number;
    _isOver: boolean;

    /**
     * The board and piece in play are stored separately to keep state changes cleaner.
     */
    constructor(
        board: Matrix,
        pieceAndPosition: Option<PieceAndPosition>,
        score: number = 0,
        isOver: boolean = false
    ) {
        this._board = board;
        this._pieceAndPosition = pieceAndPosition;
        this._score = score;
        this._isOver = isOver;
    }

    /**
     * See if a given piece can be placed on the board.
     */
    canPlace(piece: TetrisPiece, {row, col}: {row: number, col: number}): boolean {
        // need to do some clipping since pieces are incrementally lowered so there will be negative row indices
        const [clippedPiece, clippedRow] = TetrisBoard._clipPiece(piece, row);
        if (clippedRow < 0 ||
            col < 0 ||
            clippedPiece.dim.rows + clippedRow > this.board.dim.rows ||
            clippedPiece.dim.cols + col > this.board.dim.cols) return false;

        return !List.reduceWithIterable(
            clippedPiece.iterateValues(),
            this.board.iterateValues(clippedRow, col, clippedPiece.dim.rows, clippedPiece.dim.cols),
            (a, b, acc) => acc || (a > 0 && b > 0),
            false
        );
    }

    /**
     * Return a merged matrix of the current piece and the rest of the board.
     */
    merge(): Matrix {
        return this.pieceAndPosition
            .map(([piece, {row, col}]: [TetrisPiece, {row: number, col: number}]) => {
                const [clippedPiece, clippedRow] = TetrisBoard._clipPiece(piece, row);
                return this.board.merge(clippedPiece, clippedRow, col, (oldVal, newVal) => oldVal || newVal);
            })
            .getOrElse(() => this.board);
    }

    /**
     * Return a new board that is merged, completed rows cleared, and remaining board lowered. Number of rows cleared
     * returned in the tuple.
     */
    mergeAndClear(): [Matrix, number] {
        const merged = this.merge();
        const [rowsKept, rowsCleared] = merged.rows.reduce((acc, row) => {
            const isFull = row.reduce((isFull, v) => isFull && v === 1, true);
            const [rowsKept, rowsCleared] = acc;
            if (!isFull) rowsKept.push(row);
            return [rowsKept, rowsCleared + (isFull ? 1 : 0)];
        }, [[], 0]);

        // need to pad the top with rows cleared from the bottom
        const newRows = new Array(rowsCleared).fill(true).map(() => new Array(this.board.dim.cols).fill(0));

        return [
            new Matrix(newRows.concat(rowsKept)),
            rowsCleared
        ]
    }

    mapPiece(f: PieceAndPosition => PieceAndPosition): TetrisBoard {
        return new TetrisBoard(
            this.board,
            this.pieceAndPosition.map(f),
            this.score,
            this.isOver
        )
    }

    get board(): Matrix {
        return this._board;
    }

    get pieceAndPosition(): Option<PieceAndPosition> {
        return this._pieceAndPosition;
    }

    get score(): number {
        return this._score;
    }

    get isOver(): boolean {
        return this._isOver;
    }

}

type PieceAndPosition = [TetrisPiece, {row: number, col: number}];