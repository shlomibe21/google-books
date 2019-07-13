import React from 'react';
import { shallow, mount } from 'enzyme';
import { waitForState } from 'enzyme-async-helpers';

import { defaultMaxResults, defaulStartIndex, errorMsgNotFound } from '../../config';

import Dashboard from './Dashboard';

describe('<Dashboard />', () => {
    beforeEach(function () {
        // Sometime we need more time for the tests
        jest.setTimeout(30000)
    });

    it('Renders without crashing', () => {
        shallow(<Dashboard />);
    });

    it('Renders the Next items button initially', () => {
        const wrapper = shallow(<Dashboard />);
        expect(wrapper.find('.next-items-button').hasClass('next-items-button')).toEqual(true);
    });

    it('Renders the Prev items button initially', () => {
        const wrapper = shallow(<Dashboard />);
        expect(wrapper.find('.prev-items-button').hasClass('prev-items-button')).toEqual(true);
    });

    it('Calling handleLoadingState should set the required state', () => {
        const wrapper = shallow(<Dashboard />);
        wrapper.instance().handleLoadingState(true);
        expect(wrapper.state().loading).toBe(true);
        wrapper.instance().handleLoadingState(false);
        expect(wrapper.state().loading).toBe(false);
    });

    it('Calling fetchResultsFailure with err.message should be echoed', () => {
        const err = {
            message: "I Could not find any book"
        }
        const wrapper = shallow(<Dashboard />);
        wrapper.instance().fetchResultsFailure(err);
        expect(wrapper.state().errors).toEqual("I Could not find any book");
    });

    it('Calling fetchResultsFailure with simple error message should display a generic message', () => {
        const wrapper = shallow(<Dashboard />);
        wrapper.instance().fetchResultsFailure("I Could not find any book");
        expect(wrapper.state().errors).toEqual(errorMsgNotFound);
    });

    it("After adding text to the search input box, searchQuery should contain the query", () => {
        const wrapper = mount(<Dashboard />);
        wrapper.find('.search-books-input').simulate("change", { target: { value: "Pride and Prejudice" } })
        expect(wrapper.state().searchQuery.length).not.toEqual(0);
        expect(wrapper.state().searchQuery).toEqual("Pride and Prejudice");
        expect(wrapper.state().searchQueryChanged).toEqual(true);
    });

    it('Calling handleSearchNextItems and then handleSearchPrevItems should increment and then decrement currentStartIndex', () => {
        const wrapper = shallow(<Dashboard />);
        wrapper.instance().handleSearchNextItems();
        expect(wrapper.state().currentStartIndex).toEqual(defaulStartIndex + defaultMaxResults);
        wrapper.instance().handleSearchPrevItems();
        expect(wrapper.state().currentStartIndex).toEqual(defaulStartIndex);
    });

    it("Clicking search button when search box has a query should toggles loading mode to true and then to false", async () => {
        const wrapper = mount(<Dashboard />);
        wrapper.find('.search-books-input').simulate("change", { target: { value: "Pride and Prejudice" } });
        const button = wrapper.find(".search-books-button");
        await button.simulate("click");
        await waitForState(wrapper, state => state.loading === true);
        expect(wrapper.state().loading).toBe(true);
        await waitForState(wrapper, state => state.loading === false);
        expect(wrapper.state().loading).toBe(false);
    });

    it("Pressing enter when inside the search box when the search box has a query should toggles loading mode to true and then to false", async () => {
        const wrapper = mount(<Dashboard />);
        let input = wrapper.find('.search-books-input');
        input.simulate("change", { target: { value: "Pride and Prejudice" } });
        expect(wrapper.state().searchQuery.length).not.toEqual(0);
        await input.simulate('keydown', { keyCode: 13 });
        await waitForState(wrapper, state => state.loading === true);
        expect(wrapper.state().loading).toBe(true);
        await waitForState(wrapper, state => state.loading === false);
        expect(wrapper.state().loading).toBe(false);
    });

    it("Clicking search button when search box is empty should leave loading mode unchanged (false) and books empty", async () => {
        const wrapper = mount(<Dashboard />);
        const button = wrapper.find(".search-books-button");
        await button.simulate("click");
        await waitForState(wrapper, state => state.loading === false);
        expect(wrapper.state().loading).toBe(false);
        expect(wrapper.state().books).toEqual([]);
    });

    it("Fetch books should be successful upon clicking on search button when search box has a valid query", async () => {
        const wrapper = mount(<Dashboard />);
        wrapper.find('.search-books-input').simulate("change", { target: { value: "Pride and Prejudice" } });
        const button = wrapper.find(".search-books-button");
        await button.simulate("click");
        // We need to wait for loading state to be false this is an indication that fetch ended
        await waitForState(wrapper, state => state.loading === false);
        expect(wrapper.state().loading).toBe(false);
        expect(wrapper.state().errors.length).toEqual(0);
        expect(wrapper.state().books).not.toEqual([]);
        expect(wrapper.state().books.items.length).toBeGreaterThan(0);
        expect(wrapper.state().currentStartIndex).toEqual(defaulStartIndex);
        expect(wrapper.state().prevStartIndex).toEqual(wrapper.state().currentStartIndex);
        expect(wrapper.state().searchQueryChanged).toEqual(false);
    });

    it("Clicking next-items-button should increment the currentStartIndex and clicking prev-items-button should decrement it", async () => {
        const wrapper = mount(<Dashboard />);
        // First we need to perform a search
        wrapper.find('.search-books-input').simulate("change", { target: { value: "Pride and Prejudice" } });
        const button = wrapper.find(".search-books-button");
        await button.simulate("click");
        // We need to wait for loading state to be false this is an indication that fetch ended
        await waitForState(wrapper, state => state.loading === false);
        expect(wrapper.state().loading).toBe(false);
        // Click on nextItemsButton, wait for fetch to end, and check states
        const nextItemsButton = wrapper.find(".next-items-button");
        await nextItemsButton.simulate("click");
        await waitForState(wrapper, state => state.loading === false);
        expect(wrapper.state().currentStartIndex).toEqual(defaulStartIndex + defaultMaxResults);
        expect(wrapper.state().prevStartIndex).toEqual(wrapper.state().currentStartIndex);
        // Click on prevItemsButton, wait for fetch to end, and check states
        const prevItemsButton = wrapper.find(".prev-items-button");
        await prevItemsButton.simulate("click");
        await waitForState(wrapper, state => state.loading === false);
        expect(wrapper.state().currentStartIndex).toEqual(defaulStartIndex);
        expect(wrapper.state().prevStartIndex).toEqual(wrapper.state().currentStartIndex);
    });
});
