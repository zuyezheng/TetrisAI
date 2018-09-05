import ReactDOM from "react-dom";
import React from "react";
import {Tetris} from "view/Tetris.jsx";

ReactDOM.render(<Tetris rows={20} cols={10}/>, document.getElementById("tetris"));