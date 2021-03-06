import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import './App.css';
import Poker from './Poker';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [socket, setSocket] = useState({});

    const connectToRoom = () => {
        setLoggedIn(true);
        setSocket(io(process.env.REACT_APP_SOCKET_URL,  { transports : ['websocket'] }));
    }

    return (
        <div className="App">
        {!loggedIn ? (
            <div id="loginform">
                <input type="text" name="user" id="user" placeholder="Nome..." onChange={(e) => {setUsername(e.target.value)}}/>
                <input type="text" name="room" id="room" placeholder="Room..." onChange={(e) => {setRoom(e.target.value)}}/>
                <button onClick={connectToRoom}>Enter room</button>
            </div>
        ) : <Poker user={username} room={room} socket={socket} />}
        </div>
    );
}

export default App;
