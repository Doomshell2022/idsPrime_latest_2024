import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AssignmentItem from './AssignmentItem';

const AssignmentDetailScreen = props => {
  const renderList = () => {
    let detailList = [];
    console.log('ssse44444452453', detailList);
    // loop over the titleArr array
    for (let i = 0; i < props.titleArr.length; i++) {
      // create a new AssignmentDetailScreen component for each item
      const detail = (
        <AssignmentItem
          key={i}
          infoArr={[props.infoArr[i]]}
          titleArr={[props.titleArr[i]]}
          teacherDesignation={props.teacherDesignation}
          skipContainerStyle={props.skipContainerStyle}
        />
      );

      // add the new component to the detailList array
      detailList.push(detail);
    }

    return detailList;
  };

  let containerStyle = styles.userInfo;
  props.skipContainerStyle && (containerStyle = undefined);

  return <View style={containerStyle}>{renderList()}</View>;
};

export default AssignmentDetailScreen;

const styles = StyleSheet.create({
  // userInfo: {
  //   paddingVertical: hp(1),
  //   borderRadius: 2,
  //   backgroundColor: '#fff',
  //   borderLeftWidth: 3,
  //   borderLeftColor: '#1ba2de',
  // },
  userInfoRow: {
    flexDirection: 'row',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.25),
    marginBottom: wp(0.5),
  },
  userInfoLeft: {
    width: wp(35),
    fontSize: wp(3),
    fontWeight: 'bold',
  },
  userInfoCenter: {
    width: wp(5),
    fontSize: wp(3),
  },
  userInfoRight: {
    flex: 1,
    fontSize: wp(3),
    fontWeight: 'bold',
    // color: '#000',
  },
  noData: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataError: {
    fontSize: wp(3.5),
    fontWeight: '400',
  },
});
