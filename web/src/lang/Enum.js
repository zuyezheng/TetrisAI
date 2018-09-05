/**
 * Flow typed implementation of Java-esque enum.
 *
 * class E1 extends Enum<E1> {
 *     static A: E1;
 *     static B: E1;
 *     static C: E1;
 * }
 * Enum.add(E1, new E1(), "A")
 *     .add(E1, new E1(), "B")
 *     .add(E1, new E1(), "C")
 *     .finish(E1);
 * 
 * @author zuye.zheng
 */
export class Enum<A> {

    static _NAME_TO_ENUM: Map<string, A>;
    static _CODE_TO_ENUM: Map<string, A>;

    static add<A, B: Enum<A>>(Clazz: Class<B>, e: A, name: string, code?: string): Class<B> {
        if (Clazz._NAME_TO_ENUM == null) Clazz._NAME_TO_ENUM = new Map();
        Clazz._NAME_TO_ENUM.set(name, e);

        if (code !== undefined) {
            if (Clazz._CODE_TO_ENUM == null) Clazz._CODE_TO_ENUM = new Map();
            Clazz._CODE_TO_ENUM.set(code, e);
            Object.defineProperty(Clazz[name], "_code", {value: code});
        }

        Object.defineProperty(Clazz, name, {value: e});
        Object.defineProperties(Clazz[name], {
            "_name": {
                value: name,
                enumerable: true
            },
            "_ordinal": {
                value: Clazz._NAME_TO_ENUM.size - 1,
                enumerable: true
            }
        });

        return Clazz;
    }

    static finish<A, B: Enum<A>>(Clazz: Class<B>): Class<B> {
        return Object.freeze(Clazz);
    }

    static fromName(name: string): A | void {
        return this._NAME_TO_ENUM.get(name);
    }

    static fromCode(code: string): A | void {
        return this._CODE_TO_ENUM.get(code);
    }

    // $FlowFixMe
    static [Symbol.iterator]() {
        return this._NAME_TO_ENUM.values();
    }

    _name: string;
    _ordinal: number;
    _code: ?string;

    get name(): string {
        return this._name;
    }

    get ordinal(): number {
        return this._ordinal;
    }

    get code(): ?string {
        return this._code;
    }

}