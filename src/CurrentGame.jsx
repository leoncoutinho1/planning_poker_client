import React from "react";

function CurrentGame(props) {
    return (
        <h2 className="CurrentGame">
            {props.title} - {props.points}
        </h2>
    );
}

export default CurrentGame;
