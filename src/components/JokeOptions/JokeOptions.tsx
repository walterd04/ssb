import React, { useState } from "react";
import styled from "styled-components";

import { jokeGateway } from "../../gateways";
import { Joke, JokeCategory } from "../../types";

import { Dropdown } from "./Dropdown";

interface JokeOptionsProps {
  setJokes: React.Dispatch<React.SetStateAction<Joke[]>>;
  setShowGraphs: React.Dispatch<React.SetStateAction<boolean>>;
  showGraphs: boolean;
}

const JokeOptionsContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  box-shadow: 10px 5px 5px 10px #a6acbe;
  border-radius: 10px;
  background: #ffffff;
  margin: 40px 0;
  padding: 70px 20px;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  justify-self: center;
  color: #000000;
  text-decoration: underline;
`;

const FormFieldContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 80%;
  justify-content: space-around;
  align-self: center;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    margin-right: 10px;
  }
`;

const Label = styled.label`
  font-size: 16px;
  justify-self: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-self: center;
  & > * {
    margin-right: 15px;
  }
`;

const SubmitButton = styled.button`
  padding: 15px;
  border: 1px solid #282c34;
  color: #ffffff;
  background: #282c34;
  border-radius: 10px;
  width: 200px;
  margin: 20px 0;
  align-self: center;
  margin-right: 20px;
`;

export const JokeOptions: React.FC<JokeOptionsProps> = ({
  setJokes,
  setShowGraphs,
  showGraphs,
}: JokeOptionsProps) => {
  const [numJokes, setNumJokes] = useState<number>(10);
  const [category, setCategory] = useState<JokeCategory>("Any");
  const [keywords, setKeywords] = useState<string>("");

  const categoryItems = [
    { label: "Programming", value: "Programming" },
    { label: "Misc", value: "Misc" },
    { label: "Dark", value: "Dark" },
    { label: "Pun", value: "Pun" },
    { label: "Spooky", value: "Spooky" },
    { label: "Christmas", value: "Christmas" },
    { label: "Any", value: "Any" },
  ];

  const submitForm = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const response = await jokeGateway.getJokes(category, keywords, numJokes);
    if (
      response &&
      !response.error &&
      response.jokes &&
      response.jokes.length > 0
    ) {
      setJokes(response.jokes);
    }
  };

  const onNumJokesChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setNumJokes((ev.target.value as unknown) as number);
  };

  const onKeywordsChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(ev.target.value);
  };

  const onShowGraphsClick = (ev: any) => {
    ev.preventDefault();
    setShowGraphs(!showGraphs);
  };

  return (
    <JokeOptionsContainer onSubmit={submitForm}>
      <Header>Welcome to the Random Joke Generator</Header>
      <FormFieldContainer>
        <FormField>
          <Label htmlFor="typeDropdown">Select Type of Joke:</Label>
          <Dropdown
            id="typeDropdown"
            placeholder={category || "Select category"}
            items={categoryItems}
            onChangeEventHandler={(item: any) => setCategory(item.value)}
          />
        </FormField>
        <FormField>
          <Label htmlFor="numJokes">Number of Jokes:</Label>
          <input
            type="number"
            id="numJokes"
            value={numJokes}
            onChange={onNumJokesChange}
          />
        </FormField>
        <FormField>
          <Label>Keyword(s):</Label>
          <input
            type="text"
            id="keywords"
            value={keywords}
            onChange={onKeywordsChange}
          />
        </FormField>
      </FormFieldContainer>
      <ButtonContainer>
        <SubmitButton
          type="submit"
          onSubmit={submitForm}
          data-testid="get-jokes-button"
        >
          Get Jokes
        </SubmitButton>
        <SubmitButton onClick={onShowGraphsClick}>
          Toggle Graphs/Jokes
        </SubmitButton>
      </ButtonContainer>
    </JokeOptionsContainer>
  );
};
