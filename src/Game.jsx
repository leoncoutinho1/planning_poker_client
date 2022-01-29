import React from "react";

function Game(props) {
    return (
        <li className="Game">
            <p className="title">{props.title}</p>
            <p className="points">{props.points}</p>
        </li>
    );
}

export default Game;
