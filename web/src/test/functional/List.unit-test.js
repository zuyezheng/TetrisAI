import List from "functional/List.js";

test("should zipWith", () => {
    expect(List.zipWith([1, 2, 3], [4, 5, 6], (a, b) => a * b))
        .toEqual([4, 10, 18]);

    expect(List.zipWith([1, 2, 3], [4, 5], (a, b) => a * b))
        .toEqual([4, 10, NaN]);

    expect(List.zipWith([1, 2], [4, 5, 6], (a, b) => a * b))
        .toEqual([4, 10, NaN]);
});

test("should findIndexWith", () => {
    expect(List.findIndexWith([1, 2, 3], [4, 5, 6], (a, b) => a + b === 7)).toEqual(1)
});

test("should zipWithIterable", () => {
    const result = [];
    for(let c of List.zipWithIterable(count(3, 4), count(6, 4), (a, b) => a + b)) {
        result.push(c);
    }

    expect(result).toEqual([9, 11, 13, 15]);
});

test("should reduceWithIterable", () => {
    expect(List.reduceWithIterable(
            count(3, 4),
            count(6, 4),
            (a, b, acc) => {
                acc.push(a + b);
                return acc;
            },
            []
        )
    ).toEqual([9, 11, 13, 15]);
});

function *count(start:number, n: number): Generator<number, void, void> {
    for (let i=start; i<start + n; i++) {
        yield i;
    }
}