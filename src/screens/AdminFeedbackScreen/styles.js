import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  distance: {flex: 1, flexDirection: 'row'},
  container: {
    flex: 1,
    backgroundColor: '#f2f1f1',
  },
  quesView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: wp(2),
  },
  qustionTag: {
    fontWeight: 'bold',
    color: '#000',
  },
  sepratorsContainer: {height: wp(2)},
  profileInnerContent: {
    backgroundColor: '#f2f1f1',
    flex: 1,
    padding: 10,
  },
  profileInnerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    height: hp(6),
    marginBottom: hp(2),
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  profileInnerContainer2: {
    borderWidth: 1,
    flex: 1,
    borderColor: '#ccc',
    height: hp(30),
    marginBottom: hp(2),
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  assignmentDescription: {
    height: hp(30),
    flex: 1,
    paddingHorizontal: wp(2),
    color: '#000',
    fontSize: wp(3.2),
  },

  formContainer: {
    flex: 1,
    padding: wp(2),
    backgroundColor: '#f2f1f1',
  },
  pickerSelectView: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#ccc',
    borderRadius: 2,
    padding: wp(2),
    // marginTop: hp(3),
    fontSize: wp(3.2),
    backgroundColor: '#fff',
    height: hp(5.5),
  },
  pickerSelectViewIcon: {
    width: wp(2.5),
    height: wp(2.5),
  },
  inputFieldContainer: {
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    borderRadius: 2,
    marginTop: hp(1.5),
    marginBottom: hp(1.5),
    backgroundColor: '#fff',
    height: hp(15.5),
    justifyContent: 'center',
  },
  inputField: {
    flex: 1,
    paddingHorizontal: wp(2),
    textAlignVertical: 'top',
    color: '#000',
    fontSize: wp(3.2),
  },
  searchButton: {
    height: hp(6),
    backgroundColor: '#1ba2de',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
  },
  searchButtonText: {
    color: '#fff',
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
