import React from "react";
import { JokesGrid } from "../JokesGrid";
import { render } from "@testing-library/react";
// eslint-disable-next-line jest/no-mocks-import
import { jokes } from "../__mocks__";

describe("UI Tests", () => {
  it("Should render without crashing, matches snapshot", () => {
    const { baseElement } = render(
      <JokesGrid jokes={jokes} updateJokes={jest.fn()} />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("Should render the correct joke category", () => {
    const { getByText } = render(
      <JokesGrid jokes={jokes} updateJokes={jest.fn()} />
    );

    expect(getByText("Misc")).toBeTruthy();
    expect(getByText("Pun")).toBeTruthy();
  });
});
