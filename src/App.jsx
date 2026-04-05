import { useState } from 'react';
import { Shop } from './components/shop/Shop';
import { Ground } from './components/ground/Ground';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="app">
        <div className="app__shop">
          <Shop />
        </div>  
        <div className="app__ground">
          <Ground />
        </div>
      </div>
    </>
  )
}

export default App;
