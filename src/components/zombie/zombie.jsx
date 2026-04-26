import React from "react";
import './Zombie.scss';

const getImgPath = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return import.meta.env.BASE_URL + cleanPath;
};

const  zombieImages = {
  1: getImgPath('/img/zombie.png'),
  2: getImgPath('/img/zombie_cone.png'),
  3: getImgPath('/img/zombie_bucket.png'),
}

export default function Zombie({ zombieData }) {
  const { positionX, rowId, type } = zombieData;
  const imgPath = zombieImages[type] || zombieImages[1];

  return (
    <div 
      className="zombie"
      style={{ 
        left: `${positionX}px`, 
        top: `${rowId * 136.6 + 190}px`,
        backgroundImage: `url(${imgPath})` 
      }}
    ></div> 
  );
}