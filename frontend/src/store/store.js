import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth/authSlice.js"
import promptReducer  from "../features/prompt/promptSlice.js"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    prompt: promptReducer,
  },
})