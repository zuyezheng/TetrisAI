import {Assert} from "test/Assert.js";

export type Run = (string, (Assert) => void) => void;