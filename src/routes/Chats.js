import { useState, useEffect } from 'react'
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addChat, fetchChats } from '../redux/ChatList'
import { fetchMessages } from '../redux/MessagesSlice'
import { addMessage } from '../redux/MessagesSlice'
import ChatMessages from './ChatMessages'
import { messageChatSelector } from '../redux/MessagesSlice'
import MessageList from './MessagesList'
import { io } from 'socket.io-client'

import styles from '../style.module.css';

 
function Chats() {

const { chatId } = useParams()
const messages = useSelector(messageChatSelector(chatId))
const chatlist = useSelector((state) => state.chatlist.chats)
const dispatch = useDispatch()
 
const socket = io('https://inordic-messenger-api.herokuapp.com/');

const handleMessageSubmit = (message) => {
    socket.emit('new message', message)
}

useEffect(() => {
    dispatch(fetchChats())
    socket.on('new message', message => {
        dispatch(addMessage(message))
    })
    
}, [])

useEffect(() => {
    dispatch(fetchMessages({chatId}))
}, [chatId])


// const handleAddMessage = (data) => {
//     dispatch(addMessage({chatId, text: data.text}))
// };

const history = useHistory()

const handleAddChats = () => {
    const title = window.prompt('Введите название чата')
    dispatch(addChat({title}))

    // history.push(`/chats/${id}`)
}

console.log(styles.itemChat);

return (
    <div className="Chats">
        <h1>Чаты</h1>
        <button onClick={handleAddChats} className={styles.addChat}>Добавить чат</button>
       <div className={styles.chatBlock}>    
          <ul className={styles.ItemChat}>
            {chatlist.map(chat => (
                <li key={chat.id}>
                    <NavLink className = "App-link"  activeClassName = "App-link-active" to={`/chats/${chat._id}`}>{chat.title}</NavLink>
                    {/* <ChatMessages onSubmit = {handleAddMessage}></ChatMessages>    */}
                </li>
            ))}
        </ul>
        <div className={styles.messageBlock}> 
            <MessageList chatId={chatId} onSubmit={handleMessageSubmit}></MessageList>
        </div>  
        </div>
    </div>
    )
}

export default Chats 