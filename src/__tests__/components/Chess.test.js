import React from 'react';
import { mount } from 'enzyme';
import Chess from 'components/Chess';

describe("Chess", () => {
  it("should render", () => {
    const wrapper = mount(<Chess />);
  });
});
