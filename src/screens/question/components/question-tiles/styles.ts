import {StyleSheet, ViewStyle} from 'react-native';

interface Styles {
  tile: ViewStyle;
  tilesContainer: ViewStyle;
  incorrect: ViewStyle;
}

const styles: Styles = StyleSheet.create<Styles>({
  tile: {
    width: 45,
    height: 45,
    marginRight: 20,
  },
  tilesContainer: {
    flex: 1,
    rowGap: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  incorrect: {borderColor: 'red'},
});

export default styles;
