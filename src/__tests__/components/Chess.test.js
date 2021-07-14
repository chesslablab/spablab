import React from 'react';
import { mount } from 'enzyme';
import Chess from 'components/Chess';

const props = {
  server: {
    host: '127.0.0.1',
    port: '8080'
  }
};

describe("Chess", () => {
  it("is rendered", () => {
    const wrapper = mount(<Chess props={props} />);
  });
});
