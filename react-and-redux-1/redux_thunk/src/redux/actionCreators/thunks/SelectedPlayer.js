/** @format THUNK*/

/**
 * @description thunk for deleting the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - removePlayer-action with selectedPlayer.id as param
 * - clearSelectedPlayer-action with no parameters
 *
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @return {Function} - thunk with dispatch as param
 *
 * Hint: You have to get the required details of the selected player from the store.
 */
import { setStatus } from '../statusActions';
import { removePlayer, updatePlayer } from '../playersActions';
import { clearSelectedPlayer } from '../selectedPlayerActions';
import { REQ_STATUS } from '../../../constants';

export const deleteSelectedPlayer = () => {
  return async (dispatch, getState) => {
    const { selectedPlayer } = getState();
    dispatch(setStatus(REQ_STATUS.loading));

    try {
      const response = await fetch(`/api/players/${selectedPlayer.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      dispatch(setStatus(REQ_STATUS.success));
      dispatch(removePlayer(selectedPlayer.id));
      dispatch(clearSelectedPlayer());
    } catch (error) {
      dispatch(setStatus(REQ_STATUS.error));
    }
  };
};


/**
 * @description thunk for updating the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - updatePlayer-action with updated player as param
 * - clearSelectedPlayer-action with no parameters
 * Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @param {Boolean} updatedActivity - the new activity status of the player
 * @return {Function} - thunk with dispatch as param
 * @example
 * // returns a thunk that updates the selected player's activity status to false:
 * updateSelectedPlayer(false)
 * // returns a thunk that updates the selected player's activity status to true:
 * updateSelectedPlayer(true)
 *
 * Hint: You have to get required details of the selected player from the store.
 *
 */
export const updateSelectedPlayer = (updatedActivity) => {
    return async (dispatch, getState) => {
      const { selectedPlayer } = getState();
      dispatch(setStatus(REQ_STATUS.loading));
  
      try {
        const response = await fetch(`/api/players/${selectedPlayer.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...selectedPlayer, active: updatedActivity }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const updatedPlayer = await response.json();
        dispatch(setStatus(REQ_STATUS.success));
        dispatch(updatePlayer(updatedPlayer));
        dispatch(clearSelectedPlayer());
      } catch (error) {
        dispatch(setStatus(REQ_STATUS.error));
      }
    };
  };
