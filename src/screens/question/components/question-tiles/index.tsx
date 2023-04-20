import React from 'react';
import {View} from 'react-native';

import Tile from 'src/components/category-button';

import {ChoiceData} from '../../hooks/useGameEngine';
import styles from './styles';

interface Props {
  disabled: boolean;
  data: ChoiceData[];
  onPress?: (index: number, choice: ChoiceData) => void;
}

const QuestionTiles = (props: Props): JSX.Element => {
  const {data, disabled, onPress} = props;
  return (
    <View style={styles.tilesContainer}>
      {data.map((tileData, index) => {
        const {letter, originIndex} = tileData;
        const key = `${index}-${originIndex}-${letter}-`;
        const onPressTile = () => {
          onPress?.(index, tileData);
        };
        return (
          <Tile
            key={key}
            title={letter}
            disabled={disabled}
            style={styles.tile}
            onPress={onPressTile}
          />
        );
      })}
    </View>
  );
};

export default QuestionTiles;
