import {StyleSheet, ViewStyle} from 'react-native';

interface Styles {
  container: ViewStyle;
}

const styles: Styles = StyleSheet.create<Styles>({
  container: {
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
