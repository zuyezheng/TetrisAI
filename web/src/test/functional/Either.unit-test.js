import Either from 'functional/Either.js';

/**
 * parseInt is a good example since in the normal implementation we would need NaN handling for parse errors spread
 * throughout our code and figure out what to do with them.
 */
function parseInt(v: string): Either<string, number> {
    const parsed = Number.parseInt(v);
    if (Number.isNaN(parsed)) {
        return Either.left(v);
    }

    return Either.right(parsed);
}

test('should map', () => {
    // we can now write simple functions that only handles the happy path and bubble error handling higher
    const times2 = (v) => v * 2;
    expect(
        parseInt('10')
            .map(times2)
            .getOrElse(() => -1)
    ).toEqual(20);
    expect(
        parseInt('foo')
            .map(times2)
            .getOrElse(() => -1)
    ).toEqual(-1);
});

test('should fold', () => {
    const isaNumber = (s: string) => parseInt(s).fold((v) => `${v} is not a number`, (v) => `${v} is a number`);
    expect(isaNumber('10')).toEqual('10 is a number');
    expect(isaNumber('foo')).toEqual('foo is not a number');
});
