/** @format THUNK*/

/**
 * @description thunk for getting all players.
 * Whenever called, dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - setPlayers-action with response array as param
 * If Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @return {Function} - thunk with dispatch as param
 */
import { setStatus } from '../statusActions';
import { setPlayers } from '../playersActions';
import { REQ_STATUS } from '../../../constants';

export const getPlayers = () => {
  return async (dispatch) => {
    dispatch(setStatus(REQ_STATUS.loading));

    try {
      const response = await fetch('/api/players');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const players = await response.json();
      dispatch(setStatus(REQ_STATUS.success));
      dispatch(setPlayers(players));
    } catch (error) {
      dispatch(setStatus(REQ_STATUS.error));
    }
  };
};