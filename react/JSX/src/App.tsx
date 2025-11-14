
import './App.css'

import profileImg from './assets/images/professional.avif'

function App() {

  // define variables 
  const myName= 'Dave Karanja'
  // define types 
  interface IDetails{
    Id:number;
    country:string;
    occupation:string;
  }

  const details:IDetails={
    Id:41207865,
    country:'Kenya',
    occupation:"Trainer"

  }
  // define array that stores programming languages 
  const favProgrammingLanguage:string[]=[
    "Javascript",
    "Typescript",
    "C",
    "Java",
    "C#",
    "Go"
  ]

  return (
    <>
    <section id="app-header">
    <div className='text-container'>
      <h1>My name is: {myName}</h1>
      <p>My Id is {details.Id}</p>
      <p>I am from {details.country}</p>
      <p>I work as a {details.occupation}</p>
      <h2>My favorite programming languages are:</h2>
       <ul style={{backgroundColor:"green",color:"whiteSpace",listStyle:"none"}}>
      {
        favProgrammingLanguage.map((language,index)=>( //loop through items inside the favProgrammingLanguage
          <li key={index}>{language}</li>
        ))
      }
    </ul>
    </div>

    <div className="image-container">
      <img src={profileImg} alt="user" />
    </div>
    </section>
    </>
  )
}

export default App
