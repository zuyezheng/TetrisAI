import CaseClass from 'functional/CaseClass.js';
import Pattern from 'functional/Pattern.js';

class Foo extends CaseClass {

    // only do it if it is a left
    left(f: (string, string) => string): string {
        return Pattern.case(Left.u('a', 'b'), ({a, b}) => f(a, b))
            .case(Pattern._, () => '')
            .match(this);
    }

    // only do it if it is a right
    right(f: (string, string) => string): string {
        return Pattern.case(Right.u('b', 'c'), ({b, c}) => f(b, c))
            .case(Pattern._, () => '')
            .match(this);
    }

}

class Left extends Foo {
    static C_ARGS = ['a', 'b'];

    +a: string;
    +b: string | Right;

    constructor(a: string, b: string | Right) {
        super();
        this.a = a;
        this.b = b;
    }
}

class Right extends Foo {

    static C_ARGS = ['b', 'c'];

    +b: string;
    +c: string;

    constructor(b: string, c: string) {
        super();
        this.b = b;
        this.c = c;
    }

}

test('unapplies', () => {
    expect(Left.u('x', 'y')(new Right('foo', 'bar'))).toEqual(false);
    expect(Left.u('x', 'y')(new Left('foo', 'bar'))).toEqual({x: 'foo', y: 'bar'});
});

test('unapplies wildcards', () => {
    expect(Right.u(Pattern._, 'y')(new Right('foo', 'bar'))).toEqual({y: 'bar'});
});

test('unapplies values', () => {
    expect(Right.u(Pattern.v('foo'), 'y')(new Right('foo', 'bar'))).toEqual({y: 'bar'});
    expect(Right.u('x', Pattern.v('foo'))(new Right('foo', 'bar'))).toEqual(false);
});

test('unapplies nulls', () => {
    expect(Right.u('x', 'y')(new Right(null, 'bar'))).toEqual(false);
    expect(Right.u('x', 'y')(new Right(null, null))).toEqual(false);
    expect(Left.u('x', Right.u('y', 'z'))(new Left('foo', null))).toEqual(false);
    expect(Left.u('x', Right.u('y', 'z'))(new Left('foo', new Right(null, "bar")))).toEqual(false);
});

test('unapplies nested', () => {
    expect(Left.u('x', Right.u('y', 'z'))(new Left('foo', new Right('bar', 'chu')))).toEqual({
        x: 'foo',
        y: 'bar',
        z: 'chu'
    });
    expect(Left.u('x', Right.u(Pattern._, 'z'))(new Left('foo', new Right('bar', 'chu')))).toEqual({x: 'foo', z: 'chu'});
});

/**
 * Primitives should work but not really flow safe.
 */
test('matches primitives', () => {
    const pattern = Pattern.case(Left.u('x', Pattern.v('bar')), ({x}) => x)
        .case(Pattern.v('bar'), () => 1)
        .case(Pattern.v('foo'), () => 2)
        .case(Pattern._, () => 3);

    // $FlowFixMe
    expect(pattern.match('bar')).toEqual(1);
    // $FlowFixMe
    expect(pattern.match('foo')).toEqual(2);
    // $FlowFixMe
    expect(pattern.match('hello')).toEqual(3);
});

test('matches case class', () => {
    const pattern = Pattern.case(Left.u('x', Pattern.v('bar')), ({x}) => x)
        .case(Right.u(Pattern.v('bar'), 'y'), ({y}) => y)
        .case(Pattern._, () => 'catch all');

    expect(pattern.match(new Right('foo', 'bar'))).toEqual('catch all');
    expect(pattern.match(new Left('foo', 'bar'))).toEqual('foo');
    expect(pattern.match(new Right('bar', 'chu'))).toEqual('chu');
});

test('class matches', () => {
    const leftConcat = (a, b) => a + ' ' + b;
    expect(new Right('foo', 'bar').left(leftConcat)).toEqual('');
    expect(new Left('foo', 'bar').left(leftConcat)).toEqual('foo bar');
});
