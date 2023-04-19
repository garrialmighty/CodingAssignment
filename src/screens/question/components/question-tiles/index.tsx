import React from 'react';
import {View} from 'react-native';

import Tile from 'src/components/category-button';
import styles from './styles';

interface Props {
  letters: string[];
  onPress?: (index: number, letter: string) => void;
}

const QuestionTiles = (props: Props): JSX.Element => {
  const {letters, onPress} = props;
  return (
    <View style={styles.tilesContainer}>
      {letters.map((char, index) => {
        const onPressTile = () => onPress?.(index, char);
        return (
          <Tile
            key={`${index}-${char}`}
            title={char}
            style={styles.tile}
            onPress={onPressTile}
          />
        );
      })}
    </View>
  );
};

export default QuestionTiles;
