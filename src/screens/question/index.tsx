import React, {useCallback, useEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackParamList} from 'src/app/container';
import useAppDispatch from 'src/hooks/useAppDispatch';
import {addPoints} from 'src/redux/reducer/leaderboard';
import CategoryButton from 'src/components/category-button';

import SuccessMessage from './components/success-message';
import QuestionTiles from './components/question-tiles';
import useGameEngine from './hooks/useGameEngine';
import useIndexer from './hooks/useIndexer';
import styles from './styles';

type Props = NativeStackScreenProps<AppStackParamList, 'Question'>;

const QuestionScreen = (props: Props): JSX.Element => {
  const {goBack, setOptions} = props.navigation;
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

  // update header title
  useEffect(
    () => setOptions({title: `${questionIndex}/${totalQuestions}`}),
    [setOptions, questionIndex, totalQuestions],
  );

  const dispatch = useAppDispatch();
  const onPressNext = useCallback(() => {
    if (hasCorrectlyAnswered) {
      dispatch(addPoints(points));
    }

    if (questionIndex === totalQuestions) {
      goBack();
    } else {
      getNextQuestion();
    }
  }, [
    hasCorrectlyAnswered,
    dispatch,
    points,
    questionIndex,
    totalQuestions,
    goBack,
    getNextQuestion,
  ]);

  const nextButtonTitle = hasCorrectlyAnswered ? 'Next' : 'Skip';
  return (
    <SafeAreaView style={styles.container}>
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
