
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
import { AdminDashboard } from './dashboard/AdminDashboard/content/AdminDashboard'
import { UserDashboard } from './dashboard/UserDashboard/content/UserDashboard'
import { useSelector } from 'react-redux'
import type { RootState } from './app/store'
import { Todos } from './dashboard/AdminDashboard/content/Todos/Todos'
import { CreateTodo } from './dashboard/AdminDashboard/content/Todos/CreateTodo'


function App() {
  const isAdmin = useSelector((state:RootState)=>state.user.user?.role==='admin')
  const isUser = useSelector((state:RootState)=>state.user.user?.role==='user')
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
    },
    // admin dashboard 
    {
      path:"/admin/dashboard",
      element: isAdmin? <AdminDashboard/>:<Login/>, //restrict only admins to access admin dashboard
      children:[ //extensions in the dashboard 
          {
            path:"todos",
            element: <Todos/>
          },
          // temporary route to check creation form 
          {
            path:"create-todos",
            element: <CreateTodo/>
          },

          {
            path:"users",
            element: <h1>Your Users</h1>
          },
          {
            path:"profile",
            element: <h1>Our Elements</h1>
          },
          {
            path:"analytics",
            element: <h1>Our Analytics</h1>

          }
      ]
    },
    // user dashboard 
    {
      path:"/user/dashboard",
      element: isUser?<UserDashboard/>:<Login/>,
      children:[ //extensions in the dashboard 
          {
            path:"todos",
            element: <h1>Our Todos</h1>
          },
         
          {
            path:"profile",
            element: <h1>Our Elements</h1>
          },
           
      ]
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
        }} richColors />
      
    </>
  )
}

export default App
