import GpuJS from "gpu.js";
import MatrixDim from "math/MatrixDim.js";
import Matrix from "math/Matrix.js";

const GPU = new GpuJS();

/**
 * GPU accelerated matrix multiplication. GPU acceleration requires creating a kernal of a fixed output size so a kernal
 * will can only multiple matrices of set dimensions. Creating a kernal is also not cheap so an instance of
 * MatrixMultiply should be created and reused. For infrequent multiplications of smallish matrices, the non-GPU
 * accelerated method might be faster.
 *
 * Make sure to call destroy once done.
 *
 * @author zuye.zheng
 */
export default class MatrixMultiply {

    +dim1: MatrixDim;
    +dim2: MatrixDim;
    _kernal: (Array<Array<number>>, Array<Array<number>>) => Array<Array<number>>;

    constructor(dim1: MatrixDim, dim2: MatrixDim) {
        if (!dim1.canMultiply(dim2)) throw new Error("Mismatched matrices.");

        this.dim1 = dim1;
        this.dim2 = dim2;

        this._kernal = GPU.createKernel(function (m1, m2) {
            let v = 0;
            for (let i = 0; i < this.constants.length; i++) {
                v += m1[this.thread.y][i] * m2[i][this.thread.x];
            }

            return v;
        }, {
            constants: {length: this.dim1.cols},
            output: [this.dim2.cols, this.dim1.rows],
        });
    }

    multiply(m1: Matrix, m2: Matrix): Matrix {
        if (!(m1.dim.is(this.dim1) && m2.dim.is(this.dim2))) throw new Error("Matrices do not match kernal.");

        return new Matrix(this._kernal(m1.rows, m2.rows));
    }

    destroy() {
        this._kernal.destroy();
    }

}