import React from 'react';
import { shallow } from "enzyme";

import BookTile from './BookTile';

describe("<Dashboard />", () => {
    it("Renders without crashing", () => {
        shallow(<BookTile />);
    });

    it('Renders the search button initially', () => {
        const wrapper = shallow(<BookTile />);
        expect(wrapper.find('.book-title').hasClass('book-title')).toEqual(true);
    });
});