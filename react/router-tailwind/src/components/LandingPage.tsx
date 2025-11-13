import { Link } from "react-router"
import { Navbar } from "./nav/Navbar"
import homeIMG from '../assets/images/home-image.png'


export const LandingPage = () => {
  return (
    <>
    <Navbar/>{/* ensure Navbar appears on top of landing page  */}
    <div className="flex flex-col md:flex-row justify-between gap-8 h-fit p-4 md:p-8">
      <div className="w-full md:w-1/2 border-2 border-gray-300 rounded-lg text-gray-600">
      <h1 className=" ">Welcome to TodoPro!</h1>
      <p>Supercharge your creativity with TodoPro, the ultimate managment for teams </p>
      <p>Effortlessly assign tasks, track progress and collaborate in real time. Whether you are managing a small project or a large team, Todo makes delegations and follow-up a breeeze.</p>
      <p>Get started today for seamless teamwork like never before</p>

      <Link
          to = "/about">
          About us
      </Link>
      </div>

      <div className="w-full md:w-1/2 items-center">
        <img src={homeIMG} alt="Home Image" />
      </div>
    </div>
    </>
  )
}
