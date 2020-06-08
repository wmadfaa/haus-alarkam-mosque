import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  logo: {
    maxHeight: '35%',
    padding: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  infoCation: {
    paddingVertical: 8,
  },
  actions: {
    marginHorizontal: 8,
    marginVertical: 12,
  },
  actionButton: {
    marginVertical: 4,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
