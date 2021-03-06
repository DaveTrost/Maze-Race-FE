import React, { useEffect } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from '../components/sketch/Sketch';
import PropTypes from 'prop-types';
import { useGameState } from '../socket';
import useGameEmitters from '../components/hooks/gameState';
import styles from '../components/styles/P5Wrapper.css';
import outruntheempire from '../assets/sound/outruntheempire.mp3';

const Game = ({ match, history }) => {
  // State
  const { movePlayer } = useGameEmitters();
  const eventState = useGameState();

  //Keypress logic
  const keyDownListener = (event) => {
    const keyName = event.key;
    if(keyName === 'ArrowUp') {
      movePlayer({ dir: 'up', room: eventState.room.name, userId: eventState.userId });
    }
    if(keyName === 'ArrowDown') {
      movePlayer({ dir: 'down', room: eventState.room.name, userId: eventState.userId });
    }
    if(keyName === 'ArrowRight') {
      movePlayer({ dir: 'right', room: eventState.room.name, userId: eventState.userId });
    }
    if(keyName === 'ArrowLeft') {
      movePlayer({ dir: 'left', room: eventState.room.name, userId: eventState.userId });
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keyDownListener);
    return () => {
      window.removeEventListener('keydown', keyDownListener);
    };
  }, [eventState.winner]);

  useEffect(() => {
    if(eventState.winner) {
      history.push(`/${match.params.roomId}/results`);
    }
  });

  return (
    <div className={styles.P5WrapperTop}>
      <P5Wrapper sketch={sketch} players={eventState.room.players} cellMap={eventState.room.cellMap} />
      <audio src={outruntheempire} controls autoPlay loop />
      <p>Race to the finish!</p>
    </div>
  );
};

Game.propTypes = {
  match: PropTypes.obj,
  history: PropTypes.object.isRequired
};

export default Game;
