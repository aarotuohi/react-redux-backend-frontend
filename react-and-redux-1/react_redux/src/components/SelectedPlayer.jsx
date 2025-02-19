import React from 'react';
import { useSelector } from 'react-redux';

export const SelectedPlayer = () => {
  const player = useSelector((state) => state.selectedPlayer);

  if (!player) {
    return null;
  }

  return (
    <div id="selected-player">
      <h2>{player.name}</h2>
      <p>Status: {player.isActive ? 'Active' : 'Inactive'}</p>
    </div>
  );
};
