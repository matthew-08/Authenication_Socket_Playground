import { Container, Input, TabPanel, TabPanels, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useContext } from 'react'
import { Chat, FriendContext } from './Chat'
import socket from '../socket'
import { ChatPanel } from './ChatPanel'

export const MainChat = () => {
  const {friendList,  setFriendList, conversations} = useContext(FriendContext)
  const [socketChats, setSocketChats] = useState([])
  const [input, setInput] = useState('')
  return (
    <VStack>
        <TabPanels>
            {conversations.map(c => {
              return(
                <TabPanel>
                  <ChatPanel
                conversationId={c.conversation_id}
                userId={c.id}
                />
                  {/* <Container
          as={'form'}
          onSubmit={(e)=> {
            e.preventDefault()
            return handleSubmit(friend.id)}
          }
        >
          <Input
          type={'text'}
          variant='filled'
          onChange={(e) => setInput(e.target.value)}
          />
        </Container>
        <Container>
          {socketChats.map(r => {
            return(<Text>{r}</Text>)
          })}
        </Container> */}
                </TabPanel>
                
              )
            })
            }
        </TabPanels>
    </VStack>
  )
}
