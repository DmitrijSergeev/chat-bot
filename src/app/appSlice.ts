import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {createAppAsyncThunk} from "@/utils/createAppAsyncThunk";
import {getTokenInLocalStorage} from "@/utils/localStorageUtils";
import {authActions, authThunks} from "@/pages/Auth/authSlice";

export type ThemeType = 'dark' | 'light' | null

const slice = createSlice({
  initialState: {
    theme: null as ThemeType,
    isInitialized: false,
    actualDate: null as number | null,
    isLocalLoading: false
  },
  name: 'app',
  reducers: {
    setTheme: (state, action: PayloadAction<{ typeTheme: ThemeType }>) => {
      state.theme = action.payload.typeTheme
    },
    setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      // console.log(current(state)); // показать стейт
      state.isInitialized = action.payload.isInitialized;
    },
    setActualDate: (state, action: PayloadAction<{ actualDate: null | number }>) => {
      state.actualDate = action.payload.actualDate;
    },
    setIsLoading: (state, action: PayloadAction<{ isLocalLoading: boolean }>) => {
      state.isLocalLoading = action.payload.isLocalLoading;
    },
  },
})

export const initializeApp = createAppAsyncThunk("app/initializeApp", async (_, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;
  dispatch(appAction.setIsInitialized({ isInitialized: false }));
  const token = getTokenInLocalStorage("tokenChatBot");
  const actualDate = new Date().getTime();
  dispatch(authActions.getToken({ login: { access_token: token } }));
  dispatch(appAction.setActualDate({ actualDate: actualDate }));

  try {
    await dispatch(authThunks.profile({ token: token }));
    // dispatch(authActions.me({me: true}));
  } catch (error) {
    dispatch(authActions.me({ me: false }));
    rejectWithValue(null);
  } finally {
    dispatch(appAction.setIsInitialized({ isInitialized: true }));
  }
});

export const appReducer = slice.reducer
export const appAction = slice.actions
export const appThunks = { initializeApp };
