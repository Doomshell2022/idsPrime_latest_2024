import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  Linking,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Components
import DetailListComponent from './DetailListComponent';
import showToast from './CustomToast';

// Icons
// import ic_assignment_delete_green from 'assets/icons/ic_assignment_delete_green.png';
// import ic_assignment_download_green from 'assets/icons/ic_assignment_download_green.png';

// API

import {connect} from 'react-redux';
import {teacherOperations, teacherSelectors} from 'idsStore/data/teacher';
// import DetailListComponent2 from './DetailListComponent2';
import AssignmentDetailScreen from './AssignmentDetailScreen';

const AssignmentItem = props => {
  // useEffect(() => {

  // }, [props]);
  const handleAssignmentDelete = () => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this assignment?',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Yes', onPress: handleAlertOkClick},
      ],
      {cancelable: false},
    );
  };

  const handleAlertOkClick = async () => {
    try {
      const assignmentId = props.item.id;
      await props.deleteAssignment(assignmentId).then(async () => {
        const response = await props.isDeleteAssignment;

        showToast('Assignment has been successfully deleted!');

        props.refreshAssignmentsCallback(response);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAttachmentDownload = async () => {
    try {
      const url = props.item.file;

      Linking.openURL(url);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAssignmentAssign = () => {
    // const {id: assignmentId} = props.item;
    const {item: assignmentId} = props;
    props.showAssignModal(assignmentId);
  };

  const assignmentInfoList = {
    backgroundColor:
      '#' +
      (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6) +
      0x15,
    padding: wp(2),

    borderRadius: wp(2),
    paddingVertical: wp(5),
  };
  const info = props.item;
  console.log('~~~~~~~~', info);
  return (
    <View style={assignmentInfoList}>
      <View
        style={{
          display: 'flex',
          // alignItems: 'center',
          justifyContent: 'flex-end',
          flex: 1,
        }}>
        <View style={{flex: 1, paddingRight: wp(10)}}>
          {/* <AssignmentDetailScreen
            titleArr={props.titleArr}
            infoArr={props.item.info}
            skipContainerStyle
          /> */}
          <Text style={{paddingBottom: wp(2)}}>
            {info.info[0]} ({info.info[4]})
          </Text>
          <Text style={{paddingBottom: wp(2)}}>{info.info[1]}</Text>
          <Text style={{flex: 1}}>{info.info[2]}</Text>
        </View>

        <View
          style={{
            // flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
          }}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={handleAssignmentDelete}>
            <Image
              source={require('../assets/icons/bin.png')}
              resizeMode="cover"
              style={styles.assignmentIcon}
            />
          </TouchableHighlight>
          {props.item.file && (
            <TouchableHighlight
              underlayColor="transparent"
              onPress={handleAttachmentDownload}>
              <Image
                source={require('../assets/icons/downloaded.png')}
                resizeMode="cover"
                style={{
                  height: hp(2.5),
                  aspectRatio: 1 / 1,
                  marginRight: wp(3),
                  // marginTop: wp(3),
                  marginBottom: wp(1),
                }}
              />
            </TouchableHighlight>
          )}

          <TouchableHighlight
            underlayColor="transparent"
            onPress={handleAssignmentAssign}>
            <Image
              source={require('../assets/icons/assign-icon.png')}
              resizeMode="cover"
              style={{
                height: hp(2.5),
                aspectRatio: 1 / 1,
                marginRight: wp(3),
                marginTop: wp(2),
                // marginBottom: hp(3),
              }}
            />
            {/* <Text
            style={{
              backgroundColor: '#1ba2de',
              color: '#fff',
              paddingVertical: wp(1),
              paddingHorizontal: wp(2),
              borderRadius: wp(1),
            }}>
            Assign
          </Text> */}
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};
const mapStateToProps = state => ({
  isDeleteAssignment: teacherSelectors.isDeleteAssignment(state),
});
const mapDispatchToProps = {
  deleteAssignment: teacherOperations.deleteAssignment,
};
export default connect(mapStateToProps, mapDispatchToProps)(AssignmentItem);

const styles = StyleSheet.create({
  assignmentInfoList: {
    backgroundColor: '#fff',
    paddingVertical: 3,
    borderLeftColor: '#808285',
    borderLeftWidth: 3,
    borderRadius: 2,
  },
  singleAssignmentButton: {
    flexDirection: 'row',
    // justifyContent: 'c',
    alignItems: 'flex-end',
    paddingHorizontal: wp(2),
    marginTop: wp(1),
  },
  assignmentIcon: {
    height: hp(1.8),
    aspectRatio: 1 / 1,
    marginRight: wp(3),
    marginBottom: wp(3.8),
  },
  assignButtonText: {
    backgroundColor: '#1ba2de',
    color: '#fff',
    paddingVertical: wp(1),
    paddingHorizontal: wp(2),
    borderRadius: wp(1),
  },
});
