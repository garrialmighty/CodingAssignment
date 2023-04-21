import {StyleSheet, ViewStyle} from 'react-native';

interface Styles {
  container: ViewStyle;
  contentContainer: ViewStyle;
  question: ViewStyle;
  nextButton: ViewStyle;
}

const styles: Styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    marginHorizontal: '5%',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 0.8,
    justifyContent: 'space-around',
  },
  question: {
    fontSize: 30,
    textAlign: 'center',
  },
  nextButton: {
    borderColor: '#b88782',
    backgroundColor: '#f0cfcd',
  },
});

export default styles;
