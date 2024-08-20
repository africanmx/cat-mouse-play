import Image from 'next/image';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Howl } from 'howler';
import styles from '../styles/Mouse.module.css';

interface MouseProps {
  onClick: () => void;
  gameStarted: boolean;
  level: number;
}

const Mouse: React.FC<MouseProps> = ({ onClick, gameStarted, level }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [position, setPosition] = useState({ top: '50%', left: '50%' });
  const [mouseImage, setMouseImage] = useState<string>('');

  const sound1 = useMemo(() => {
    return new Howl({
      src: ['/mouse_01.mp3'],
      volume: 0.5,
      preload: true,
      loop: false
    });
  }, []);

  const sound2 = useMemo(() => {
    return new Howl({
      src: ['/mouse_02.mp3'],
      volume: 0.5,
      preload: true,
      loop: false
    });
  }, []);

  const handleClick = useCallback(() => {
    setIsClicked(true);
    Math.random() > 0.5 ? sound1.play() : sound2.play();
    setTimeout(() => {
      onClick();
    }, 500); // Wait for the disappearance transition
  }, [sound1, sound2, onClick]);

  useEffect(() => {
    if (!gameStarted) return;

    const moveMouse = () => {
      const top = Math.random() * 90 + '%';
      const left = Math.random() * 90 + '%';
      setPosition({ top, left });
    };

    const randomPause = () => Math.random() * 2000 + 1000; // Random pause between 1s and 3s

    let interval: NodeJS.Timeout;
    const startMoving = () => {
      moveMouse();
      interval = setInterval(moveMouse, randomPause() / (level * 0.5)); // Adjust speed with level
    };

    const timeout = setTimeout(startMoving, randomPause() / (level * 0.5));

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [gameStarted, level]);

  useEffect(() => {
    // Randomly select a mouse image
    const mouseNumber = Math.floor(Math.random() * 3) + 1;
    setMouseImage(`/mice/mouse0${mouseNumber}.png`);
  }, []);

  return (
    <div
      className={`${styles.mouse} ${isClicked ? styles.clicked : ''}`}
      onClick={handleClick}
      style={{ cursor: 'pointer', position: 'absolute', top: position.top, left: position.left }}
    >
      <Image src={mouseImage} width={128} height={128} alt="Mouse" className={styles.mouseImage} />
    </div>
  );
};

export default Mouse;