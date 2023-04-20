import React, {useCallback} from 'react';
import {SafeAreaView, Text, View} from 'react-native';

import useAppDispatch from 'src/hooks/useAppDispatch';
import {addPoints} from 'src/redux/reducer/leaderboard';
import CategoryButton from 'src/components/category-button';

import SuccessMessage from './components/success-message';
import QuestionTiles from './components/question-tiles';
import useGameEngine from './hooks/useGameEngine';
import useIndexer from './hooks/useIndexer';
import styles from './styles';

const QuestionScreen = (): JSX.Element => {
  const {
    totalQuestions,
    questionIndex,
    question,
    points,
    answer,
    getNextQuestion,
  } = useIndexer();
  const {
    choices,
    currentAnswer,
    hasCorrectlyAnswered,
    pickChoice,
    unpickChoice,
  } = useGameEngine(answer);
  const nextButtonTitle = hasCorrectlyAnswered ? 'Next' : 'Skip';

  const dispatch = useAppDispatch();
  const onPressNext = useCallback(() => {
    getNextQuestion();
    dispatch(addPoints(points));
  }, [getNextQuestion, dispatch, points]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{`${questionIndex}/${totalQuestions}`}</Text>
      {hasCorrectlyAnswered ? (
        <SuccessMessage points={points} />
      ) : (
        <View style={styles.contentContainer}>
          <QuestionTiles data={currentAnswer} onPress={unpickChoice} />
          <Text style={styles.question}>{question}</Text>
          <QuestionTiles data={choices} onPress={pickChoice} />
        </View>
      )}
      <CategoryButton
        title={nextButtonTitle}
        style={styles.nextButton}
        onPress={onPressNext}
      />
    </SafeAreaView>
  );
};

export default QuestionScreen;
