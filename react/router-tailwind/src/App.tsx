
import './App.css'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { LandingPage } from './components/pages/LandingPage'
import { Error } from './components/Error'
import { About } from './components/about/About'
import { Register } from './components/register/Register'
import { Login } from './components/login/Login'

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
      element: <Register/>
    },
    {
      path:'/login',
      element: <Login/>
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
