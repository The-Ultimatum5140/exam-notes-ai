import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice.js'
export default configureStore({
  reducer: {
        // Adding reducers here 
        user:userSlice
  },
})