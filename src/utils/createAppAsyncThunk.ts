import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppRootStateType} from "@/app/store";
import {AppDispatch} from "@/common/hooks/hooks";


export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType;
    dispatch: AppDispatch;
    rejectValue: string | null;
}>();
