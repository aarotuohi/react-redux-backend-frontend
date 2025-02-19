import React from 'react';
import { useSelector } from 'react-redux';

const SelectedPlayer = () => {
  const player = useSelector(state => state.selectedPlayer);

  if (!player) {
    return null;
  }

  return (
    <div id="selected-player">
      <h2 id="player-name">{player.name}</h2>
      <p id="player-details">{player.details}</p>
      <p id="player-status">{player.isActive ? 'active' : 'inactive'}</p>
    </div>
  );
};

export { SelectedPlayer };
