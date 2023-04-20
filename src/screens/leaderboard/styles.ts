import {StyleSheet, ViewStyle} from 'react-native';

interface Styles {
  container: ViewStyle;
  title: ViewStyle;
}

const styles: Styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    marginHorizontal: '5%',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
  },
});

export default styles;
