/** @format 
 * 
 *
  Copy paste your code from the SelectedPlayer.jsx file here from the previous exercise.

	BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.

	Here are the thunks that you can use to update the redux store:
	- deleteSelectedPlayer, found in src\redux\actionCreators\thunks\SelectedPlayer.jsx
	- updateSelectedPlayer, found in src\redux\actionCreators\thunks\SelectedPlayer.jsx

*/



import React from 'react';
import { useSelector } from 'react-redux';

const SelectedPlayer = () => {
  const selectedPlayer = useSelector((state) => state.selectedPlayer);

  if (!selectedPlayer) {
    return null;
  }

  return (
    <div id="selected-player">
      <h2>{selectedPlayer.name}</h2>
      <p>ID: {selectedPlayer.id}</p>
      <p>Active: {selectedPlayer.active ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default SelectedPlayer;
