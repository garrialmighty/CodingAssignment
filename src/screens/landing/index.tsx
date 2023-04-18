import React from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';

import CategoryButton from 'src/components/category-button';

import styles from './styles';

const LandingScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Words Puzzle</Text>
      <View style={styles.buttonContainer}>
        <CategoryButton style={styles.categoryButton} title="Cities" />
        <CategoryButton style={styles.categoryButton} title="Food" />
        <CategoryButton style={styles.categoryButton} title="Animals" />
      </View>
      <CategoryButton style={styles.startButton} title="Start" />
      <Button onPress={() => {}} title="Leaderboards" />
    </SafeAreaView>
  );
};

export default LandingScreen;
