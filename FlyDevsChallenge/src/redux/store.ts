/* eslint-disable no-underscore-dangle */
import {Action, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {persistStore} from 'redux-persist';
import persistedReducer, {RootState} from './rootReducer';

export type AppThunkDispatch = ThunkDispatch<
  RootState,
  Promise<any>,
  Action<string>
>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
});

export const persistor = persistStore(store);
