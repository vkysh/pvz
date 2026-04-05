import './Shop.scss';
const getImgPath = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return import.meta.env.BASE_URL + cleanPath;
};

export function Shop() {
  let sunValue = 50;
  const plants = [
    { name: 'Peashooter', price: 100, icon: '/img/peashooter.png' },
    { name: 'Sunflower', price: 50, icon: '/img/sunflower.png' },
    { name: 'Wall-nut', price: 50, icon: '/img/wallnut.png' },
  ];
  return (
    <div className="shop">
      <div>
        <article className='shop__sun'> 
          <div>
            <img src={getImgPath('/img/sun.png')} alt={plants[0].name} />
          </div>
        </article>
          <h3 className='shop__sun-value'>{sunValue} </h3>
      </div>
      <div className="shop__plants">
        {plants.map((plant, index) => (
          <div key={index} className="shop__plant">
            <img src={getImgPath(plant.icon)}  className='shop__plant-img' alt={plant.name} />
            <p>Price: {plant.price} suns</p>
          </div>
        ))}
      </div>
    </div>
  );
}

