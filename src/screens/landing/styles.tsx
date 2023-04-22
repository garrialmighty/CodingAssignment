import {StyleSheet, ViewStyle} from 'react-native';

interface Styles {
  container: ViewStyle;
  title: ViewStyle;
  buttonContainer: ViewStyle;
  startButton: ViewStyle;
}

const styles: Styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    marginHorizontal: '5%',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 50,
    borderWidth: 1,
    textAlign: 'center',
    borderColor: '#a2b4cc',
    backgroundColor: '#dce7f9',
  },
  buttonContainer: {
    flex: 0.8,
    justifyContent: 'space-around',
  },
  startButton: {
    borderColor: '#b88782',
    backgroundColor: '#f0cfcd',
  },
});

export default styles;
