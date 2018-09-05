import type {Run} from "test/Run.js";
import {Random} from "math/Random.js";
import {State} from "functional/State.js";

export function RandomTest(run: Run) {

    run("should random", (assert) => {
        const generator = Random.generator(1);
        assert.equals(
            () =>  [
                Random.int().run(generator)[0],
                Random.int().run(generator)[0]
            ],
            [16807, 16807]
        );
    });

    run("should sequence", (assert) => {
        assert.equals(
            () => State.sequence([
                Random.int(),
                Random.float(),
                Random.int()
            ]).run(Random.generator(1))[0],
            [16807, 0.13153778773875702, 1622650073]
        );
    });

    run("should between", (assert) => {
        assert.equals(
            () => State.repeat(Random.intBetween(3, 10), 10).run(Random.generator(1))[0],
            [3, 4, 8, 6, 7, 5, 3, 8, 8, 10]
        );
    });

}