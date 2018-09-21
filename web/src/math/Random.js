import State from "functional/State.js";

/**
 * Functionally pure (immutable) random number generator.
 */
export default class Random {

    static Generator: Random.Generator;

    static generator(seed: number): Random.Generator {
        return new Random.Generator(seed);
    }

    static int(): State<number, Random.Generator> {
        return new State(generator => generator.nextInt())
    }

    static float(): State<number, Random.Generator> {
        return Random.int().map(v => (v - 1)/Random.Generator.max());
    }

    static intBetween(min: number, max: number): State<number, Random.Generator> {
        return Random.float().map(v => Math.round(v * (max - min) + min))
    }

}

/**
 * Park-Miller-Carta Pseudo-Random Number Generator.
 */
Random.Generator = class Generator {

    _seed: number;

    static max(): number {
        return 2147483646;
    }

    constructor(seed: number) {
        this._seed = seed % (Random.Generator.max() + 1);
        if (this._seed <= 0) this._seed += Random.Generator.max();
    }

    nextInt(): [number, Generator] {
        const nextSeed = this._seed * 16807 % (Random.Generator.max() + 1);
        return [nextSeed, new Random.Generator(nextSeed)];
    }

};