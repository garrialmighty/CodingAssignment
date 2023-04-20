import React, {useEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';

import CategoryButton from 'src/components/category-button';

import QuestionTiles from './components/question-tiles';
import useGameEngine from './hooks/useGameEngine';
import useIndexer from './hooks/useIndexer';
import styles from './styles';

const QuestionScreen = (): JSX.Element => {
  const {questionIndex, totalQuestions, question, answer} = useIndexer();
  const {
    currentAnswer,
    choices,
    hasCorrectlyAnswered,
    pickChoice,
    unpickChoice,
  } = useGameEngine(answer);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{`${questionIndex}/${totalQuestions}`}</Text>
      <View style={styles.contentContainer}>
        <QuestionTiles
          data={currentAnswer}
          onPress={unpickChoice}
          disabled={hasCorrectlyAnswered}
        />
        <Text style={styles.question}>{question}</Text>
        <QuestionTiles
          data={choices}
          onPress={pickChoice}
          disabled={hasCorrectlyAnswered}
        />
      </View>
      <CategoryButton style={styles.startButton} title="Skip" />
    </SafeAreaView>
  );
};

export default QuestionScreen;
