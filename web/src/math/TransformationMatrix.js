import {Matrix} from "math/Matrix.js";

export class TransformationMatrix {

    static rotation(degree: number): Matrix {
        const rad = degree / 180 * Math.PI;
        return new Matrix([
            [Math.cos(rad), -Math.sin(rad)],
            [Math.sin(rad), Math.cos(rad)]
        ])
    }

}