import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  chats: {}
}

export const fetchMessages = createAsyncThunk('messageList/fetchMessages',
async({chatId}) => {
  const response = await fetch(`https://inordic-messenger-api.herokuapp.com/chats/${chatId}/messages`)
  const messages = await response.json()
  return {chatId, messages};
  }
)


export const  MessagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
        const {chatId, text} = action.payload
        const messages = state.chats[chatId]?.messages || []
        const newMessage = {
          id: messages.length, 
          text: text
        }
        if(!state.chats[chatId]) {
            state.chats[chatId] = {
                messages: [newMessage]
            }
        } else {
        state.chats[chatId].messages = [...messages, newMessage]
        }
      }, 
      postMessage: () => {
        
      } 
  },
  extraReducers: (builder) => (
    builder.addCase(fetchMessages.fulfilled, (state, action) => {

    const {chatId, messages} = action.payload
    if(!state.chats[chatId]) {
      state.chats[chatId] = {
          messages: messages
      }
     } else {
        state.chats[chatId].messages = messages
      }
    })
  )
})


// Action creators are generated for each case reducer function
export const { addMessage, postMessage } = MessagesSlice.actions

export const messageChatSelector = chatId => state => (state.messages.chats[chatId]?.messages || [])

export default MessagesSlice.reducer