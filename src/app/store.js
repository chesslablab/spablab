import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import Ws from 'middleware/Ws';
import wsMiddleware from 'middleware/wsMiddleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(wsMiddleware(new Ws()))
});

export default store;
