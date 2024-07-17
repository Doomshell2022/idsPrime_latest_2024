import React from 'react';
import {
  View,
  Image,
  Linking,
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// Components
// import DetailListComponent from './DetailListComponent';
// import showToast from './CustomToast';

// Icons
// import ic_assignment_download_green from 'assets/icons/ic_assignment_download_green.png';
import DetailList from './DetailList';

const StudentAssignmentItem2 = props => {
  const handleAttachmentDownload = async () => {
    try {
      const url = props.item.file;
      // const supported = await Linking.canOpenURL(url);

      Linking.openURL(url);
    } catch (error) {
      console.log(error.message);
    }
  };
  const item = props.item;
  // console.log('====================================');
  // console.log('sssssssssss', item);
  // console.log('====================================');
  // const randomColor = Math.floor(Math.random() * 16777215).toString(16); // Generate a random hexadecimal color code
  // const randomColor = Math.floor(Math.random() * 8388607)
  //   .toString(16)
  //   .padStart(6, '0');
  const assignmentInfoList = {
    backgroundColor:
      '#' +
      (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6) +
      0x15,
    padding: wp(2),
    // borderWidth: 1,
    // borderColor: '#00000015',
    borderRadius: wp(2),
    paddingVertical: wp(3),
  };
  return (
    <View style={assignmentInfoList}>
      {/* <DetailList
        titleArr2={props.titleArr2}
        infoArr={props.item.info}
        skipContainerStyle
      /> */}
      <View>
        {/* <DetailListComponent
        titleArr={props.titleArr}
        infoArr={props.item.info}
        skipContainerStyle
      /> */}
        <Text style={{fontSize: wp(4), fontWeight: 'bold'}}>
          {item.info[0]} <Text style={{fontSize: wp(3)}}>({item.info[3]})</Text>
        </Text>
        <Text>{item.info[1]}</Text>
        <Text>{item.info[2]}</Text>
      </View>
      {props.item.file && (
        <TouchableHighlight
          style={styles.singleAssignmentButton}
          onPress={handleAttachmentDownload}>
          <View style={styles.downloadContainer}>
            <View style={styles.rowContainer}>
              {/* <View style={styles.iconContainer}>
                <Image
                  source={require('../assets/icons/down-arrow.png')}
                  resizeMode="cover"
                  style={styles.assignmentIcon}
                />
              </View> */}
              <View>
                <Image
                  source={require('../assets/icons/downloaded.png')}
                  resizeMode="cover"
                  style={styles.assignmentIcon}
                />
                {/* <Text style={styles.downloadText}>Download</Text> */}
              </View>
            </View>
          </View>
        </TouchableHighlight>
      )}
    </View>
  );
};

export default StudentAssignmentItem2;

const styles = StyleSheet.create({
  singleAssignmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assignmentIcon: {
    height: hp(2.5),
    aspectRatio: 1 / 1,
    justifyContent: 'flex-end',
    marginRight: wp(3),
    // marginBottom: wp(9),
    // marginLeft: wp(4),
    // transform: [{rotate: '90deg'}],
  },
  downloadText: {
    fontSize: wp(3),
    color: '#fff',
    transform: [{rotate: '90deg'}],
    fontWeight: 'bold',
    marginTop: wp(-5),
  },
});
