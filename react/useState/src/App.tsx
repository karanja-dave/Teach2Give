
import { useState } from 'react'
import './App.css'

function App() {
  // define useState:alt of using JS to update value
  const [number, setNumber] = useState<number>(0) //'number' holds the initial number,'setNumber holds the incremental', wea re starting at '0'
  // define incremental function  
  const handleAdd= () =>setNumber(number+1)
  // define decrement function 
    const handleMinus= () =>setNumber(number-1)

  return (
    <>
    <h2>Increment, Decrement & Reset</h2>

    <button onClick={handleAdd}>
      Increment
    </button> <br />

    <p>{number}</p> <br />
    <button onClick={handleMinus}>
      Decrement
    </button>
    </>
  )
}

export default App
