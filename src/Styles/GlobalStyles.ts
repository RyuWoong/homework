import {StyleSheet} from 'react-native';
import {ColorBlack, ColorWhite} from './pallete';

const GlobalStyles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: ColorBlack,
  },
  Center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GlobalStyles;
