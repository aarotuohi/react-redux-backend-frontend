/** @format
 * Copy paste your code from the ListPlayers.jsx file here from the previous exercise
 *
 * BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.
 *
 * Here are the thunks that you can use to update the redux store:
 * - getPlayers, found in src\redux\actionCreators\thunks\ListPlayers.jsx
 */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {ListPlayer} from './ListPlayer';
import { fetchFilteredPlayers } from '../redux/actionCreators/thunks/fetchFilteredPlayers';

export const ListPlayers = () => {
  const dispatch = useDispatch();
  const filteredPlayers = useSelector((state) => state.players.filteredPlayers);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    dispatch(fetchFilteredPlayers(term));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search players by name"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul id="players-list">
        {filteredPlayers.map(player => (
          <ListPlayer key={player.id} player={player} />
        ))}
      </ul>
    </div>
  );
};

