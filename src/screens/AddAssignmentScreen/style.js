import React from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addAssignmentSection: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: wp(2),
  },
  addAssignmentButton: {
    borderColor: '#bcbec0',
    borderWidth: 1,
    marginTop: hp(1.5),
  },
  dateButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    height: hp(8),
    marginTop: hp(1),
    paddingHorizontal: wp(1.5),
  },
  calendarIcon: {
    width: wp(6),
    aspectRatio: 1 / 1,
  },
  submitButton: {
    height: hp(6),
    margin: wp(2),
    backgroundColor: '#1ba2de',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: wp(3.2),
  },
  assignmentDescriptionContainer: {
    marginTop: hp(1),
    marginBottom: hp(2),
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  assignmentDescription: {
    height: hp(10),
    color: '#000',
    fontSize: wp(3.2),
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 5,
    width: '80%',
    maxHeight: '80%',
  },
  modalItem: {
    padding: 15,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },
  modalItemText: {
    fontSize: 16,
  },
  modalCloseButton: {
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: '#2196f3',
  },
  picker: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#bcbec0',
    borderRadius: 5,
    marginTop: widthPercentageToDP(2),
    padding: widthPercentageToDP(2),
  },
});
export default styles;
