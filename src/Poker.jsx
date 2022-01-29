import React, { useState, useEffect } from "react";
import Card from './Card';
import Pack from './Pack';
import Game from './Game';
import CurrentGame from './CurrentGame';

function Poker(props) {
    const [games, setGames] = useState([]);
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
        props.socket.emit('vote', {
            room: props.room,
            value: value
        });
    }

    const resetGame = () => {
        props.socket.emit('reset', { room: props.room });
    }

    const revealGame = () => {
        props.socket.emit('reveal', { room: props.room });
    }

    useEffect(() => {
        props.socket.emit('join_room', {
            user: props.user,
            room: props.room
        });
        props.socket.on('players', p => {
            console.log(p);
            buildPlayersCards(p)
        });
        props.socket.on('reveal', reveal => {
            setReveal(reveal);
        });
        props.socket.on('result', r => {
            setResult(r);
        });
        props.socket.on('games', g => {
            setGames(g);
        });
    }, []);
    
    return (
        <div className="Poker">
            <h1>Hello {props.user}</h1>
            {
                games.filter(g => g.room === props.room).map(g => {
                    if (g.active === true) {
                        return <CurrentGame title={g.title} points={g.points} />
                    }
                })
            }
            <ul>
                {players.map(p => <Card player={p} reveal={reveal} />)}
            </ul>
            <p className="scoreboard">{(result !== '') ? result : "Em jogo"}</p>
            <Pack computeVote={computeVote} vote={vote}/>
            <button id='reset_button' className="button" onClick={() => {resetGame()}}>Reset</button>
            <button id='reveal_button' className="button" onClick={() => {revealGame()}}>Reveal</button>
            <ul>
                {games.filter(g => g.room === props.room).map(g => <Game title={g.title} points={g.points}/>)}
            </ul>
        </div>
    );
}

export default Poker;
