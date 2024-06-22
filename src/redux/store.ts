import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import ProductReducer from './app/appSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  REGISTER,
  PURGE,
} from 'redux-persist';

const persistConfig = {
  key: 'appStorage',
  storage,
};

const persistedReducer = persistReducer(persistConfig, ProductReducer);

export const store = configureStore({
  reducer: { appStorage: persistedReducer },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
/* eslint-disable */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
