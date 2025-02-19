import {addPlayer} from '../../actionCreators/playersActions';
import {clearSelectedPlayer}  from '../../actionCreators/selectedPlayersAction';
import {setStatus}  from '../../actionCreators/statusActions';
import { REQ_STATUS } from '../../constants';

/**
 * @description thunk for posting a new player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - addPlayer-action with returned player-object
 * - clearSelectedPlayer-action with no parameters
 *
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @param {Object} newPlayer -  The player to be added
 * @return {Function} - thunk with dispatch as param
 */
export const postPlayer = (newPlayer) => {
  return async (dispatch) => {
    dispatch(setStatus(REQ_STATUS.loading));
    try {
      const response = await fetch('/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlayer),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const player = await response.json();
      dispatch(setStatus(REQ_STATUS.success));
      dispatch(addPlayer(player));
      dispatch(clearSelectedPlayer());
    } catch (error) {
      dispatch(setStatus(REQ_STATUS.error));
    }
  };
};