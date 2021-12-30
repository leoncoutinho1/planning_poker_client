import React from "react";

function Pack(props) {
    console.log(props.vote);
    return (
        <ul className="Pack">
            <li className={`${props.vote === 0 ? "active" : ""}`} onClick={() => props.computeVote(0)}>0</li>
            <li className={`${props.vote === 1 ? "active" : ""}`} onClick={() => props.computeVote(1)}>1</li>
            <li className={`${props.vote === 2 ? "active" : ""}`} onClick={() => props.computeVote(2)}>2</li>
            <li className={`${props.vote === 3 ? "active" : ""}`} onClick={() => props.computeVote(3)}>3</li>
            <li className={`${props.vote === 5 ? "active" : ""}`} onClick={() => props.computeVote(5)}>5</li>
            <li className={`${props.vote === 8 ? "active" : ""}`} onClick={() => props.computeVote(8)}>8</li>
            <li className={`${props.vote === 13 ? "active" : ""}`} onClick={() => props.computeVote(13)}>13</li>
        </ul>
    );
}

export default Pack;
