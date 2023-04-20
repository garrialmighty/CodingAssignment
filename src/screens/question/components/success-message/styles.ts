import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Styles {
  container: ViewStyle;
  message: TextStyle;
}

const styles: Styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 50,
    color: '#769a8e',
    textAlign: 'center',
  },
});

export default styles;
