import React from 'react';
import {SafeAreaView, Text} from 'react-native';

import {useAppSelector} from 'src/hooks/useAppSelector';
import styles from './styles';

const LeaderboardScreen = (): JSX.Element => {
  // TODO: fetch leaderboards from backend once API is available
  const leaders = useAppSelector(state => state.leader.leaders);
  return (
    <SafeAreaView style={styles.container}>
      {leaders.map(({position, name, points}) => (
        <Text
          style={styles.title}>{`${position}. ${name} \t - \t ${points}`}</Text>
      ))}
    </SafeAreaView>
  );
};

export default LeaderboardScreen;
