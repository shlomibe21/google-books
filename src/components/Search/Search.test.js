import React from 'react';
import {shallow, mount} from 'enzyme';

import Search from './Search';
  
describe('<Search />', () => {
    it('Renders without crashing', () => {
        shallow(<Search />);
    });

    it('Renders the search button initially', () => {
        const wrapper = shallow(<Search />);
        expect(wrapper.find('.search-books-button').hasClass('search-books-button')).toEqual(true);
    });
});