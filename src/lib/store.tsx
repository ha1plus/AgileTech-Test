import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './features/user/userSlice';
import postsReducer from './features/post/postSlice';
import tagsReducer from './features/tag/tagSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: usersReducer,
      post: postsReducer,
      tag: tagsReducer,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']