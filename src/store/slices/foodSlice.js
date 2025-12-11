import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import toast from 'react-hot-toast';

export const fetchFoods = createAsyncThunk(
    'food/fetchFoods',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/food');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch foods');
        }
    }
);

export const createFood = createAsyncThunk(
    'food/createFood',
    async (formData, { rejectWithValue }) => {
        try {
            // formData should be FormData object for image upload
            const response = await axios.post('/food', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success('Food item created successfully');
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create food item');
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateFood = createAsyncThunk(
    'food/updateFood',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/food/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success('Food item updated successfully');
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update food item');
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateStock = createAsyncThunk(
    'food/updateStock',
    async ({ id, action }, { rejectWithValue }) => {
        try {
            // action should be 'stock-in' or 'stock-out'
            const response = await axios.post(`/food/${id}/${action}`);
            toast.success(`Stock ${action === 'stock-in' ? 'increased' : 'decreased'}`);
            // The API returns the updated food item
            return response.data;
        } catch (error) {
            toast.error(`Failed to ${action} stock`);
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateFoodStatus = createAsyncThunk(
    'food/updateStatus',
    async ({ id, stockQty, inStock }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`/food/${id}/status`, { stockQty, inStock });
            toast.success('Status updated');
            return response.data;
        } catch (error) {
            toast.error('Failed to update status');
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteFood = createAsyncThunk(
    'food/deleteFood',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`/food/${id}`);
            toast.success('Food item deleted');
            return id;
        } catch (error) {
            toast.error('Failed to delete food item');
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

const foodSlice = createSlice({
    name: 'food',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFoods.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFoods.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchFoods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createFood.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateFood.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateStock.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateFoodStatus.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteFood.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item._id !== action.payload);
            });
    },
});

export default foodSlice.reducer;
