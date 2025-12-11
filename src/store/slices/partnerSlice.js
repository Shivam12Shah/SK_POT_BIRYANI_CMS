import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import toast from 'react-hot-toast';

export const fetchPartners = createAsyncThunk(
    'partners/fetchPartners',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/partners');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch partners');
        }
    }
);

export const createPartner = createAsyncThunk(
    'partners/createPartner',
    async (partnerData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/partners', partnerData);
            toast.success('Partner added successfully');
            return response.data;
        } catch (error) {
            toast.error('Failed to add partner');
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updatePartner = createAsyncThunk(
    'partners/updatePartner',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/partners/${id}`, data);
            toast.success('Partner updated');
            return response.data;
        } catch (error) {
            toast.error('Failed to update partner');
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deletePartner = createAsyncThunk(
    'partners/deletePartner',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`/partners/${id}`);
            toast.success('Partner deleted');
            return id;
        } catch (error) {
            toast.error('Failed to delete partner');
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

const partnerSlice = createSlice({
    name: 'partners',
    initialState: {
        partners: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPartners.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPartners.fulfilled, (state, action) => {
                state.loading = false;
                state.partners = action.payload;
            })
            .addCase(fetchPartners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createPartner.fulfilled, (state, action) => {
                state.partners.push(action.payload);
            })
            .addCase(updatePartner.fulfilled, (state, action) => {
                const index = state.partners.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.partners[index] = action.payload;
                }
            })
            .addCase(deletePartner.fulfilled, (state, action) => {
                state.partners = state.partners.filter(p => p._id !== action.payload);
            });
    },
});

export default partnerSlice.reducer;
