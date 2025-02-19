import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayers, fetchPlayer, addPlayer } from './redux/actionCreators/playersActions';
import { login, logout, register } from './redux/actionCreators/authActions';
import { RequestStatus } from './components/RequestStatus';
import AddPlayer from './components/AddPlayer';
import { ListPlayers } from './components/ListPlayers';
import { SelectedPlayer } from './components/SelectedPlayer';
import AuthUser from './components/AuthUser';

const App = () => {
  const dispatch = useDispatch();
  const { players, isLoggedIn, authHeaders } = useSelector(state => ({
    players: state.players,
    isLoggedIn: state.auth.isLoggedIn,
    authHeaders: state.auth.authHeaders,
  }));

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchPlayers(authHeaders));
    }
  }, [isLoggedIn, authHeaders, dispatch]);

  const handleLogin = (username, password) => {
    dispatch(login(username, password));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleRegister = (username, password) => {
    dispatch(register(username, password));
  };

  return (
    <div>
      <AuthUser
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
      />
      {isLoggedIn && (
        <>
          <RequestStatus />
          <AddPlayer handleSubmit={(player) => dispatch(addPlayer(player, authHeaders))} />
          <ListPlayers />
          <SelectedPlayer />
        </>
      )}
    </div>
  );
};

export default App;