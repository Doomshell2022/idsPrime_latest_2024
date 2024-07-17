import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  absentReasonContainer: {
    height: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  teacherName: {
    backgroundColor: '#fff',
    alignItems: 'center',
    color: '#1ba2de',
    fontWeight: 'bold',
    fontSize: wp(3),
  },
  contentContainer: {
    flex: 1,
    paddingBottom: wp(5),
  },
  header: {
    height: hp(6),
    backgroundColor: '#414042',
    // padding: wp(5),
    // paddingHorizontal: wp(5),
    // justifyContent: 'space-between',
    paddingLeft: wp(5),
    // padding:wp(3)
  },
  text: {
    // textAlign: 'left',
    color: '#fff',
    fontSize: wp(3),
    // paddingLeft: wp(2),
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text2: {
    textAlign: 'center',
    color: '#414042',
    fontSize: wp(3),
  },
  dataWrapper: {
    width: '100%',
  },
  row: {
    height: 30,
    backgroundColor: '#fff',
    paddingHorizontal: 6,
  },
  wrapper: {
    flexDirection: 'row',
    marginTop: -1,
  },
  title: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageContainer: {
    flex: 1,
    padding: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    color: '#000',
    fontSize: wp(3),
    textAlign: 'center',
  },
  schoolStyle: {
    flex: 1,
    // borderWidth: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  abContainer: {
    flex: 1,
    margin: wp(2),
    backgroundColor: '#FFFDE6',
    paddingVertical: wp(1),
    borderLeftColor: '#1ba2de',
    borderLeftWidth: 3,
    borderRadius: 2,
  },
  stuName: {
    fontSize: wp(4),
    fontWeight: 'bold',
    marginLeft: wp(2),
  },
  gardionName: {
    fontSize: wp(3),
    fontWeight: '400',
    marginLeft: wp(2),
  },
  cellStyle: {
    fontSize: wp(3),
    fontWeight: '400',
    marginLeft: wp(2),
    borderBottomWidth: 1,
    borderBottomColor: '#1ba2de',
  },
  callBox: {marginLeft: wp(2), marginTop: wp(2), flexDirection: 'row'},
  callBoxImage: {
    width: wp(5),
    aspectRatio: 1 / 1,
    marginRight: wp(2),
  },
});
