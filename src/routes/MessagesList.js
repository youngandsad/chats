import { useState } from "react"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addMessage } from '../redux/MessagesSlice'
import ChatMessages from './ChatMessages'
import { messageChatSelector } from '../redux/MessagesSlice'
import styles from '../style.module.css';

function MessageList({chatId, onSubmit}) {

    const messages = useSelector(messageChatSelector(chatId))
    console.log(messages)
    
    const handleAddMessage = (data) => {
        const newMessage = {
             chatId, 
             text: data.text
        }
        onSubmit(newMessage)

    };
    
    return (
        <div className={styles.MessageContent}>
                <div className={styles.activeChat}>Активный чат {chatId}</div>

        <div className={styles.MessageList}>
        <div className={styles.messages}>
            {messages.map(message => (
                        <div key={message.id} className={styles.text}>{message.text}</div>   
                    ))}
        </div>
        <ChatMessages onSubmit = {handleAddMessage}></ChatMessages>   
            </div>
        </div>

    )
}

export default MessageList