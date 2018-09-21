import CaseClass from 'functional/CaseClass.js';
import Pattern from 'functional/Pattern.js';

/**
 * @author zuye.zheng
 */
export default class Option<A> extends CaseClass {

    static none(): None<A> {
        return new None();
    }

    static some(value: A): Option<A> {
        return new Some(value);
    }

    getOrElse(other: () => A): A {
        return Pattern
            .case(Some.u('v'), ({v}) => v)
            .case(Pattern._, () => other())
            .match(this);
    }

    orElse(other: () => Option<A>): Option<A> {
        return Pattern
            .case(Some.u('v'), () => this)
            .case(Pattern._, () => other())
            .match(this);
    }

    flatMap<B>(f: A => Option<B>): Option<B> {
        return Pattern
            .case(Some.u('v'), ({v}) => f(v))
            .case(Pattern._, () => Option.none())
            .match(this);
    }

    map<B>(f: A => B): Option<B> {
        return Pattern
            .case(Some.u('v'), ({v}) => Option.some(f(v)))
            .case(Pattern._, () => Option.none())
            .match(this);
    }

    filter(f: A => boolean): Option<A> {
        return Pattern
            .case(Some.u('v'), ({v}) => f(v) ? this : Option.none())
            .case(Pattern._, () => Option.none())
            .match(this);
    }

    isEmpty(): boolean {
        return this instanceof None;
    }

}

class None<A> extends Option<A> {
    static C_ARGS = [];
}

class Some<A> extends Option<A> {

    static C_ARGS = ['value'];

    +value: A;

    constructor(value: A) {
        super();
        this.value = value;
    }

}