import { Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import socket from '../socket'
import  { AccountContext } from './AccountContext'
import { useContext } from 'react'

export const ChatPanel = ({conversationId, userId}) => {
    const { user } = useContext(AccountContext)
    const [input, setInput] = useState('')
    const [messageHistory, setMessageHistory] = useState([])
    const [socketChats, setSocketChats] = useState([])
    socket.on('chat_message', (msg) => {
        setSocketChats([...socketChats, msg])
      })
    const handleSubmit = async () => {
        console.log(user)
        setSocketChats([...socketChats, input])
        console.log(socketChats);
        socket.emit('private_chat', {
            to: userId,
            message: input,
        })
    const insertIntoDatabase = await fetch('http://localhost:3000/friends/newMessage', {
            body: JSON.stringify({
                sender: user.id,
                time: new Date(Date.now()).toISOString(),
                content: input,
                conversationId: conversationId,        
                }),
            method: 'POST',
            credentials: 'include',
            headers:  {
                "Content-Type": 'application/json' 
            },
    }).then(res => console.log(res));
    }
    useEffect(() => {
        const getAllMessages = async () => {
            const allMessage = await fetch(`http://localhost:3000/friends/conversation/${conversationId}`)
            .then(res => res.json())
            .then(r => setMessageHistory(r))
        }
        getAllMessages()
    }, [])
  return (
    <div>hellooooo {conversationId}
    <div>
    {socketChats.map(chat => {
            return(<p>socketchat: {chat}</p>)
        })}
    </div>
    <div>
        {messageHistory && messageHistory.map(e => {
            return <div>
                <p>{e.time}</p>
                <p>{e.content}</p>
            </div>
        })}
    </div>
    <Input
    type={'text'}
    variant='filled'
    onChange={(e) => setInput(e.target.value)}
    />
    <button
    onClick={() => handleSubmit()}
    >
CLICK TO SUBMIT
    </button>
    </div>

  )
}
