import React, { useState } from "react"

export const Events = () => {
    const[name,setName]=useState<string>("")
    const[attendees,setAttende]=useState<string[]>([])

    const handleInputChange= (e: React.ChangeEvent<HTMLInputElement>)=>{
      setName(e.target.value)
      console.log(`Input Change: ${e.target.value}`);
    }
    const handleRegister = (e:React.FormEvent<HTMLFormElement>)=>{
      // prevents refreshing on submitting form 
      e.preventDefault()
      console.log("I am submitting....");
      if(name){
        console.log(`Registering an attendee: ${name}`);
        setAttende([...attendees,name]) //appends new name below the list 
        setName("") //clears input field after adding name to list
      }
    }
  return (
    <div>
        <h2>Event Registeration</h2>
        <form onSubmit={handleRegister}>
            <input type="text" 
            value={name} 
            onChange={handleInputChange}
            placeholder="Input Name"
            />
            <button type="submit">Register</button>
        </form>
        <h3>Attendees:</h3>
        <ul>
          {
            attendees.map((attendee,index)=>(
              <li key={index}>{attendee}</li>
            ))
          }
        </ul>
    </div>
  )
}
