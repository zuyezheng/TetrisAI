import Enum from "lang/Enum.js";

class E1 extends Enum<E1> {
    static A: E1;
    static B: E1;
    static C: E1;
}
Enum.add(E1, new E1(), "A")
    .add(E1, new E1(), "B")
    .add(E1, new E1(), "C")
    .finish(E1);

class E2 extends Enum<E2> {
    static D: E2;
    static E: E2;
    static F: E2;
}
Enum.add(E2, new E2(), "D")
    .add(E2, new E2(), "E")
    .add(E2, new E2(), "F")
    .finish(E2);

test("should enum", () => {
    expect(Array.from(E1)).toEqual([E1.A, E1.B, E1.C]);
    expect(Array.from(E2)).toEqual([E2.D, E2.E, E2.F]);
});

test("should ordinal", () => {
    expect(Array.from(E1).map(e => e ? e.ordinal : null)).toEqual([0, 1, 2]);
});

test("should fromName", () => {
    expect(E1.fromName("B")).toEqual(E1.B);
});
