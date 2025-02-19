import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
/** @format
 *
 * Short instructions
 * ------------------
 *
 * This component is used to display the selected player. It receives a player as props.
 *
 * NOTE: For the ids, classes and html elements, refer to tests in the __tests__ folder to pass the unit tests, and to the cypress/e2e folder for the end-to-end tests.
 */

export const SelectedPlayer = ({ player, handleUpdate, handleDelete }) => {
  const [isActive, setIsActive] = useState(player ? player.isActive : false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setIsActive(player ? player.isActive : false);
  }, [player]);

  if (!player) {
    return <div>No player selected</div>;
  }

  const handleCheckboxChange = () => {
    setIsActive(!isActive);
  };

  const handleUpdateClick = async () => {
    setIsUpdating(true);
    await handleUpdate(isActive);
    setIsUpdating(false);
  };

  return (
    <div id="selected-player">
      <h2 id="player-name">{player.name}</h2>
      <p id="player-status">
        {isActive ? "active" : "inactive"}
      </p> 
      <label id="checkbox-label">
        <input
          type="checkbox"
          id="checkbox"
          checked={isActive}
          onChange={handleCheckboxChange}
        />
        Active
      </label>
      <button
        className="btn-update"
        onClick={handleUpdateClick}
        disabled={isActive === player.isActive || isUpdating}
      >
        Update
      </button>
      <button className="btn-delete" onClick={() => handleDelete(player.id)}>
        Delete
      </button>
    </div>
  );
};

SelectedPlayer.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
  }).isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default SelectedPlayer;