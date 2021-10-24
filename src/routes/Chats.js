import { useEffect } from 'react'
import { NavLink, useHistory, useParams } from "react-router-dom";
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addChat, fetchChats } from '../redux/ChatList'
import { fetchMessages,postMessage } from '../redux/MessagesSlice'
import MessageList from './MessagesList'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import styles from '../style.module.css';

 
function Chats() {

const { chatId } = useParams()
const chatlist = useSelector((state) => state.chatlist.chats)
const dispatch = useDispatch()
 
const handleMessageSubmit = (message) => {
    dispatch(postMessage(message))
}

useEffect(() => {
    dispatch(fetchChats())
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

export default withAuthenticationRequired(Chats)