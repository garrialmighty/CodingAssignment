import {renderHook, act} from '@testing-library/react-hooks';

import {DefaultCategories} from 'src/data/categories';

import useGameEngine, {ChoiceData} from '../useGameEngine';

const mockAnswer = DefaultCategories[0].items[0].answer;

describe('useGameEngine', () => {
  it("can store and track user's choices", () => {
    const {result} = renderHook(() => useGameEngine(mockAnswer));

    const answerArray = [...mockAnswer];
    expect(result.current.currentAnswer.length).toEqual(answerArray.length);
    expect(result.current.choices.length).toEqual(answerArray.length);
    expect(result.current.currentAnswer[0].letter).toEqual('');

    // pick the 4th choice
    const mockChoiceIndex = 3;
    const mockChoice = result.current.choices[mockChoiceIndex];
    act(() => result.current.pickChoice(0, mockChoice));

    // choice should be in the first tile
    expect(result.current.currentAnswer[0].letter).toEqual(mockChoice.letter);
    // 4th choice should be blank
    expect(result.current.choices[0].letter).toEqual('');

    // "tap"/unpick the first tile
    const answer = result.current.currentAnswer[0];
    act(() => result.current.unpickChoice(0, answer));

    // first tile should be blank
    expect(result.current.currentAnswer[0].letter).toEqual('');

    // 4th choice should show it's letter
    expect(result.current.choices[mockChoiceIndex].letter).toEqual(
      mockChoice.letter,
    );
  });

  it('can toggle hasUsedAllLetters when user selects all choices', () => {
    const {result} = renderHook(() => useGameEngine(mockAnswer));
    expect(result.current.hasUsedAllLetters).toEqual(false);

    // loop through all choices
    for (let index = 0; index < result.current.choices.length; index++) {
      const mockChoice: ChoiceData = {letter: 'X', originIndex: index};
      act(() => result.current.pickChoice(index, mockChoice));
    }

    expect(result.current.hasUsedAllLetters).toEqual(true);
  });

  it('can toggle hasCorrectlyAnswered when user correctly guesses the answer', () => {
    const {result} = renderHook(() => useGameEngine('A'));
    expect(result.current.hasCorrectlyAnswered).toEqual(false);

    const mockChoice: ChoiceData = {letter: 'A', originIndex: 0};
    act(() => result.current.pickChoice(0, mockChoice));
    expect(result.current.hasCorrectlyAnswered).toEqual(true);
  });
});
