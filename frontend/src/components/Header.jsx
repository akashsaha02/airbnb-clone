import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../UserContext"

const Header = () => {
    const { user } = useContext(UserContext)

    return (
        <header className='py-4 flex items-center justify-between flex-wrap grid-cols-2 md:flex-nowrap'>

            {/* <------------ Responsive Header Components --------------> */}
            <div className='flex items-center justify-between w-full md:w-auto md:hidden'>
                {/* Logo start */}
                <Link to='/' className='flex items-center gap-1 my-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 -rotate-90">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    <span className='font-bold text-xl'>airbnc</span>
                </Link>
                {/* Logo end */}

                {/* User Start */}
                <div className='flex items-center border-2 border-gray-400 py-2 px-4 rounded-full font-semibold gap-2 my-2 md:ml-4 '>
                    {/* Menu Icon Start */}
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                    {/* Menu Icon End */}
                    {/* User Icon Start */}
                    <Link to={!user ? "/login" : "/account"} className="text-gray-500 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                        </svg>
                        <div className="text-black">
                            {user ? user.name : "Login"}
                        </div>
                    </Link>
                    {/* User Icon End */}
                </div>
                {/* User End */}
            </div>
            {/* <------------------ Responsive Header Components End -------------------> */}


            {/* <------------ Header Components------------> */}
            {/* Logo start */}
            <div className="hidden md:block">
                <Link to='/' className='flex items-center gap-1 mb-2 md:mb-0'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 -rotate-90">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    <span className='font-bold text-xl'>airbnc</span>
                </Link>
            </div>
            {/* Logo end */}
            {/* Search Start */}
            <div className='flex justify-center border-2 border-gray-400 py-2 px-4 rounded-full font-semibold gap-4 shadow-md w-full md:w-auto md:mb-0'>
                <div>Anywhere</div>
                <div className='border-l border-gray-400'></div>
                <div>Any week</div>
                <div className='border-l border-gray-400'></div>
                <div>Any guests</div>
                <button className='bg-red-500 text-white p-1 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>
            {/* Search End */}
            {/* User Start */}
            <div className="hidden md:block">
                <div className='flex items-center border-2  border-gray-400 py-2 px-4 rounded-full font-semibold gap-2 w-full  md:w-auto'>
                    {/* Menu Icon Start */}
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                    {/* Menu Icon End */}
                    {/* User Icon Start */}
                    <Link to={!user ? "/login" : "/account"} className="text-gray-500 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                        </svg>
                        <div className="text-black">
                            {user ? user.name : "Login"}
                        </div>
                    </Link>
                    {/* User Icon End */}
                </div>
            </div>
            {/* User End */}
        </header>
    )
}

export default Header
