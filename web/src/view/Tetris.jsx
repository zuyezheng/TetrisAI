import _ from "lodash";
import React from "react";
import {Random} from "math/Random.js";
import type {State} from "functional/State.js";
import {TetrisBoard} from "tetris/TetrisBoard.js";
import {TetrisInput} from "tetris/TetrisInput.js";

export class Tetris extends React.Component<Props, ReactState> {

    _onResizeDebounced: () => void;
    _tickId: IntervalID;

    constructor(props: Props) {
        super(props);

        this.state = {
            board: TetrisBoard.of(this.props.rows, this.props.cols),
            generator: Random.generator(1),
            cellSize: 10
        };
        this._onResizeDebounced = _.debounce(this._onResize.bind(this), 400)
    }

    componentDidMount() {
        this._onResizeDebounced();

        window.addEventListener("resize", this._onResizeDebounced);
        window.addEventListener("keyup", this._onKeyUp.bind(this));
        
        this._tickId = setInterval(this._tick.bind(this), 1000);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this._onResizeDebounced);
        window.removeEventListener("keyup", this._onKeyUp);
        clearInterval(this._tickId);
    }

    render() {
        const rows = this.state.board.merge().rows.map((row, i) => {
            const cells = row.map((v, j) => {
                const style = {
                    backgroundColor: v ? "#69626D" : "#CBBEB3"
                };
                return <div key={j} className="cell" style={style}></div>;
            });
            return <div key={i} className="row">{cells}</div>;
        });

        const style = {
            width: this.state.cellSize * this.props.cols,
            height:  this.state.cellSize * this.props.rows
        };
        return <div className="grid" style={style}>{rows}</div>
    }

    _onResize() {
        this.setState({
            cellSize: window.innerHeight/this.props.rows
        });
    }

    _onKeyUp(e) {
        switch(e.code) {
            case "ArrowLeft":
                this._update(TetrisInput.left());
                break;
            case "ArrowRight":
                this._update(TetrisInput.right());
                break;
            case "ArrowDown":
                this._update(TetrisInput.tick());
                break;
            case "Space":
                this._update(TetrisInput.rotate());
                break;
        }
    }

    _tick() {
        this._update(TetrisInput.tick());
    }

    _update(input: State<TetrisBoard, [TetrisBoard, Random.Generator]>) {
        const [board, generator] = input.run([this.state.board, this.state.generator])[1];
        this.setState({board, generator});
    }

}

type Props = {
    rows: number,
    cols: number,
};


type ReactState = {
    board: TetrisBoard,
    generator: Random.Generator,
    cellSize: number
};