/** @format
 *
 * Student instructions:
 *  * Copy contents for this file from the previous exercise round's exercises
 *
 * BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.
 *
 * Here are the thunks that you can use to update the redux store:
 * - postPlayer, found in src\redux\actionCreators\thunks\AddPlayer.jsx
 */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postPlayer } from '../redux/actionCreators/thunks/AddPlayer';

const AddPlayer = () => {
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(postPlayer({ name, active: isActive }));
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
export default AddPlayer;

