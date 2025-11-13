
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [count,SetCount]=useState(0)
  console.log(count)

  useEffect(()=>{
    setTimeout(()=>{
      SetCount((count)=>count+1)
    },1000) /*set delay period, 1Second*/
  },[])
  return (
    <>
      I have been rerendered {count} times
    </>
  )
}

export default App
