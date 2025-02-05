import {transform} from '@babel/core';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  distance: {flex: 1, flexDirection: 'row', marginBottom: wp(0.5)},
  container: {
    flex: 1,
    backgroundColor: '#e7e7e7',
  },
  sepratorsContainer: {height: wp(2)},
  profileInnerContent: {
    backgroundColor: '#e7e7e7',
    flex: 1,
  },
  profileImageBox: {
    borderTopColor: '#cccccc80',
    borderTopWidth: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    height: hp(18),
    padding: wp(2),
    alignItems: 'center',
    //     marginBottom: hp(2),
  },
  profileImage: {
    width: wp(15),
    aspectRatio: 1 / 1,
    borderWidth: 1,
    borderColor: '#fff',
    //     borderRadius: wp(7),
  },
  profileImage2: {
    width: wp(6),
    height: wp(6),
    left: 0,
    bottom: 0,
    right: 0,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: wp(10),
  },
  userName: {
    fontSize: wp(3.2),
    color: '#333',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  userInfo: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingVertical: hp(1),
  },
  userInfoRow: {
    flexDirection: 'row',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.25),
  },
  userInfoLeft: {
    width: wp(40),
    fontWeight: 'bold',
    fontSize: wp(3.2),
  },
  userInfoCenter: {
    width: wp(10),
    fontSize: wp(3.2),
  },
  userInfoRight: {
    width: wp(50),
    fontSize: wp(3.2),
  },
  tabBar: {
    flexDirection: 'row',
    //     marginTop: hp(1),
  },
  tabButton: {
    width: wp(50),
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#999',
  },
  activeTabButton: {
    backgroundColor: '#1ba2de',
    borderBottomWidth: 2,
    borderBottomColor: '#0176e0',
  },
  tabIcons: {
    height: hp(3.5),
    aspectRatio: 1 / 1,
  },
  tabParentsView: {
    // backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tabParentsView1: {
    backgroundColor: '#ffffff',
    padding: wp(3),
    marginBottom: wp(2),
  },

  designation: {
    color: '#333',
    fontWeight: '700',
    fontSize: wp(3.2),
  },

  designationMain: {
    color: '#1e73be',
    fontWeight: '700',
    fontSize: wp(3.2),
  },
  tabParentsContent: {
    color: '#333',
    fontWeight: '400',
    fontSize: wp(3.2),
    flex: 1,
    textTransform: 'uppercase',
  },
  divider: {
    color: '#333',
    fontWeight: '400',
    fontSize: wp(3.2),
    flex: 0.5,
  },
  tabParentsContent2: {
    color: '#e7e7e7',
    marginLeft: wp(2),
    fontSize: wp(3.2),
    fontWeight: '700',
  },
  tabParentsContent3: {
    color: '#333',
    fontSize: wp(3.2),
    marginBottom: wp(3),
  },
  blockHeading: {
    color: '#333',
    fontSize: wp(3.2),
    marginBottom: wp(3),
    fontWeight: '700',
  },
  inputStyle: {
    marginTop: hp(-0.5),
  },
  tabParentsIcons: {
    width: wp(5),
    aspectRatio: 1 / 1,
    marginRight: wp(2),
  },
  profileTabContant: {
    marginTop: hp(1),
    marginHorizontal: wp(2),
  },
  emailInput: {
    flex: 1,
    marginRight: wp(2),
  },
  editEmailButton: {
    padding: wp(1),
  },
  editEmailIcon: {
    width: wp(5),
    height: wp(5),
  },
  updateEmailButton: {
    height: hp(6),
    marginTop: hp(5),
    marginBottom: hp(8),
    paddingHorizontal: wp(4),
    backgroundColor: '#1ba2de',
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateEmailButtonTitle: {
    color: '#fff',
    fontSize: wp(3.2),
  },
  imageHolder: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc8',
    marginRight: wp(2),
    borderRadius: 5,
  },
  teacherImage: {
    height: wp(22),
    aspectRatio: 1 / 1,
  },
  separator: {
    height: wp(2),
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
