import React, { useState, useEffect } from 'react';
import { REQ_STATUS } from "../cypress/e2e/constants.js";
import AddPlayer from "./components/AddPlayer";
import { ListPlayers } from "./components/ListPlayers.jsx";
import SelectedPlayer from "./components/SelectedPlayer.jsx";
import RequestStatus from "./components/RequestStatus.jsx";
import { AuthUser } from "./components/AuthUser.jsx";

const url = "http://localhost:3001/api/players";

function App() {
  const [status, setStatus] = useState(REQ_STATUS.loading);
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authHeaders, setAuthHeaders] = useState({});
  const [requestStatus, setRequestStatus] = useState("");

  useEffect(() => {
    if (isLoggedIn) fetchPlayers();
  }, [isLoggedIn]);

  const fetchPlayers = async () => {
    setStatus(REQ_STATUS.loading);
    try {
      const response = await fetch(url, { headers: authHeaders });
      const data = await response.json();
      setPlayers(data);
      setStatus(REQ_STATUS.success);
    } catch (error) {
      setStatus(REQ_STATUS.error);
    }
  };

  const fetchPlayer = async (id) => {
    setStatus(REQ_STATUS.loading);
    try {
      const response = await fetch(`${url}/${id}`, { headers: authHeaders });
      const data = await response.json();
      setCurrentPlayer(data);
      setStatus(REQ_STATUS.success);
    } catch (error) {
      setStatus(REQ_STATUS.error);
    }
  };

  const addPlayer = async (player) => {
    setStatus(REQ_STATUS.loading);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
        },
        body: JSON.stringify({ name: player, isActive: false }), 
      });
      if (response.ok) {
        const newPlayer = await response.json();
        setPlayers([...players, newPlayer]); 
        setStatus(REQ_STATUS.success);
      } else {
        setStatus(REQ_STATUS.error);
      }
    } catch (error) {
      setStatus(REQ_STATUS.error);
    }
  };

  const updatePlayer = async (isActive) => {
    if (!currentPlayer) return;
    setStatus(REQ_STATUS.loading);
  
    const previousPlayerState = { ...currentPlayer };
  
    try {
      const response = await fetch(`${url}/${currentPlayer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
        },
        body: JSON.stringify({ ...currentPlayer, isActive }),
      });
  
      if (response.ok) {
        const updatedPlayer = { ...currentPlayer, isActive };
        setCurrentPlayer(updatedPlayer);
        setPlayers(players.map(player => 
          player.id === updatedPlayer.id ? updatedPlayer : player
        ));
        setStatus(REQ_STATUS.success);
      } else {
        setStatus(REQ_STATUS.error);
      }
    } catch (error) {
      setCurrentPlayer(previousPlayerState); 
      setStatus(REQ_STATUS.error);
    }
  };

  const deletePlayer = async (id) => {
    setStatus(REQ_STATUS.loading);
    try {
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
      });
      if (response.ok) {
        setPlayers(players.filter(player => player.id !== id)); 
        setCurrentPlayer(null); 
        setStatus(REQ_STATUS.success);
      } else {
        setStatus(REQ_STATUS.error);
      }
    } catch (error) {
      setStatus(REQ_STATUS.error);
    }
  };

  const handleLogin = (username, password) => {
    setRequestStatus("Loading...");
    const encodedCredentials = btoa(`${username}:${password}`);
    setAuthHeaders({
      Authorization: `Basic ${encodedCredentials}`,
    });
    setIsLoggedIn(true);
    setRequestStatus("Finished!");
  };

  const handleLogout = () => {
    setAuthHeaders({});
    setIsLoggedIn(false);
    setPlayers([]);
    setCurrentPlayer(null);
    setStatus(REQ_STATUS.success);
    setRequestStatus("");
  };

  const handleRegister = async (username, password) => {
    setRequestStatus("Loading...");
    try {
      const response = await fetch(`${url}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) throw new Error("Failed to register");
      const encodedCredentials = btoa(`${username}:${password}`);
      setAuthHeaders({
        Authorization: `Basic ${encodedCredentials}`,
      });
      setIsLoggedIn(true);
      setRequestStatus("Finished!");
    } catch (error) {
      setRequestStatus("Error");
    }
  };

  return (
    <div>
      <AuthUser
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
      />
      {isLoggedIn && (
        <>
          <RequestStatus>{status}</RequestStatus>
          <AddPlayer handleSubmit={addPlayer} />
          <ListPlayers players={players} getPlayer={fetchPlayer} />
          <SelectedPlayer player={currentPlayer} handleUpdate={updatePlayer} handleDelete={deletePlayer} />
        </>
      )}
      {requestStatus && <div id="request-status">{requestStatus}</div>}
    </div>
  );
}

export default App;