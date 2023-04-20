import React, {useMemo} from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackParamList} from 'src/app/container';
import {useAppSelector} from 'src/hooks/useAppSelector';
import CategoryButton from 'src/components/category-button';

import styles from './styles';

type Props = NativeStackScreenProps<AppStackParamList, 'Landing'>;

const LandingScreen = (props: Props): JSX.Element => {
  const {navigation} = props;

  // TODO: fetch other categories from backend once API is available
  const categories = useAppSelector(state => state.category.categories);
  const CategoryButtons = useMemo(() => {
    // convert to a FlatList once the design evolves
    return categories.map(({name}) => (
      <CategoryButton key={name} title={name} style={styles.categoryButton} />
    ));
  }, [categories]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Words Puzzle</Text>
      <View style={styles.buttonContainer}>{CategoryButtons}</View>
      <CategoryButton style={styles.startButton} title="Start" />
      <Button onPress={() => {}} title="Leaderboards" />
    </SafeAreaView>
  );
};

export default LandingScreen;
