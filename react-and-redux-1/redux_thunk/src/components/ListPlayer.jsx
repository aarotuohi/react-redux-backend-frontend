/** @format
 * Copy paste your code from the ListPlayer.jsx file here from the previous exercise
 * BEWARE: Only name and id are passed to this component as props. All the other data is fetched and updated in the redux store.
 *
 * Here are the thunks that you can use to update the redux store:
 * - getSelectedPlayer, found in src\redux\actionCreators\thunks\ListPlayer.jsx
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getSelectedPlayer } from '../redux/actionCreators/thunks/ListPlayer';

const ListPlayer = ({ player }) => {
  const dispatch = useDispatch();

  if (!player) {
    return null;
  }

  const handleClick = (id) => {
    dispatch(getSelectedPlayer(id));
  };

  return (
    <li id={`player-${player.id}`} role="listitem">
      <a href="#" role="link" onClick={() => handleClick(player.id)}>
        {player.name}
      </a>
    </li>
  );
};

ListPlayer.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default ListPlayer;

