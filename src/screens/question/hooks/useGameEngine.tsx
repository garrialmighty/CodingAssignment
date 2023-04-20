import {useCallback, useEffect, useState} from 'react';

import {shuffle} from 'src/util/shuffle';

export type ChoiceData = {
  letter: string;
  originIndex: number;
};

interface QuestionGameEngine {
  /**
   * Answer constructed by the player
   */
  currentAnswer: ChoiceData[];

  /**
   * Available letters
   */
  choices: ChoiceData[];

  /**
   * Flag to indicate if player has correctly guessed the answer
   */
  hasCorrectlyAnswered: boolean;

  /**
   * Select a letter from the choices
   * @param index - Index for the letter selected
   * @param choice - `ChoiceData` object selected
   */
  pickChoice: (index: number, choice: ChoiceData) => void;

  /**
   * Deselect a letter from the answer
   * @param index - Index for the letter deselected
   * @param choice - `ChoiceData` object deselected
   */
  unpickChoice: (index: number, choice: ChoiceData) => void;
}

const useGameEngine = (correctAnswer: string): QuestionGameEngine => {
  const [answerIndex, setIndex] = useState<number>(0);
  const [hasCorrectlyAnswered, setHasCorrectlyAnswered] =
    useState<boolean>(false);

  const [answer, setAnswer] = useState<ChoiceData[]>([]);
  const [choices, setChoices] = useState<ChoiceData[]>([]);

  useEffect(() => {
    type ChoiceDataMapper = (letter: string, index: number) => ChoiceData;
    const mapper: ChoiceDataMapper = (letter, index) => ({
      letter,
      originIndex: index,
    });

    const blankAnswer = Array<string>(correctAnswer.length)
      .fill('')
      .map(mapper);
    setAnswer(blankAnswer);

    const shuffledAnswer = shuffle([...correctAnswer]).map(mapper);
    setChoices(shuffledAnswer);
  }, [correctAnswer, setAnswer, setChoices]);

  const pickChoice = useCallback(
    (index: number, choice: ChoiceData) => {
      const currentAnswer = [...answer];
      currentAnswer[answerIndex] = {...choice};
      setAnswer(currentAnswer);

      const nextIndex = currentAnswer.findIndex(ans => ans.letter === '');
      setIndex(nextIndex);

      const answerString = currentAnswer.reduce(
        (currentString, currentChoice) => currentString + currentChoice.letter,
        '',
      );

      if (answerString === correctAnswer) {
        setHasCorrectlyAnswered(true);
      }

      const currentChoices = [...choices];
      currentChoices[index].letter = '';
      setChoices(currentChoices);
    },
    [
      answer,
      setAnswer,
      setIndex,
      setHasCorrectlyAnswered,
      setChoices,
      choices,
      answerIndex,
      correctAnswer,
    ],
  );

  const unpickChoice = useCallback(
    (index: number, choice: ChoiceData) => {
      const currentChoices = [...choices];
      const {originIndex, letter} = choice;
      currentChoices[originIndex].letter = letter;
      setChoices(currentChoices);

      const currentAnswer = [...answer];
      currentAnswer[index].letter = '';
      currentAnswer[index].originIndex = 0;
      setAnswer(currentAnswer);

      const nextIndex = currentAnswer.findIndex(ans => ans.letter === '');
      setIndex(nextIndex);
    },
    [choices, setChoices, answer, setAnswer, setIndex],
  );

  return {
    currentAnswer: answer,
    choices: choices,
    hasCorrectlyAnswered,
    pickChoice,
    unpickChoice,
  };
};

export default useGameEngine;
