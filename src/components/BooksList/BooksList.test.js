import React from 'react';
import { shallow, mount } from "enzyme";

import BooksList from './BooksList';

describe("<BooksList />", () => {
    it("Renders without crashing", () => {
        shallow(<BooksList />);
    });

    it('Renders the books-container initially', () => {
        const wrapper = shallow(<BooksList />);
        expect(wrapper.find('.books-container').hasClass('books-container')).toEqual(true);
    });
});
