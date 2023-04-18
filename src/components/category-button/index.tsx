import React from 'react';
import {Text, TouchableOpacity, ViewStyle} from 'react-native';

import styles from './styles';

interface Props {
  title: string;
  style?: ViewStyle;
  onPress?: () => void;
}

const CategoryButton = (props: Props): JSX.Element => {
  const {title, onPress, style} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      testID={`category-button-${title}`}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(CategoryButton);
