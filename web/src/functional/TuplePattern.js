import {List} from "functional/List.js";
import {Pattern, Cases} from "functional/Pattern.js";

/**
 * Pattern matcher for tuples. Would be easy to extend to >2uples if flow types ignored or all elements were of the same
 * type.
 *
 * @author zuye.zheng
 */
export class TuplePattern<A, B> {

    _patternA: Pattern<A>;
    _patternB: Pattern<B>;

    constructor(patternA: Pattern<A>, patternB: Pattern<B>) {
        this._patternA = patternA;
        this._patternB = patternB;
    }

    get a(): Pattern<A> {
        return this._patternA;
    }

    get b(): Pattern<B> {
        return this._patternB;
    }

    case<C>(match: string, f: Object => C): TupleCases<A, B, C> {
        return new TupleCases(this).case(match, f);
    }

}

export class TupleCases<A, B, C> {

    _pattern: TuplePattern<A, B>;
    _casesA: Cases<A, null>;
    _casesB: Cases<B, null>;
    _fs: Array<Object => C>;

    constructor(pattern: TuplePattern<A, B>) {
        this._pattern = pattern;
        this._casesA = new Cases(this._pattern.a);
        this._casesB = new Cases(this._pattern.b);
        this._fs = [];
    }

    case(match: string, f: Object => C): TupleCases<A, B, C> {
        const matchParsed = match.split(",").map(v => v.trim());

        this._casesA.case(matchParsed[0], () => null);
        this._casesB.case(matchParsed[1], () => null);
        this._fs.push(f);

        return this;
    }

    match(vA: A, vB: B): C {
        let parameters = {};
        const matchedIndex = List.findIndexWith(this._casesA.cases, this._casesB.cases, (caseA, caseB) => {
            return [caseA.test(vA), caseB.test(vB)].reduce(([previousMatched, previousParams], [matched, params]) => {
                if (!(previousMatched && matched)) return [false, {}];

                parameters = Object.assign({}, previousParams, params);
                return [true, parameters];
            })[0];
        });

        if (matchedIndex == null) throw new Error("Inexhaustive match.");
        return this._fs[matchedIndex](parameters)
    }

}