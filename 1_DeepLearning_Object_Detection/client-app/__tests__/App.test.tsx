import React from "react";
import { shallow } from "enzyme";
import App from "../src/App";
import "@types/jest";

describe("App", () => {
  it("should render", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toBeTruthy();
  });
});
