import './nav.css'
import logo from '../../assets/images/logo.webp'

export const Navbar = () => {
  return (
    <div>
        <nav>
            <img src={logo} alt="Site Logo" />
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#home">About</a></li>
                <li><a href="#contact">Contacts</a></li>
            </ul>
        </nav>
    </div>
  )
}
