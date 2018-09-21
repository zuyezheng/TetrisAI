import CaseClass from 'functional/CaseClass.js';
import Pattern from 'functional/Pattern.js';

/**
 * @author zuye.zheng
 */
export default class Either<A, B> extends CaseClass {

    static C_ARGS = ['value'];

    static left(v: A): Either<A, any> {
        return new Left(v);
    }

    static right(v: B): Either<any, B> {
        return new Right(v);
    }

    fold<C>(fA: (A) => C, fB: (B) => C): C {
        return Pattern.case(Left.u('v'), ({v}) => fA(v))
            .case(Right.u('v'), ({v}) => fB(v))
            .match(this);
    }

    swap(): Either<B, A> {
        return Pattern.case(Left.u('v'), ({v}) => new Right(v))
            .case(Right.u('v'), ({v}) => new Left(v))
            .match(this);
    }

    map<C>(f: (B) => C): Either<A, C> {
        return Pattern.case(Right.u('v'), ({v}) => new Right(f(v)))
            .case(Left.u('v'), ({v}) => new Left(v))
            .match(this);
    }

    flatMap<C>(f: (B) => Either<A, C>): Either<A, C> {
        return Pattern.case(Right.u('v'), ({v}) => f(v))
            .case(Left.u('v'), ({v}) => new Left(v))
            .match(this);
    }

    getOrElse(f: () => B): B {
        return Pattern.case(Right.u('v'), ({v}) => v)
            .case(Pattern._, () => f())
            .match(this);
    }

}

class Left<A> extends Either<A, any> {
    +value: A;

    constructor(value: A) {
        super();

        this.value = value;
    }
}

class Right<B> extends Either<any, B> {
    +value: B;

    constructor(value: B) {
        super();

        this.value = value;
    }
}
