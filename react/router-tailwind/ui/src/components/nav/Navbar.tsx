// the navbar is used to link our app to different views 

// import logo from '../../assets/images/logo.png'

import  {NavLink} from 'react-router'
import { HiBars4 } from "react-icons/hi2";


export const Navbar = () => {


  return (
   <div className="navbar bg-base-100 shadow-sm">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle md:hidden">
          {/* bar icon  */}
        <HiBars4/>
        </div>
        <ul
          tabIndex={-1}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
            <li><NavLink to='/login'>Login</NavLink></li>
            <li><NavLink to='/register'>Register</NavLink></li>
        </ul>
      </div>
    </div>
    {/* hide navbar in small screens  */}
    <div className="navbar-center hidden md:flex">
      <ul
          tabIndex={-1}
          className="menu menu-horizontal dropdown-content bg-base-100 rounded-box z-1 mt-3 p-2 shadow">
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
            <li><NavLink to='/admin/dashboard/todos'>Dashboard</NavLink></li>
        </ul>
    </div>
    <div className="navbar-end hidden md:flex">
      <ul
          tabIndex={-1}
          className="menu menu-horizontal dropdown-content bg-base-100 rounded-box z-1 mt-3 p-2 shadow">
            <li><NavLink to='/login'>Login</NavLink></li>
            <li><NavLink to='/register'>Register</NavLink></li>
        </ul>
    </div>
</div>
  )
}
