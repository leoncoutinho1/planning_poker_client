import React, { useState, useEffect } from "react";
import Card from './Card';
import Pack from './Pack';
import Game from './Game';
import CurrentGame from './CurrentGame';
import './Poker.css';

function Poker(props) {
    const [games, setGames] = useState([]);
    const [players, setPlayers] = useState([]);
    const [vote, setVote] = useState(null);
    const [reveal, setReveal] = useState(false);
    const [result, setResult] = useState('');
    const [title, setTitle] = useState('');
    
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

    const addGame = (title) => {
        setTitle('');
        props.socket.emit('addGame', {
            room: props.room,
            title: title
        });
    }

    const resetGame = () => {
        props.socket.emit('reset', { room: props.room });
    }

    const revealGame = () => {
        props.socket.emit('reveal', { room: props.room });
    }

    const clearAll = () => {
        props.socket.emit('clear', { room: props.room });
    }

    const setActive = (title) => {
        props.socket.emit('setActive', {
            room: props.room,
            title: title
        })
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
            <div className="panel">
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
                <button id='clear_button' className="button" onClick={() => {clearAll()}}>Clear All</button>
            </div>
            <div className="list">
                <div>
                    <h3>PlanningTruco</h3>
                    <ul>
                        {games.filter(g => g.room === props.room).map(g => <Game title={g.title} points={g.points} setActive={setActive}/>)}
                    </ul>
                </div>
                <div className="addGameForm">
                    <textarea name="title" id="title" placeholder="Title..." onChange={(e) => {setTitle(e.target.value)}} value={title}/>
                    <button id='add_button' className="button" onClick={() => {addGame(title)}}> + </button>
                </div>
                
            </div>
            
        </div>
    );
}

export default Poker;
