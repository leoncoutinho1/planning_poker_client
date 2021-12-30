import React, { useState, useEffect } from "react";
import Card from './Card';
import Pack from './Pack';

function Poker(props) {
    const [players, setPlayers] = useState([]);
    const [vote, setVote] = useState(null);
    const [reveal, setReveal] = useState(false);
    const [result, setResult] = useState('');
    
    const buildPlayersCards = (p) => {
        setPlayers(p);
        p.forEach(player => {
            if (player.id === props.socket.id) {
                setVote(player.vote);
            }
        });
    }

    const computeVote = (value) => {
        props.socket.emit('vote', value);
    }

    const resetGame = () => {
        props.socket.emit('reset');
    }

    const revealGame = () => {
        props.socket.emit('reveal');
    }

    useEffect(() => {
        props.socket.emit('join_room', props.user);
        props.socket.on('players', p => {
            buildPlayersCards(p)
        });
        props.socket.on('reveal', reveal => {
            setReveal(reveal);
        });
        props.socket.on('result', r => {
            setResult(r);
        });
    }, []);
    
    return (
        <div className="Poker">
            <h1>Hello {props.user}</h1>
            <ul>
                {players.map(p => <Card player={p} reveal={reveal} />)}
            </ul>
            <p className="scoreboard">{(result !== '') ? result : "Em jogo"}</p>
            <Pack computeVote={computeVote} vote={vote}/>
            <button id='reset_button' className="button" onClick={() => {resetGame()}}>Reset</button>
            <button id='reveal_button' className="button" onClick={() => {revealGame()}}>Reveal</button>
        </div>
    );
}

export default Poker;
