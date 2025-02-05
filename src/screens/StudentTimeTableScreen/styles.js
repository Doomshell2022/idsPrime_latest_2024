import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeTableSection: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  leftPart: {
    width: wp(15),
    backgroundColor: '#22272b',
  },
  leftPartHeader: {
    color: '#fff',
    backgroundColor: '#16181a',
    height: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#168abe',
    borderTopWidth: 1,
  },
  leftPartHeaderContent: {
    color: '#fff',
    fontSize: wp(3.2),
  },
  errMsg: {
    flex: 1,
    borderTopColor: '#dcdcdc',
    borderTopWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  rightPart: {
    width: wp(85),
    backgroundColor: '#fff',
  },
  rightPartHeader: {
    color: '#fff',
    backgroundColor: '#1ba2de',
    height: hp(5),
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#168abe',
    borderTopWidth: 1,
  },
  dayBox: {
    width: 149,
    color: '#fff',
    textAlign: 'center',
    fontSize: wp(3.2),
  },
  dayBoxBorder: {
    borderRightColor: '#fff',
    borderRightWidth: 1,
    justifyContent: 'center',
  },
  subjectColumnL: {
    color: '#000',
  },
  periodClasses: {
    flex: 1,
    flexDirection: 'column',
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
