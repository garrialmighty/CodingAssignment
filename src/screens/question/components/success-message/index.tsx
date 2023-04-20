import React from 'react';
import {Text, View} from 'react-native';

import styles from './styles';

interface Props {
  points: number;
}

const SuccessMessage = (props: Props): JSX.Element => {
  const {points} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Correct!</Text>
      <Text style={styles.message}>Congratulations</Text>
      <Text style={styles.message}>{`\nYou earn ${points}\npoints`}</Text>
    </View>
  );
};

export default React.memo(SuccessMessage);
