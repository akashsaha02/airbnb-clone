import axios from 'axios';
import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext({});



export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!user) {
            axios.get('/profile')
                .then(({ data }) => {
                    setUser(data.success ? data : null)
                    setLoading(false)
                })
        }
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    )
}