import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

import { Joke } from "../../types";

interface TypeDataGraphProps {
  jokes: Joke[];
}

export const TypeDataGraph: React.FC<TypeDataGraphProps> = ({
  jokes,
}: TypeDataGraphProps) => {
  const [single, setSingle] = useState<number>(0);
  const [twoPart, setTwoPart] = useState<number>(0);

  useEffect(() => {
    let numSingle = 0,
      numTwoPart = 0;

    jokes.forEach((joke: Joke) => {
      if (joke.type === "single") {
        numSingle++;
      } else if (joke.type === "twopart") {
        numTwoPart++;
      }
    });

    setSingle(numSingle);
    setTwoPart(numTwoPart);
  }, [jokes]);

  const data = {
    labels: ["single", "twopart"],
    datasets: [
      {
        label: [""],
        data: [single, twoPart],
        backgroundColor: ["darkgrey", "#000000"],
      },
    ],
  };

  return <Bar data={data} type="bar" />;
};
