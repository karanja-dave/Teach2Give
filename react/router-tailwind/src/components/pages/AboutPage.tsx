import Intro from "../about/Intro"
import Testimonials from "../about/Testimonials"
import { Footer } from "../footer/Footer"
import { Navbar } from "../nav/Navbar"

export const AboutPage = () => {
  return (
    <div>
        <Navbar/>
        <Intro/>
        <Testimonials/>
        <Footer/>
    </div>
  )
}
