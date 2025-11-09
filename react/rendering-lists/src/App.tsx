
import './App.css'
import jokesData from './data/data.json'
import {Jokes} from './components/Jokes'


function App() {

  return (
    <>
     {
      jokesData  && jokesData.map((joke)=>(
        <div key={joke.id} className="jokeContainer">
          <Jokes joke={joke}/>
        </div>
      ))
     }
    </>
  )
}

export default App
