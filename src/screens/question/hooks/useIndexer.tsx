import {useState} from 'react';

import {useAppSelector} from 'src/hooks/useAppSelector';

interface QuestionIndexer {
  /**
   * The question number
   */
  questionIndex: number;

  /**
   * Total number of questions in the `Category`
   */
  totalQuestions: number;

  /**
   * Question description
   */
  question: string;

  /**
   * Answer to the question
   */
  answer: string;

  /**
   * Fetches the next question
   */
  getNextQuestion: () => void;
}

/**
 * This hook is responsible for iterating through the `selectedCategory`'s answers.
 *
 * @returns A `QuestionIndexer` object
 *
 */
const useIndexer = (): QuestionIndexer => {
  const [questionIndex, setIndex] = useState<number>(1);

  const category = useAppSelector(state => state.category.selectedCategory);
  const questionItem = category.items[questionIndex - 1];
  const answer = questionItem.answer;

  const getNextQuestion = () => {
    setIndex(prevIndex => {
      const nextIndex = prevIndex + 1;
      if (nextIndex > category.items.length) {
        return prevIndex;
      }

      return nextIndex;
    });
  };

  return {
    answer,
    questionIndex,
    getNextQuestion,
    question: questionItem.description,
    totalQuestions: category.items.length,
  };
};

export default useIndexer;
