import React from 'react';
import {Button, SafeAreaView, Share, Text} from 'react-native';

import {useAppSelector} from 'src/hooks/useAppSelector';
import styles from './styles';

const LeaderboardScreen = (): JSX.Element => {
  // TODO: fetch leaderboards from backend once API is available
  const leaders = useAppSelector(state => state.leader.leaders);
  const onShare = async () => {
    // TODO: handle error/result from sharing
    await Share.share({
      message: `My highsccore is: ${leaders[0].points}`, // Update fetching once more info and API's are available
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      {leaders.map(({position, name, points}) => (
        <Text
          key={`${position}-${name}-${points}`}
          style={styles.title}>{`${position}. ${name} \t - \t ${points}`}</Text>
      ))}
      <Button onPress={onShare} title="Share" />
    </SafeAreaView>
  );
};

export default LeaderboardScreen;
