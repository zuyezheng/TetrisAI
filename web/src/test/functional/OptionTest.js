import type {Run} from "test/Run.js";
import {Option} from "functional/Option.js";

export function OptionTest(run: Run) {

    run("should map", (assert) => {
        assert.equals(() => Option.some(4).map(v => v * 3).getOrElse(() => null), 12);
    });

    run("should handle none", (assert) => {
        assert.equals(() => Option.none().map(v => v * 3).getOrElse(() => "foo"), "foo");
    });

    run("should flatMap", (assert) => {
        assert.equals(() =>
            Option.some(12).flatMap(v => Option.some(`foo ${v}`)).getOrElse(() => null),
            "foo 12"
        );
    });

    run("should filter", (assert) => {
        assert.equals(() => Option.some(4).filter(v => v >= 2).getOrElse(() => 1), 4, "allowed");
        assert.equals(() => Option.some(1).filter(v => v >= 2).getOrElse(() => 1), 1, "filtered");
    });

}