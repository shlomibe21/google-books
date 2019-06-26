import React from 'react';
import { shallow, mount } from 'enzyme';

import Dashboard from './Dashboard';

describe('<Dashboard />', () => {
    it('Renders without crashing', () => {
        shallow(<Dashboard />);
    });

    it("After adding text to the search input box, searchQuery should contain the query", () => {
        const wrapper = mount(<Dashboard />);
        wrapper.find('.search-books-input').simulate("change", { target: { value: "Pride and Prejudice" } })
        expect(wrapper.state().searchQuery.length).not.toEqual(0);
        expect(wrapper.state().searchQuery).toEqual("Pride and Prejudice");
    });

    /*it("Clicking search button when search box has a query should toggles loading mode to true", () => {
        const wrapper = mount(<Dashboard />);
        wrapper.find('.search-books-input').simulate("change", { target: { value: "Pride and Prejudice" } });
        const button = wrapper.find(".search-books-button");
        button.simulate("click")
        expect(wrapper.state("loading")).toEqual(true)
        wrapper.setState({ loading: false });
    });*/

    /*it("Pressing enter when inside the search box when the search box has a query should toggles loading mode to true", () => {
        const wrapper = mount(<Dashboard />);
        let input = wrapper.find('.search-books-input');
        input.simulate("change", { target: { value: "Pride and Prejudice" } });
        expect(wrapper.state().searchQuery.length).not.toEqual(0);
        input.simulate('keydown', { keyCode: 13 });
        expect(wrapper.state("loading")).toEqual(true)
        wrapper.setState({ loading: false });
    });*/

    it("Clicking search button when search box is empty should leave loading mode unchanged - false", () => {
        const wrapper = mount(<Dashboard />);
        const button = wrapper.find(".search-books-button");
        button.simulate("click");
        expect(wrapper.state("loading")).toEqual(false);
    });
});
