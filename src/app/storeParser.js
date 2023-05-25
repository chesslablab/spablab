import store from 'app/store';

export default class storeParser {
  static getActiveMode = () => {
    if (store.getState().fenMode.active) {
      return store.getState().fenMode;
    } else if(store.getState().gmMode.active) {
      return store.getState().gmMode;
    } else if(store.getState().pgnMode.active) {
      return store.getState().pgnMode;
    } else if(store.getState().playMode.active) {
      return store.getState().playMode;
    } else if(store.getState().stockfishMode.active) {
      return store.getState().stockfishMode;
    }

    return false;
  };
}
