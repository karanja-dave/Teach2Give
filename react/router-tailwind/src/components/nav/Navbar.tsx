// the navbar is used to link our app to different views 

import logo from '../../assets/images/logo.png'

import  {NavLink} from 'react-router'

export const Navbar = () => {

  return (
    <div>
        <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
            <li><NavLink to='/login'>Login</NavLink></li>
            <li><NavLink to='/register'>Register</NavLink></li>
        </ul>
    </div>
  )
}
