import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './security.slice';
; // Si tu utilises le store dans Login.tsx

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;