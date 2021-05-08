import React, { useState } from "react";
import styled from "styled-components";

import { Joke } from "../../types";

import safeImage from "../../assets/safe.svg";
import unsafeImage from "../../assets/unsafe.svg";

interface JokeCardProps {
  joke: Joke;
  updateJoke: (joke: Joke) => void;
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  min-height: 400px;
  height: 100%;
  box-shadow: 0 5px 0 0 #a6acbe;
  border-radius: 10px;
  background: #282c34;
  color: #ffffff;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  text-align: left;
`;

const Category = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

const Flag = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  padding: 10px 15px;
  border-radius: 999px;
  background: #e71111;
`;

const SafeOrUnsafe = styled.img`
  width: 60px;
  height: 60px;
  margin: 0 20px;
`;

const JokeText = styled.p`
  font-size: 16px;
  font-weight: bolder;
  color: #ffffff;
`;

const SetupReveal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 20px;
`;

const EditSetupReveal = styled(SetupReveal)`
  & > * {
    margin: 10px 0;
  }
`;

const Button = styled.button`
  padding: 15px 20px;
  border: 1px solid #ffffff;
  color: #282c34;
  background: #ffffff;
  border-radius: 10px;
  margin: 20px 0;
  align-self: center;
  justify-self: flex-end;
`;

const DeleteButton = styled.button`
  font-weight: bold;
`;

export const JokeCard: React.FC<JokeCardProps> = ({
  joke,
  updateJoke,
}: JokeCardProps) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [newJokeText, setNewJokeText] = useState<string | undefined>(joke.joke);
  const [newSetup, setNewSetup] = useState<string>(joke.setup);
  const [newDelivery, setNewDelivery] = useState<string>(joke.delivery);

  const onJokeChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setNewJokeText(ev.target.value);
  };

  const onSetupChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setNewSetup(ev.target.value);
  };

  const onDeliveryChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setNewDelivery(ev.target.value);
  };

  const saveJoke = () => {
    let newJoke: Joke;
    if (joke.type === "single") {
      newJoke = { ...joke, joke: newJokeText };
    } else {
      newJoke = { ...joke, setup: newSetup, delivery: newDelivery };
    }

    updateJoke(newJoke);
    setShowEdit(false);
  };

  const removeFlag = (flag: string, value: boolean) => {
    // this is ugly but keeping it for time's sake
    let newFlags = { ...joke.flags };
    if (flag === "nsfw") {
      newFlags = { ...joke.flags, nsfw: value };
    } else if (flag === "political") {
      newFlags = { ...joke.flags, political: value };
    } else if (flag === "religious") {
      newFlags = { ...joke.flags, religious: value };
    }

    const newJoke = { ...joke, flags: newFlags };
    updateJoke(newJoke);
  };

  return (
    <CardContainer>
      <FieldContainer>
        <Category>{joke.category}</Category>
        {joke.flags.nsfw && (
          <Flag>
            nsfw{" "}
            {showEdit && (
              <DeleteButton onClick={() => removeFlag("nsfw", false)}>
                x
              </DeleteButton>
            )}
          </Flag>
        )}
        {joke.flags.political && (
          <Flag>
            political{" "}
            {showEdit && (
              <DeleteButton onClick={() => removeFlag("political", false)}>
                x
              </DeleteButton>
            )}
          </Flag>
        )}
        {joke.flags.religious && (
          <Flag>
            religious{" "}
            {showEdit && (
              <DeleteButton onClick={() => removeFlag("religious", false)}>
                x
              </DeleteButton>
            )}
          </Flag>
        )}
      </FieldContainer>
      <FieldContainer>
        <SafeOrUnsafe
          src={joke.safe ? safeImage : unsafeImage}
          alt={joke.safe ? "green checkmark" : "red x mark"}
          title={joke.safe ? "safe" : "not safe"}
        />
        {!showEdit && (
          <>
            {joke.joke ? (
              <JokeText>{joke.joke}</JokeText>
            ) : (
              <SetupReveal>
                <JokeText>{joke.setup}</JokeText>
                <JokeText>{joke.delivery}</JokeText>
              </SetupReveal>
            )}
          </>
        )}
        {showEdit && (
          <>
            {joke.joke ? (
              <input
                type="text"
                value={newJokeText}
                onChange={onJokeChange}
                id="joke"
              />
            ) : (
              <EditSetupReveal>
                <input
                  type="text"
                  value={newSetup}
                  onChange={onSetupChange}
                  id="setup"
                />
                <input
                  type="text"
                  value={newDelivery}
                  onChange={onDeliveryChange}
                  id="delivery"
                />
              </EditSetupReveal>
            )}
          </>
        )}
      </FieldContainer>
      {!showEdit && (
        <Button type="button" onClick={() => setShowEdit(true)}>
          Edit Joke
        </Button>
      )}
      {showEdit && (
        <Button type="button" onClick={saveJoke}>
          Save
        </Button>
      )}
    </CardContainer>
  );
};
