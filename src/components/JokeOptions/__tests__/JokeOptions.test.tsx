import React from "react";
import { JokeOptions } from "../JokeOptions";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { jokeGateway } from "../../../gateways";

jest.mock("../../../gateways/JokeGateway");

describe("UI tests", () => {
  it("Renders without crashing, matches snapshot", () => {
    const { baseElement } = render(
      <JokeOptions
        setJokes={jest.fn()}
        setShowGraphs={jest.fn()}
        showGraphs={false}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });
});

describe("Functionality tests", () => {
  it("should call gateway when button is clicked", async () => {
    const { getByTestId } = render(
      <JokeOptions
        setJokes={jest.fn()}
        setShowGraphs={jest.fn()}
        showGraphs={false}
      />
    );

    const getButton = getByTestId("get-jokes-button");
    fireEvent.click(getButton);
    await waitFor(() => {
      expect(jokeGateway.getJokes).toBeCalled();
    });
  });
});
