import React from "react";
import styled from "styled-components";

import { Joke } from "../../types";

import { JokeCard } from "../JokeCard";

interface JokesGridProps {
  jokes: Joke[];
  updateJokes: React.Dispatch<React.SetStateAction<Joke[]>>;
}

const JokesGridContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;
  padding: 20px;
  & > div {
    margin: 20px 20px;
  }
`;

export const JokesGrid: React.FC<JokesGridProps> = ({
  jokes,
  updateJokes,
}: JokesGridProps) => {
  const updateJoke = (joke: Joke) => {
    const updatedJokes = jokes.map((existingJoke: Joke) => {
      if (joke.id === existingJoke.id) {
        return joke;
      }

      return existingJoke;
    });

    updateJokes(updatedJokes);
  };

  return (
    <JokesGridContainer>
      {jokes.map((joke: Joke) => (
        <JokeCard key={joke.id} joke={joke} updateJoke={updateJoke} />
      ))}
    </JokesGridContainer>
  );
};
