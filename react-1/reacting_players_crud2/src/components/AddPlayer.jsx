/** @format
 *
 * Short instructions
 * ------------------
 *
 * COPY YOUR CODE FROM THE PREVIOUS EXERCISE HERE.
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/** @format
 *
 * Short instructions:
 * Create a AddPlayer component.
 *
 * handleSubmit is a prop function that will be called when the form is submitted.
 *
 * REMEMBER: use right ids, classes and attributes in the exercise, refer to the tests.
 *
 */

export const AddPlayer = ({ handleSubmit }) => {
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(name, isActive);
    setName('');
    setIsActive(false);
  };

  return (
    <form id="add-player-form" onSubmit={onSubmit}>
      <input
        type="text"
        id="input-player"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Player Name"
        required
      />
      <label>
        <input
          type="checkbox"
          id="player-active-checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
        Active
      </label>
      <button type="submit" id="submit-button" className="btn-add">
        Add Player
      </button>
    </form>
  );
};

AddPlayer.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default AddPlayer;
