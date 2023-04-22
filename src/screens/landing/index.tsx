import React, {useMemo} from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AppStackParamList} from 'src/app/container';
import useAppDispatch from 'src/hooks/useAppDispatch';
import {useAppSelector} from 'src/hooks/useAppSelector';
import {selectCategory} from 'src/redux/reducer/category';
import CategoryButton from 'src/components/category-button';

import styles from './styles';

type Props = NativeStackScreenProps<AppStackParamList, 'Landing'>;

const LandingScreen = (props: Props): JSX.Element => {
  const {navigate} = props.navigation;
  // TODO: fetch other categories from backend once API is available
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.category.categories);
  const selectedCategory = useAppSelector(
    state => state.category.selectedCategory,
  );
  const CategoryButtons = useMemo(() => {
    // convert to a FlatList when/if the design evolves
    return categories.map(category => {
      const {name} = category;
      const onPressCategory = () => dispatch(selectCategory(category));
      const isSelected = selectedCategory.name === name;
      return (
        <CategoryButton
          key={name}
          title={name}
          selected={isSelected}
          onPress={onPressCategory}
        />
      );
    });
  }, [dispatch, categories, selectedCategory]);

  const navigateToQuestions = () => navigate('Question');
  const navigateToLeaderboards = () => navigate('Leaderboards');
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Words Puzzle</Text>
      <View style={styles.buttonContainer}>{CategoryButtons}</View>
      <CategoryButton
        title="Start"
        style={styles.startButton}
        onPress={navigateToQuestions}
      />
      <Button onPress={navigateToLeaderboards} title="Leaderboards" />
    </SafeAreaView>
  );
};

export default LandingScreen;
