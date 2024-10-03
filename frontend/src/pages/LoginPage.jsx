import { Link, Navigate } from "react-router-dom"
import { useState,useContext  } from 'react'
import axios from 'axios'
import { UserContext } from "../UserContext"

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)

    const {setUser}= useContext(UserContext)

    async function handleLoginSubmit(e) {
        e.preventDefault()
        try {
            const response = await axios.post('/login', { email, password },{withCredentials:true})
            if (response.data.success) {
                alert('Login successful! Welcome ' + response.data.name)
                setUser(response.data)
                setRedirect(true)
            } else {
                alert('Login failed! Please try again.')
            }
        } catch (error) {
            alert('Login failed! Please try again.')
            console.log(error)
        }
    }

    if (redirect) {
        return <Navigate to="/" />
    }
    return (
        <div className="grow flex items-center justify-around ">
            <div className="mb-32">
                <h1 className="text-4xl mb-5 text-center font-semibold">Login</h1>
                <form className="max-w-sm mx-auto" onSubmit={handleLoginSubmit} >
                    <input
                        className=""
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className=""
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="primary font-semibold">Login</button>
                    <div className="py-2">
                        <p className="text-center font-semibold">Don&apos;t have an account yet? <Link to={"/register"} className="text-red-700 underline">Register now</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default LoginPage
