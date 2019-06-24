import React from "react";
import Loader from "./Loader";
import { shallow } from "enzyme";

describe("<Loader />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Loader />);
  });

  it("Matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("renders a single font-awesome spinner icon", () => {
    expect(wrapper.find("i").prop("className")).toEqual("spinnerModal");
  });
});