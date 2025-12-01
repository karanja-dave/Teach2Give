import { useSelector } from 'react-redux'
import homeIMG from '../assets/images/home-image.png'
import type {RootState } from '../app/store'


export const Hero = () => {
  const user = useSelector((state: RootState)=>state.user.user)
  console.log(user);
  const firstName= user?.FN
  return (
    <>
    <div className="flex flex-col md:flex-row justify-between gap-8 h-fit p-4 md:p-8">
      <div className="w-full md:w-1/2 border-2 border-gray-300 rounded-lg text-gray-600 p-6 md:pd-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-600">
        {
          firstName?(
            <span>Welcome to TodoPro! {firstName}</span>
          ): <span>Welcome to TodoPro!</span>
        }
        

      </h1>
      <p className="mb-4 text-gray-700 text-base md:text-lg">Supercharge your creativity with TodoPro, the ultimate managment for teams </p>
      <p className="mb-4 text-gray-700 text-base md:text-lg">Effortlessly assign tasks, track progress and collaborate in real time. Whether you are managing a small project or a large team, Todo makes delegations and follow-up a breeeze.</p>
      <p className="mb-4 text-gray-700 text-base md:text-lg">Get started today for seamless teamwork like never before</p>
      </div>

      <div className="w-full md:w-1/2 items-center">
        <img src={homeIMG} alt="Home Image" className="rounded-lg " />
      </div>
      
    </div>
    </>
  )
}
