import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const shadowEffect = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f1f1',
  },
  mainContentContainer: {
    flex: 1,
  },
  separator: {
    height: wp(2),
  },
  listContentContainer: {
    padding: wp(2),
  },
  addAssignmentBtn: {
    position: 'absolute',
    left: wp(4),
    bottom: wp(4),
    width: hp(10),
    height: hp(10),
    backgroundColor: '#1ba2de',
    borderRadius: hp(5),
    borderWidth: 3,
    borderColor: '#1ba2de80',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addAssignmentBtnIcon: {
    color: '#fff',
    fontSize: hp(6),
  },
  assignModal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  assignModalContentContainer: {
    width: '88%',
    borderRadius: 2,
    paddingHorizontal: wp(2),
    backgroundColor: '#fff',
    ...shadowEffect,
  },
  assignModalItem: {
    marginTop: wp(2),
    borderWidth: 1,
    borderColor: '#bcbec0',
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp(5),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: hp(1),
    paddingHorizontal: wp(1.5),
  },
  calendarIcon: {
    width: wp(6),
    aspectRatio: 1 / 1,
  },
  submitButton: {
    height: hp(6),
    marginVertical: hp(1),
    borderRadius: 2,
    backgroundColor: '#1b9945',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: wp(3.5),
  },
  messageContainer: {
    flex: 1,
    padding: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: wp(3.2),
    color: '#000',
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
    fontSize: 16,
    marginBottom: 10,
  },
  dateNumberStyle: {
    color: '#444',
    fontSize: 16,
  },
  dateNameStyle: {
    color: '#444',
    fontSize: wp(3.2),
  },
  highlightDateNumberStyle: {
    color: '#FFF',
    fontSize: 16,
  },
  highlightDateNameStyle: {
    color: '#FFF',
    fontSize: 12,
  },
  disabledDateNameStyle: {
    color: '#CCC',
    fontSize: 12,
  },
  disabledDateNumberStyle: {
    color: '#CCC',
    fontSize: 16,
  },
  highlightDateContainerStyle: {
    backgroundColor: 'blue',
    // borderRadius: 5,
  },
  selectedDateStyle: {
    backgroundColor: 'blue', // replace with your desired background color
  },
  dateTimePicker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    // transform: [{translateX: '-50%'}, {translateY: '-50%'}],
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    zIndex: 999,
    elevation: 10,
    // Add any other styles as needed
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
});
