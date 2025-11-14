import { Navbar } from '../nav/Navbar'
import { Hero } from '../Hero'
import { Services } from '../services/Services'
import { Footer } from '../footer/Footer'

export const LandingPage = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Services/>
        <Footer/>
    </div>
  )
}
