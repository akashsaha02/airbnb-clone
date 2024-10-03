import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Navigate, useParams } from "react-router"
import { Link } from "react-router-dom"
import axios from "axios"
import PlacesPage from "./PlacesPage"
import AccountNav from "../components/AccountNav"


const AccountPage = () => {
    const { user, loading, setUser } = useContext(UserContext)
    const [redirect, setRedirect] = useState(null)
    let { subpage } = useParams();


    async function logout() {
        await axios.post('/logout')
        setRedirect('/')
        setUser(null)
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    if (loading) {
        return <div className="text center my-auto mx-auto text-3xl">Loading...</div>
    }
    if (!loading && !user && !redirect) {
        return <Navigate to="/login" />
    }
    if (subpage === undefined) {
        subpage = 'profile'
    }

    return (
        <div>
            <AccountNav />
            {subpage === "profile" && (
                <div className="text-center max-w-lg  mx-auto">
                    <p className="my-4 text-xl">Logged in as <span className="font-semibold">{user.name}</span></p>
                    <button onClick={logout} className="primary max-w-sm">Log out</button>
                </div>
            )}
            {subpage === "places" && (<PlacesPage />)}

        </div>
    )
}

export default AccountPage