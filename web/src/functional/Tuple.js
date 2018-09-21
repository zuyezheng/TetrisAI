import CaseClass from 'functional/CaseClass.js';

/**
 * Tuple that can be pattern matched.
 *
 * @author zuye.zheng
 */
export default class Tuple<A, B> extends CaseClass{

    static C_ARGS = ['left', 'right'];

    +left: A;
    +right: B;

    constructor(left: A, right: B) {
        super();

        this.left = left;
        this.right = right;
    }

}