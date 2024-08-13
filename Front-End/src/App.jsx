import { useState } from 'react'
import './assets/Bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Routing} from './router/Routing';


function App() {
  const [count, setCount] = useState(0)

  return (
 
      <div className='container'>
          <div className='card'>

          <Routing/>

          </div>
      </div>
  
  )
}

export default App
