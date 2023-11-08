import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { authReducer } from './auth/slice';
import { reviewsApi } from './reviews/reviewsApi';
import { tasksApi } from './tasks/tasksApi';
import storage from 'redux-persist/lib/storage';
import { emailsApi } from './emails/emailsApi';
import { localReducer } from './local/slice';
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};
const localPersistConfig = {
  key: 'local',
  storage,
};
export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    local: persistReducer(localPersistConfig, localReducer),
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [emailsApi.reducerPath]: emailsApi.reducer,
  },

  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    reviewsApi.middleware,
    tasksApi.middleware,
    emailsApi.middleware,
  ],
});

export const persistor = persistStore(store);
