import './Ground.scss';
import LawnerMover from '../lawner_mower/Lawner_mover';
import Zombie from '../zombie/zombie';
import React, { useState, useEffect, use } from 'react';

const getImgPath = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return import.meta.env.BASE_URL + cleanPath;
};
export function Ground() {
  const rows = 5;
  const columns = 10;
  const totalSquares = rows * columns;

  const [zombies, setZombies] = useState([]);

  useEffect(() => {
    const spawnTimer = setInterval(() => {
      const randomRow = Math.floor(Math.random() * rows);
      const randomType = Math.floor(Math.random() * 3) + 1;
      const newZombie = {
        positionX: 800,
        rowId: randomRow,
        type: randomType,
        id: Date.now(),
        hp: 100, // general hp for all zombies, can be adjusted based on type
      };
      setZombies((prevZombies) => [...prevZombies, newZombie]);
    }, 7000);
    return () => clearInterval(spawnTimer);
    
  }, []);

  useEffect(() => {
    const moveTimer = setInterval(() => {
      setZombies((prevZombies) =>
        prevZombies.map((zombie) => ({
          ...zombie,
          positionX: zombie.positionX - 2, 
        }))
      );
    }, 100);
    return () => clearInterval(moveTimer);
  }, []);

  const handleKillZombie = (id) => {
    setZombies((prevZombies) => prevZombies.filter((zombie) => zombie.id !== id));
  };

  return (
    <div className="ground">
      {
        Array.from({ length: totalSquares }).map((_, index) => {
          let row = Math.floor(index / columns);
          const column = index % columns;
          const isDark = (row + column) % 2 === 1;
          return (
            <div key={index} className={`ground__tile ${isDark ? 'ground__tile--darker' : ''}`}>
              { column === 0 && (<LawnerMover key={row} rowId={row} zombies={zombies} onKillZombie={handleKillZombie} onRemove={() => {console.log('Lawner Mover removed');}} /> )}

            </div>

          );
        })
      }
      {zombies.map((zombie) => (
        <Zombie key={zombie.id} zombieData={zombie}/>
      ))}
      <img src={getImgPath('/img/pvzhouse.png')} alt="" className='ground__house' />
    </div>
  );
}