import { appReducer } from '@/app/appSlice'
import { configureStore } from '@reduxjs/toolkit'
import {authReducer} from "@/pages/Auth/authSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
  },
})

export type AppRootStateType = ReturnType<typeof store.getState>

// @ts-ignore
window.store = store
