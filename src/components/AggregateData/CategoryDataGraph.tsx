import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";

import { Joke } from "../../types";

interface CategoryDataGraphProps {
  jokes: Joke[];
}

export const CategoryDataGraph: React.FC<CategoryDataGraphProps> = ({
  jokes,
}: CategoryDataGraphProps) => {
  const [programming, setProgramming] = useState<number>(0);
  const [misc, setMisc] = useState<number>(0);
  const [dark, setDark] = useState<number>(0);
  const [pun, setPun] = useState<number>(0);
  const [spooky, setSpooky] = useState<number>(0);
  const [christmas, setChristmas] = useState<number>(0);

  useEffect(() => {
    // This is ugly but for time's sake I'm keeping it.
    let numProg = 0;
    let numMisc = 0;
    let numDark = 0;
    let numPun = 0;
    let numSpook = 0;
    let numChrs = 0;

    jokes.forEach((joke: Joke) => {
      if (joke.category === "Programming") {
        numProg++;
      } else if (joke.category === "Misc") {
        numMisc++;
      } else if (joke.category === "Dark") {
        numDark++;
      } else if (joke.category === "Pun") {
        numPun++;
      } else if (joke.category === "Spooky") {
        numSpook++;
      } else if (joke.category === "Christmas") {
        numChrs++;
      }

      setProgramming(numProg);
      setMisc(numMisc);
      setDark(numDark);
      setPun(numPun);
      setSpooky(numSpook);
      setChristmas(numChrs);
    });
  }, [jokes]);

  const data = {
    labels: ["Programming", "Misc", "Dark", "Pun", "Spooky", "Christmas"],
    datasets: [
      {
        label: [""],
        data: [programming, misc, dark, pun, spooky, christmas],
        backgroundColor: [
          "#9623ae",
          "#89d920",
          "#9089c9",
          "#98bcef",
          "#517a60",
          "#a6eb2a",
        ],
      },
    ],
  };

  return <Pie data={data} type="pie" />;
};
