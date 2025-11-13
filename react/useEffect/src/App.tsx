import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

// define types for users: TUser
type TUser={
  id:number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
}},
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase:string;
      bs: string;
    }}

function App() {
  // define the useState 
  const [users, setUsers] = useState<TUser[]|null>([])

  console.log(users);
  
  // define function to fetch data :all users
  const FetchUsers = async () =>{
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then((res)=>setUsers(res.data))
    .catch((err)=>console.log(err));
  }

  // get users by id 
  const getUserById = async(id:number)=>{
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((res)=>setUsers([res.data]))
    .catch((err)=>console.log(err));
  }
  useEffect(()=>{
    FetchUsers()
  },[])

  const handleSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const id = (form.elements.namedItem('id') as HTMLInputElement).value 

    if(id){
      getUserById(Number(id))
    }else{
      alert("Please enter an ID")
    }
  }
  
  return (
    <>
    {/* show data in UI  */}
    <div>
      <h1>Fetch User API</h1>
      <form onSubmit={handleSubmit} >
        <input type="number" name='id' />

        <button type='submit'>Search</button>
      </form>
      {
        users? (
          users.map((user:TUser)=>{
            return(
              <div key={user.id}>
                <p>ID:{user.id}</p>
                <p>Name:{user.name}</p>
                <p>Username:{user.username}</p>
                <p>Email:{user.email}</p>
                <p>Phone:{user.phone}</p>
                <p>Website:{user.website}</p>
                <p>Company:{user.company.name}</p> <hr />
                <p>
                  Address:
                  <span>{user.address.street}</span> <br />
                  <span>{user.address.city}</span>
                </p>
              </div>
            )
          })
        ) : (
          <div>No Data</div>
        )
      }
    </div>
    </>
  )
    
}

export default App
