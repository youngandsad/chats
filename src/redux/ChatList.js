import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchChats = createAsyncThunk('chatsList/fetchChats',
  async() => {
    const response = await fetch('https://inordic-messenger-api.herokuapp.com/chats')
    const chats = await response.json()
    return chats;
  }
)

export const addChat = createAsyncThunk('chatList/addChats', 
  async({title}) => {
    const response = await fetch('https://inordic-messenger-api.herokuapp.com/chats',
      {
        method: 'POST',
        body: JSON.stringify({title}),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const chats = await response.json()
    return chats;
  }
)


const initialState = {
  chats: []
}

export const  ChatList = createSlice({
  name: 'chatlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.chats = action.payload
    }),
    builder.addCase(addChat.fulfilled, (state, action) => {
      state.chats.push(action.payload)
    })
  )
    })
// Action creators are generated for each case reducer function

export default ChatList.reducer