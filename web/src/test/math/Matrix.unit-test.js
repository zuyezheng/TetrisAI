import Matrix from 'math/Matrix.js';
import TransformationMatrix from 'math/TransformationMatrix.js';
import MatrixMultiply from 'math/MatrixMultiply.js';

test("should fill", () => {
    expect(Matrix.fill(3, 3, 1).rows).toEqual(
        [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ]
    );
});

test("should set", () => {
    expect(Matrix.fill(3, 3, 1).set(Matrix.fill(2, 2, 2), 1, 1).rows).toEqual(
        [
            [1, 1, 1],
            [1, 2, 2],
            [1, 2, 2]
        ]
    );
});

test("should be immutable", () => {
    const mOrig = Matrix.fill(3, 3, 1);
    const mChanged = mOrig.set(Matrix.fill(2, 2, 2), 1, 1);

    expect(mOrig.rows).toEqual(
        [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ]
    );
    expect(mChanged.rows).toEqual(
        [
            [1, 1, 1],
            [1, 2, 2],
            [1, 2, 2]
        ]
    );
});

test("should multiply", () => {
    expect(
        new Matrix([
            [1, 2],
            [3, 4],
            [5, 6]
        ]).multiply(new Matrix([
            [2, 0],
            [1, 1]
        ])).rows
    ).toEqual(
        [
            [4, 2],
            [10, 4],
            [16, 6]
        ]
    );
});

test("should multiply with kernal", () => {
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

    expect(kernal.multiply(m1, m2)).toEqual(m1.multiply(m2));
});

test("should rotate", () => {
    const m = new Matrix([
        [1, 0],
        [0, 1],
        [1, 1],
        [2, 1]
    ]);

    expect(m.multiply(TransformationMatrix.rotation(90)).map(Math.round).rows).toEqual(
        [
            [0, -1],
            [1, 0],
            [1, -1],
            [1, -2]
        ]
    );
});

test("should clip", () => {
    const m = new Matrix([
        [1, 0],
        [0, 1],
        [1, 1],
        [2, 1]
    ]);

    expect(m.clipRows(0).rows).toEqual([[1,0],[0,1],[1,1],[2,1]]);
    expect(m.clipRows(1).rows).toEqual([[0,1],[1,1],[2,1]]);
    expect(m.clipRows(2).rows).toEqual([[1,1],[2,1]]);
    expect(m.clipRows(3).rows).toEqual([[2,1]]);
});