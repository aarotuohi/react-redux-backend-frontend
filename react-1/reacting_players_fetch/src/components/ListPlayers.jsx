import { ListPlayer } from './ListPlayer.jsx';
import PropTypes from 'prop-types';
import React from 'react';

export const ListPlayers = ({ players, getPlayer }) => {
  if (!Array.isArray(players)) {
    players = [];
  }

  return (
    <div>
      <h2>Players List</h2>
      <ul id="players-list">
        {players.map((player) => (
          <ListPlayer key={player.id} player={player} onClick={getPlayer} />
        ))}
      </ul>
    </div>
  );
};

ListPlayers.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      
    })
  ),
  getPlayer: PropTypes.func.isRequired,
};

