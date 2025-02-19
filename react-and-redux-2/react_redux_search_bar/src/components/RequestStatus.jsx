import React from 'react';
import { useSelector } from 'react-redux';

const RequestStatus = () => {
  const status = useSelector(state => state.requestStatus);

  return (
    <div id="request-status">
      {status}
    </div>
  );
};

export { RequestStatus };