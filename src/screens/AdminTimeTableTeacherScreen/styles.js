import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f1f1',
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    height: hp(6),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00c0f0',
    paddingHorizontal: wp(3.4),
  },
  title: {
    color: '#fff',
    fontSize: wp(3.2),
    fontWeight: 'bold',
    textAlign: 'left',
  },
  listItemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 2,
    padding: wp(2),
  },
  listItemText: {
    color: '#000',
    fontSize: wp(3.2),
    fontWeight: 'bold',
    textAlign: 'left',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex4: {
    flex: 4,
  },
  listContentContainer: {
    padding: wp(2),
  },
  separator: {
    height: wp(2),
  },
  messageContainer: {
    flex: 1,
    padding: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    color: '#000',
    fontSize: wp(3.2),
    textAlign: 'center',
  },
  networkIssue: {
    height: hp(50),
    aspectRatio: 1 / 1,
  },
  offlineStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
