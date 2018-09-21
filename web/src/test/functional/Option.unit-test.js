import Option from "functional/Option.js";

test("should map", () => {
    expect(Option.some(4).map(v => v * 3).getOrElse(() => null)).toEqual(12);
});

test("should handle none", () => {
    expect(Option.none().map(v => v * 3).getOrElse(() => "foo")).toEqual("foo");
});

test("should flatMap", () => {
    expect(Option.some(12).flatMap(v => Option.some(`foo ${v}`)).getOrElse(() => null)).toEqual("foo 12");
});

test("should filter", () => {
    expect(Option.some(4).filter(v => v >= 2).getOrElse(() => 1)).toEqual(4);
    expect(Option.some(1).filter(v => v >= 2).getOrElse(() => 1)).toEqual(1);
});