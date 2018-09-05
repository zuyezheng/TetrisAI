import type {Run} from "test/Run.js";
import {TetrisPiece} from "tetris/TetrisPiece.js";
import {Random} from "math/Random.js";
import {State} from "functional/State.js";

export function TetrisPieceTest(run: Run) {

    run("should generate", (assert) => {
        assert.equals(
            () =>
                State.repeat(TetrisPiece.next(), 3)
                    .run(Random.generator(1))[0]
                    .map(v => v.matrix.rows),
            [
                [[0, 1, 0], [1, 1, 1]],
                [[1, 1], [1, 1]],
                [[1, 0], [1, 1], [0, 1]]
            ]
        );
    });

    run("should rotate", (assert) => {
        assert.equals(
            () =>
                TetrisPiece.next()
                    .transfer(State.repeat(TetrisPiece.rotateCCW().map(m => m.rows), 5))
                    .run(Random.generator(1))[0],
            [
                [[0, 1], [1, 1], [0, 1]],
                [[1, 1, 1], [0, 1, 0]],
                [[1, 0], [1, 1], [1, 0]],
                [[0, 1, 0], [1 , 1, 1]],
                [[0, 1], [1, 1], [0, 1]]
            ]
        );
    });

}