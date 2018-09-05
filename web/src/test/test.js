import type {Run} from "test/Run.js";
import {Assert} from "test/Assert.js";

import {OptionTest} from "test/functional/OptionTest.js";
import {StreamTest} from "test/functional/StreamTest.js";
import {ListTest} from "test/functional/ListTest.js";
import {PatternTest} from "test/functional/PatternTest.js";
import {StateTest} from "test/functional/StateTest.js";

import {MatrixTest} from "test/math/MatrixTest.js";
import {RandomTest} from "test/math/RandomTest.js";

import {EnumTest} from "test/lang/EnumTest.js";

import {TetrisPieceTest} from "test/tetris/TetrisPieceTest.js";
import {TetrisBoardTest} from "test/tetris/TetrisBoardTest.js";
import {TetrisInputTest} from "test/tetris/TetrisInputTest.js";

function runModule(moduleName: string, module: (run: Run) => void) {
    module((name: string, f: (Assert) => void): void => {
        const assert = new Assert();
        f(assert);

        if (assert.hasFailures()) {
            console.warn(`%c✕ ${moduleName}: "${name}".`, "background: red; color: white");
        } else {
            console.log(`%c✔ ${moduleName}: "${name}".`, "background: green; color: white");
        }

        assert.asserts.forEach(([passed, message]) => {
            if (passed) {
                console.info(`\t- ✔ ${message}.`);
            } else {
                console.warn(`\t- ✕ ${message}.`);
            }
        });
    });
}

runModule("OptionTest", OptionTest);
runModule("StreamTest", StreamTest);
runModule("ListTest", ListTest);
runModule("PatternTest", PatternTest);
runModule("StateTest", StateTest);

runModule("MatrixTest", MatrixTest);
runModule("RandomTest", RandomTest);

runModule("EnumTest", EnumTest);

runModule("TetrisPieceTest", TetrisPieceTest);
runModule("TetrisBoardTest", TetrisBoardTest);
runModule("TetrisInputTest", TetrisInputTest);
