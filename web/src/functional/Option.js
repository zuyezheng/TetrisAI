import {Pattern} from "functional/Pattern.js";

/**
 * @author zuye.zheng
 */
export class Option<A> {

    _value: A | void;

    static none<B>(): Option<B> {
        return new Option(undefined);
    }

    static some<A>(value: A): Option<A> {
        return new Option(value);
    }

    constructor(value?: A) {
        this._value = value;
    }

    getOrElse(other: () => A): A {
        return PATTERN
            .case("v", ({v}) => v)
            .case("_", () => other())
            .match(this);
    }

    orElse(other: () => Option<A>): Option<A> {
        return PATTERN
            .case("v", () => this)
            .case("_", () => other())
            .match(this);
    }

    flatMap<B>(f: A => Option<B>): Option<B> {
        return PATTERN
            .case("v", ({v}) => f(v))
            .case("_", () => Option.none())
            .match(this);
    }

    map<B>(f: A => B): Option<B> {
        return PATTERN
            .case("v", ({v}) => Option.some(f(v)))
            .case("_", () => Option.none())
            .match(this);
    }

    filter(f: A => boolean): Option<A> {
        return PATTERN
            .case("v", ({v}) => f(v) ? this : Option.none())
            .case("_", () => Option.none())
            .match(this);
    }

    isEmpty(): boolean {
        return this._value == null;
    }

}

const PATTERN = new Pattern(["_value"]);