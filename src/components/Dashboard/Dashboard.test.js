import React from 'react';
import {shallow, mount} from 'enzyme';

import Dashboard from './Dashboard';
  
describe('<Dashboard />', () => {
    it('Renders without crashing', () => {
        shallow(<Dashboard />);
    });

    it('Renders the search button initially', () => {
        const wrapper = shallow(<Dashboard />);
        expect(wrapper.find('.search-button').hasClass('search-button')).toEqual(true);
    });
});
