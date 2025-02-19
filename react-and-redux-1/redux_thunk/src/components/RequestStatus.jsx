/** @format
 * Copy paste your code from the RequestStatus.jsx file here from the previous exercise
 *
 * BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.
 */
import { useSelector } from 'react-redux';
import React from 'react';

const RequestStatus = () => {
  const status = useSelector((state) => state.status);

  if (!status) {
    return null;
  }

  return <div id="request-status">{status}</div>;
};

export default RequestStatus;

