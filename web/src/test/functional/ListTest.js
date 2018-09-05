import type {Run} from "test/Run.js";
import {List} from "functional/List.js";

export function ListTest(run: Run) {

    run("should zipWith", (assert) => {
        assert.equals(
            () => List.zipWith([1, 2, 3], [4, 5, 6], (a, b) => a * b),
            [4, 10, 18]
        );

        assert.equals(
            () => List.zipWith([1, 2, 3], [4, 5], (a, b) => a * b),
            [4, 10, NaN],
            "list A is longer"
        );

        assert.equals(
            () => List.zipWith([1, 2], [4, 5, 6], (a, b) => a * b),
            [4, 10, NaN],
            "list B is longer"
        );
    });

    run("should findIndexWith", (assert) => {
        assert.equals(
            () => List.findIndexWith([1, 2, 3], [4, 5, 6], (a, b) => a + b === 7),
            1
        );
    });

    run("should zipWithIterable", (assert) => {
        const result = [];
        for(let c of List.zipWithIterable(count(3, 4), count(6, 4), (a, b) => a + b)) {
            result.push(c);
        }

        assert.equals(() => result, [9, 11, 13, 15]);
    });

    run("should reduceWithIterable", (assert) => {
        let foo = [];
        assert.equals(
            () => List.reduceWithIterable(
                count(3, 4),
                count(6, 4),
                (a, b, acc) => {
                    acc.push(a + b);
                    return acc;
                },
                []
            ),
            [9, 11, 13, 15]
        );
    });

}

function *count(start:number, n: number): Generator<number, void, void> {
    for (let i=start; i<start + n; i++) {
        yield i;
    }
}