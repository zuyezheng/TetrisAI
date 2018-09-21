import TetrisPiece from "tetris/TetrisPiece.js";
import Random from "math/Random.js";
import State from "functional/State.js";

test("should generate", () => {
    expect(
        State.repeat(TetrisPiece.next(), 3)
            .run(Random.generator(1))[0]
            .map(v => v.matrix.rows)
    ).toEqual([
        [[0, 1, 0], [1, 1, 1]],
        [[1, 1], [1, 1]],
        [[1, 0], [1, 1], [0, 1]]
    ]);
});

test("should rotate", () => {
    expect(
        TetrisPiece.next()
            .transfer(State.repeat(TetrisPiece.rotateCCW().map(m => m.rows), 5))
            .run(Random.generator(1))[0]
    ).toEqual([
        [[0, 1], [1, 1], [0, 1]],
        [[1, 1, 1], [0, 1, 0]],
        [[1, 0], [1, 1], [1, 0]],
        [[0, 1, 0], [1 , 1, 1]],
        [[0, 1], [1, 1], [0, 1]]
    ]);
});