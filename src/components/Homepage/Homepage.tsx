import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Joke } from "../../types";

import { JokeOptions } from "../JokeOptions";
import { JokesGrid } from "../JokesGrid";
import { AggregateData } from "../AggregateData";

const HomepageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Homepage: React.FC = () => {
  // In an actual application, I would be using context or some other state management instead of this component
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [showJokes, setShowJokes] = useState<boolean>(false);
  const [showGraphs, setShowGraphs] = useState<boolean>(false);

  useEffect(() => {
    const sessionJokes = sessionStorage.getItem("user-jokes");
    if (sessionJokes) {
      setJokes(JSON.parse(sessionJokes));
      setShowJokes(true);
    }
  }, []);

  useEffect(() => {
    if (jokes && jokes.length > 0) {
      setShowJokes(true);
      // using session storage to mimic persistent state management or database calls
      sessionStorage.setItem("user-jokes", JSON.stringify(jokes));
    } else {
      setShowJokes(false);
    }
  }, [jokes]);

  // You could use react-router here but for speed I'm not going to.
  return (
    <HomepageContainer>
      <JokeOptions
        setJokes={setJokes}
        setShowGraphs={setShowGraphs}
        showGraphs={showGraphs}
      />
      {showGraphs && jokes && jokes.length > 0 && (
        <AggregateData jokes={jokes} />
      )}
      {showJokes && !showGraphs ? (
        <JokesGrid jokes={jokes} updateJokes={setJokes} />
      ) : (
        <div>
          No jokes are available right now. Or you're on the wrong view.
        </div>
      )}
    </HomepageContainer>
  );
};
