import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './order.slice';
import { useDispatch } from 'react-redux';
export const store = configureStore({
  reducer: {
    order: orderReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
