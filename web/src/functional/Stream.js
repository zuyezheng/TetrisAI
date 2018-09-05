import {Pattern} from "functional/Pattern.js";
import {TuplePattern} from "functional/TuplePattern.js";

/**
 * Functional lazy evaluated and possibly infinite stream.
 *
 * @author zuye.zheng
 */
export class Stream<A> {

    _head: (() => A) | void;
    _tail: (() => Stream<A>) | void;

    static of<A>(as: Array<A>): Stream<A> {
        if (as.length === 0) return Stream.empty();

        const head = as.splice(0, 1)[0];
        return new Stream(() => head, () => Stream.of(as.slice()))
    }

    static empty<A>(): Stream<A> {
        return new Stream(undefined, undefined);
    }

    constructor(head?: () => A, tail?: () => Stream<A>) {
        this._head = head;
        this._tail = tail;
    }

    foldRight<B>(acc: () => B, f: (A, () => B) => B): B {
        return PATTERN
            .case("head :: tail", ({head, tail}) => f(head(), () => tail().foldRight(acc, f)))
            .case("_", acc)
            .match(this)
    }

    toArray(): Array<A> {
        return this.foldRight(() => [], (v, acc) => {
            return [v].concat(acc());
        });
    }

    zipWith<B, C>(s: Stream<B>, f: (A, B) => C): Stream<C> {
        return new TuplePattern(PATTERN, PATTERN)
            .case("h1::t1, h2::t2", ({h1, t1, h2, t2}) =>
                new Stream(() => f(h1(), h2()), () => t1().zipWith(t2(), f))
            )
            .case("_, _", () => Stream.empty())
            .match(this, s)
    }

}

const PATTERN = new Pattern(["_head", "_tail"]);