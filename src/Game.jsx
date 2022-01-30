import React from "react";
import './Game.css';

function Game(props) {
    return (
        <li className="Game" onClick={() => props.setActive(props.title)}>
            <p className="title">{props.title}</p>
            <p className="points">{props.points}</p>
        </li>
    );
}

export default Game;
