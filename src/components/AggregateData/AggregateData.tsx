import React from "react";
import styled from "styled-components";
import { Joke } from "../../types";

import { TypeDataGraph, CategoryDataGraph, FlagDataGraph } from "./index";

interface AggregateDataProps {
  jokes: Joke[];
}

const GraphContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const BarGraphContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

const Graph = styled.div`
  max-width: 600px;
  max-height: 400px;
`;

const GraphTitle = styled.label`
  color: #000000;
  font-size: 18px;
`;

export const AggregateData: React.FC<AggregateDataProps> = ({
  jokes,
}: AggregateDataProps) => {
  return (
    <GraphContainer>
      <BarGraphContainer>
        <Graph>
          <GraphTitle>Single or Twopart Jokes</GraphTitle>
          <TypeDataGraph jokes={jokes} />
        </Graph>
        <Graph>
          <GraphTitle>Flags (note: joke can have multiple flags)</GraphTitle>
          <FlagDataGraph jokes={jokes} />
        </Graph>
      </BarGraphContainer>
      <Graph>
        <GraphTitle>Category</GraphTitle>
        <CategoryDataGraph jokes={jokes} />
      </Graph>
    </GraphContainer>
  );
};
