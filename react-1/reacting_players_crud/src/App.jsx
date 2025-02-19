/** @format
 *
 * Copy paste your code from the App.jsx file here from the previous exercise.
 *
 * Create a new player in the backend when the user submits the form in the AddPlayer component.
 *
 * Likewise, add logic to update the player in the backend when the user clicks the update button in the SelectedPlayer component.
 *
 * Finally, add logic to delete the player in the backend when the user clicks the delete button in the SelectedPlayer component.
 * 
 * HINT: Before the above logic, it may be better to start by updating the SelectedPlayer component to use the new props.
 * 
 * REMEMBER: use the right ids, classes and attributes in the exercise to pass the tests. Remember to pass in the appropriate props to the child components.

 * BEWARE: the tests will not pass if you use the wrong props. Look at invididual component file descriptions and tests to see what props are expected.
 *
 */

const url = "http://localhost:3001/api/players";

import React, { useState, useEffect } from 'react';
import { REQ_STATUS } from "../cypress/e2e/constants.js";
import AddPlayer from "./components/AddPlayer";
import { ListPlayers } from "./components/ListPlayers.jsx";
import SelectedPlayer from "./components/SelectedPlayer.jsx";
import RequestStatus from "./components/RequestStatus.jsx";


function App() {
  const [status, setStatus] = useState(REQ_STATUS.loading);
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    setStatus(REQ_STATUS.loading);
    try {
      const response = await fetch(url);
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
      const response = await fetch(`${url}/${id}`);
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

  return (
    <div>
      <RequestStatus>{status}</RequestStatus>
      <AddPlayer handleSubmit={addPlayer} />
      <ListPlayers players={players} getPlayer={fetchPlayer} />
      <SelectedPlayer player={currentPlayer} handleUpdate={updatePlayer} handleDelete={deletePlayer} />
    </div>
  );
}

export default App;
