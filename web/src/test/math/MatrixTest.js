import type {Run} from "test/Run.js";
import {Matrix} from "math/Matrix.js";
import {MatrixMultiply} from "math/MatrixMultiply.js";
import {TransformationMatrix} from "math/TransformationMatrix.js";

export function MatrixTest(run: Run) {

    run("should fill", (assert) => {
        assert.equals(
            () => Matrix.fill(3, 3, 1).rows,
            [
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1]
            ]
        );
    });

    run("should set", (assert) => {
        assert.equals(
            () => Matrix.fill(3, 3, 1)
                .set(Matrix.fill(2, 2, 2), 1, 1)
                .rows,
            [
                [1, 1, 1],
                [1, 2, 2],
                [1, 2, 2]
            ]
        );
    });

    run("should be immutable", (assert) => {
        const mOrig = Matrix.fill(3, 3, 1);
        const mChanged = mOrig.set(Matrix.fill(2, 2, 2), 1, 1);

        assert.equals(
            () => mOrig.rows,
            [
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1]
            ]
        );
        assert.equals(
            () => mChanged.rows,
            [
                [1, 1, 1],
                [1, 2, 2],
                [1, 2, 2]
            ]
        );
    });

    run("should multiply", (assert) => {
        assert.equals(
            () => new Matrix([
                    [1, 2],
                    [3, 4],
                    [5, 6]
                ]).multiply(new Matrix([
                    [2, 0],
                    [1, 1]
                ])).rows
            ,
            [
                [4, 2],
                [10, 4],
                [16, 6]
            ]
        );
    });

    run("should multiply with kernal", (assert) => {
        const m1 = new Matrix([
            [1, 2],
            [3, 4],
            [5, 6]
        ]);
        const m2 = new Matrix([
            [2, 0],
            [1, 1]
        ]);
        const kernal = new MatrixMultiply(m1.dim, m2.dim);

        assert.equals(
            () => kernal.multiply(m1, m2),
            m1.multiply(m2)
        );
    });

    run("should rotate", (assert) => {
        const m = new Matrix([
            [1, 0],
            [0, 1],
            [1, 1],
            [2, 1]
        ]);

        assert.equals(
            () => m.multiply(TransformationMatrix.rotation(90)).map(Math.round).rows,
            [
                [0, -1],
                [1, 0],
                [1, -1],
                [1, -2]
            ]
        );
    });

    run("should clip", (assert) => {
        const m = new Matrix([
            [1, 0],
            [0, 1],
            [1, 1],
            [2, 1]
        ]);

        assert.equals(() => m.clipRows(0).rows, [[1,0],[0,1],[1,1],[2,1]]);
        assert.equals(() => m.clipRows(1).rows, [[0,1],[1,1],[2,1]]);
        assert.equals(() => m.clipRows(2).rows, [[1,1],[2,1]]);
        assert.equals(() => m.clipRows(3).rows, [[2,1]]);
    });

}