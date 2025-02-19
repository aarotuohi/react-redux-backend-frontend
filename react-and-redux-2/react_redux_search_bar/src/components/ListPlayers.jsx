import React from 'react';
import { useSelector } from 'react-redux';
import { ListPlayer } from './ListPlayer';

export const ListPlayers = () => {
  const players = useSelector((state) => state.players);

  if (!Array.isArray(players)) {
    return null;
  }

  return (
    <div>
      <h2>Players List</h2>
      <ul id="players-list" role="list">
        {players.map((player) => (
          <ListPlayer key={player.id} player={player} />
        ))}
      </ul>
    </div>
  );
};

