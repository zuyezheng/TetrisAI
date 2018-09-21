import {Stream} from "functional/Stream.js";

test("should toArray", () => {
    expect(Stream.of([1, 2, 3]).toArray()).toEqual([1, 2, 3]);
});

test("should zipWith", () => {
    expect(
        Stream.of([1, 2, 3])
            .zipWith(Stream.of([4, 5, 6]), (a, b) => a + b)
            .toArray()
    ).toEqual([5, 7, 9]);
});