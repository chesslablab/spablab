import React, { useEffect } from 'react';
import Chess from 'components/Chess';
import { useDispatch, useSelector } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { mount } from 'enzyme';
import boardActionTypes from 'constants/boardActionTypes';
import store from 'store';

import { Provider } from 'react-redux';

const Dispatcher = (action) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action);
  }, [dispatch]);

  return { state }
};

const props = {
  server: {
    host: '127.0.0.1',
    port: '8080'
  }
};

const wrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
)

describe("Chess", () => {
  it("is rendered", () => {
    const wrapper = mount(<Chess props={props} />);
  });
  it("flips the board", () => {
    expect(store.getState().board.flip).toBe('w');
    const action = {
      type: boardActionTypes.FLIP
    }
    const { result } = renderHook(() => Dispatcher(action), { wrapper })
    expect(result.current.state.board.flip).toBe('b');
  });
});
