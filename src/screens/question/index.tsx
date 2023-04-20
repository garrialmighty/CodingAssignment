import React, {useEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';

import CategoryButton from 'src/components/category-button';

import QuestionTiles from './components/question-tiles';
import useGameEngine from './hooks/useGameEngine';
import useIndexer from './hooks/useIndexer';
import styles from './styles';
import SuccessMessage from './components/success-message';

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

  useEffect(() => {
    if (hasCorrectlyAnswered) {
      // TODO: save points earned
    }
  }, [hasCorrectlyAnswered]);

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
        onPress={getNextQuestion}
      />
    </SafeAreaView>
  );
};

export default QuestionScreen;
