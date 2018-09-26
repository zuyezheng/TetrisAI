/**
 * Scala-esque case class with a static unapply (or just u) for pattern matching. Just define C_ARGS to match instance
 * variables available for extraction.
 *
 * @author zuye.zheng
 */
export default class CaseClass {

    static C_ARGS: Array<string>;

    static unapply(...args: Array<string | Check>): Check {
        return this.u(...args);
    }

    /**
     * Shorthand should be used most often, defining the real function here to save on a frame in the stack.
     */
    static u(...args: Array<string | Check>): Check {
        const Clazz = this;
        if(Clazz.C_ARGS.length !== args.length) throw new Error("Mismatched argument lengths.");

        return (v: CheckableValue): CheckReturn => {
            if (!(v instanceof this)) return false;

            const extracted = {};
            const matched = args.every((expected, i) => {
                if (typeof expected === 'string') {
                    // extraction
                    const val = v[Clazz.C_ARGS[i]];
                    if (val == null) {
                        return false;
                    } else {
                        extracted[expected] = val;
                        return true;
                    }
                } else {
                    // recursive extraction or scalar check
                    const checked = expected(v[Clazz.C_ARGS[i]]);
                    if (checked instanceof Object) Object.entries(checked).forEach((e) => (extracted[e[0]] = e[1]));
                    return !!checked;
                }
            });

            return matched ? extracted : false;
        }
    }

}

export type CheckReturn = boolean | Object;

export type CheckableValue = {[string]: CheckableValue};

export type Check = (v: CheckableValue) => CheckReturn;
