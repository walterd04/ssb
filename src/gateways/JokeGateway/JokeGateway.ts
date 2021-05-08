import axios, { AxiosInstance } from "axios";

import { Joke, JokeCategory, JokeResponse } from "../../types";
import { BASE_API_URL } from "../../constants";

class JokeGateway {
  private readonly axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: BASE_API_URL,
      timeout: 3000,
    });
  }

  public async getJokes(
    category?: JokeCategory,
    keywords?: string,
    numJokes: number = 10
  ): Promise<JokeResponse> {
    try {
      const config = {
        params: {
          amount: numJokes,
          blacklistFlags: "racist,sexist",
          contains: keywords,
        },
      };

      const { data } = await this.axiosClient.get(`${category}`, config);

      if (!data) {
        throw new Error("Could not get jokes");
      }

      this.saveJokesToSessionStorage(data.jokes);

      return data as JokeResponse;
    } catch (error) {
      throw error;
    }
  }

  private saveJokesToSessionStorage(jokes: Joke[]) {
    sessionStorage.setItem("user-jokes", JSON.stringify(jokes));
  }
}

export default new JokeGateway();
