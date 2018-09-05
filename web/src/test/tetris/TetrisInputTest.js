import type {Run} from "test/Run.js";

import {Option} from "functional/Option.js";
import {State} from "functional/State.js";
import {Random} from "math/Random.js";
import {Matrix} from "math/Matrix.js";
import {TetrisBoard} from "tetris/TetrisBoard.js";
import {TetrisInput} from "tetris/TetrisInput.js";

export function TetrisInputTest(run: Run) {

    run("should tick", (assert) => {
        const initialBoard = TetrisBoard.of(6, 6);

        assert.equals(
            () => State
                .repeat(TetrisInput.tick(), 8)
                .map(boards => boards.map(board => board.merge().rows))
                .run([initialBoard, Random.generator(1)])[0],
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

    run("should tick", (assert) => {
        const initialBoard = TetrisBoard.of(6, 6);

        assert.equals(
            () => State
                .repeat(TetrisInput.tick(), 20)
                .run([initialBoard, Random.generator(1)])[1][0].merge().rows,
            [
                [0,0,1,1,0,0],
                [0,0,0,1,0,0],
                [0,0,1,1,0,0],
                [0,0,1,1,0,0],
                [0,0,0,1,0,0],
                [0,0,1,1,1,0]
            ]
        );
    });

    run("should move", (assert) => {
        const initialBoard = TetrisBoard.of(6, 6);

        assert.equals(
            () =>
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
                .run([initialBoard, Random.generator(1)])[0],
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

    run("should rotate", (assert) => {
        const initialBoard = TetrisBoard.of(6, 6);

        assert.equals(
            () =>
                State.sequence([
                    TetrisInput.tick(),
                    TetrisInput.tick(),
                    TetrisInput.tick(),
                    TetrisInput.rotate()
                ]).run([initialBoard, Random.generator(1)])[1][0].merge().rows,
            [
                [0,0,0,0,0,0],
                [0,0,1,0,0,0],
                [0,0,1,1,0,0],
                [0,0,1,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0]
            ]
        );
    });

}