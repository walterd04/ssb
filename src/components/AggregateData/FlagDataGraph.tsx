import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

import { Joke } from "../../types";

interface FlagDataGraphProps {
  jokes: Joke[];
}

export const FlagDataGraph: React.FC<FlagDataGraphProps> = ({
  jokes,
}: FlagDataGraphProps) => {
  const [nsfw, setNsfw] = useState<number>(0);
  const [political, setPolitical] = useState<number>(0);
  const [religious, setreligious] = useState<number>(0);

  useEffect(() => {
    let numNsfw = 0;
    let numPoli = 0;
    let numReli = 0;
    jokes.forEach((joke: Joke) => {
      const { flags } = joke;
      if (flags.nsfw) {
        numNsfw++;
      }

      if (flags.political) {
        numPoli++;
      }

      if (flags.religious) {
        numReli++;
      }
    });

    setNsfw(numNsfw);
    setPolitical(numPoli);
    setreligious(numReli);
  }, [jokes]);

  const data = {
    labels: ["nsfw", "political", "religious"],
    datasets: [
      {
        label: [""],
        data: [nsfw, political, religious],
        backgroundColor: ["#566d76", "#ea31ca", "#cbfe5a"],
      },
    ],
  };

  return <Bar data={data} type="bar" />;
};
