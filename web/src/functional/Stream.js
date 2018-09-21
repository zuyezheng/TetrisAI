import CaseClass from 'functional/CaseClass.js';
import Pattern from 'functional/Pattern.js';
import Tuple from 'functional/Tuple.js'

/**
 * Functional lazy evaluated and possibly infinite stream.
 *
 * @author zuye.zheng
 */
export class Stream<A> extends CaseClass {

    static C_ARGS = ['_head', '_tail'];

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
        super();
        this._head = head;
        this._tail = tail;
    }

    foldRight<B>(acc: () => B, f: (A, () => B) => B): B {
        return Pattern
            .case(Stream.u('head', 'tail'), ({head, tail}) => f(head(), () => tail().foldRight(acc, f)))
            .case(Pattern._, acc)
            .match(this)
    }

    toArray(): Array<A> {
        return this.foldRight(() => [], (v, acc) => {
            return [v].concat(acc());
        });
    }

    zipWith<B, C>(s: Stream<B>, f: (A, B) => C): Stream<C> {
        return Pattern
            .case(Tuple.u(Stream.u('h1', 't1'), Stream.u('h2', 't2')), ({h1, t1, h2, t2}) =>
                new Stream(() => f(h1(), h2()), () => t1().zipWith(t2(), f))
            )
            .case(Pattern._, () => Stream.empty())
            .match(new Tuple(this, s))
    }

}
