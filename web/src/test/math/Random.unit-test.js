import Random from "math/Random.js";
import State from "functional/State.js";

test("should random", () => {
    const generator = Random.generator(1);
    expect([
        Random.int().run(generator)[0],
        Random.int().run(generator)[0]
    ]).toEqual([16807, 16807]);
});

test("should sequence", () => {
    expect(
        State.sequence([
            Random.int(),
            Random.float(),
            Random.int()
        ]).run(Random.generator(1))[0]
    ).toEqual([16807, 0.13153778773875702, 1622650073]);
});

test("should between", () => {
    expect(State.repeat(Random.intBetween(3, 10), 10).run(Random.generator(1))[0]).toEqual(
        [3, 4, 8, 6, 7, 5, 3, 8, 8, 10]
    );
});
