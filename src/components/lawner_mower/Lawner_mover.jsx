import React from "react";
import { useState, useEffect, useRef } from "react";
import './Lawner_mover.scss';

const getImgPath = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return import.meta.env.BASE_URL + cleanPath;
};

export default function LawnerMover({ rowId, zombies, onKillZombie, onRemove }) {

  const [positionX, setPositionX] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const speed = 8;
  const moverWidth = 50;
  const screenWidth = 800;

  const posRef = useRef(positionX);
  const isMovingRef = useRef(isMoving);

  useEffect(() => {
    isMovingRef.current = isMoving;
    posRef.current = positionX;
  }, [isMoving, positionX]);

  useEffect(() => {
    const GameLoop = setInterval(() => {
      const zombieInRow = zombies.filter(z => z.row === rowId);
      zombieInRow.forEach(zombie => {
        const hitZone = posRef.current + moverWidth;
        if (zombie.positionX <= hitZone && zombie.positionX >= posRef.current) {
          if (!isMovingRef.current) {
            setIsMoving(true);
          }
          if (isMovingRef.current) {
            onKillZombie(zombie.id);
          }
        }
      });
      if (isMovingRef.current) {
        setPositionX(prev => {
          const newPos = prev + speed;
          if (newPos > screenWidth) {
            clearInterval(GameLoop);
            onRemove(rowId);
            return prev; 
          }
          return newPos;
        });
      }
    }, 50);

    return () => clearInterval(GameLoop);
    
  }, [zombies, onKillZombie, onRemove, rowId]);
  return (
    <div className={`lawnermover ${isMoving ? 'lawnermover--moving' : ''}`} 
      style={{ 
        left: positionX + 'px',
        width: moverWidth + 'px',
        backgroundImage: `url(${getImgPath('/img/lawnmower.png')})`,
      }}
    ></div>
  );

}