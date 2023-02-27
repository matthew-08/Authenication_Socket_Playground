import React, { createContext, useEffect, useState } from 'react'
import { Grid, GridItem, Tabs } from '@chakra-ui/react'
import { Sidebar } from './Sidebar'
import { MainChat } from './MainChat'
import useSocketSetup from '../useSocketSetup'
import { useContext } from 'react'
import { AccountContext } from './AccountContext'

export const FriendContext = createContext()

export const Chat = () => {
  useSocketSetup();
  const {user} = useContext(AccountContext)

  
  useEffect(() => {
    /* const getFriendsList = async () => {
      const friends = await fetch(`http://localhost:3000/friends/friendsList/${user.id}`)
    }

    getFriendsList(); */
  },[])

  const [friendList, setFriendList] = useState([
    {name: 'person', online: false},
    {name: 'person', online: false},
  ])
  

  return (
    <FriendContext.Provider value={{friendList, setFriendList}}>
    <Grid
    gridTemplateColumns={'repeat(10, 1fr)'}
    h='100vh'
    as={Tabs}
    >
      <GridItem
      colSpan={3}
      borderRight='1px solid gray'
      >
      <Sidebar/>
      </GridItem>
      <GridItem
      colSpan={7}
      >
        <MainChat
        />
      </GridItem>
    </Grid>
      
    </FriendContext.Provider>
  )
}
