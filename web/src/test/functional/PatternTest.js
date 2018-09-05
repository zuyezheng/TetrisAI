import type {Run} from "test/Run.js";
import {Pattern} from "functional/Pattern.js";
import {TuplePattern} from "functional/TuplePattern.js";

export function PatternTest(run: Run) {

    run("should tuple pattern", (assert) => {
        assert.equals(() =>
                new TuplePattern(Foo.PATTERN, Foo.PATTERN)
                    .case("v1_1::v2_1, v1_2::v2_2", (parameters) => parameters)
                    .match(new Foo("a", "b"), new Foo("c", "d")),
            {"v1_1": "a", "v2_1": "b", "v1_2": "c", "v2_2": "d"},
            "full match"
        );

        assert.equals(() =>
            new TuplePattern(Foo.PATTERN, Foo.PATTERN)
                .case("v1_1::v2_1, v1_2::v2_2", (parameters) => ["full", parameters])
                .case("v1_1::v2_1, _::v2_2", (parameters) => ["partial", parameters])
                .match(new Foo("a", "b"), new Foo(null, "d")),
            ["partial", {"v1_1": "a", "v2_1": "b", "v2_2": "d"}],
            "partial match"
        );
    });

}

class Foo {

    static PATTERN: Pattern<Foo>;

    _v1: string | null;
    _v2: string;

    constructor(v1: string | null, v2: string) {
        this._v1 = v1;
        this._v2 = v2;
    }

}

Foo.PATTERN = new Pattern(["_v1", "_v2"]);