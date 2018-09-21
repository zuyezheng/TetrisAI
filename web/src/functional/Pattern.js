import type {Check, CheckableValue, CheckReturn} from 'functional/CaseClass.js'

type CaseBranch<A> = (Object) => A;

/**
 * Define a pattern matching case statement.
 *
 * @author zuye.zheng
 */
export default class Pattern<A> {

    static v(value: mixed): Check {
        return (v: CheckableValue) => value === v;
    }

    static _(): CheckReturn {
        return true;
    }

    static n(v: CheckableValue) {
        return v == null;
    }

    static case(matcher: Check, f: CaseBranch<A>): Pattern<A> {
        return new Pattern().case(matcher, f);
    }

    _cases: Array<[Check, CaseBranch<A>]>;

    constructor() {
        this._cases = [];
    }

    case(matcher: Check, f: CaseBranch<A>): Pattern<A> {
        this._cases.push([matcher, f]);

        return this;
    }

    match(value: CheckableValue): A {
        let executed = null;
        this._cases.find((curCase) => {
            const matched = curCase[0](value);
            if (typeof matched === 'boolean') {
                if (matched) executed = curCase[1]({});
                return matched;
            } else {
                executed = curCase[1](matched);
                return true;
            }
        });

        if (executed == null) throw new Error('Inexhaustive match.');
        return executed;
    }

}