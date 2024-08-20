import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// Define a type for the slice state
export interface UserState {
    accessToken: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
    accessToken: null,
};

// Create a slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setTokens: (state, action: PayloadAction<{ accessToken: string }>) => {
            state.accessToken = action.payload.accessToken;
        },
        clearTokens: (state) => {
            state.accessToken = null;
            Cookies.remove('refreshToken');
        },
    },
});

// Export the actions
export const { setTokens, clearTokens } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;