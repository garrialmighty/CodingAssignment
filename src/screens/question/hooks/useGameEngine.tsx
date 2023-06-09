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
   * Flag to indicate if player has selected all available letters
   */
  hasUsedAllLetters: boolean;

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

/**
 * This hook is responsible for the Question screens game logic. It keeps track of the player's selected
 * tiles forming an answer as well as the remaining letter choices. The hook is also responsible for
 * returning selected tiles back to their original position should the user decide to deselect the letter.
 *
 * @returns A `QuestionGameEngine` object
 *
 */
const useGameEngine = (correctAnswer: string): QuestionGameEngine => {
  const [answerIndex, setIndex] = useState<number>(0);
  const [hasCorrectlyAnswered, setHasCorrectlyAnswered] =
    useState<boolean>(false);
  const [hasUsedAllLetters, setHasUsedAllLetters] = useState<boolean>(false);

  const [answer, setAnswer] = useState<ChoiceData[]>([]);
  const [choices, setChoices] = useState<ChoiceData[]>([]);

  // Initializer:
  //    - Create blank answers
  //    - Converts `correctAnswer` string into `ChoiceData` array
  //    - Reset `hasCorrectlyAnswered` and `answerIndex`
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

    setHasCorrectlyAnswered(false);
    setIndex(0);
    setHasUsedAllLetters(false);
  }, [
    correctAnswer,
    setAnswer,
    setChoices,
    setHasCorrectlyAnswered,
    setIndex,
    setHasUsedAllLetters,
  ]);

  const pickChoice = useCallback(
    (index: number, choice: ChoiceData) => {
      const currentAnswer = [...answer];
      currentAnswer[answerIndex] = {...choice};
      setAnswer(currentAnswer);

      const nextIndex = currentAnswer.findIndex(ans => ans.letter === '');
      setIndex(nextIndex);

      const arrToStrReducer = (
        currentString: string,
        currentChoice: ChoiceData,
      ) => currentString + currentChoice.letter;
      const answerString = currentAnswer.reduce(arrToStrReducer, '');

      if (answerString === correctAnswer) {
        setHasCorrectlyAnswered(true);
      }

      const currentChoices = [...choices];
      currentChoices[index].letter = '';
      setChoices(currentChoices);
      const choiceString = currentChoices.reduce(arrToStrReducer, '');
      if (choiceString === '') {
        setHasUsedAllLetters(true);
      }
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
      setHasUsedAllLetters,
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

      setHasUsedAllLetters(false);
    },
    [choices, setChoices, answer, setAnswer, setIndex, setHasUsedAllLetters],
  );

  return {
    currentAnswer: answer,
    choices,
    hasCorrectlyAnswered,
    hasUsedAllLetters,
    pickChoice,
    unpickChoice,
  };
};

export default useGameEngine;
