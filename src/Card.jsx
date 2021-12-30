import React, { useState, useEffect } from "react";

function Card(props) {
    return (
        <li className={`Card ${props.player.vote != null ? "active" : ""}`}>{props.reveal ? props.player.vote : "?"}</li>    
    )
}

export default Card;
