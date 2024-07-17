import React from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Components
import DetailListComponent2 from 'components/DetailListComponent2'; // Make sure this path is correct

const TeacherAttendanceItem = props => {
  const onTakeAttendancePress = async () => {
    const {setNextScreenPushed, refreshAttendancePanel, item, navigation} =
      props;

    try {
      // navigating to the next screen
      await navigation.push('TeacherTakeStudentPhoto', {
        classId: item.classId,
        sectionId: item.sectionId,
        refreshAttendancePanel,
      });

      // setting screen pushed
      setNextScreenPushed();
    } catch (error) {
      console.error('Navigation Error:', error);
    }
  };

  const {canTakeAttendance, item} = props;
  const {infoArr} = item;
  const present = infoArr[infoArr.length - 2];
  const absent = infoArr[infoArr.length - 1];
  const isAttendanceNotTaken = present === 0 && absent === 0;

  const buttonName =
    canTakeAttendance || isAttendanceNotTaken ? 'Take Photo' : 'View Photos';

  const buttonAction = onTakeAttendancePress;

  return (
    <View style={styles.container}>
      <DetailListComponent2
        titleArr={props.titleArr}
        infoArr={props.item.infoArr}
        skipContainerStyle={true}
      />

      <TouchableHighlight
        onPress={buttonAction}
        underlayColor="#1ba2de80"
        style={styles.totalAbsentBtn}>
        <Text style={styles.totalAbsentBtnText}>{buttonName}</Text>
      </TouchableHighlight>
    </View>
  );
};

export default TeacherAttendanceItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    backgroundColor: '#fff',
    borderLeftWidth: 3,
    borderLeftColor: '#1ba2de',
    padding: 10,
  },
  totalAbsentBtn: {
    height: hp(6),
    margin: wp(2),
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1ba2de',
  },
  totalAbsentBtnText: {
    color: '#fff',
    fontSize: wp(3.2),
  },
});
