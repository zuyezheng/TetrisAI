import State from "functional/State.js";
import Random from "math/Random.js";
import TetrisBoard from "tetris/TetrisBoard.js";
import TetrisInput from "tetris/TetrisInput.js";

test("should tick", () => {
    const initialBoard = TetrisBoard.of(6, 6);

    expect(
        State
            .repeat(TetrisInput.tick(), 8)
            .map(boards => boards.map(board => board.merge().rows))
            .run([initialBoard, Random.generator(1)])[0]
    ).toEqual(
        [[
            [0,0,1,1,1,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
        ],[
            [0,0,0,1,0,0],
            [0,0,1,1,1,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
        ],[
            [0,0,0,0,0,0],
            [0,0,0,1,0,0],
            [0,0,1,1,1,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
        ],[
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,1,0,0],
            [0,0,1,1,1,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
        ],[
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,1,0,0],
            [0,0,1,1,1,0],
            [0,0,0,0,0,0]
        ],[
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,1,0,0],
            [0,0,1,1,1,0]
        ], [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,1,0,0],
            [0,0,1,1,1,0]
        ],[
            [0,0,1,1,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,1,0,0],
            [0,0,1,1,1,0]
        ]]
    );
});

test("should tick", () => {
    const initialBoard = TetrisBoard.of(6, 6);

    expect(
        State
            .repeat(TetrisInput.tick(), 20)
            .run([initialBoard, Random.generator(1)])[1][0].merge().rows
    ).toEqual([
        [0,0,1,1,0,0],
        [0,0,0,1,0,0],
        [0,0,1,1,0,0],
        [0,0,1,1,0,0],
        [0,0,0,1,0,0],
        [0,0,1,1,1,0]
    ]);
});

test("should move", () => {
    const initialBoard = TetrisBoard.of(6, 6);

    expect(
        State.sequence([
            TetrisInput.tick(),
            TetrisInput.left(),
            TetrisInput.tick(),
            TetrisInput.left(),
            TetrisInput.tick(),
            TetrisInput.left(),
            TetrisInput.tick(),
            TetrisInput.right(),
            TetrisInput.right()
        ])
        .map(boards => boards.map(board => board.merge().rows))
        .run([initialBoard, Random.generator(1)])[0]
    ).toEqual(
        [[
            [0,0,1,1,1,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
        ],[
            [0,1,1,1,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
        ],[
            [0,0,1,0,0,0],
            [0,1,1,1,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
        ],[
            [0,1,0,0,0,0],
            [1,1,1,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
        ],[
            [0,0,0,0,0,0],
            [0,1,0,0,0,0],
            [1,1,1,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
        ],[
            [0,0,0,0,0,0],
            [0,1,0,0,0,0],
            [1,1,1,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
        ],[
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,1,0,0,0,0],
            [1,1,1,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
        ],[
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,1,0,0,0],
            [0,1,1,1,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
        ],[
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,1,0,0],
            [0,0,1,1,1,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
        ]]
    );
});

test("should rotate", () => {
    const initialBoard = TetrisBoard.of(6, 6);

    expect(
        State.sequence([
            TetrisInput.tick(),
            TetrisInput.tick(),
            TetrisInput.tick(),
            TetrisInput.rotate()
        ]).run([initialBoard, Random.generator(1)])[1][0].merge().rows
    ).toEqual([
        [0,0,0,0,0,0],
        [0,0,1,0,0,0],
        [0,0,1,1,0,0],
        [0,0,1,0,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0]
    ]);
});
