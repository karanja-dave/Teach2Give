// This component handles non existing routes 

import { Link } from "react-router"

export const Error = () => {
  return (
    <div>
        <h1>Page not Found</h1>
        <p>Sorry, we could not find the page you are looking for!!!</p>
        {/* redirects back home */}
        <Link
            to = "/">
            Go back home
        </Link>
    </div>
  )
}
