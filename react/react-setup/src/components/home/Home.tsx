import './home.css'
import homeIMG from '../../assets/images/homeimg.jpg'


export const Home = () => {
  return (
    <>
    <div className="home-container">
        <h1 className="home-title">Welcome to Our Website</h1>
        <p className="home-description">
            Dairy cream is a modern dairy farming management system designed to deliver fresh, high-quality milk directly from our farms to your table. By streamlining operations and reducing overhead, we ensure our customers enjoy premium dairy products at affordable prices. Experience the difference with Dairy Cream, where  quality meets cost savings.
        </p>

        <img src={homeIMG} alt="Home Image" className='home-image' />
    </div>
    </>
  )
}
