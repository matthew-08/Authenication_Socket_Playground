import React, { useEffect, useState } from 'react'

export const ConvoCard = ({username, convoId}) => {
    const [latmessage, getLatMessage] = useState('')
    const latestMessage = async (id) => {
        const getLatestMessage = await fetch(`http://localhost:3000/friends/latestMessage/${id}`).then(r =>r.json())
        .then(result => getLatMessage(result.content)) 
    }
    useEffect(() => {
        latestMessage(convoId)
        console.log(latmessage)
    }, [])
  return (
    <div
    style={{border: '2px solid red'}}
    >
        <p>{username}</p>
        <p>{convoId}</p>    
        <p>latest message: {latmessage}</p>
    </div>
  )
}
