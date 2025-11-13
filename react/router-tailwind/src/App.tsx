import './App.css'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { LandingPage } from './components/LandingPage'
import { About } from './components/about/About'
import { Error } from './components/Error'

function App() {
  const router =createBrowserRouter([
    // define routes here 
    {
      path:'/', //homepage route
      element: <LandingPage />
    },
    {
      path:'/about',
      element: <About/>
    },
    {
      path:'/register',
      element: <h1>Welcome to Register page</h1>
    },
    {
      path:'/login',
      element: <h1>Welcome to Login page</h1>
    },
    {
      path:'*', //handling non-existing routes
      element: <Error/>
    }
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
