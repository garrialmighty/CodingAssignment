import {renderHook, act} from '@testing-library/react-hooks';

import {DefaultCategories} from 'src/data/categories';

import useGameEngine from '../useGameEngine';

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
});
