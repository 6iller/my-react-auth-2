
// import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
// import authReducer from '../reducers/authReducer';

// const store = configureStore({
//     reducer: {
//       auth: authReducer,
//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
//   });
  
//   export default store;
//   export type RootState = ReturnType<typeof store.getState>;


import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';

const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });
  
  export default store;