import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AuthService from '../../services/auth.service';

export const getToken = createAsyncThunk('LOGIN', async (payload: { code: string, state: string }, { rejectWithValue }) => {
    try {
        const response = await AuthService.getToken(payload.code, payload.state);

        return response.data;

    } catch (exception) {
        if (axios.isAxiosError(exception)) {
            return rejectWithValue(exception);
        }
        throw exception;
    }
});

// export const login = createAction('LOGIN', function triggerLogin{
//     return {

//     }
// })