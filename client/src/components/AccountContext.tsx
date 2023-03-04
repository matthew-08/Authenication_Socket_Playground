import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { createContext } from 'react'
import { useEffect } from 'react'
import { set } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

type User = {
    loggedIn: null | boolean,
    username: string,
    id: string,
}

type UserContextType = {
    user: User   
    setUser: Dispatch<SetStateAction<User>>
}

export const AccountContext = createContext<UserContextType>({} as UserContextType)



const UserContext = ( { children }: { children: ReactNode } ) => {
    const [user, setUser] = useState<User>({ loggedIn: null, username: '', id:''})
    const navigate = useNavigate()
    useEffect(() => {
        fetch('http://localhost:3000/auth/signIn', {
            credentials: 'include',
        }).then(res => {
            if (!res || !res.ok || res.status >= 400) {
                return setUser({loggedIn: false, username: '', id: ''})
            }
            return res.json()
        }).then((result:User) => {
            setUser({...result})
            if(result.loggedIn) {
                navigate('/chat')
            }
        })
    }, [])

    return <AccountContext.Provider value ={{user, setUser}}>
            {children}
        </AccountContext.Provider>

}

export default UserContext

