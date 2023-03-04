import React from 'react'
import { HStack, VStack, Heading, Button, Divider, TabList, Tab, Text, Circle, useDisclosure, Modal, Container } from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'
import { useContext } from 'react'
import { FriendContext } from './Chat'
import { AddFriendModal } from './AddFriendModal'
import { ConvoCard } from './ConvoCard'
import socket from '../socket'
export const Sidebar = () => {
    const {friendList,  setFriendList, conversations} = useContext(FriendContext)
    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
    <VStack>
        <HStack
        justify={'space-between'}
        px='2rem'
        minW='100%'
        >
            <Heading
            size={'md'}
            
            >
                Add Friend:
            </Heading>

            <Button
            onClick={() => onOpen()}
            >
                <ChatIcon/>
            </Button>
        </HStack>
        <Divider/>
        <VStack as={TabList}>
            {conversations.map(friend => {
                console.log(friend);
            return (<HStack
            as={Tab}
            >
                <Circle size={'20px'} bg={friend.online ? 'green' : 'red'}/>
                <Text>{friend.username}</Text>
            </HStack>)
            })}
        </VStack>
    </VStack>
    <Text>
        Conversations
    </Text>
    {conversations.map(convo => {
        console.log(conversations)
        return(<ConvoCard
        username={convo.username}
        convoId={convo.conversation_id}
        >
        </ConvoCard>)
    })}
    <AddFriendModal
        isOpen={isOpen}
        onClose={onClose}
    />
    </>
  )
}
