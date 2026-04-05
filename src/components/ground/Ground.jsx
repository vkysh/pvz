import './Ground.scss';
const getImgPath = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return import.meta.env.BASE_URL + cleanPath;
};
export function Ground() {
  const rows = 5;
  const columns = 10;
  const totalSquares = rows * columns;
  return (
    <div className="ground">
      <div className="ground__tile"></div>
      {
        Array.from({ length: totalSquares }).map((_, index) => {
          let row = Math.floor(index / columns);
          const column = index % columns;
          const isDark = (row + column) % 2 === 1;
          return (
            <div key={index} className={`ground__tile ${isDark ? 'ground__tile--darker' : ''}`}></div>
          );
        })
      }
      <img src={getImgPath('/img/pvzhouse.png')} alt="" className='ground__house' />
    </div>
  );
}