import Option from "functional/Option.js";
import TetrisPiece from "tetris/TetrisPiece.js";
import TetrisBoard from "tetris/TetrisBoard.js";
import Matrix from "math/Matrix.js";

test("should canPlace", () => {
    const board = new TetrisBoard(
        new Matrix([
            [0, 0, 1, 1],
            [0, 0, 0, 1],
            [0, 0, 0, 0],
            [0, 1, 1, 0]
        ]),
        Option.none(), 0, false
    );

    expect(board.canPlace(new TetrisPiece(1, 0), {row: 0, col: 0})).toBe(true);
    expect(board.canPlace(new TetrisPiece(5, 0), {row: 0, col: 1})).toBe(true);
    expect(board.canPlace(new TetrisPiece(1, 0), {row: 0, col: 1})).toBe(false);
    expect(board.canPlace(new TetrisPiece(5, 0), {row: 0, col: 2})).toBe(false);
    expect(board.canPlace(new TetrisPiece(1, 0), {row: 0, col: 3})).toBe(false);
});

test("should canPlace with clip", () => {
    const board = new TetrisBoard(
        new Matrix([
            [0, 0, 0, 1],
            [0, 0, 1, 1],
            [0, 1, 1, 1],
            [1, 1, 1, 1]
        ]),
        Option.none(), 0, false
    );

    expect(board.canPlace(new TetrisPiece(2, 0), {row: -3, col: 2})).toBe(true);
    expect(board.canPlace(new TetrisPiece(2, 0), {row: -2, col: 2})).toBe(false);

    expect(board.canPlace(new TetrisPiece(2, 0), {row: -3, col: 1})).toBe(true);
    expect(board.canPlace(new TetrisPiece(2, 0), {row: -2, col: 1})).toBe(true);
    expect(board.canPlace(new TetrisPiece(2, 0), {row: -1, col: 1})).toBe(false);
});

test("should mergeAndClear", () => {
    expect(
        new TetrisBoard(
            new Matrix([
                [0, 0, 0, 1],
                [0, 0, 1, 1],
                [1, 1, 1, 1],
                [1, 1, 1, 1]
            ]),
            Option.none(), 0, false
        ).mergeAndClear()[0].rows
    ).toEqual([
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,1],
        [0,0,1,1]
    ]);
    expect(
        new TetrisBoard(
            new Matrix([
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 1, 1, 1]
            ]),
            Option.none(), 0, false
        ).mergeAndClear()[0].rows
    ).toEqual([
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]);
    expect(
        new TetrisBoard(
            new Matrix([
                [0, 0, 0, 1],
                [0, 0, 1, 1],
                [1, 0, 1, 1],
                [1, 1, 0, 1]
            ]),
            Option.none(), 0, false
        ).mergeAndClear()[0].rows
    ).toEqual([
        [0,0,0,1],
        [0,0,1,1],
        [1,0,1,1],
        [1,1,0,1]
    ]);
});