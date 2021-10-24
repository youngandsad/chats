import { useState } from "react"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addMessage } from '../redux/MessagesSlice'
import ChatMessages from './ChatMessages'
import { messageChatSelector } from '../redux/MessagesSlice'
import styles from '../style.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import userEvent from "@testing-library/user-event"

function MessageList({chatId, onSubmit}) {

    const messages = useSelector(messageChatSelector(chatId))
    console.log(messages)
    const { user } = useAuth0();

    const handleAddMessage = (data) => {
        const newMessage = {
             chatId, 
             text: data.text,
             name: user.name
        }
        onSubmit(newMessage)

    };
    
    return (
        <div className={styles.MessageContent}>
                <div className={styles.activeChat}>Активный чат {chatId}</div>

        <div className={styles.MessageList}>
        <div className={styles.messages}>
            {messages.map(message => (
                            <div key={message.id} className={styles.text}><div>{message.name}</div> {message.text}</div> 
                    ))}
        </div>
        <ChatMessages onSubmit = {handleAddMessage}></ChatMessages>   
            </div>
        </div>

    )
}

export default MessageList