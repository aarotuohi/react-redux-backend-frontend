import React from 'react';
import PropTypes from 'prop-types';
/** @format
 *
  Short instructions
  ------------------

  This component is used to display the selected player. It receives a player as props.
  
  NOTE: For the ids, classes and html elements, refer to tests in the __tests__ folder to pass the unit tests, and to the cypress/e2e folder for the end-to-end tests.
 */

export const SelectedPlayer = ({ player }) => {
  if (!player) {
    return <div>No player selected</div>;
  }

  return (
    <div id="selected-player">
      <h2 id="player-name">{player.name}</h2>
      <p id="player-status">{player.isActive ? "active" : "inactive"}</p>
    </div>
  );
};

SelectedPlayer.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
  }),
};

export default SelectedPlayer;