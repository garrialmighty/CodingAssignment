import React from 'react';
import {View} from 'react-native';

import Tile from 'src/components/category-button';

import {ChoiceData} from '../../hooks/useGameEngine';
import styles from './styles';

interface Props {
  data: ChoiceData[];
  onPress?: (index: number, choice: ChoiceData) => void;
}

const QuestionTiles = (props: Props): JSX.Element => {
  const {data, onPress} = props;
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
            style={styles.tile}
            onPress={onPressTile}
            disabled={letter === ''}
          />
        );
      })}
    </View>
  );
};

export default QuestionTiles;
