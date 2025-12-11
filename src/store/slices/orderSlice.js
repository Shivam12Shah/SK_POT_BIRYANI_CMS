import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import toast from 'react-hot-toast';

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/orders');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
        }
    }
);

export const updateOrderStatus = createAsyncThunk(
    'orders/updateStatus',
    async ({ id, status, partnerId }, { rejectWithValue }) => {
        try {
            let endpoint = '';
            let body = {};

            if (status === 'accepted') endpoint = `/orders/${id}/accept`;
            else if (status === 'cancelled') endpoint = `/orders/${id}/cancel`;
            else if (status === 'assigned') {
                endpoint = `/orders/${id}/assign`;
                body = { partnerId };
            }

            const response = await axios.post(endpoint, body);
            toast.success(`Order ${status}`);
            return response.data;
        } catch (error) {
            toast.error('Failed to update order');
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const index = state.orders.findIndex(order => order._id === action.payload._id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
            });
    },
});

export default orderSlice.reducer;
