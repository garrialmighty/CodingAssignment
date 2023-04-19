import {StyleSheet, ViewStyle} from 'react-native';

interface Styles {
  container: ViewStyle;
  title: ViewStyle;
  contentContainer: ViewStyle;
  question: ViewStyle;
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
  contentContainer: {
    flex: 0.8,
    justifyContent: 'space-around',
  },
  question: {
    fontSize: 30,
    textAlign: 'center',
  },
  startButton: {
    borderColor: '#b88782',
    backgroundColor: '#f0cfcd',
  },
});

export default styles;
