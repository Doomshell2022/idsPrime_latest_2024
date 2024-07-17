import {Text, View, StyleSheet, FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f1f1',
  },
  listContentContainer: {
    padding: wp(2),
    marginTop: wp(3),
  },
  separator: {
    height: wp(2),
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
    color: '#000', // You can change the color as per your design
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
  calendarStripStyle: {
    height: 80,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
  calendarHeaderStyle: {
    color: '#444',
    fontSize: wp(3.2),
    marginBottom: 10,
  },
  dateNumberStyle: {
    color: '#444',
    fontSize: wp(3.2),
  },
  dateNameStyle: {
    color: '#444',
    fontSize: wp(3.2),
  },
  highlightDateNumberStyle: {
    color: '#FFF',
    fontSize: wp(3.2),
  },
  highlightDateNameStyle: {
    color: '#FFF',
    fontSize: wp(3.2),
  },
  disabledDateNameStyle: {
    color: '#CCC',
    fontSize: wp(3.2),
  },
  disabledDateNumberStyle: {
    color: '#CCC',
    fontSize: wp(3.2),
  },
  selectedDateStyle: {
    backgroundColor: 'blue',
  },
  todayDateName: {
    color: 'red',
    fontWeight: 'bold',
  },
  todayDateNumber: {
    color: 'red',
    fontWeight: 'bold',
  },

  // styles for other dates
  dateName: {
    color: 'black',
    fontWeight: 'normal',
  },
  dateNumber: {
    color: 'black',
    fontWeight: 'normal',
  },

  calendar: {
    height: 100,
    paddingTop: 10,
    paddingBottom: 10,
  },
  selectedDateText: {
    fontSize: wp(3.2),
    marginTop: 20,
  },
});
