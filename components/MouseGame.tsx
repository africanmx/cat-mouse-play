'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Mouse from './Mouse';
import styles from '../styles/MouseGame.module.css';

const MAX_MICE = 7; // Maximum number of mice on the screen
const LEVEL_UP_SCORE = 10; // Score needed to level up

const MouseGame: React.FC = () => {
  const [mice, setMice] = useState<{ id: number; type: string }[]>([]);
  const [score, setScore] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      // Load score from local storage
      const savedScore = localStorage.getItem('score');
      return savedScore ? parseInt(savedScore, 10) : 0;
    }
    return 0;
  });
  const [level, setLevel] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      // Load level from local storage
      const savedLevel = localStorage.getItem('level');
      return savedLevel ? parseInt(savedLevel, 10) : 1;
    }
    return 1;
  });
  const [welcomeScreenVisible, setWelcomeScreenVisible] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [mouseId, setMouseId] = useState(0); // Unique identifier for each mouse
  const [party, setParty] = useState(false); // Party mode

  useEffect(() => {
    setMice([{
      id: 0,
      type: 'normal'
    }]);
    setMouseId(1);
  }, []);

  const handleMouseClick = useCallback(() => {
    console.log('Mouse clicked');
    setWelcomeScreenVisible(false);
    setScore((prevScore) => {
      const newScore = prevScore + 1;
      localStorage.setItem('score', newScore.toString());
      if (newScore % LEVEL_UP_SCORE === 0) {
        setLevel((prevLevel) => {
          const newLevel = prevLevel + 1;
          localStorage.setItem('level', newLevel.toString());
          setParty(true);
          setTimeout(() => setParty(false), 3000); // Party for 3 seconds
          return newLevel;
        });
      }
      return newScore;
    });
    setMice((prevMice) => prevMice.slice(1)); // Remove the clicked mouse
    if (!gameStarted) {
      setGameStarted(true);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted) return;

    const addMouse = () => {
      setMice((prevMice) => {
        if (prevMice.length < MAX_MICE) {
          const newMouse = {
            id: mouseId,
            type: Math.random() > 0.5 ? 'normal' : 'fast', // Random mouse type
          };
          setMouseId((prevId) => prevId + 1);
          return [...prevMice, newMouse];
        }
        return prevMice;
      });
    };

    const interval = setInterval(addMouse, 3000); // Add a new mouse every 3 seconds
    return () => clearInterval(interval);
  }, [gameStarted, mouseId]);

  return (
    <>
      {welcomeScreenVisible && (
        <div id="welcomeMessage" className={styles.welcomeMessage}>
          <h1 className="title">
            Welcome to Cat Mouse Play!
          </h1>

          <p className="description">
            Click the mouse to play!
          </p>
        </div>
      )}
      <div className={`${styles.gameContainer} ${party ? styles.party : ''}`}>
        <div className={styles.score}>Score: {score}</div>
        <div className={styles.level}>Level: {level}</div>
        {mice.map((mouse) => (
          <Mouse key={mouse.id} onClick={handleMouseClick} gameStarted={gameStarted} level={level} />
        ))}
      </div>
      {party && <div className={styles.partyMessage}>Level Up! 🎉</div>}
    </>
  );
};

export default MouseGame;