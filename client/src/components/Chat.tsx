import React, { createContext, useState } from 'react'
import { Grid, GridItem, Tabs } from '@chakra-ui/react'
import { Sidebar } from './Sidebar'
import { MainChat } from './MainChat'

export const FriendContext = createContext()

export const Chat = () => {
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
