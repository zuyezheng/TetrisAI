/**
 * Poor-mans scala-esque pattern matcher. Current form mostly useful for handling nulls more elegantly.
 *
 * @author zuye.zheng
 */
export class Pattern<A> {

    _named: Array<string>;

    constructor(named: Array<string>) {
        this._named = named;
    }

    get(i: number): string {
        return this._named[i];
    }

    case<B>(match: string, f: Object => B): Cases<A, B> {
        return new Cases(this).case(match, f);
    }

}

export class Cases<A, B> {

    _pattern: Pattern<A>;
    _cases: Array<Case<A, B>>;

    constructor(pattern: Pattern<A>) {
        this._pattern = pattern;
        this._cases = [];
    }

    case(match: string, f: Object => B): Cases<A, B> {
        const matchParsed = match.split("::").map(v => v.trim());
        this._cases.push(new Case(this._pattern, matchParsed, f));

        return this;
    }

    get cases(): Array<Case<A, B>> {
        return this._cases;
    }

    match(v: A): B {
        let parameters = {};
        const matchedCase = this._cases.find((match) => {
            const result = match.test(v);
            parameters = result[1];
            return result[0]
        });

        if (matchedCase == null) throw new Error("Inexhaustive match.");
        return matchedCase.f(parameters)
    }

}

export class Case<A, B> {

    _pattern: Pattern<A>;
    _match: Array<string>;
    _f: Object => B;

    constructor(pattern: Pattern<A>, match: Array<string>, f: Object => B) {
        this._pattern = pattern;
        this._match = match;
        this._f = f;
    }

    get f(): Object => B {
        return this._f;
    }

    /**
     * Test if a given instance of A matches the pattern.
     */
    test(v: A): [boolean, Object] {
        const parameters = {};

        const matched = this._match.reduce(([acc, i], part) => {
            if (!acc) return [false, -1];

            if (part === "_") {
                return [true, i + 1];
            } else {
                // $FlowFixMe
                const partVal = v[this._pattern.get(i)];
                if (partVal != null) {
                    parameters[part] = partVal;
                    return [true, i + 1];
                }
            }

            return [false, -1]
        }, [true, 0])[0];

        return [matched, matched ? parameters : {}];
    }

}