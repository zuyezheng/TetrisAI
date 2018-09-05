import type {Run} from "test/Run.js";
import {Enum} from "lang/Enum.js";

export function EnumTest(run: Run) {

    class E1 extends Enum<E1> {
        static A: E1;
        static B: E1;
        static C: E1;
    }
    Enum.add(E1, new E1(), "A")
        .add(E1, new E1(), "B")
        .add(E1, new E1(), "C")
        .finish(E1);

    class E2 extends Enum<E2> {
        static D: E2;
        static E: E2;
        static F: E2;
    }
    Enum.add(E2, new E2(), "D")
        .add(E2, new E2(), "E")
        .add(E2, new E2(), "F")
        .finish(E2);

    run("should enum", (assert) => {
        assert.equals(() => Array.from(E1), [E1.A, E1.B, E1.C]);
        assert.equals(() => Array.from(E2), [E2.D, E2.E, E2.F]);
    });

    run("should ordinal", (assert) => {
        assert.equals(() => Array.from(E1).map(e => e ? e.ordinal : null), [0, 1, 2]);
    });

    run("should fromName", (assert) => {
        assert.equals(() => E1.fromName("B"), E1.B);
    });

}