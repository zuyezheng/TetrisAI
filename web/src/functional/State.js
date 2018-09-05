export class State<A, S> {

    run: S => [A, S];

    static unit<A, S>(a: A): State<A, S> {
        return new State(s => [a, s]);
    }

    static sequence<A, S>(states: Array<State<A, S>>): State<Array<A>, S> {
        return states.reduceRight((acc, state) => {
            return state.map2(acc, (a, b) => [a].concat(b))
        }, State.unit([]));
    }

    static repeat<A, S>(state: State<A, S>, n: number): State<Array<A>, S> {
        return State.sequence(new Array(n).fill(state));
    }

    static get<S, S>(): State<S, S> {
        return new State(s => [s, s]);
    }

    constructor(run: S => [A, S]) {
        this.run = s => {
            const [a, s1] = run(s);
            return [a, s1]
        }
    }

    flatMap<B>(f: A => State<B, S>): State<B, S> {
        return new State(s => {
            const [a, s1] = this.run(s);
            return f(a).run(s1);
        });
    }

    map<B>(f: A => B): State<B, S> {
        return this.flatMap(a => State.unit(f(a)))
    }

    map2<B, C>(s: State<B, S>, f: (A, B) => C): State<C, S> {
        return this.flatMap(a => s.map(b => f(a, b)));
    }

    /**
     * Use the ran value as the new state.
     */
    transfer<B>(state: State<B, A>): State<B, S> {
        return new State(s => {
            const [a, s1] = this.run(s);
            return [state.run(a)[0], s1];
        })
    }

}