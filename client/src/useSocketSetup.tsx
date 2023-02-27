import React, { useEffect } from 'react'
import socket from './socket'
import { AccountContext } from './components/AccountContext'
import { useContext } from 'react'


export default function useSocketSetup() {
const {user, setUser} = useContext(AccountContext)
  useEffect(()=> {
    socket.connect()
    socket.on('connect_error', () => {
        setUser({...user, loggedIn: false})
    })
    
    return () => {
        socket.off('connect_error')
    }
  }, [])
}
