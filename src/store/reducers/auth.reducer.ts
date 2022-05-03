import { createReducer } from '@reduxjs/toolkit';
import { getToken } from '../actions/auth.actions';

export interface AuthState {
    authenticated: boolean;
    loading: boolean;
    accessToken?: string;
    refreshToken?: string;
}

const initialState: AuthState = {
    authenticated: false,
    loading: false,
};

const AuthReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getToken.pending, (state) => {
            state.loading = true;
        })
        .addCase(getToken.fulfilled, (state, action) => {
            state.loading = false;
            state.accessToken = action.payload.access_token;
            state.refreshToken = action.payload.refresh_token;
        });
});

export default AuthReducer;