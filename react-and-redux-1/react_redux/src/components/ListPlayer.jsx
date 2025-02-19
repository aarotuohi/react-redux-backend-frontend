import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { fetchPlayer } from '../redux/actionCreators/playersActions';

export const ListPlayer = ({ player }) => {
  const dispatch = useDispatch();

  if (!player) {
    return null;
  }

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(fetchPlayer(player.id));
  };

  return (
    <li id={`player-${player.id}`} role="listitem">
      <a href="#" onClick={handleClick} role="link">
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
