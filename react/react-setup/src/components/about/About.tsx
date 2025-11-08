import './about.css'
import aboutimg from '../../assets/images/aboutimg.jpg'

export const About = () => {
  return (
    <div className='about-container'>
    <h1 className="about-title">About Dairy Cream</h1>
    <p className="about-description">
        Dairy Cream is committed to revolutionaliing dairy farming by leveraging modern managment systems. Our mission is to provide fresh, high-quality milk straight from our farms to your table, ensuring both quality and affordability. With focus on streamlined operations and customer satisfaction. Dairy Cream stands for excellence in every drop.
    </p>
    <img src={aboutimg} alt="About Image" className='about-image'/>
    </div>
  )
}
