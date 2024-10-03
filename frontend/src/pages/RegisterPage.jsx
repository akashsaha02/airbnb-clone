import { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function registerUser(e) {
        e.preventDefault()
        // console.log(name, email, password)
        try {
            axios.post('/register', { name, email, password })
            alert('Registration successful! Please login to continue.')
        } catch (error) {
            alert('Registration failed! Please try again.')
            console.log(error)
        }
    }
    return (
        <div className="grow flex items-center justify-around ">
            <div className="mb-32">
                <h1 className="text-4xl mb-5 text-center font-semibold">Register</h1>
                <form className="max-w-sm mx-auto" onSubmit={registerUser} >
                    <input
                        className=""
                        type="text"
                        placeholder="Enter your fullname"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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
                    <button className="primary font-semibold">Register</button>
                    <div className="py-2">
                        <p className="text-center font-semibold">Already registered? <Link to={"/login"} className="text-red-700 underline">Login now</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage
