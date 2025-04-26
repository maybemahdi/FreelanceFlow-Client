import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './rootReducer';
import { baseApi } from './api/baseApi';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Persist only the auth slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: false,
      //   serializableCheck: {
      //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      //   },
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
