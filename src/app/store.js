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

export const getActiveMode = () => {
  if (store.getState().fenMode.active) {
    return store.getState().fenMode;
  } else if(store.getState().sanMode.active) {
    return store.getState().sanMode;
  } else if(store.getState().ravMode.active) {
    return store.getState().ravMode;
  } else if(store.getState().playMode.active) {
    return store.getState().playMode;
  } else if(store.getState().stockfishMode.active) {
    return store.getState().stockfishMode;
  }

  return false;
};

export default store;
