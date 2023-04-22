import React from 'react';
import {View} from 'react-native';

import Tile from 'src/components/category-button';

import {ChoiceData} from '../../hooks/useGameEngine';
import styles from './styles';

interface Props {
  data: ChoiceData[];
  incorrect?: boolean;
  onPress?: (index: number, choice: ChoiceData) => void;
}

const QuestionTiles = (props: Props): JSX.Element => {
  const {data, onPress, incorrect = false} = props;
  const tileStyle = [styles.tile, incorrect ? styles.incorrect : {}];
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
            style={tileStyle}
            onPress={onPressTile}
            disabled={letter === ''}
          />
        );
      })}
    </View>
  );
};

export default QuestionTiles;
