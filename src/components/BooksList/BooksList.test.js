import React from 'react';
import { shallow } from "enzyme";

import BooksList from './BooksList';

describe("<BooksList />", () => {
    it("Renders without crashing", () => {
      shallow(<BooksList />);
    });
  });
  