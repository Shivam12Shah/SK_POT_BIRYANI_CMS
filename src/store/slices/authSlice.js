import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import toast from 'react-hot-toast';

// Async Thunks
export const sendOtp = createAsyncThunk(
    'auth/sendOtp',
    async ({ phone }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/auth/send-otp', { phone });
            toast.success(response.data.message || 'OTP sent successfully');
            return { phone };
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to send OTP';
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

export const verifyOtp = createAsyncThunk(
    'auth/verifyOtp',
    async ({ phone, otp }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/auth/verify-otp', { phone, otp });
            toast.success('Login successful');
            const data = response.data;
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            return data; // Expected to contain user data and token
        } catch (error) {
            const message = error.response?.data?.message || 'Invalid OTP';
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await axios.post('/auth/logout');
            localStorage.removeItem('token');
            return null;
        } catch (error) {
            localStorage.removeItem('token'); // Force logout on client side even if server fails
            return rejectWithValue(error.response?.data?.message || 'Logout failed');
        }
    }
);

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            // Assuming there is an endpoint to get the current user profile or similar
            // Since it's cookie based, we might try to fetch /api/auth/me or verify via a protected route
            // For now, if no explicit "me" endpoint interacts with the cookie, we assume session persists until 401
            // However, usually there is a way to re-hydrate state.
            // If no endpoint provided, we might need to rely on localStorage persistence for purely UI state
            // or add a dummy call to a protected endpoint.
            // Let's assume we store user info in localStorage for "persistence" across reloads if API doesn't support 'me'
            const storedUser = localStorage.getItem('user');
            if (storedUser) return JSON.parse(storedUser);
            return null;
        } catch (error) {
            return rejectWithValue('Not authenticated');
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        isAuthenticated: !!localStorage.getItem('user'),
        loading: false,
        error: null,
        phone: null, // Temporary storage for phone during OTP flow
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Send OTP
            .addCase(sendOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.phone = action.payload.phone;
            })
            .addCase(sendOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Verify OTP
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user || action.payload;
                state.phone = null;
                localStorage.setItem('user', JSON.stringify(state.user));
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
