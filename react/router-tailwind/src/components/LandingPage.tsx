import { Link } from "react-router"


export const LandingPage = () => {
  return (
    <div>
        <h1>Welcome to TodoPro!</h1>
        <p>Superchareg your creativity with TodoPro, the ultimate managment for teams </p>
        <p>Effortlessly asiign tasks and track projects</p>
        <p>Get started today for seamless teamwork like never before</p>

        <Link
            to = "/about">
            About us
        </Link>
    </div>
  )
}
