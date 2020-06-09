import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  logo: {
    maxHeight: '45%',
    padding: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  progress: {
    flex: 1,
    width: '100%',
    maxWidth: 360,
  },
});
