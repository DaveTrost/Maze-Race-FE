import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PlayerSelection from '../components/users/PlayerSelection';
import PlayerList from '../components/users/PlayerList';
import { useGameState } from '../socket';
import useGameEmitters from '../components/hooks/gameState';

const shortId = require('shortid');


const Lobby = ({ match, history }) => {

  const { enterName, joinRoom, setReady } = useGameEmitters();
  const eventState = useGameState();

  useEffect(() => {
    const userId = shortId.generate();
    joinRoom({ ...eventState, userId, inRoom: match.params.roomId });
  }, []);

  const handleName = (event, name, color, symbol, ready) => {
    event.preventDefault();
    console.log('HANDLENAME', name, color, symbol, ready);

    enterName({ name: name, color: color, symbol: symbol, ready: ready, userId: eventState.userId });
  };

  const colors = ['#FF0000', '#FE8300', '#FFF800', '#4AF441', '#56F0F9', '#0086FF', '#5E28FF', '#FF00F9'];
  const symbols = ['@', 'Δ', 'Ø', 'λ', 'π', 'µ', 'ß', 'Σ'];

  useEffect(() => {

    if(eventState.room.runners && eventState.room.seats && eventState.room.runners === eventState.room.seats) {
      setReady();
    }
  }, [eventState.room.runners]);

  useEffect(() => {
    if(eventState.ready) {
      history.push(`/${match.params.roomId}/game`);
    }
  }, [eventState.ready]);


  return (
    <>
      <PlayerSelection handleSubmit={handleName} colors={colors} symbols={symbols} />
      {eventState.room && <PlayerList players={eventState.room.players} />}
    </>
  );
};

Lobby.propTypes = {
  match: PropTypes.obj,
  history: PropTypes.object.isRequired
};

export default Lobby;
