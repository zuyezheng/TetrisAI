import State from "functional/State.js";

test("should sequence", () => {
    expect(
        State.sequence([
            new State(s => ["first " + s, s + 1]),
            new State(s => ["second " + s, s + 2]),
            new State(s => ["third " + s, s * 3])
        ]).run(7)
    ).toEqual([["first 7", "second 8", "third 10"], 30]);
});