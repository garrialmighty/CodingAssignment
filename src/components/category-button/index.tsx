import React from 'react';
import {Text, TouchableOpacity, ViewStyle} from 'react-native';

import styles from './styles';

interface Props {
  title: string;
  style?: ViewStyle;
  disabled?: boolean;
  onPress?: () => void;
}

const CategoryButton = (props: Props): JSX.Element => {
  const {title, style, disabled = false, onPress} = props;
  const isDisabled = title === '' || disabled;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[styles.container, style]}
      testID={`category-button-${title}`}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(CategoryButton);
