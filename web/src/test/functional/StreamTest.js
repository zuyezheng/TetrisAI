import type {Run} from "test/Run.js";
import {Stream} from "functional/Stream.js";

export function StreamTest(run: Run) {

    run("should toArray", (assert) => {
        assert.equals(() => Stream.of([1, 2, 3]).toArray(), [1, 2, 3]);
    });

    run("should zipWith", (assert) => {
        assert.equals(() => Stream.of([1, 2, 3])
            .zipWith(Stream.of([4, 5, 6]), (a, b) => a + b)
            .toArray(),
            [5, 7, 9]
        )
    })

}