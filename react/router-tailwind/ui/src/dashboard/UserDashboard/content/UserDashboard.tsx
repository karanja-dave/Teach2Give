import { Outlet } from "react-router"
import { Navbar } from "../../../components/nav/Navbar"
import { UserDrawer } from "../aside/UserDrawer"
import { FaBars } from "react-icons/fa";
import {  IoCloseSharp } from "react-icons/io5";
import { useState } from "react";


export const UserDashboard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    // fun handles opening and closing of drawer 
    const handleDrawerToggle=()=>{
        setDrawerOpen((prev)=>!prev)
    }
  return (
    <div>
        <Navbar/>
        {/* define bars for responsivness  */}
        <div className="flex px-4 py-4 bg-gray-700 items-center">
            <button className="mr-4 text-white text-2xl lg:hidden" onClick={handleDrawerToggle} >
                {drawerOpen?<IoCloseSharp/>:<FaBars/>}
            </button>

            <span className="text-white text-lg font-semibold">
                Welcome to your User Dashboard
            </span>
        </div>
        <div className="flex">
            {/* User drawer  */}
            <aside
                className={`
                fixed top-0 z-40 w-64 bg-gray-600
                ${drawerOpen ? "" : "hidden"}
                lg:static lg:block lg:w-64
            `}

                style={{minHeight:"100vh"}}

            >   <div>
                    <button className="absolute top-4 right-4 text-white text-2xl lg:hidden" onClick={handleDrawerToggle}>
                    <IoCloseSharp/>
                    </button>
                    <UserDrawer/>
                </div>
                
            </aside>
            <main>
                <Outlet/>
            </main>
        </div>
        
    </div>
  )
}
