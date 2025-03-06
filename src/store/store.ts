import { configureStore } from "@reduxjs/toolkit";
import todosReducer from './todosApi.ts'
import userReducer from './userSlice.ts'
import { todosApi } from './todosApi.ts'


export const store = configureStore ({
    reducer: {
        todos: todosReducer,
        user: userReducer,
        [todosApi.reducerPath]: todosApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return async (api) => {
            const { todosApi } = await import('./todosApi.ts');
            return getDefaultMiddleware(api).concat(todosApi.middleware);
        };
    },
});

export type Rootstate = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch