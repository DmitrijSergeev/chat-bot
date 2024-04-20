import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, ProfileResType, RegisterResType} from "@/pages/Auth/authAPI";
import {appAction} from "@/app/appSlice";
import {createAppAsyncThunk} from "@/utils/createAppAsyncThunk";

export const slice = createSlice({
    name: 'auth',
    initialState: {
        registration: {} as RegisterResType,
        email: "",
        login: {
            access_token: "",
            token_type: "Bearer",
            expires_in: 0,
        },
        profile: {} as ProfileResType,
        me: false,
    },
    reducers: {
        getToken: (state, action: PayloadAction<{ login: { access_token: string } }>) => {
            state.login.access_token = action.payload.login.access_token;
        },
        me: (state, action: PayloadAction<{ me: boolean }>) => {
            state.me = action.payload.me;
        },
    }
})
const profile = createAppAsyncThunk<{ profile: ProfileResType }, { token: string }>(
    "auth/profile",
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        dispatch(appAction.setIsLoading({ isLocalLoading: true }));
        try {
            const res = await authAPI.profile({ token: arg.token });
            dispatch(authActions.me({ me: true }));
            // return {profile: res.data}

            /** для тестирования */
            const newRes = {
                ...res.data,
                has_access: true,
                has_used_demo: null,
                access_expiry_moment: "2025-06-29T12:48:17.185Z",
                // access_expiry_moment: null,
                // access_expiry_moment: null,
                // access_expiry_moment: null,
            };
            return { profile: newRes };
            /** для тестирования */
        } catch (e) {
            dispatch(authActions.me({ me: false }));
            return rejectWithValue(null);
        } finally {
            dispatch(appAction.setIsLoading({ isLocalLoading: false }));
        }
    },
);
export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = {
    profile
};