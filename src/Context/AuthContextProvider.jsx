import React, { createContext, useEffect, useState } from 'react'

export let AuthContext = createContext()

export default function AuthContextProvider({ children }) {


    const [token, setToken] = useState(null)

    useEffect(() => {
        let tokenFromLocal = setToken(localStorage.getItem("token"))

        if (tokenFromLocal != null) {
            setToken(tokenFromLocal)
        }
    }, [])

    return (

        <AuthContext.Provider value={{ token, setToken }}>

            {children}

        </AuthContext.Provider>
    )
}
