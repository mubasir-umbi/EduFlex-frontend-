import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/userSlices/authSlice'
import { apiSlice } from './slices/apiSlice';
import tutorAuthReducer from './slices/tutorSlices/tutorAuthSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    tutorAuth: tutorAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
