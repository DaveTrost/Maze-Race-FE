import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PlayerSelection from '../components/users/PlayerSelection';
import PlayerList from '../components/users/PlayerList';
import { useGameState } from '../socket';
import useGameEmitters from '../components/hooks/gameState';
import { getPlayers } from '../selectors/roomSelector';

const shortId = require('shortid');

const Lobby = ({ match, history }) => {

  const { setUserId, joinRoomPrivate, enterName, joinRoom } = useGameEmitters();
  const eventState = useGameState();
  let playerList = null;

  useEffect(() => {
    Promise.all([
      joinRoomPrivate(match.params.roomId),
      joinRoom(eventState)
    ])
      .then(() => {
        if(eventState.inRoom) {
          console.log(eventState);
          
          const room = eventState.rooms.find(door => {
            return door.name === eventState.inRoom;
          });
          playerList = room.players || [];
        }
      });


    const id = shortId.generate();
    setUserId(id);    
    
  }, []);
  
  // useEffect(() => {
    
  //   if(eventState.roomId) {
  //     console.log('here***');
      
  //     const room = eventState.rooms.find(door => {
  //       return door.id === eventState.roomId;
  //     });
  //     playerList = room.players || [];
  //   }
  //   // console.log('PLAYER LIST', playerList);
    
  // });

  const handleName = (event, data) => {
    event.preventDefault();
    enterName({ name: data });
  };

  const colors = ['#FF0000', '#FE8300', '#FFF800', '#4AF441', '#56F0F9', '#0086FF', '#5E28FF', '#FF00F9'];
  const symbols = ['@', 'Δ', 'Ø', 'λ', 'π', 'µ', 'ß', 'Σ'];
  return (
    <>
      <PlayerSelection handleSubmit={handleName} colors={colors} symbols={symbols} />
      {playerList && <PlayerList players={playerList} />}
    </>
  );
};

Lobby.propTypes = {
  match: PropTypes.obj,
  history: PropTypes.object.isRequired
};

export default Lobby;

// if (!eventState.userId) {
//     const id = shortId.generate();
//     setUserId(id);
//     return null;
// }

// if (!eventState.inRoom && match.params.roomId) {
//     console.log('join room!!!!!!');
//     joinRoomPrivate(match.params.roomId);
//     return null;
// }

//   else if (isOpen && !winner && inRoom(eventState)) {
//     children = (
//         <>
//             <PlayersForm handleSubmit={handleName} type="text" />
//             <PlayersList players={getPlayers(eventState)} />
//         </>
//     );
// }

// // if not in room, join room

// else {
//     console.log('ROOM JOIN');
//     joinRoom(eventState);
// }
