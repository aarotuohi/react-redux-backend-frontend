import { ListPlayer } from './ListPlayer.jsx';
import { SearchBox } from './SearchBox.jsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

export const ListPlayers = ({ players, getPlayer }) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (!Array.isArray(players)) {
    players = [];
  }

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Players List</h2>
      <SearchBox searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <ul id="players-list">
        {filteredPlayers.map((player) => (
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
      name: PropTypes.string.isRequired,
    })
  ),
  getPlayer: PropTypes.func.isRequired,
};

