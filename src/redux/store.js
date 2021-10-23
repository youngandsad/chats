import { configureStore } from '@reduxjs/toolkit'
import chatlistReducer from './ChatList'
import messagesliceReducer from './MessagesSlice'
import socketMiddleware from './socketsMiddleware'

export const store = configureStore({
  reducer: {
    chatlist: chatlistReducer,
    messages: messagesliceReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(socketMiddleware),
})