import {StyleSheet, ViewStyle} from 'react-native';

interface Styles {
  container: ViewStyle;
  default: ViewStyle;
  selected: ViewStyle;
}

const styles: Styles = StyleSheet.create<Styles>({
  container: {
    height: 45,
    borderWidth: 1,
    borderRadius: 5,

    alignItems: 'center',
    justifyContent: 'center',
  },
  default: {borderColor: 'black'},
  selected: {borderColor: 'green'},
});

export default styles;
