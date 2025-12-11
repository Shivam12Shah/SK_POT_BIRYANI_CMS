import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import foodReducer from './slices/foodSlice';
import orderReducer from './slices/orderSlice';
import partnerReducer from './slices/partnerSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        food: foodReducer,
        orders: orderReducer,
        partners: partnerReducer,
    },
});
