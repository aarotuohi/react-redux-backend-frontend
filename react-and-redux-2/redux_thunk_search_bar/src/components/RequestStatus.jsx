/** @format
 * Copy paste your code from the RequestStatus.jsx file here from the previous exercise
 *
 * BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.
 */
import React from 'react';
import { useSelector } from 'react-redux';

export const RequestStatus = () => {
  const status = useSelector(state => state.status);

  return (
    <div id="request-status">
      {status}
    </div>
  );
};



