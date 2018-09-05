import _ from "lodash";

export class Assert {

    _asserts: Array<[boolean, string]>;
    _hasFailures: boolean;

    constructor() {
        this._asserts = [];
        this._hasFailures = false;
    }

    ok(f: () => boolean, message?: string) {
        this._addResult(!f(), message || "expected true");
    }

    equals<A>(f: () => A, expected: A, message?: string) {
        const actual = f();
        this._addResult(
            _.isEqual(actual, expected),
            (message ? `"${message}", ` : "") + `actual: '${JSON.stringify(actual)}', expected: '${JSON.stringify(expected)}'`
        );
    }

    hasFailures(): boolean {
        return this._hasFailures;
    }

    get asserts(): Array<[boolean, string]> {
        return this._asserts;
    }

    _addResult(passed: boolean, message: string): void {
        this._asserts.push([passed, message]);
        this._hasFailures = this._hasFailures || !passed;
    }

}