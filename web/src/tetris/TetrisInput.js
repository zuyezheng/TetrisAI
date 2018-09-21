import Option from "functional/Option.js";
import State from "functional/State.js";
import Random from "math/Random.js";
import TetrisBoard from "tetris/TetrisBoard.js";
import TetrisPiece from "tetris/TetrisPiece.js";

/**
 * Input types to a tetris game that alter the board.
 *
 * @author zuye.zheng
 */
export default class TetrisInput {

    static Tick: TetrisInput.Tick;
    static MoveX: TetrisInput.MoveX;
    static Rotate: TetrisInput.Rotate;

    /**
     * State is defined as a tuple of TetrisBoard and random number generator. Running an input against this tuple will
     * produce a new tuple representing the state. The same resulting TetrisBoard from the input is provided as the
     * value of the ran state so it can be mapped into the board matrix, scores, etc.
     */
    static update(input: Input): State<TetrisBoard, [TetrisBoard, Random.Generator]> {
        return new State(([board, generator]) => {
            // game over
            if (board.isOver) return [board, [board, generator]];

            const [nextBoard, nextGenerator] = input.update(board, generator);
            return [nextBoard, [nextBoard, nextGenerator]];
        });
    }

    /**
     * Increment the time which will move a piece down, evaluate completed rows, scores, and end of game.
     */
    static tick(): State<TetrisBoard, [TetrisBoard, Random.Generator]> {
        return TetrisInput.update(new TetrisInput.Tick());
    }

    static left(): State<TetrisBoard, [TetrisBoard, Random.Generator]> {
        return TetrisInput.update(new TetrisInput.MoveX(-1));
    }

    static right(): State<TetrisBoard, [TetrisBoard, Random.Generator]> {
        return TetrisInput.update(new TetrisInput.MoveX(1));
    }

    static rotate(): State<TetrisBoard, [TetrisBoard, Random.Generator]> {
        return TetrisInput.update(new TetrisInput.Rotate());
    }

}

interface Input {
    update(board: TetrisBoard, generator: Random.Generator): [TetrisBoard, Random.Generator];
}

TetrisInput.Tick = class Tick implements Input {

    update(board: TetrisBoard, generator: Random.Generator): [TetrisBoard, Random.Generator] {
        return board.pieceAndPosition
            // see what to do about the current piece
            .map(([piece, {row, col}]) => {
                const newPosition = {row: row + 1, col};
                if (board.canPlace(piece, newPosition)) {
                    return board.mapPiece(() => [piece, newPosition])
                } else {
                    const [newBoard, rowsCleared] = board.mergeAndClear();
                    return new TetrisBoard(
                        newBoard, Option.none(), board.score + rowsCleared, board.isOver
                    );
                }
            })
            // generator is not used when there is an existing piece so return the existing instance with the new board
            .map(nextBoard => [nextBoard, generator])
            // no piece on the board, generate a new one
            .getOrElse(() => {
                const [nextPiece, nextGenerator] = TetrisPiece.next().run(generator);
                const startPosition = {
                    row: -nextPiece.matrix.dim.rows + 1,
                    col: Math.round((board.board.dim.cols - nextPiece.matrix.dim.cols) / 2)
                };

                // see if we can place the new piece
                if (board.canPlace(nextPiece, startPosition)) {
                    return [new TetrisBoard(
                        board.board,
                        Option.some([nextPiece, startPosition]),
                        board.score,
                        false
                    ), nextGenerator];
                } else {
                    // game over
                    return [new TetrisBoard(board.board, Option.none(), board.score, true), nextGenerator];
                }
            });
    }

};

TetrisInput.MoveX = class MoveX implements Input {

    _offset: number;

    constructor(offset){
        this._offset = offset;
    }

    update(board: TetrisBoard, generator: Random.Generator): [TetrisBoard, Random.Generator] {
        return [board.mapPiece(([piece, {row, col}]) => {
            const newPos = {row, col: col + this._offset};
            if (board.canPlace(piece, newPos)) {
                return [piece, newPos];
            } else {
                return [piece, {row, col}]
            }
        }), generator]
    }

};

TetrisInput.Rotate = class Rotate implements Input {

    update(board: TetrisBoard, generator: Random.Generator): [TetrisBoard, Random.Generator] {
        return [board.mapPiece(([piece, {row, col}]) => {
            const rotated = piece.rotateCW();
            if (board.canPlace(rotated, {row, col})) {
                return [rotated, {row, col}];
            } else {
                return [piece, {row, col}];
            }
        }), generator];
    }

};