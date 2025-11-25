
import './App.css'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { LandingPage } from './components/pages/LandingPage'
import { Error } from './components/Error'
import { Register } from './components/auth/Register'
import { Login } from './components/auth/Login'
import { AboutPage } from './components/pages/AboutPage'
import { Verification } from './components/auth/Verification'
import { Toaster } from 'sonner'

function App() {
  const router =createBrowserRouter([
    // define routes here 
    {
      path:'/', //homepage route
      element: <LandingPage />
    },
    {
      path:'/about',
      element: <AboutPage/>
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
      path: '/verify',
      element: <Verification/>
    },
    {
      path:'*', //handling non-existing routes
      element: <Error/>
    }
  ])
  return (
    <>
      <RouterProvider router={router}/>
      <Toaster position='top-right' toastOptions={{
        classNames:{
          error:'bg-red-500 text-white',
          success:"bg-green text-white"
        }
        }} />
      
    </>
  )
}

export default App
