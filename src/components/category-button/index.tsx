import React from 'react';
import {Text, TouchableOpacity, ViewStyle} from 'react-native';

import styles from './styles';

interface Props {
  title: string;
  style?: ViewStyle;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

const CategoryButton = (props: Props): JSX.Element => {
  const {title, style, selected = false, disabled = false, onPress} = props;
  const isDisabled = title === '' || disabled;
  const buttonStyle = [
    styles.container,
    selected ? styles.selected : styles.default,
    style,
  ];
  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyle}
      disabled={isDisabled}
      testID={`category-button-${title}`}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(CategoryButton);
