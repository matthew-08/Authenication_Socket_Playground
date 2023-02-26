import React from 'react'
import { HStack, VStack, Heading, Button, Divider, TabList, Tab, Text, Circle, useDisclosure, Modal } from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'
import { useContext } from 'react'
import { FriendContext } from './Chat'
import { AddFriendModal } from './AddFriendModal'
export const Sidebar = () => {
    const {friendList,  setFriendList} = useContext(FriendContext)
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
            {friendList.map(friend => {
            return (<HStack
            as={Tab}
            >
                <Circle size={'20px'} bg='tomato'/>
                <Text>{friend.name}</Text>
            </HStack>)
            })}
        </VStack>
    </VStack>
    <AddFriendModal
    isOpen={isOpen}
    onClose={onClose}
    />
    </>
  )
}
