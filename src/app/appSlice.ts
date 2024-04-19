import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type ThemeType = 'dark' | 'light' | null

const slice = createSlice({
  initialState: {
    theme: null as ThemeType,
  },
  name: 'app',
  reducers: {
    setTheme: (state, action: PayloadAction<{ typeTheme: ThemeType }>) => {
      state.theme = action.payload.typeTheme
    },
  },
})

export const appReducer = slice.reducer
export const appAction = slice.actions
