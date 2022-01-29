import React from "react";
import './CurrentGame.css';

function CurrentGame(props) {
    return (
        <h2 className="CurrentGame">
            <p>{props.title}</p>
            <p>{props.points}</p>
        </h2>
    );
}

export default CurrentGame;
