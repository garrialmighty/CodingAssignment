import React, {useEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';

import CategoryButton from 'src/components/category-button';

import QuestionTiles from './components/question-tiles';
import useIndexer from './hooks/useIndexer';
import styles from './styles';

const QuestionScreen = (): JSX.Element => {
  const {questionIndex, totalQuestions, question, answer} = useIndexer();

  useEffect(() => {
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{`${questionIndex}/${totalQuestions}`}</Text>
      <View style={styles.contentContainer}>
        <QuestionTiles letters={[...answer]} />
        <Text style={styles.question}>{question}</Text>
        <QuestionTiles letters={[...answer]} />
      </View>
      <CategoryButton style={styles.startButton} title="Start" />
    </SafeAreaView>
  );
};

export default QuestionScreen;
