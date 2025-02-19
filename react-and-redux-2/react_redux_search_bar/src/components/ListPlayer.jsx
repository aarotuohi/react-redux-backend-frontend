import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchPlayer } from '../redux/actionCreators/playersActions';

const ListPlayer = ({ player, onClick }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(fetchPlayer(player.id));
    if (onClick) {
      onClick(player.id);
    }
  };

  return (
    <li id={`player-${player.id}`}>
      <a href="" onClick={handleClick}>
        {player.name}
      </a>
    </li>
  );
};

export { ListPlayer };