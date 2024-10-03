import { Outlet } from "react-router"
import Header from "./components/Header"

const Layout = () => {
  return (
    <div className="px-8 max-w-[1920px] mx-auto flex flex-col min-h-screen">
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Layout
