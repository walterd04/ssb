import { Joke } from "../../../types";

export const jokes: Joke[] = [
  {
    category: "Misc",
    type: "twopart",
    setup:
      "Arguing with a woman is like reading a software's license agreement.",
    delivery: 'In the end you ignore everything and click "I agree".',
    flags: {
      nsfw: false,
      religious: false,
      political: false,
    },
    id: 71,
    safe: false,
    lang: "en",
  },
  {
    category: "Pun",
    type: "twopart",
    setup: "What do you call a pile of kittens?",
    delivery: "A meowntain.",
    flags: {
      nsfw: false,
      religious: false,
      political: false,
    },
    id: 130,
    safe: true,
    lang: "en",
  },
];
