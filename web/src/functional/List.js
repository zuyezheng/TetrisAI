/**
 * Functional utilities on arrays and iterators/iterables.
 *
 * @author zuye.zheng
 */
export default class List {

    /**
     * Zip up 2 arrays into 1.
     */
    static zipWith<A, B, C>(lA: Array<A>, lB: Array<B>, f: (A, B) => C): Array<C> {
        if (lA.length >= lB.length) {
            return lA.map((vA, i) => f(vA, lB[i]));
        } else {
            return lB.map((vB, i) => f(lA[i], vB));
        }
    }

    /**
     * Zip up 2 iterables given f into a generator.
     */
    static *zipWithIterable<A, B, C>(iA: Iterator<A>, iB: Iterator<B>, f: (A, B) => C): Generator<C, void, void> {
        for (
            let aNext = iA.next(), bNext = iB.next();
            !aNext.done && !bNext.done;
            aNext = iA.next(), bNext = iB.next()
        ) {
            yield f(aNext.value, bNext.value);
        }
    }

    static reduceWithIterable<A, B, C>(iA: Iterator<A>, iB: Iterator<B>, f: (A, B, C) => C, acc: C): C {
        for (acc of List.zipWithIterable(iA, iB, (a, b) => f(a, b, acc))) {}
        return acc;
    }

    static findIndexWith<A, B, C>(lA: Array<A>, lB: Array<B>, f: (A, B) => boolean): number {
        if (lA.length >= lB.length) {
            return lA.findIndex((vA, i) => f(vA, lB[i]));
        } else {
            return lB.findIndex((vB, i) => f(lA[i], vB));
        }
    }

}