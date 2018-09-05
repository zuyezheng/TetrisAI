import type {Run} from "test/Run.js";

import {Option} from "functional/Option.js";
import {TetrisPiece} from "tetris/TetrisPiece.js";
import {TetrisBoard} from "tetris/TetrisBoard.js";
import {Matrix} from "math/Matrix.js";

export function TetrisBoardTest(run: Run) {

    run("should canPlace", (assert) => {
        const board = new TetrisBoard(
            new Matrix([
                [0, 0, 1, 1],
                [0, 0, 0, 1],
                [0, 0, 0, 0],
                [0, 1, 1, 0]
            ]),
            Option.none(), 0, false
        );

        assert.equals(() => board.canPlace(new TetrisPiece(1, 0), {row: 0, col: 0}), true);
        assert.equals(() => board.canPlace(new TetrisPiece(5, 0), {row: 0, col: 1}), true);
        assert.equals(() => board.canPlace(new TetrisPiece(1, 0), {row: 0, col: 1}), false);
        assert.equals(() => board.canPlace(new TetrisPiece(5, 0), {row: 0, col: 2}), false);
        assert.equals(() => board.canPlace(new TetrisPiece(1, 0), {row: 0, col: 3}), false);
    });

    run("should canPlace with clip", (assert) => {
        const board = new TetrisBoard(
            new Matrix([
                [0, 0, 0, 1],
                [0, 0, 1, 1],
                [0, 1, 1, 1],
                [1, 1, 1, 1]
            ]),
            Option.none(), 0, false
        );

        assert.equals(() => board.canPlace(new TetrisPiece(2, 0), {row: -3, col: 2}), true);
        assert.equals(() => board.canPlace(new TetrisPiece(2, 0), {row: -2, col: 2}), false);

        assert.equals(() => board.canPlace(new TetrisPiece(2, 0), {row: -3, col: 1}), true);
        assert.equals(() => board.canPlace(new TetrisPiece(2, 0), {row: -2, col: 1}), true);
        assert.equals(() => board.canPlace(new TetrisPiece(2, 0), {row: -1, col: 1}), false);
    });

    run("should mergeAndClear", (assert) => {
        assert.equals(
            () => new TetrisBoard(
                new Matrix([
                    [0, 0, 0, 1],
                    [0, 0, 1, 1],
                    [1, 1, 1, 1],
                    [1, 1, 1, 1]
                ]),
                Option.none(), 0, false
            ).mergeAndClear()[0].rows,
            [
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,1],
                [0,0,1,1]
            ]
        );
        assert.equals(
            () => new TetrisBoard(
                new Matrix([
                    [1, 1, 1, 1],
                    [1, 1, 1, 1],
                    [1, 1, 1, 1],
                    [1, 1, 1, 1]
                ]),
                Option.none(), 0, false
            ).mergeAndClear()[0].rows,
            [
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]
            ]
        );
        assert.equals(
            () => new TetrisBoard(
                new Matrix([
                    [0, 0, 0, 1],
                    [0, 0, 1, 1],
                    [1, 0, 1, 1],
                    [1, 1, 0, 1]
                ]),
                Option.none(), 0, false
            ).mergeAndClear()[0].rows,
            [
                [0,0,0,1],
                [0,0,1,1],
                [1,0,1,1],
                [1,1,0,1]
            ]
        );
    });

}