import './App.css'

import { Navbar } from "./components/nav/Navbar"
// import { Home } from "./components/home/Home"
// import { About } from "./components/about/About"
import { Profile } from './components/profile/Profile'
import userAvatar from './assets/images/useravatar.webp'

function App() {

  return (    <>
    <Navbar/>
    {/* <Home/>
    <About/> */}
    {/* parent component  */}
    <Profile
    name='Brian Kemboi'
    avatar={userAvatar}
    bio='Brian Kemboi is dedicated dairy farmer with ten years of experience in the industry. He is passionate about sustainable farming practices and ensuring the highest quality milk for his customers' 
    />

    <Profile
    name='John Smith'
    avatar={userAvatar}
    bio='John Smith has been a dairy farmer for over 15 years. He is committed to moderniing dairy farming through innovative managment systems and practices, ensuring both quality and efficiency.' 
    />

    <Profile
    name='Alice Brown'
    avatar='https://randomuser.me/api/portraits/women/44.jpg'
    bio='Alice Brown is a third-generation dairy farmer who belives  in the umportance of community and sustainability. She works tirelessly to maintain the health of her cows and the quality of her milk.' 
    />
  </>

  


  )
}

export default App
