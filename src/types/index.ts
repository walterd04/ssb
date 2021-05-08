export type JokeCategory =
  | "Programming"
  | "Misc"
  | "Dark"
  | "Pun"
  | "Spooky"
  | "Christmas"
  | "Any";

export type JokeType = "single" | "twopart";

export interface Flags {
  nsfw: boolean;
  religous: boolean;
  political: boolean;
}

export interface Joke {
  id: number;
  category: JokeCategory;
  type: JokeType;
  joke?: string;
  setup: string;
  delivery: string;
  flags: Flags;
  safe: boolean;
  lang: string;
}

export interface JokeResponse {
  error: boolean;
  amount: number;
  jokes: Joke[];
}
