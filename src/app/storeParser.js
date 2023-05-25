import store from 'app/store';

export default class storeParser {
  static activeVariant = () => {
    if (store.getState().fenMode.active) {
      return store.getState().fenMode.variant;
    } else if(store.getState().gmMode.active) {
      return store.getState().gmMode.variant;
    } else if(store.getState().pgnMode.active) {
      return store.getState().pgnMode.variant;
    } else if(store.getState().playMode.active) {
      return store.getState().playMode.variant;
    } else if(store.getState().stockfishMode.active) {
      return store.getState().stockfishMode.variant;
    }

    return false;
  };
}
