import React, { createContext, useEffect, useState } from 'react'
import { Grid, GridItem, Tabs, useAccordionItemState } from '@chakra-ui/react'
import { Sidebar } from './Sidebar'
import { MainChat } from './MainChat'
import useSocketSetup from '../useSocketSetup'
import { useContext } from 'react'
import { AccountContext } from './AccountContext'
export const FriendContext = createContext()

export const Chat = () => {
  useSocketSetup();
  const {user} = useContext(AccountContext)
  const [friendList, setFriendList] = useState([])
  const [conversations, setConversations] = useState([])
  
  useEffect(() => {
     const getAllUsers = async () => {
      const users = await fetch(`http://localhost:3000/friends/users/`).then(res => {
        return res.json()
      }).then((res) => {
       const friends = res.map(user => ({username: user.username, online: user.online, id: user.id}) )
       setFriendList(friends);
      })
    }
    const getConversations = async () => {
      console.log('check  ')
      const conversations = await fetch(`http://localhost:3000/friends/conversationList/${user.id}`).then(res => (res.json()))
      .then(result => setConversations(result))
    }


    getAllUsers();
    getConversations()
  },[])

  
  

  return (
    <FriendContext.Provider value={{friendList, setFriendList, conversations, setConversations}}>
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
